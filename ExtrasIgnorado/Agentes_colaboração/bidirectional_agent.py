#!/usr/bin/env python3
"""
Sistema Bidirecional de Agentes
Copilot e Qwen podem solicitar ajuda um do outro
"""

import asyncio
import json
from typing import Dict, List, Optional, Callable
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum

class MessageType(Enum):
    """Tipos de mensagem entre agentes"""
    TASK_DELEGATION = "task_delegation"
    HELP_REQUEST = "help_request"
    CLARIFICATION = "clarification"
    RESULT_RETURN = "result_return"
    STATUS_UPDATE = "status_update"
    ERROR_REPORT = "error_report"

class AgentState(Enum):
    """Estados do agente"""
    IDLE = "idle"
    WORKING = "working"
    BLOCKED = "blocked"
    WAITING_RESPONSE = "waiting_response"

@dataclass
class Message:
    """Mensagem entre agentes"""
    id: str
    type: MessageType
    sender: str
    receiver: str
    content: Dict
    timestamp: datetime = field(default_factory=datetime.now)
    parent_message_id: Optional[str] = None

class MessageBus:
    """
    Sistema de mensagens entre agentes
    Permite comunicação bidirecional assíncrona
    """
    
    def __init__(self):
        self.queues: Dict[str, asyncio.Queue] = {}
        self.message_history: List[Message] = []
        self.handlers: Dict[str, Dict[MessageType, Callable]] = {}
    
    def register_agent(self, agent_id: str):
        """Registra um agente no barramento"""
        self.queues[agent_id] = asyncio.Queue()
        self.handlers[agent_id] = {}
        print(f"📡 Agente registrado: {agent_id}")
    
    def register_handler(self, agent_id: str, msg_type: MessageType, handler: Callable):
        """Registra handler para tipo específico de mensagem"""
        self.handlers[agent_id][msg_type] = handler
    
    async def send_message(self, message: Message):
        """Envia mensagem para um agente"""
        if message.receiver not in self.queues:
            raise ValueError(f"Agente {message.receiver} não registrado")
        
        self.message_history.append(message)
        await self.queues[message.receiver].put(message)
        print(f"📨 {message.sender} → {message.receiver}: {message.type.value}")
    
    async def receive_message(self, agent_id: str) -> Message:
        """Recebe próxima mensagem da fila do agente"""
        return await self.queues[agent_id].get()
    
    def get_conversation(self, agent1: str, agent2: str) -> List[Message]:
        """Retorna histórico de conversa entre dois agentes"""
        return [
            msg for msg in self.message_history
            if (msg.sender == agent1 and msg.receiver == agent2) or
               (msg.sender == agent2 and msg.receiver == agent1)
        ]

