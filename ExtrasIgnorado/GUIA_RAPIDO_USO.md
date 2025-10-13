# 🚀 GUIA RÁPIDO DE USO - Copilot + Qwen

## 📋 Modelo de Trabalho

```
COPILOT (VOCÊ - Orquestrador):
  └─> Analisa
  └─> Define arquitetura  
  └─> Delega 100% para Qwen
  └─> Revisa qualidade
  └─> Aprova/Rejeita

QWEN (Executor Total):
  └─> Recebe delegação
  └─> Implementa TUDO
  └─> Cria testes
  └─> Documenta
  └─> Submete para revisão
```

---

## 🎯 COMANDOS PARA COPILOT (Você)

### 1. Analisar Fase
```bash
# Ler detalhes da fase
cat FASE_00_PREPARACAO.md
cat FASE_01_SETUP_BACKEND.md
cat FASE_02_AUTENTICACAO.md

# Ver requisitos completos
cat project_requirements_md.md

# Ver checklist
cat CHECKLIST_MASTER.md
```

### 2. Preparar Delegação
```markdown
Como Copilot, você deve:

1. Ler a fase completa
2. Entender todos os requisitos
3. Definir arquitetura (se necessário)
4. Criar especificação detalhada
5. Preparar critérios de aceitação
```

### 3. Delegar para Qwen
```markdown
Use este template para delegar:

---
DELEGAÇÃO PARA QWEN

Task ID: [ex: 0.1]
Título: [ex: Criar estrutura de diretórios]

CONTEXTO:
[Explique o que precisa ser feito e por quê]

REQUISITOS:
- [ ] Requisito 1
- [ ] Requisito 2
- [ ] Requisito 3

ESPECIFICAÇÃO TÉCNICA:
[Detalhes técnicos, código exemplo, padrões a seguir]

OUTPUT ESPERADO:
- Arquivo(s): [listar]
- Testes: [sim/não e cobertura]
- Docs: [sim/não]

CRITÉRIOS DE ACEITAÇÃO:
✅ Critério 1
✅ Critério 2
✅ Critério 3

PERGUNTAS?
Se tiver dúvidas, PERGUNTE antes de implementar!

---
```

### 4. Revisar Entrega do Qwen
```markdown
Checklist de Revisão Copilot:

CÓDIGO:
□ Sem erros de sintaxe
□ Segue padrões (PEP8/ESLint)
□ Bem formatado (black/prettier)
□ Type hints/TypeScript
□ Sem code smells
□ Lógica correta

TESTES:
□ Cobertura >80%
□ Todos passando
□ Casos edge cobertos
□ Mocks apropriados
□ Testes legíveis

DOCUMENTAÇÃO:
□ Docstrings completas
□ README atualizado
□ Comentários em código complexo
□ Swagger/API docs atualizado

FUNCIONALIDADE:
□ Atende todos requisitos
□ Sem bugs conhecidos
□ Performance OK
□ Segurança validada

DECISÃO:
[ ] ✅ APROVADO - Próxima tarefa
[ ] 🔄 CORRIGIR - Dar feedback específico
```

### 5. Dar Feedback (se precisa correção)
```markdown
Template de Feedback:

---
FEEDBACK DE REVISÃO - Task [ID]

Qwen, revisei sua entrega. Encontrei os seguintes pontos:

❌ PROBLEMAS ENCONTRADOS:
1. [Descrever problema específico]
   → Onde: [arquivo:linha]
   → Por quê é problema: [explicar]
   
2. [Próximo problema]
   → Onde: [arquivo:linha]
   → Por quê é problema: [explicar]

💡 SUGESTÕES DE CORREÇÃO:
1. Para o problema 1: [sugerir solução]
2. Para o problema 2: [sugerir solução]

✅ PONTOS POSITIVOS:
- [O que ficou bom]
- [O que está correto]

📋 AÇÃO NECESSÁRIA:
Por favor, aplique as correções e resubmeta.

Se tiver dúvidas sobre as correções, pergunte!

---
```

