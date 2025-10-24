# 🚀 GUIA RÁPIDO - CHEFLU ASSISTANT

**Status:** ✅ VERSÃO 1.0 OPERACIONAL  
**Data:** 24 de outubro de 2025  
**Última Atualização:** v1.1 (hotfix de conexão)

---

## ⚡ INICIALIZAÇÃO RÁPIDA

### Opção 1: Script Automático (Recomendado)

```bash
cd /media/Arquivos/DjangoPython/DocesGIamor
bash START_CHEFLU.sh
```

O script irá:
- ✅ Limpar processos antigos
- ✅ Iniciar Django (porta 8000)
- ✅ Iniciar Vite (porta 5173)
- ✅ Verificar conectividade
- ✅ Exibir instruções

### Opção 2: Manual

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

---

## 🌐 ACESSAR A APLICAÇÃO

Após inicializar, acesse em seu navegador:

```
http://localhost:5173
```

### Endpoints Disponíveis

| Endpoint | Descrição |
|----------|-----------|
| http://localhost:5173 | Aplicação web |
| http://localhost:8000/admin | Django Admin |
| http://localhost:8000/api/chat/nutrition/ | API do Chat |
| http://localhost:8000/api/schema/ | Documentação da API |

---

## 💬 COMO USAR CHEFLU

1. **Abrir a aplicação** em http://localhost:5173
2. **Clicar no botão do chef** (canto inferior direito - ícone com a imagem)
3. **Digitar uma pergunta**, por exemplo:
   - "Qual receita é mais lucrativa?"
   - "Quanto custa fazer um bolo de chocolate?"
   - "Quais ingredientes tenho disponíveis?"
4. **Receber resposta** formatada com análise de custos e lucros

### Exemplos de Perguntas

✅ **Análise de Receitas:**
- Qual receita é mais lucrativa?
- Qual a margem de lucro do bolo de cenoura?
- Compare os lucros das três receitas

✅ **Gestão de Ingredientes:**
- Quais ingredientes tenho em estoque?
- Qual o preço do açúcar?
- Preciso de mais farinha?

✅ **Recomendações:**
- Que receita devo fazer hoje?
- Como otimizar os custos?
- Como aumentar a margem de lucro?

---

## 📊 DADOS DISPONÍVEIS

### Receitas (com margem de lucro)

| Receita | Preço | Custo | Lucro | Margem |
|---------|-------|-------|-------|--------|
| 🥇 Bolo Cenoura | R$ 55 | R$ 20 | R$ 35 | 63,6% |
| 🥈 Bolo Chocolate | R$ 60 | R$ 25 | R$ 35 | 58,3% |
| 🥉 Brigadeiro | R$ 35 | R$ 15 | R$ 20 | 57,1% |

### Ingredientes

- 16 ingredientes cadastrados
- Preços por unidade
- Quantidades em estoque
- Categorias organizadas

---

## 📝 LOGS E DIAGNÓSTICO

### Ver Logs do Backend (Django)

```bash
tail -f /tmp/django.log
```

### Ver Logs do Frontend (Vite)

```bash
tail -f /tmp/vite.log
```

### Verificar PIDs

```bash
# Processos em execução
ps aux | grep -E "python manage|npm run|vite"

# PIDs salvos
cat /tmp/django.pid
cat /tmp/vite.pid
```

---

## 🛑 PARAR CHEFLU

### Parar Todos os Processos

```bash
pkill -9 -f "python manage.py runserver"
pkill -9 -f "npm run dev"
pkill -9 -f "vite"
```

Ou use um comando único:

```bash
pkill -9 -f 'python manage.py\|npm run dev'
```

---

## 🔧 TROUBLESHOOTING

### Erro: `ERR_CONNECTION_REFUSED`

**Causa:** Servidores não estão rodando

**Solução:**
```bash
bash START_CHEFLU.sh
```

---

### Erro: `Port 5173 already in use`

**Causa:** Vite ainda está rodando de uma sessão anterior

**Solução:**
```bash
pkill -9 -f vite
sleep 2
npm run dev
```

---

### Erro: `Port 8000 already in use`

**Causa:** Django ainda está rodando

**Solução:**
```bash
pkill -9 -f "python manage.py runserver"
sleep 2
python manage.py runserver 0.0.0.0:8000
```

---

### Backend retorna 401 (Unauthorized)

**Causa:** Geralmente resolvido na v1.1 (AllowAny habilitado)

**Solução:** Verifique se backend está atualizado:
```bash
git pull origin feature/nutrition-ai-chat
```

---

### API Lenta

**Causa:** Limite de requisições (rate limiting)

**Limite Atual:**
- Anônimos: 50 requisições/hora
- Autenticados: 1000 requisições/hora

**Solução:** Aguarde ou aumente o limite em `backend/config/settings/base.py`

---

## 📚 DOCUMENTAÇÃO

| Documento | Descrição |
|-----------|-----------|
| `FINAL_STATUS.md` | Status final do projeto v1.0 |
| `IMPLEMENTATION_SUMMARY.md` | Resumo de implementação |
| `SECURITY_AUDIT.md` | Vulnerabilidades e correções |
| `SECURITY_ACTION_PLAN.md` | Plano de ação de segurança |
| `GUIA_RAPIDO_USO.md` | Este arquivo |
| `backend/.env.example` | Variáveis de ambiente |

---

## 🔒 SEGURANÇA

### Status Atual

✅ **Implementado:**
- Throttling: 50/h (anônimos), 1000/h (autenticados)
- ALLOWED_HOSTS configurado
- DEBUG = False
- .env no .gitignore

⚠️ **Pendente (para produção):**
- Invalidar GROQ_API_KEY atual
- Remover .env do histórico git
- Desabilitar CORS_ALLOW_ALL_ORIGINS
- Implementar HTTPS/SSL
- Migrar para PostgreSQL

Veja `SECURITY_ACTION_PLAN.md` para detalhes.

---

## 📞 SUPORTE

**Aplicação travou?**
1. Feche o navegador
2. Execute `bash START_CHEFLU.sh`
3. Abra novamente em http://localhost:5173

**ChefLuz não responde?**
1. Verifique os logs: `tail -f /tmp/django.log`
2. Reinicie o backend: `pkill -9 -f "python manage.py runserver"`
3. Execute `bash START_CHEFLU.sh`

**Outro problema?**
Consulte `SECURITY_AUDIT.md` ou revise os logs.

---

## ✅ CHECKLIST PRÉ-USO

- [ ] Backend iniciado (porta 8000)
- [ ] Frontend iniciado (porta 5173)
- [ ] Navegador acessando http://localhost:5173
- [ ] Botão do chef visível (canto inferior direito)
- [ ] ChefLuz respondendo a mensagens

---

## 🎉 CONCLUSÃO

ChefLuz v1.0 está **100% operacional** e pronto para uso!

Desenvolvido com ❤️ para **Doces Lucro Luz**

---

*Última atualização: 24 de outubro de 2025*
