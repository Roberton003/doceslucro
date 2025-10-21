# 🚀 Deploy Render.com - Guia Completo Passo-a-Passo

**Data**: 20 de Outubro de 2025  
**Status**: Pronto para Deploy  

---

## ✅ PASSO-A-PASSO RENDER.COM

### PASSO 1: Verificar Git

```bash
cd /media/Arquivos/DjangoPython/DocesGIamor

# Verificar que tudo está commitado
git status
# Deve mostrar: "On branch master, nothing to commit, working tree clean"

# Se houver mudanças:
git add -A
git commit -m "Preparar para deploy Render"
git push origin master
```

### PASSO 2: Ir para Render.com

1. **Abra** https://render.com
2. **Clique em** "Sign up"
3. **Escolha** "Continue with GitHub" 
4. **Autorize o Render** a acessar seu GitHub (Roberton003)
5. **Clique em** "Authorize"

### PASSO 3: Criar Web Service

1. **No dashboard do Render, clique** "New +"
2. **Escolha** "Web Service"
3. **Conecte seu repositório**:
   - Procure por: `doceslucro`
   - Clique em "Connect"

### PASSO 4: Configurar Web Service

**Preencha os campos assim:**

```
Name:                doces-lucros-luz
Environment:         Python 3
Region:              Ohio (ou mais próxima)
Branch:              master
Build Command:       
  npm install --prefix frontend && 
  npm run build --prefix frontend && 
  cd backend && 
  pip install -r requirements.txt
Start Command:       
  cd backend && 
  gunicorn config.wsgi:application
```

### PASSO 5: Adicionar Variáveis de Ambiente

**Clique em** "Advanced" 

**Adicione essas variáveis** (clique "+ Add Environment Variable"):

```
Key: DEBUG
Value: False

Key: ALLOWED_HOSTS  
Value: doces-lucros-luz.onrender.com

Key: SECRET_KEY
Value: [GERAR COM PYTHON ABAIXO]

Key: PYTHON_VERSION
Value: 3.11.7
```

**Gerar SECRET_KEY (execute no seu terminal local):**
```bash
python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'

# Vai outputar algo como: 
# abc123xyz789...
# Copie isso e cole em "Secret Key"
```

### PASSO 6: Selecionar Plan

- **Escolha** "Free"
- Este plano:
  - Grátis
  - Sempre online
  - Sem sleep
  - 750 horas/mês (suficiente!)

### PASSO 7: Deploy!

**Clique em** "Create Web Service"

**Agora o Render vai:**
1. ✅ Clonar seu repositório
2. ✅ Instalar dependências
3. ✅ Fazer build do frontend
4. ✅ Instalar pacotes Python
5. ✅ Iniciar a aplicação

**Você verá logs em tempo real** - aguarde 5-10 minutos!

### PASSO 8: Acessar Sua App

Quando ver ✅ "Deploy successful", sua app está em:

```
https://doces-lucros-luz.onrender.com
```

**Compartilhe este link!** 🎉

---

## 🔍 Se der erro...

### Erro: "Build failed"
**Solução**: Verifique se:
- Build Command está correto
- `package.json` existe em `frontend/`
- `requirements.txt` existe em `backend/`

### Erro: "Port already in use"
**Solução**: No Start Command, use porta 10000:
```
cd backend && gunicorn --bind 0.0.0.0:10000 config.wsgi:application
```

### Erro: "Module not found"
**Solução**: Adicione ao `requirements.txt`:
```
gunicorn==21.2.0
```

### Erro: "Static files not found"
**Solução**: Depois de deploy, execute:
```
heroku run python manage.py collectstatic --noinput
```

---

## 📊 Monitorar Deploy

1. **Logs em tempo real**:
   - Dashboard → seu-app → Logs
   
2. **Testar app**:
   - Acesse https://doces-lucros-luz.onrender.com
   
3. **Redeployar**:
   - `git push origin master` (automático!)
   - Ou no Render: "Manual Deploy"

---

## 🔐 Segurança

✅ Verificar:
- `DEBUG = False`
- `SECRET_KEY` seguro
- `ALLOWED_HOSTS` correto
- `.env.production` NÃO está no repositório
- HTTPS ✅ (automático no Render)

---

## 🎯 URL Final

```
https://doces-lucros-luz.onrender.com
```

**Compartilhe com amigos/clientes!** 🌍

---

## ⚡ Dicas

1. **Primeiro deploy é mais lento** (10+ min)
2. **Próximos deploys são mais rápidos** (cache)
3. **Auto-deploy ao fazer git push** ✅
4. **Logs úteis no dashboard** para troubleshooting
5. **Banco de dados**: Adicione PostgreSQL depois se precisar

---

## ✅ Checklist Final

- [ ] Conta Render criada
- [ ] GitHub conectado
- [ ] Web Service criado
- [ ] Build Command correto
- [ ] Start Command correto
- [ ] Variáveis de ambiente adicionadas
- [ ] Plan "Free" selecionado
- [ ] Deploy iniciado
- [ ] App online em ~10 minutos
- [ ] URL funcionando

---

## 📞 Próximos Passos (Depois de Online)

1. **Adicionar PostgreSQL** (se precisar banco persistente)
2. **Configurar domínio próprio** (opcional)
3. **Setup de emails** (optional)
4. **Monitoramento** (Sentry, etc)

---

**Pronto? Comece pelo PASSO 1!** 🚀