class CopilotAgent:
    """
    Agente Copilot - Orquestrador principal
    Coordena o trabalho e toma decisões arquiteturais
    """
    
    def __init__(self, agent_id: str, message_bus: MessageBus):
        self.id = agent_id
        self.bus = message_bus
        self.state = AgentState.IDLE
        self.current_task: Optional[Dict] = None
        self.knowledge_base: Dict = {}
        
        # Registra no barramento
        self.bus.register_agent(self.id)
        
        # Registra handlers
        self.bus.register_handler(self.id, MessageType.HELP_REQUEST, self.handle_help_request)
        self.bus.register_handler(self.id, MessageType.CLARIFICATION, self.handle_clarification)
        self.bus.register_handler(self.id, MessageType.RESULT_RETURN, self.handle_result)
        self.bus.register_handler(self.id, MessageType.ERROR_REPORT, self.handle_error)
    
    async def delegate_task(self, task: Dict, to_agent: str):
        """Delega uma tarefa para outro agente"""
        print(f"\n🎯 Copilot delegando tarefa para {to_agent}")
        print(f"   📋 Tarefa: {task['description']}")
        
        message = Message(
            id=f"msg_{len(self.bus.message_history) + 1}",
            type=MessageType.TASK_DELEGATION,
            sender=self.id,
            receiver=to_agent,
            content={
                'task': task,
                'context': self._prepare_context(task),
                'guidelines': self._prepare_guidelines(task),
                'autonomy_level': self._determine_autonomy_level(task)
            }
        )
        
        await self.bus.send_message(message)
        self.state = AgentState.WAITING_RESPONSE
    
    def _prepare_context(self, task: Dict) -> Dict:
        """Prepara contexto relevante para a tarefa"""
        return {
            'project_structure': 'FastAPI application',
            'coding_standards': 'PEP8, type hints required',
            'test_framework': 'pytest',
            'current_sprint': 'Authentication module'
        }
    
    def _prepare_guidelines(self, task: Dict) -> List[str]:
        """Prepara diretrizes para execução da tarefa"""
        return [
            "Mantenha código limpo e legível",
            "Adicione type hints em todas funções",
            "Escreva docstrings completas",
            "Se encontrar ambiguidade, PERGUNTE antes de assumir",
            "Se precisar de decisão arquitetural, solicite aprovação"
        ]
    
    def _determine_autonomy_level(self, task: Dict) -> str:
        """Determina nível de autonomia para a tarefa"""
        complexity = task.get('complexity', 'simple')
        
        if complexity == 'simple':
            return 'full'  # Pode executar sem perguntar
        elif complexity == 'moderate':
            return 'supervised'  # Pode executar, mas deve reportar decisões
        else:
            return 'collaborative'  # Deve consultar antes de decisões importantes
    
    async def handle_help_request(self, message: Message):
        """Trata solicitação de ajuda do Qwen"""
        print(f"\n🆘 Copilot recebeu pedido de ajuda do Qwen")
        request = message.content
        
        print(f"   ❓ Pergunta: {request.get('question')}")
        print(f"   📍 Contexto: {request.get('context')}")
        
        # Copilot analisa e responde
        response_content = self._analyze_and_respond(request)
        
        response = Message(
            id=f"msg_{len(self.bus.message_history) + 1}",
            type=MessageType.CLARIFICATION,
            sender=self.id,
            receiver=message.sender,
            content=response_content,
            parent_message_id=message.id
        )
        
        await self.bus.send_message(response)
        print(f"   ✅ Copilot respondeu")
    
    def _analyze_and_respond(self, request: Dict) -> Dict:
        """Analisa pedido e fornece resposta"""
        question = request.get('question', '')
        
        if 'which approach' in question.lower():
            return {
                'decision': 'approach_b',
                'reasoning': 'Approach B é mais escalável e mantém separação de concerns',
                'additional_guidance': 'Use dependency injection para melhor testabilidade'
            }
        elif 'should i' in question.lower():
            return {
                'decision': 'yes',
                'reasoning': 'Isso está alinhado com nossos objetivos arquiteturais',
                'constraints': ['Mantenha backward compatibility', 'Adicione testes']
            }
        else:
            return {
                'answer': 'Prossiga com sua abordagem inicial',
                'confidence': 'high'
            }
    
    async def handle_clarification(self, message: Message):
        """Trata pedido de esclarecimento"""
        print(f"\n❓ Qwen precisa de esclarecimento")
        # Implementar lógica de esclarecimento
    
    async def handle_result(self, message: Message):
        """Recebe resultado de tarefa delegada"""
        result = message.content
        print(f"\n📥 Copilot recebeu resultado do Qwen")
        print(f"   ✅ Status: {result.get('status')}")
        
        # Valida resultado
        is_valid = self._validate_result(result)
        
        if is_valid:
            print("   ✅ Resultado aprovado!")
            self.state = AgentState.IDLE
        else:
            print("   ⚠️  Resultado precisa ajustes, enviando feedback...")
            await self._send_feedback(message.sender, result)
    
    def _validate_result(self, result: Dict) -> bool:
        """Valida resultado recebido"""
        # Validação simplificada
        return result.get('status') == 'completed'
    
    async def _send_feedback(self, to_agent: str, result: Dict):
        """Envia feedback sobre resultado"""
        feedback = Message(
            id=f"msg_{len(self.bus.message_history) + 1}",
            type=MessageType.CLARIFICATION,
            sender=self.id,
            receiver=to_agent,
            content={
                'feedback_type': 'improvement_needed',
                'issues': ['Missing type hints', 'Incomplete docstrings'],
                'suggestions': ['Add type hints to all functions', 'Complete docstrings']
            }
        )
        await self.bus.send_message(feedback)
    
    async def handle_error(self, message: Message):
        """Trata erro reportado pelo Qwen"""
        error = message.content
        print(f"\n🚨 Copilot recebeu erro do Qwen")
        print(f"   ❌ Erro: {error.get('error_message')}")
        
        # Decide se Copilot deve assumir ou dar orientação
        if error.get('severity') == 'critical':
            print("   🎯 Copilot assumindo a tarefa...")
            # Copilot assume
        else:
            print("   💡 Copilot enviando orientação...")
            # Envia dicas para Qwen tentar novamente

