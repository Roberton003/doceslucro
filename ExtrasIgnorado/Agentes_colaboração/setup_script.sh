#!/bin/bash
# setup_copilot_qwen.sh
# Script de instalação e configuração automática

set -e  # Para em caso de erro

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║     🚀 SETUP: COPILOT + QWEN ORCHESTRATOR                 ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# ============================================================================
# VERIFICAÇÕES INICIAIS
# ============================================================================

echo "📋 Verificando pré-requisitos..."

# Verifica Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 não encontrado! Por favor instale Python 3.8+"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo "✅ Python $PYTHON_VERSION detectado"

# Verifica pip
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 não encontrado! Por favor instale pip"
    exit 1
fi
echo "✅ pip3 disponível"

# ============================================================================
# ESTRUTURA DE DIRETÓRIOS
# ============================================================================

echo ""
echo "📁 Criando estrutura de diretórios..."

PROJECT_ROOT=$(pwd)
mkdir -p .copilot_qwen/{agents,config,logs,scripts,temp}

echo "✅ Estrutura criada em: $PROJECT_ROOT/.copilot_qwen/"

# ============================================================================
# INSTALAÇÃO DE DEPENDÊNCIAS
# ============================================================================

echo ""
echo "📦 Instalando dependências Python..."

cat > .copilot_qwen/requirements.txt << 'EOF'
# Core dependencies
asyncio
aiohttp>=3.8.0
pyyaml>=6.0

# Optional: Enhanced features
# uvicorn>=0.20.0  # Para servidor API
# streamlit>=1.20.0  # Para dashboard
# rich>=13.0.0  # Para output bonito no terminal
EOF

pip3 install -q -r .copilot_qwen/requirements.txt

echo "✅ Dependências instaladas"

# ============================================================================
# CONFIGURAÇÃO INICIAL
# ============================================================================

echo ""
echo "⚙️  Criando arquivo de configuração..."

cat > .copilot_qwen/config/config.yaml << 'EOF'
# Configuração do Orquestrador Copilot + Qwen

orchestrator:
  name: "Copilot Orchestrator"
  version: "1.0.0"
  mode: "demo"  # Altere para "production" quando estiver pronto
  
agents:
  copilot:
    cli_path: "copilot"  # Ajuste o caminho se necessário
    role: "orchestrator"
    
  qwen:
    cli_path: "qwen"  # Ajuste o caminho se necessário
    role: "executor"

# Regras de delegação - PERSONALIZE!
delegation_rules:
  always_delegate_to_qwen:
    - "criar testes"
    - "adicionar docstring"
    - "formatar código"
    - "documentar"
    - "traduzir"
    
  copilot_only:
    - "design arquitetura"
    - "decisão de segurança"
    - "algoritmo complexo"
    
  supervised_delegation:
    - "refatorar"
    - "otimizar"
    - "integrar api"

autonomy_levels:
  simple: "full"
  moderate: "supervised"
  complex: "collaborative"

logging:
  level: "INFO"
  file: ".copilot_qwen/logs/orchestrator.log"
EOF

echo "✅ Configuração criada em: .copilot_qwen/config/config.yaml"

# ============================================================================
# SCRIPTS AUXILIARES
# ============================================================================

echo ""
echo "📝 Criando scripts auxiliares..."

# Script de start rápido
cat > .copilot_qwen/scripts/start.sh << 'EOF'
#!/bin/bash
# Start rápido do orquestrador

cd "$(dirname "$0")/../.."
python3 .copilot_qwen/orchestrator_main.py "$@"
EOF

chmod +x .copilot_qwen/scripts/start.sh

# Script de teste
cat > .copilot_qwen/scripts/test.sh << 'EOF'
#!/bin/bash
# Testa a configuração

echo "🧪 Testando configuração..."

# Testa se Python funciona
python3 -c "import asyncio, aiohttp, yaml; print('✅ Imports OK')"

# Testa se arquivos de config existem
if [ -f ".copilot_qwen/config/config.yaml" ]; then
    echo "✅ Config file OK"
else
    echo "❌ Config file não encontrado"
    exit 1
fi

echo "✅ Tudo pronto!"
EOF

chmod +x .copilot_qwen/scripts/test.sh