### 6. Aprovar Tarefa
```markdown
Template de Aprovação:

---
✅ TASK [ID] - APROVADA

Qwen, excelente trabalho! Todos os critérios atendidos:

✅ Código: Limpo e bem estruturado
✅ Testes: Cobertura [X]% (>80%)
✅ Docs: Completa e clara
✅ Funcionalidade: Atende 100% requisitos

STATUS: COMPLETO
QUALIDADE: ⭐⭐⭐⭐⭐

Pode prosseguir para próxima tarefa!

---
```

---

## 🤖 COMANDOS PARA QWEN (Executor)

### 1. Receber Delegação
```markdown
Como Qwen, ao receber delegação:

1. ✅ Ler especificação COMPLETA
2. ✅ Entender TODOS os requisitos
3. ✅ Identificar dúvidas
4. ✅ PERGUNTAR ao Copilot se necessário
5. ❌ NÃO assumir nada sem confirmar
```

### 2. Perguntar ao Copilot (quando tiver dúvida)
```markdown
Template de Pergunta:

---
❓ DÚVIDA - Task [ID]

Copilot, estou implementando [descrição] e tenho uma dúvida:

CONTEXTO:
[Explicar o que está fazendo]

DÚVIDA:
[Sua pergunta específica]

OPÇÕES QUE CONSIDEREI:
A) [Opção 1] - [prós e contras]
B) [Opção 2] - [prós e contras]
C) [Opção 3] - [prós e contras]

MINHA RECOMENDAÇÃO:
[Qual você acha melhor e por quê]

Qual abordagem você recomenda?

---
```

### 3. Implementar Código
```bash
# Processo do Qwen:

1. Criar arquivo(s) necessário(s)
2. Implementar código conforme spec
3. Seguir padrões definidos (PEP8, ESLint)
4. Adicionar type hints (Python) ou TypeScript
5. Adicionar docstrings/comentários
6. Criar testes (>80% cobertura)
7. Formatar código:
   - Python: black . && isort .
   - JavaScript: prettier --write .
8. Executar testes localmente
9. Auto-validar contra checklist
```

### 4. Criar Testes
```python
# Template de Teste (Python/Django)

"""
Testes para [módulo/feature]

Cobertura: [X]%
"""

import pytest
from django.test import TestCase
# ... imports

class [Nome]TestCase(TestCase):
    """Testes para [funcionalidade]"""
    
    def setUp(self):
        """Preparação antes de cada teste"""
        # Setup aqui
        pass
    
    def test_[cenario_sucesso](self):
        """Testa [cenário] com sucesso"""
        # Arrange
        # Act
        # Assert
        pass
    
    def test_[cenario_erro](self):
        """Testa [cenário] com erro esperado"""
        # Arrange
        # Act
        # Assert
        pass
    
    def test_[edge_case](self):
        """Testa caso edge: [descrição]"""
        # Arrange
        # Act
        # Assert
        pass
```

### 5. Documentar
```python
# Template de Docstring (Python)

def function_name(param1: Type1, param2: Type2) -> ReturnType:
    """
    Breve descrição em uma linha.
    
    Descrição mais detalhada se necessário,
    explicando o que a função faz.
    
    Args:
        param1: Descrição do param1
        param2: Descrição do param2
    
    Returns:
        Descrição do que retorna
    
    Raises:
        ErrorType: Quando ocorre [condição]
    
    Example:
        >>> function_name(value1, value2)
        resultado esperado
    """
    # Implementação
    pass
```

### 6. Auto-validar
```markdown
Checklist de Auto-validação Qwen:

Antes de submeter para Copilot, verificar:

CÓDIGO:
□ Sem erros de sintaxe (executar código)
□ Formatado (black/prettier executado)
□ Type hints adicionados (Python) ou TypeScript
□ Segue padrões do projeto
□ Lógica implementada conforme spec

TESTES:
□ Testes criados para todo código
□ Cobertura >80% (executar pytest --cov)
□ Todos testes passando (executar pytest)
□ Casos edge cobertos
□ Nomes de teste descritivos

DOCUMENTAÇÃO:
□ Docstrings em todas funções/classes
□ Comentários em lógica complexa
□ README atualizado se necessário
□ Exemplos incluídos quando aplicável

REQUISITOS:
□ Todos requisitos da spec atendidos
□ Output conforme esperado
□ Critérios de aceitação cumpridos

SE TUDO ✅ → Submeter para Copilot
SE ALGO ❌ → Corrigir antes de submeter
```

