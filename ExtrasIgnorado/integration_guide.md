# 🚀 Guia de Integração: Copilot CLI como Orquestrador + Qwen CLI

## 📋 Visão Geral

Este guia mostra como integrar o Copilot CLI com Qwen CLI para criar um sistema autônomo onde:
- **Copilot** = Orquestrador e tomador de decisões arquiteturais
- **Qwen** = Executor de tarefas específicas
- **Comunicação bidirecional** = Ambos podem solicitar ajuda quando necessário

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────┐
│           COPILOT CLI (Orquestrador)         │
│  • Analisa contexto do projeto              │
│  • Toma decisões arquiteturais              │
│  • Delega tarefas apropriadas               │
│  • Valida resultados                        │
└──────────────┬──────────────────────────────┘
               │
               │ Message Bus (IPC/Socket/API)
               │
┌──────────────┴──────────────────────────────┐
│           QWEN CLI (Executor)                │
│  • Executa tarefas delegadas                │
│  • Solicita ajuda quando bloqueado          │
│  • Reporta progresso                        │
│  • Retorna resultados                       │
└─────────────────────────────────────────────┘
```

---

## 🔧 Instalação e Configuração

### 1. Pré-requisitos

```bash
# Python 3.8+
python --version

# Instalar dependências
pip install asyncio aiohttp pyyaml
```

### 2. Estrutura de Diretórios

```
my_project/
├── .copilot/
│   ├── config.yaml          # Configurações do orquestrador
│   ├── rules.json           # Regras de delegação
│   └── agents/
│       ├── copilot_agent.py
│       └── qwen_agent.py
├── scripts/
│   ├── orchestrator.py      # Script principal
│   └── message_bus.py       # Sistema de mensagens
└── src/                     # Seu projeto
```

### 3. Arquivo de Configuração

```yaml
# .copilot/config.yaml

orchestrator:
  name: "Copilot Orchestrator"
  mode: "autonomous"  # ou "supervised"
  
agents:
  copilot:
    cli_path: "copilot"
    role: "orchestrator"
    capabilities:
      - architecture_decisions
      - code_review
      - complex_algorithms
      
  qwen:
    cli_path: "qwen"
    role: "executor"
    capabilities:
      - unit_testing
      - documentation
      - code_formatting
      - simple_refactoring

delegation_rules:
  # Sempre delegar para Qwen
  always_delegate:
    - unit_tests
    - docstrings
    - code_formatting
    - translation
    
  # Nunca delegar (Copilot executa)
  never_delegate:
    - architecture_design
    - security_reviews
    - complex_algorithms
    
  # Delegar com supervisão
  supervised_delegation:
    - refactoring
    - api_integration
    - database_schema

communication:
  protocol: "socket"  # ou "api", "ipc"
  port: 9999
  timeout: 60
  
monitoring:
  enabled: true
  log_level: "INFO"
  metrics_file: ".copilot/metrics.json"
```

---

## 🎯 Implementação Prática

### Opção 1: Integração via Wrapper do Copilot CLI

Crie um wrapper que intercepta comandos do Copilot:

```python
# copilot_wrapper.py

import sys
import subprocess
from autonomous_orchestrator import AutonomousAgent

def main():
    # Captura comando original do Copilot
    original_command = sys.argv[1:]
    
    # Inicializa agente autônomo
    agent = AutonomousAgent(project_path=".")
    
    # Analisa se deve delegar
    if should_intercept(original_command):
        # Processa através do orquestrador
        agent.receive_task(" ".join(original_command))
    else:
        # Executa Copilot normalmente
        subprocess.run(["copilot"] + original_command)

if __name__ == "__main__":
    main()
```

### Opção 2: Plugin/Hook do Copilot

Se o Copilot suporta plugins:

```python
# copilot_plugin.py

