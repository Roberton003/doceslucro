#!/usr/bin/env python3
"""
Orquestrador Avançado - Copilot CLI com Qwen via API REST
Versão robusta para ambientes de produção
"""

import asyncio
import aiohttp
import yaml
import logging
from typing import Dict, List, Optional, Callable
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
import json

# Configuração de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class TaskStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    RETRYING = "retrying"

class TaskType(Enum):
    CODE_GENERATION = "code_generation"
    CODE_REVIEW = "code_review"
    DOCUMENTATION = "documentation"
    ANALYSIS = "analysis"
    TRANSLATION = "translation"
    CUSTOM = "custom"

@dataclass
class Task:
    id: str
    type: TaskType
    description: str
    context: Optional[Dict] = None
    priority: int = 1
    status: TaskStatus = TaskStatus.PENDING
    result: Optional[Dict] = None
    error: Optional[str] = None
    created_at: datetime = field(default_factory=datetime.now)
    completed_at: Optional[datetime] = None
    retry_count: int = 0
    dependencies: List[str] = field(default_factory=list)

class QwenAPIClient:
    """Cliente para comunicação com Qwen via API REST"""
    
    def __init__(self, config: Dict):
        self.endpoint = config.get('endpoint', 'http://localhost:8000')
        self.timeout = config.get('timeout', 60)
        self.retry_attempts = config.get('retry_attempts', 3)
        self.session: Optional[aiohttp.ClientSession] = None
    
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def generate(self, prompt: str, options: Dict = None) -> Dict:
        """
        Envia requisição para o Qwen via API
        
        Args:
            prompt: Prompt a ser processado
            options: Parâmetros adicionais (temperature, max_tokens, etc)
        
        Returns:
            Dict com resposta da API
        """
        if not self.session:
            raise RuntimeError("Cliente não inicializado. Use 'async with'")
        
        payload = {
            'prompt': prompt,
            'model': 'qwen',
            **(options or {})
        }
        
        for attempt in range(self.retry_attempts):
            try:
                async with self.session.post(
                    f"{self.endpoint}/v1/completions",
                    json=payload,
                    timeout=aiohttp.ClientTimeout(total=self.timeout)
                ) as response:
                    if response.status == 200:
                        data = await response.json()
                        return {
                            'success': True,
                            'output': data.get('choices', [{}])[0].get('text', ''),
                            'usage': data.get('usage', {}),
                            'error': None
                        }
                    else:
                        error_text = await response.text()
                        if attempt < self.retry_attempts - 1:
                            await asyncio.sleep(2 ** attempt)
                            continue
                        return {
                            'success': False,
                            'output': '',
                            'error': f"HTTP {response.status}: {error_text}"
                        }
            
            except asyncio.TimeoutError:
                if attempt < self.retry_attempts - 1:
                    await asyncio.sleep(2 ** attempt)
                    continue
                return {
                    'success': False,
                    'output': '',
                    'error': 'Request timeout'
                }
            except Exception as e:
                if attempt < self.retry_attempts - 1:
                    await asyncio.sleep(2 ** attempt)
                    continue
                return {
                    'success': False,
                    'output': '',
                    'error': str(e)
                }
        
        return {
            'success': False,
            'output': '',
            'error': 'Max retry attempts exceeded'
        }