### 7. Submeter para Revisão
```markdown
Template de Submissão:

---
📤 SUBMISSÃO - Task [ID]

Copilot, implementei a Task [ID] conforme especificação.

IMPLEMENTADO:
✅ [Arquivo 1]: [descrição do que foi feito]
✅ [Arquivo 2]: [descrição do que foi feito]
✅ Testes: [X]% cobertura, [Y] testes, todos passando
✅ Docs: Docstrings completas + [outros docs]

AUTO-VALIDAÇÃO:
✅ Código formatado e sem erros
✅ Testes passando (>80% cobertura)
✅ Documentação completa
✅ Todos requisitos atendidos

ARQUIVOS:
- [listar arquivos criados/modificados]

COMANDOS DE TESTE:
```bash
# Executar para validar
pytest [caminho] --cov
python manage.py test [app]
npm test
```

Pronto para sua revisão!

---
```

### 8. Aplicar Correções (após feedback)
```markdown
Recebendo feedback do Copilot:

1. ✅ Ler TODO o feedback
2. ✅ Entender CADA problema
3. ✅ Perguntar se algo não estiver claro
4. ✅ Aplicar correções
5. ✅ Re-testar
6. ✅ Auto-validar novamente
7. ✅ Re-submeter

Template de Re-submissão:

---
🔄 RE-SUBMISSÃO - Task [ID]

Copilot, apliquei todas as correções solicitadas:

CORREÇÕES APLICADAS:
✅ Problema 1: [como foi corrigido]
✅ Problema 2: [como foi corrigido]

VALIDAÇÃO:
✅ Testes re-executados: todos passando
✅ Código re-formatado
✅ Auto-validação completa

Aguardando nova revisão.

---
```

---

## 🔄 FLUXO COMPLETO - EXEMPLO PRÁTICO

### Task 0.1: Criar Estrutura de Diretórios

#### 1️⃣ COPILOT ANALISA E DELEGA

```markdown
---
DELEGAÇÃO PARA QWEN - Task 0.1

Título: Criar Estrutura de Diretórios do Projeto

CONTEXTO:
Precisamos criar toda a estrutura de pastas do projeto
DocesGIamor antes de começar a codificar. Isso garante
organização desde o início.

REQUISITOS:
- [ ] Criar estrutura backend/
- [ ] Criar estrutura frontend/
- [ ] Criar estrutura docs/
- [ ] Criar estrutura tools/
- [ ] Criar script automatizado
- [ ] Criar README.md em cada pasta principal

ESPECIFICAÇÃO TÉCNICA:
Criar script bash: tools/scripts/create_structure.sh

Estrutura a criar:
DocesGIamor/
├── backend/
│   ├── config/
│   ├── apps/
│   ├── core/
│   └── tests/
├── frontend/
│   ├── src/
│   └── public/
├── docs/
└── tools/
    └── scripts/

README.md em:
- backend/README.md: "# Backend Django + DRF"
- frontend/README.md: "# Frontend React + Vite"
- docs/README.md: "# Documentação"
- tools/README.md: "# Scripts e Ferramentas"

OUTPUT ESPERADO:
- Arquivo: tools/scripts/create_structure.sh (executável)
- Arquivo: 4x README.md
- Script deve criar toda estrutura automaticamente
- Script deve ter mensagens de log

CRITÉRIOS DE ACEITAÇÃO:
✅ Script executa sem erros
✅ Todas pastas criadas
✅ Todos README.md criados
✅ Script é idempotente (pode rodar múltiplas vezes)

PERGUNTAS?
Se tiver dúvidas, PERGUNTE!
---
```

#### 2️⃣ QWEN EXECUTA