class QwenDelegationPlugin:
    def on_task_received(self, task):
        """Hook chamado quando Copilot recebe uma tarefa"""
        if self.should_delegate(task):
            return self.delegate_to_qwen(task)
        return None  # Copilot processa normalmente
    
    def should_delegate(self, task):
        # Lógica de decisão
        pass
    
    def delegate_to_qwen(self, task):
        # Executa Qwen CLI
        pass
```

### Opção 3: Servidor Proxy (Mais Robusto)

```python
# proxy_server.py

from fastapi import FastAPI
import subprocess

app = FastAPI()

@app.post("/copilot/task")
async def handle_copilot_task(task: dict):
    """Intercepta tarefas do Copilot"""
    
    decision = DecisionEngine.should_delegate(task)
    
    if decision['delegate']:
        # Delega para Qwen
        result = await execute_qwen(task)
    else:
        # Deixa Copilot executar
        result = await execute_copilot(task)
    
    return result

async def execute_qwen(task):
    """Executa Qwen CLI"""
    cmd = ["qwen", "--task", json.dumps(task)]
    result = subprocess.run(cmd, capture_output=True)
    return parse_result(result)

# Iniciar: uvicorn proxy_server:app --port 8000
```

---

## 💬 Protocolos de Comunicação

### 1. Via Socket (Local)

```python
# socket_communication.py

import socket
import json

class SocketBus:
    def __init__(self, port=9999):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.bind(('localhost', port))
        self.socket.listen(5)
    
    def send_task_to_qwen(self, task):
        """Envia tarefa para Qwen via socket"""
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect(('localhost', 9999))
            s.sendall(json.dumps(task).encode())
            response = s.recv(4096)
            return json.loads(response.decode())
```

### 2. Via Named Pipes (IPC)

```python
# ipc_communication.py

import os
import json

PIPE_PATH = "/tmp/copilot_qwen_pipe"

def send_to_qwen(task):
    """Envia tarefa via named pipe"""
    with open(PIPE_PATH, 'w') as pipe:
        pipe.write(json.dumps(task))
    
    # Aguarda resposta
    with open(PIPE_PATH + "_response", 'r') as pipe:
        return json.loads(pipe.read())
```

### 3. Via API REST (Melhor para produção)

```python
# api_communication.py

import aiohttp

async def delegate_to_qwen(task):
    """Delega via API REST"""
    async with aiohttp.ClientSession() as session:
        async with session.post(
            "http://localhost:8000/qwen/execute",
            json=task
        ) as response:
            return await response.json()
```

---

## 🔄 Fluxo de Trabalho Real

### Exemplo: Desenvolvendo um Feature

```
1. USUÁRIO: "Implement user authentication"
   
2. COPILOT analisa:
   ├─ Decisão arquitetural → COPILOT executa
   ├─ Implementação básica → COPILOT executa
   └─ Delega para QWEN:
       ├─ "Create unit tests"
       ├─ "Add docstrings"
       └─ "Format code"

3. QWEN executando "Create unit tests":
   ├─ Analisa código do Copilot
   ├─ Gera testes
   └─ ENCONTRA AMBIGUIDADE
       └─ Pergunta ao COPILOT: "Should I test OAuth or JWT?"

4. COPILOT responde:
   ├─ "Test OAuth flow first"
   └─ Fornece guidelines

5. QWEN continua:
   ├─ Cria testes OAuth
   ├─ Retorna resultado
   └─ Status: COMPLETE

6. COPILOT valida:
   ├─ Revisa testes
   ├─ Aprova ou solicita ajustes
   └─ Integra ao projeto

7. RESULTADO: Feature completo com testes e documentação
```

---

## 🛠️ Scripts de Exemplo

### Script de Inicialização

```bash
#!/bin/bash
# start_autonomous_mode.sh

echo "🚀 Iniciando Modo Autônomo Copilot + Qwen"

# Inicia servidor de comunicação
python scripts/message_bus.py &
BUS_PID=$!

# Inicia agente Qwen (escuta tarefas)
python scripts/qwen_agent.py &
QWEN_PID=$!