class AdvancedOrchestrator:
    """Orquestrador avançado com suporte a async e callbacks"""
    
    def __init__(self, config_path: str = "config.yaml"):
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)
        
        self.tasks: Dict[str, Task] = {}
        self.completed_tasks: List[str] = []
        self.failed_tasks: List[str] = []
        self.callbacks: Dict[str, List[Callable]] = {}
        
        # Semáforo para controlar concorrência
        max_concurrent = self.config['qwen']['limits']['max_concurrent_tasks']
        self.semaphore = asyncio.Semaphore(max_concurrent)
    
    def add_task(self, task: Task) -> str:
        """Adiciona uma tarefa ao orquestrador"""
        self.tasks[task.id] = task
        logger.info(f"Tarefa adicionada: {task.id} ({task.type.value})")
        return task.id
    
    def add_callback(self, task_id: str, callback: Callable):
        """Adiciona callback para ser executado após conclusão da tarefa"""
        if task_id not in self.callbacks:
            self.callbacks[task_id] = []
        self.callbacks[task_id].append(callback)
    
    def create_prompt_for_task(self, task: Task) -> str:
        """Cria prompt otimizado baseado no tipo de tarefa"""
        task_config = self.config['task_configs'].get(task.type.value, {})
        system_prompt = task_config.get('system_prompt', '')
        
        prompt = f"{system_prompt}\n\n" if system_prompt else ""
        prompt += f"Tarefa: {task.description}\n\n"
        
        if task.context:
            prompt += "Contexto:\n"
            for key, value in task.context.items():
                prompt += f"- {key}: {value}\n"
        
        return prompt
    
    def get_task_options(self, task: Task) -> Dict:
        """Obtém configurações específicas para o tipo de tarefa"""
        task_config = self.config['task_configs'].get(task.type.value, {})
        defaults = self.config['qwen']['defaults']
        
        return {
            'temperature': task_config.get('temperature', defaults['temperature']),
            'max_tokens': task_config.get('max_tokens', defaults['max_tokens']),
            'top_p': defaults.get('top_p', 0.9)
        }
    
    async def check_dependencies(self, task: Task) -> bool:
        """Verifica se as dependências da tarefa foram completadas"""
        for dep_id in task.dependencies:
            if dep_id not in self.completed_tasks:
                return False
        return True
    
    async def execute_task(self, task: Task, qwen_client: QwenAPIClient):
        """Executa uma tarefa individual"""
        async with self.semaphore:
            # Verifica dependências
            if not await self.check_dependencies(task):
                logger.warning(f"Tarefa {task.id} aguardando dependências")
                await asyncio.sleep(1)
                return await self.execute_task(task, qwen_client)
            
            task.status = TaskStatus.RUNNING
            logger.info(f"🔄 Executando: {task.id}")
            
            prompt = self.create_prompt_for_task(task)
            options = self.get_task_options(task)
            
            try:
                result = await qwen_client.generate(prompt, options)
                
                if result['success']:
                    task.status = TaskStatus.COMPLETED
                    task.result = result
                    task.completed_at = datetime.now()
                    self.completed_tasks.append(task.id)
                    logger.info(f"✅ Concluída: {task.id}")
                    
                    # Executa callbacks
                    if task.id in self.callbacks:
                        for callback in self.callbacks[task.id]:
                            await callback(task)
                else:
                    raise Exception(result['error'])
                    
            except Exception as e:
                task.error = str(e)
                max_retries = self.config['retry']['max_attempts']
                
                if task.retry_count < max_retries:
                    task.retry_count += 1
                    task.status = TaskStatus.RETRYING
                    delay = self.config['retry']['initial_delay'] * (
                        self.config['retry']['backoff_multiplier'] ** task.retry_count
                    )
                    logger.warning(
                        f"⚠️  Tentativa {task.retry_count}/{max_retries} "
                        f"para {task.id}. Aguardando {delay}s..."
                    )
                    await asyncio.sleep(delay)
                    return await self.execute_task(task, qwen_client)
                else:
                    task.status = TaskStatus.FAILED
                    self.failed_tasks.append(task.id)
                    logger.error(f"❌ Falhou: {task.id} - {task.error}")
    
    async def run(self):
        """Executa todas as tarefas de forma assíncrona"""
        logger.info(f"🚀 Iniciando orquestração de {len(self.tasks)} tarefas")
        
        # Ordena tarefas por prioridade
        sorted_tasks = sorted(
            self.tasks.values(),
            key=lambda t: t.priority,
            reverse=True
        )
        
        async with QwenAPIClient(self.config['qwen']['api']) as qwen_client:
            # Executa tarefas concorrentemente
            await asyncio.gather(
                *[self.execute_task(task, qwen_client) for task in sorted_tasks],
                return_exceptions=True
            )
        
        self.generate_report()
    
    def generate_report(self):
        """Gera relatório final da execução"""
        total = len(self.tasks)
        completed = len(self.completed_tasks)
        failed = len(self.failed_tasks)
        
        report = f"""
╔════════════════════════════════════════════╗
║   RELATÓRIO DE ORQUESTRAÇÃO ASSÍNCRONA     ║
╚════════════════════════════════════════════╝

📊 Estatísticas:
   Total de tarefas: {total}
   ✅ Concluídas: {completed}
   ❌ Falhadas: {failed}
   📈 Taxa de sucesso: {(completed/total*100):.1f}%

⏱️  Performance:
"""
        
        for task_id in self.completed_tasks[:5]:  # Top 5
            task = self.tasks[task_id]
            duration = (task.completed_at - task.created_at).total_seconds()
            report += f"   • {task.type.value}: {duration:.2f}s\n"
        
        logger.info(report)
        
        # Salva métricas
        if self.config['monitoring']['enabled']:
            metrics = {
                'timestamp': datetime.now().isoformat(),
                'total_tasks': total,
                'completed': completed,
                'failed': failed,
                'tasks': [
                    {
                        'id': task.id,
                        'type': task.type.value,
                        'status': task.status.value,
                        'duration': (task.completed_at - task.created_at).total_seconds()
                        if task.completed_at else None
                    }
                    for task in self.tasks.values()
                ]
            }
            
            with open(self.config['monitoring']['metrics_file'], 'w') as f:
                json.dump(metrics, f, indent=2)

# Exemplo de uso
async def main():
    orchestrator = AdvancedOrchestrator()
    
    # Callback de exemplo
    async def on_complete(task: Task):
        print(f"🎉 Callback: Tarefa {task.id} completada!")
    
    # Cria tarefas
    task1 = Task(
        id="task_001",
        type=TaskType.CODE_GENERATION,
        description="Criar API REST com FastAPI",
        context={"language": "Python", "framework": "FastAPI"},
        priority=3
    )
    
    task2 = Task(
        id="task_002",
        type=TaskType.DOCUMENTATION,
        description="Documentar a API criada",
        dependencies=["task_001"],  # Depende de task1
        priority=2
    )
    
    task3 = Task(
        id="task_003",
        type=TaskType.CODE_REVIEW,
        description="Revisar código da API",
        dependencies=["task_001"],
        priority=1
    )
    
    # Adiciona tarefas
    orchestrator.add_task(task1)
    orchestrator.add_task(task2)
    orchestrator.add_task(task3)
    
    # Adiciona callback
    orchestrator.add_callback("task_001", on_complete)
    
    # Executa orquestração
    await orchestrator.run()

if __name__ == "__main__":
    asyncio.run(main())