class QwenAgent:
    """
    Agente Qwen - Executor de tarefas
    Executa tarefas delegadas e pode pedir ajuda quando necessário
    """
    
    def __init__(self, agent_id: str, message_bus: MessageBus):
        self.id = agent_id
        self.bus = message_bus
        self.state = AgentState.IDLE
        self.current_task: Optional[Dict] = None
        self.autonomy_level: Optional[str] = None
        self.blocked_reason: Optional[str] = None
        
        # Registra no barramento
        self.bus.register_agent(self.id)
        
        # Registra handlers
        self.bus.register_handler(self.id, MessageType.TASK_DELEGATION, self.handle_task)
        self.bus.register_handler(self.id, MessageType.CLARIFICATION, self.handle_clarification)
    
    async def handle_task(self, message: Message):
        """Recebe e processa tarefa delegada"""
        task_data = message.content
        self.current_task = task_data['task']
        self.autonomy_level = task_data.get('autonomy_level', 'supervised')
        
        print(f"\n🤖 Qwen recebeu tarefa: {self.current_task['description']}")
        print(f"   🎚️  Nível de autonomia: {self.autonomy_level}")
        
        self.state = AgentState.WORKING
        
        # Executa tarefa
        await self._execute_task(message.sender)
    
    async def _execute_task(self, supervisor: str):
        """Executa a tarefa atual"""
        task_type = self._identify_task_type()
        
        print(f"   ⚙️  Qwen iniciando execução...")
        
        # Simula diferentes cenários
        if task_type == 'straightforward':
            await self._execute_straightforward_task(supervisor)
        elif task_type == 'needs_decision':
            await self._execute_with_decision(supervisor)
        elif task_type == 'blocked':
            await self._report_blockage(supervisor)
    
    def _identify_task_type(self) -> str:
        """Identifica tipo de tarefa e dificuldades"""
        desc = self.current_task['description'].lower()
        
        if 'choose' in desc or 'decide' in desc:
            return 'needs_decision'
        elif 'unclear' in desc or 'ambiguous' in desc:
            return 'blocked'
        else:
            return 'straightforward'
    
    async def _execute_straightforward_task(self, supervisor: str):
        """Executa tarefa direta sem necessidade de ajuda"""
        print(f"   ✅ Tarefa clara, executando autonomamente...")
        
        # Simula execução
        await asyncio.sleep(1)
        
        result = Message(
            id=f"msg_{len(self.bus.message_history) + 1}",
            type=MessageType.RESULT_RETURN,
            sender=self.id,
            receiver=supervisor,
            content={
                'status': 'completed',
                'task': self.current_task,
                'output': {
                    'files_created': ['test_auth.py', 'test_user.py'],
                    'tests_written': 15,
                    'coverage': '95%'
                },
                'execution_time': 45.2
            }
        )
        
        await self.bus.send_message(result)
        self.state = AgentState.IDLE
        print(f"   ✅ Qwen completou e enviou resultado")
    
    async def _execute_with_decision(self, supervisor: str):
        """Executa tarefa que requer decisão do supervisor"""
        print(f"   🤔 Qwen encontrou ponto de decisão...")
        
        # Identifica a decisão necessária
        decision_point = {
            'question': 'Which approach should I use: A) Decorator pattern or B) Strategy pattern?',
            'context': 'Implementing validation logic',
            'options': {
                'A': 'Decorator: More flexible, can stack validators',
                'B': 'Strategy: Better separation, easier to test'
            },
            'qwen_analysis': 'Both work, but I need architectural guidance'
        }
        
        # Solicita ajuda ao Copilot
        await self._request_help(supervisor, decision_point)
        
        self.state = AgentState.WAITING_RESPONSE
        print(f"   ⏳ Qwen aguardando decisão do Copilot...")
    
    async def _request_help(self, supervisor: str, issue: Dict):
        """Solicita ajuda ao supervisor"""
        help_request = Message(
            id=f"msg_{len(self.bus.message_history) + 1}",
            type=MessageType.HELP_REQUEST,
            sender=self.id,
            receiver=supervisor,
            content=issue
        )
        
        await self.bus.send_message(help_request)
    
    async def _report_blockage(self, supervisor: str):
        """Reporta bloqueio e solicita esclarecimento"""
        print(f"   🚧 Qwen encontrou ambiguidade, reportando...")
        
        blockage = {
            'error_type': 'ambiguous_requirement',
            'error_message': 'Task description is unclear',
            'details': 'Not sure which authentication method to implement',
            'severity': 'blocking',
            'need_clarification': True
        }
        
        error_msg = Message(
            id=f"msg_{len(self.bus.message_history) + 1}",
            type=MessageType.ERROR_REPORT,
            sender=self.id,
            receiver=supervisor,
            content=blockage
        )
        
        await self.bus.send_message(error_msg)
        self.state = AgentState.BLOCKED
    
    async def handle_clarification(self, message: Message):
        """Recebe clarificação/resposta do Copilot"""
        clarification = message.content
        
        print(f"\n💡 Qwen recebeu resposta do Copilot")
        
        if 'decision' in clarification:
            print(f"   ✅ Decisão recebida: {clarification['decision']}")
            print(f"   📝 Justificativa: {clarification.get('reasoning')}")
            
            # Continua execução com a decisão
            await self._continue_with_decision(clarification, message.sender)
        
        elif 'feedback_type' in clarification:
            print(f"   📋 Feedback recebido, ajustando...")
            await self._apply_feedback(clarification, message.sender)
    
    async def _continue_with_decision(self, decision: Dict, supervisor: str):
        """Continua execução com decisão recebida"""
        print(f"   ⚙️  Qwen aplicando decisão e finalizando...")
        
        await asyncio.sleep(1)
        
        result = Message(
            id=f"msg_{len(self.bus.message_history) + 1}",
            type=MessageType.RESULT_RETURN,
            sender=self.id,
            receiver=supervisor,
            content={
                'status': 'completed',
                'task': self.current_task,
                'output': {
                    'approach_used': decision['decision'],
                    'implementation': 'Complete with guidance applied',
                    'files_modified': ['validators.py']
                },
                'decisions_made': [decision]
            }
        )
        
        await self.bus.send_message(result)
        self.state = AgentState.IDLE
        print(f"   ✅ Qwen completou com sucesso!")
    
    async def _apply_feedback(self, feedback: Dict, supervisor: str):
        """Aplica feedback e reexecuta"""
        print(f"   🔧 Aplicando correções...")
        
        await asyncio.sleep(1)
        
        result = Message(
            id=f"msg_{len(self.bus.message_history) + 1}",
            type=MessageType.RESULT_RETURN,
            sender=self.id,
            receiver=supervisor,
            content={
                'status': 'completed',
                'task': self.current_task,
                'output': {
                    'corrections_applied': feedback.get('issues', []),
                    'improvements': feedback.get('suggestions', [])
                }
            }
        )
        
        await self.bus.send_message(result)
        self.state = AgentState.IDLE