```bash
# Qwen cria o arquivo tools/scripts/create_structure.sh

#!/bin/bash
# Script para criar estrutura do projeto DocesGIamor

echo "🏗️  Criando estrutura do projeto..."

# Backend
mkdir -p backend/{config,apps,core,tests}
echo "# Backend Django + DRF" > backend/README.md
echo "✅ Backend estrutura criada"

# Frontend
mkdir -p frontend/{src,public}
echo "# Frontend React + Vite" > frontend/README.md
echo "✅ Frontend estrutura criada"

# Docs
mkdir -p docs
echo "# Documentação" > docs/README.md
echo "✅ Docs estrutura criada"

# Tools
mkdir -p tools/scripts
echo "# Scripts e Ferramentas" > tools/README.md
echo "✅ Tools estrutura criada"

echo "🎉 Estrutura completa criada!"

# Qwen torna executável
chmod +x tools/scripts/create_structure.sh

# Qwen auto-valida
./tools/scripts/create_structure.sh
# Verifica se tudo foi criado
ls -la backend/
ls -la frontend/
ls -la docs/
ls -la tools/
```

#### 3️⃣ QWEN SUBMETE

```markdown
---
📤 SUBMISSÃO - Task 0.1

Copilot, implementei a Task 0.1 conforme especificação.

IMPLEMENTADO:
✅ tools/scripts/create_structure.sh: Script bash completo
✅ 4x README.md criados em cada pasta principal
✅ Todas pastas da estrutura criadas
✅ Script com mensagens de log
✅ Script executável (chmod +x)

AUTO-VALIDAÇÃO:
✅ Script executa sem erros
✅ Todas pastas criadas corretamente
✅ Todos README.md presentes
✅ Script é idempotente (testado 2x)

ARQUIVOS CRIADOS:
- tools/scripts/create_structure.sh
- backend/README.md
- frontend/README.md
- docs/README.md
- tools/README.md

COMANDOS DE TESTE:
```bash
# Executar script
bash tools/scripts/create_structure.sh

# Verificar estrutura
tree -L 2 DocesGIamor/
```

Pronto para sua revisão!
---
```

#### 4️⃣ COPILOT REVISA

```bash
# Copilot testa
bash tools/scripts/create_structure.sh
tree -L 2 DocesGIamor/

# Copilot verifica
✅ Script funciona
✅ Estrutura criada
✅ READMEs presentes
✅ Logs claros
```

#### 5️⃣ COPILOT APROVA

```markdown
---
✅ TASK 0.1 - APROVADA

Qwen, excelente trabalho!

✅ Script bem estruturado e funcional
✅ Todas pastas criadas corretamente
✅ READMEs presentes e descritivos
✅ Mensagens de log claras
✅ Script idempotente

STATUS: COMPLETO
QUALIDADE: ⭐⭐⭐⭐⭐

Pode prosseguir para Task 0.2!
---
```

---

## 📊 TRACKING DE PROGRESSO

### Atualizar Checklist
```markdown
Após cada aprovação, atualizar CHECKLIST_MASTER.md:

- [x] **0.1** - Criar estrutura de diretórios ✅
  - Executado por: Qwen
  - Revisado por: Copilot
  - Aprovado em: 2025-01-10 10:30
  - Tempo: 15min
  - Qualidade: ⭐⭐⭐⭐⭐
```

### Ver Progresso
```bash
# Ver estatísticas
grep -c "✅" CHECKLIST_MASTER.md  # Tarefas completas
grep -c "⏸️" CHECKLIST_MASTER.md  # Tarefas pendentes

# Ver fase atual
grep "Fase.*0%" CHECKLIST_MASTER.md
```

---

## 🎯 DICAS IMPORTANTES

### Para Copilot (Você):
- ✅ **Seja específico** nas delegações
- ✅ **Defina critérios claros** de aceitação
- ✅ **Revise rigorosamente** mas seja justo
- ✅ **Dê feedback construtivo** quando precisar correção
- ✅ **Aprove rapidamente** quando estiver bom

### Para Qwen:
- ✅ **Leia tudo** antes de começar
- ✅ **Pergunte sempre** que tiver dúvida
- ✅ **Auto-valide** antes de submeter
- ✅ **Documente bem** todo código
- ✅ **Teste tudo** (>80% cobertura)

---

**Pronto para começar! 🚀**