# Inicia Copilot em modo orquestrador
python scripts/copilot_orchestrator.py

# Cleanup
kill $BUS_PID $QWEN_PID
```

### Comando Rápido

```bash
# Alias para facilitar
alias copilot-auto='python -m copilot_qwen_orchestrator'

# Uso
copilot-auto "Implement login feature with tests"
```

---

## 📊 Monitoramento e Debugging

### Logs Estruturados

```python
# logging_config.py

import logging
import json

class StructuredLogger:
    def log_delegation(self, task, to_agent):
        logging.info(json.dumps({
            'event': 'task_delegated',
            'task_id': task['id'],
            'from': 'copilot',
            'to': to_agent,
            'timestamp': datetime.now().isoformat()
        }))
    
    def log_help_request(self, from_agent, question):
        logging.warning(json.dumps({
            'event': 'help_requested',
            'from': from_agent,
            'question': question,
            'urgency': 'high'
        }))
```

### Dashboard de Monitoramento

```python
# monitor_dashboard.py

import streamlit as st
import json

def show_dashboard():
    st.title("🤖 Copilot + Qwen Monitor")
    
    # Carrega métricas
    with open('.copilot/metrics.json') as f:
        metrics = json.load(f)
    
    col1, col2, col3 = st.columns(3)
    col1.metric("Tarefas Delegadas", metrics['delegated'])
    col2.metric("Taxa de Sucesso", f"{metrics['success_rate']}%")
    col3.metric("Pedidos de Ajuda", metrics['help_requests'])
    
    # Timeline de eventos
    st.subheader("📈 Timeline de Colaboração")
    # ... visualização

# Executar: streamlit run monitor_dashboard.py
```

---

## 🎛️ Configurações Avançadas

### Níveis de Autonomia

```python
class AutonomyLevel:
    FULL = "full"           # Qwen decide tudo
    SUPERVISED = "supervised"  # Reporta decisões
    COLLABORATIVE = "collaborative"  # Pergunta antes

# Ajustar por tipo de tarefa
autonomy_map = {
    'unit_tests': AutonomyLevel.FULL,
    'refactoring': AutonomyLevel.SUPERVISED,
    'architecture': AutonomyLevel.COLLABORATIVE
}
```

### Estratégias de Retry

```yaml
retry_strategies:
  unit_tests:
    max_attempts: 3
    backoff: exponential
    on_failure: ask_copilot
    
  documentation:
    max_attempts: 2
    on_failure: copilot_takes_over
```

---

## 🚨 Troubleshooting

### Problema: Qwen não responde

```bash
# Verificar se Qwen está rodando
ps aux | grep qwen

# Testar conexão
python -c "from message_bus import ping_agent; ping_agent('qwen')"

# Verificar logs
tail -f .copilot/qwen_agent.log
```

### Problema: Delegação não acontece

```python
# Debug mode
export COPILOT_DEBUG=1

# Ver regras de decisão
python scripts/debug_decisions.py <task_description>
```

---

## 📚 Próximos Passos

1. **Teste em projeto pequeno** primeiro
2. **Ajuste regras de delegação** baseado em resultados
3. **Monitore métricas** de eficiência
4. **Expanda capacidades** gradualmente

---

## 🎯 Benefícios Esperados

✅ **Produtividade**: 40-60% mais rápido em tarefas repetitivas  
✅ **Qualidade**: Copilot foca em arquitetura, Qwen em detalhes  
✅ **Escalabilidade**: Fácil adicionar mais agentes executores  
✅ **Aprendizado**: Sistema melhora com uso  

---

## 💡 Dicas Finais

- Comece com **autonomia supervisionada**
- **Documente** suas regras de delegação
- **Revise** decisões do sistema regularmente
- **Ajuste** configurações baseado no seu workflow

---

**Pronto para começar? Execute:**

```bash
python orchestrator.py --init
python orchestrator.py --project ./meu_projeto --mode autonomous
```