echo "✅ Scripts criados"

# ============================================================================
# DETECÇÃO DE CLIs
# ============================================================================

echo ""
echo "🔍 Detectando CLIs instalados..."

COPILOT_FOUND=false
QWEN_FOUND=false

if command -v copilot &> /dev/null; then
    COPILOT_PATH=$(which copilot)
    echo "✅ Copilot CLI encontrado em: $COPILOT_PATH"
    COPILOT_FOUND=true
else
    echo "⚠️  Copilot CLI não encontrado no PATH"
fi

if command -v qwen &> /dev/null; then
    QWEN_PATH=$(which qwen)
    echo "✅ Qwen CLI encontrado em: $QWEN_PATH"
    QWEN_FOUND=true
else
    echo "⚠️  Qwen CLI não encontrado no PATH"
fi

# ============================================================================
# CONFIGURAÇÃO INTERATIVA
# ============================================================================

echo ""
echo "🎯 Configuração interativa..."
echo ""

if [ "$COPILOT_FOUND" = false ]; then
    echo "Digite o caminho completo do Copilot CLI (ou ENTER para usar 'copilot'):"
    read -r copilot_path
    if [ -n "$copilot_path" ]; then
        sed -i "s|cli_path: \"copilot\"|cli_path: \"$copilot_path\"|" .copilot_qwen/config/config.yaml
    fi
fi

if [ "$QWEN_FOUND" = false ]; then
    echo "Digite o caminho completo do Qwen CLI (ou ENTER para usar 'qwen'):"
    read -r qwen_path
    if [ -n "$qwen_path" ]; then
        sed -i "s|cli_path: \"qwen\"|cli_path: \"$qwen_path\"|g" .copilot_qwen/config/config.yaml
    fi
fi

# ============================================================================
# CRIAÇÃO DE ALIASES
# ============================================================================

echo ""
echo "🔗 Criando aliases úteis..."

# Detecta shell
SHELL_TYPE=$(basename "$SHELL")
RC_FILE=""

case "$SHELL_TYPE" in
    bash)
        RC_FILE="$HOME/.bashrc"
        ;;
    zsh)
        RC_FILE="$HOME/.zshrc"
        ;;
    *)
        echo "⚠️  Shell não reconhecido, aliases não serão adicionados automaticamente"
        ;;
esac

if [ -n "$RC_FILE" ]; then
    echo "" >> "$RC_FILE"
    echo "# Copilot + Qwen Orchestrator aliases" >> "$RC_FILE"
    echo "alias copilot-qwen='python3 $PROJECT_ROOT/.copilot_qwen/orchestrator_main.py'" >> "$RC_FILE"
    echo "alias cq='python3 $PROJECT_ROOT/.copilot_qwen/orchestrator_main.py'" >> "$RC_FILE"
    echo "alias cq-demo='python3 $PROJECT_ROOT/ready_to_use_example.py'" >> "$RC_FILE"
    echo "alias cq-config='nano $PROJECT_ROOT/.copilot_qwen/config/config.yaml'" >> "$RC_FILE"
    echo "alias cq-logs='tail -f $PROJECT_ROOT/.copilot_qwen/logs/orchestrator.log'" >> "$RC_FILE"
    
    echo "✅ Aliases adicionados ao $RC_FILE"
    echo "   Execute: source $RC_FILE"
fi

# ============================================================================
# CRIAÇÃO DO ARQUIVO PRINCIPAL
# ============================================================================

echo ""
echo "📄 Criando arquivo principal do orquestrador..."

cat > .copilot_qwen/orchestrator_main.py << 'EOFPYTHON'
#!/usr/bin/env python3
"""
Orquestrador Principal - Copilot + Qwen
Arquivo de entrada para uso em produção
"""

import sys
import os
import yaml
from pathlib import Path

# Adiciona o diretório parent ao path
sys.path.insert(0, str(Path(__file__).parent.parent))

# Importa do ready_to_use_example
from ready_to_use_example import (
    SimpleCopilotOrchestrator,
    Config,
    asyncio
)

def load_config():
    """Carrega configuração do arquivo YAML"""
    config_path = Path(__file__).parent / "config" / "config.yaml"
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)