class AgentCoordinator:
    """
    Coordenador de agentes
    Gerencia a comunicação e colaboração entre Copilot e Qwen
    """
    
    def __init__(self):
        self.bus = MessageBus()
        self.copilot = CopilotAgent("copilot_1", self.bus)
        self.qwen = QwenAgent("qwen_1", self.bus)
        self.active = True
    
    async def start_message_processing(self):
        """Inicia processamento de mensagens para todos agentes"""
        await asyncio.gather(
            self._process_agent_messages(self.copilot),
            self._process_agent_messages(self.qwen)
        )
    
    async def _process_agent_messages(self, agent):
        """Processa mensagens para um agente específico"""
        while self.active:
            try:
                message = await asyncio.wait_for(
                    self.bus.receive_message(agent.id),
                    timeout=0.1
                )
                
                # Despacha para handler apropriado
                handler = self.bus.handlers[agent.id].get(message.type)
                if handler:
                    await handler(message)
                    
            except asyncio.TimeoutError:
                continue
            except Exception as e:
                print(f"Erro processando mensagem: {e}")
    
    async def run_workflow(self, tasks: List[Dict]):
        """Executa workflow completo de tarefas"""
        print("╔════════════════════════════════════════════╗")
        print("║  SISTEMA COLABORATIVO COPILOT + QWEN      ║")
        print("╚════════════════════════════════════════════╝\n")
        
        # Inicia processamento de mensagens em background
        processor = asyncio.create_task(self.start_message_processing())
        
        # Processa cada tarefa
        for task in tasks:
            print(f"\n{'='*50}")
            print(f"📋 Nova Tarefa no Pipeline")
            print(f"{'='*50}")
            
            # Copilot decide e delega
            await self.copilot.delegate_task(task, self.qwen.id)
            
            # Aguarda conclusão
            while self.qwen.state != AgentState.IDLE:
                await asyncio.sleep(0.5)
            
            await asyncio.sleep(1)  # Pausa entre tarefas
        
        # Finaliza
        self.active = False
        processor.cancel()
        
        self._generate_collaboration_report()
    
    def _generate_collaboration_report(self):
        """Gera relatório de colaboração"""
        messages = self.bus.message_history
        
        total_msgs = len(messages)
        help_requests = sum(1 for m in messages if m.type == MessageType.HELP_REQUEST)
        delegations = sum(1 for m in messages if m.type == MessageType.TASK_DELEGATION)
        
        copilot_to_qwen = self.bus.get_conversation("copilot_1", "qwen_1")
        
        report = f"""
╔════════════════════════════════════════════╗
║     RELATÓRIO DE COLABORAÇÃO               ║
╚════════════════════════════════════════════╝

📊 Estatísticas de Comunicação:
   Total de mensagens trocadas: {total_msgs}
   🎯 Delegações do Copilot: {delegations}
   🆘 Pedidos de ajuda do Qwen: {help_requests}
   💬 Trocas Copilot ↔ Qwen: {len(copilot_to_qwen)}

🤝 Colaboração:
   ✅ Qwen trabalhou com autonomia supervisionada
   ✅ Copilot forneceu orientação quando necessário
   ✅ Comunicação bidirecional efetiva

💡 Insights:
   • Qwen soube quando pedir ajuda
   • Copilot manteve controle arquitetural
   • Decisões críticas foram colaborativas
   • Tarefas simples foram 100% autônomas
"""
        
        print(report)
        
        # Salva histórico
        with open('collaboration_history.json', 'w') as f:
            history = [
                {
                    'id': m.id,
                    'type': m.type.value,
                    'sender': m.sender,
                    'receiver': m.receiver,
                    'timestamp': m.timestamp.isoformat(),
                    'content': m.content
                }
                for m in messages
            ]
            json.dump(history, f, indent=2)
        
        print("\n💾 Histórico salvo em 'collaboration_history.json'")

# Demonstração completa
async def main():
    """Demonstração do sistema colaborativo"""
    
    coordinator = AgentCoordinator()
    
    # Define tarefas variadas que demonstram diferentes níveis de colaboração
    tasks = [
        {
            'id': 'task_001',
            'description': 'Create unit tests for the authentication module',
            'complexity': 'simple',
            'priority': 2
        },
        {
            'id': 'task_002',
            'description': 'Implement validation logic - choose best design pattern',
            'complexity': 'moderate',
            'priority': 3
        },
        {
            'id': 'task_003',
            'description': 'Add comprehensive docstrings to all functions',
            'complexity': 'simple',
            'priority': 1
        }
    ]
    
    await coordinator.run_workflow(tasks)

if __name__ == "__main__":
    asyncio.run(main())