async def process_single_task(task: str):
    """Processa uma única tarefa"""
    orchestrator = SimpleCopilotOrchestrator()
    await orchestrator.process_task(task)
    orchestrator.generate_session_report()

async def interactive_mode():
    """Modo interativo"""
    print("""
╔════════════════════════════════════════════════════════════╗
║          COPILOT + QWEN - MODO INTERATIVO                  ║
╚════════════════════════════════════════════════════════════╝
    
Digite suas tarefas (uma por linha)
Digite 'done' quando terminar
Digite 'help' para ver comandos
""")
    
    orchestrator = SimpleCopilotOrchestrator()
    
    while True:
        try:
            task = input("\n📋 Tarefa: ").strip()
            
            if not task:
                continue
            
            if task.lower() in ['done', 'exit', 'quit', 'sair']:
                break
            
            if task.lower() == 'help':
                print("""
Comandos disponíveis:
  - Digite qualquer tarefa para processar
  - 'done' ou 'exit' para finalizar
  - 'status' para ver estatísticas
  - 'help' para esta mensagem
                """)
                continue
            
            if task.lower() == 'status':
                total = len(orchestrator.session.tasks_completed)
                delegated = len(orchestrator.session.tasks_delegated)
                print(f"\n📊 Status: {total} tarefas, {delegated} delegadas")
                continue
            
            await orchestrator.process_task(task)
            
        except KeyboardInterrupt:
            print("\n\n⚠️  Interrompido...")
            break
    
    orchestrator.generate_session_report()

def main():
    """Ponto de entrada principal"""
    
    # Carrega configuração
    config = load_config()
    
    # Atualiza Config com valores do arquivo
    Config.MODE = config['orchestrator'].get('mode', 'demo')
    Config.COPILOT_CLI = config['agents']['copilot']['cli_path']
    Config.QWEN_CLI = config['agents']['qwen']['cli_path']
    
    # Parse argumentos
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == '--help' or command == '-h':
            print("""
Uso: copilot-qwen [OPÇÕES] [TAREFA]

Opções:
  -i, --interactive    Modo interativo
  -h, --help          Mostra esta ajuda
  --config            Mostra configuração atual
  --version           Mostra versão
  
Exemplos:
  copilot-qwen "Criar testes para auth.py"
  copilot-qwen --interactive
  copilot-qwen --config
            """)
            return
        
        elif command == '--version':
            print(f"Copilot + Qwen Orchestrator v{config['orchestrator']['version']}")
            return
        
        elif command == '--config':
            print("📋 Configuração atual:")
            print(yaml.dump(config, default_flow_style=False))
            return
        
        elif command in ['-i', '--interactive']:
            asyncio.run(interactive_mode())
            return
        
        else:
            # Trata como tarefa
            task = ' '.join(sys.argv[1:])
            asyncio.run(process_single_task(task))
            return
    
    # Sem argumentos, inicia modo interativo
    asyncio.run(interactive_mode())

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n❌ Erro: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
EOFPYTHON

chmod +x .copilot_qwen/orchestrator_main.py

echo "✅ Arquivo principal criado"

# ============================================================================
# TESTES
# ============================================================================

echo ""
echo "🧪 Executando testes básicos..."

if python3 .copilot_qwen/scripts/test.sh; then
    echo "✅ Testes passaram!"
else
    echo "⚠️  Alguns testes falharam, mas você pode continuar"
fi

# ============================================================================
# README
# ============================================================================

echo ""
echo "📖 Criando README..."

cat > .copilot_qwen/README.md << 'EOFREADME'
# Copilot + Qwen Orchestrator

Sistema de orquestração inteligente onde Copilot CLI coordena e delega tarefas para Qwen CLI.

## 🚀 Início Rápido

### Modo Demo (Simulado)
```bash
# Executa demonstração
python3 ready_to_use_example.py

# Ou use o alias
cq-demo
```

### Modo Interativo
```bash
# Inicia modo interativo
copilot-qwen

# Ou
cq

# Digite suas tarefas uma por vez
```

### Tarefa Única
```bash
# Executa uma tarefa específica
copilot-qwen "Criar testes unitários para auth.py"
```

## ⚙️ Configuração

Edite o arquivo de configuração:
```bash
cq-config
# ou
nano .copilot_qwen/config/config.yaml
```

### Mudando para Modo Produção

1. Verifique os caminhos dos CLIs no config.yaml
2. Mude `mode: "demo"` para `mode: "production"`
3. Teste com tarefas simples primeiro

## 📋 Comandos Úteis

```bash
# Ver configuração
copilot-qwen --config

# Modo interativo
copilot-qwen --interactive

# Ajuda
copilot-qwen --help

# Ver logs em tempo real
cq-logs
```

## 🎯 Personalização

### Regras de Delegação

Edite `delegation_rules` em config.yaml:

```yaml
delegation_rules:
  always_delegate_to_qwen:
    - "criar testes"
    - "adicionar docstring"
    # Adicione suas regras aqui
```

### Níveis de Autonomia

```yaml
autonomy_levels:
  simple: "full"          # Qwen executa sozinho
  moderate: "supervised"  # Qwen reporta decisões
  complex: "collaborative" # Qwen pergunta antes
```

## 📊 Monitoramento

Relatórios são salvos automaticamente em:
- Logs: `.copilot_qwen/logs/`
- Relatórios de sessão: `session_report_*.txt`
- Histórico: `collaboration_history.json`

## 🔧 Troubleshooting

### CLIs não encontrados
```bash
# Verifique os caminhos
which copilot
which qwen

# Atualize config.yaml com caminhos completos
```

### Modo demo não funciona
```bash
# Reinstale dependências
pip3 install -r .copilot_qwen/requirements.txt
```

### Logs
```bash
# Ver logs
cat .copilot_qwen/logs/orchestrator.log

# Ou em tempo real
tail -f .copilot_qwen/logs/orchestrator.log
```

## 📚 Exemplos

### Exemplo 1: Feature Completo
```bash
copilot-qwen "Implementar autenticação JWT completa"
# Copilot: Design arquitetura + implementação core
# Qwen: Testes + documentação + formatação
```

### Exemplo 2: Refatoração
```bash
copilot-qwen "Refatorar módulo de validação"
# Copilot: Decisões arquiteturais
# Qwen: Execução com supervisão
```

## 🎓 Como Funciona

1. **Você** envia uma tarefa
2. **Copilot** analisa e decide:
   - Executar diretamente (tarefas complexas)
   - Delegar para Qwen (tarefas simples)
3. **Qwen** executa com autonomia apropriada:
   - Pergunta quando tem dúvidas
   - Reporta decisões importantes
4. **Copilot** valida e integra resultados

## 💡 Dicas

- Comece com tarefas simples
- Revise relatórios de sessão
- Ajuste regras baseado no seu workflow
- Use modo supervised para aprender o sistema

## 🔗 Links Úteis

- Configuração: `.copilot_qwen/config/config.yaml`
- Logs: `.copilot_qwen/logs/`
- Scripts: `.copilot_qwen/scripts/`

EOFREADME

echo "✅ README criado em: .copilot_qwen/README.md"

# ============================================================================
# FINALIZAÇÃO
# ============================================================================

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║              ✅ SETUP CONCLUÍDO COM SUCESSO!              ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📁 Arquivos criados em: .copilot_qwen/"
echo ""
echo "🚀 Próximos Passos:"
echo ""
echo "1. Teste o sistema em modo demo:"
echo "   $ python3 ready_to_use_example.py"
echo ""
echo "2. Configure seus CLIs (se necessário):"
echo "   $ nano .copilot_qwen/config/config.yaml"
echo ""
echo "3. Recarregue aliases:"
if [ -n "$RC_FILE" ]; then
    echo "   $ source $RC_FILE"
fi
echo ""
echo "4. Use o sistema:"
echo "   $ copilot-qwen --interactive"
echo "   $ copilot-qwen 'Criar testes para meu código'"
echo ""
echo "📖 Leia o README para mais informações:"
echo "   $ cat .copilot_qwen/README.md"
echo ""
echo "💡 Dica: Comece testando em modo demo antes de usar em produção!"
echo ""
echo "✨ Divirta-se automatizando com Copilot + Qwen!"
echo ""