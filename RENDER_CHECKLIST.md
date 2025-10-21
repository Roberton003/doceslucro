# 🚀 RENDER.COM - CHECKLIST DEPLOY PASSO-A-PASSO

**Status**: Pronto para deploy ✅  
**Data**: 20 de Outubro de 2025  
**App**: Doces Lucros Luz  

---

## 📋 CHECKLIST PASSO-A-PASSO

### ✅ PRÉ-REQUISITOS (JÁ FEITO!)
- [x] Código commitado: `918cd39`
- [x] Push realizado
- [x] `gunicorn` adicionado ao `requirements.txt`
- [x] `whitenoise` adicionado ao `requirements.txt`
- [x] Middleware whitenoise configurado
- [x] `render-build.sh` criado
- [x] WSGI configurado para usar settings corretos

---

## 🌐 PASSO 1: Acessar Render.com

```
1. Abra: https://render.com
2. Clique em "Sign up"
3. Escolha "Continue with GitHub"
4. Autorize: Roberton003
5. Clique em "Authorize render"
```

**Se já tem conta**: Faça login

✅ **Próximo passo**: Conectar repositório

---

## 📦 PASSO 2: Criar Web Service

```
1. No dashboard, clique "New +"
2. Escolha "Web Service"
3. Procure: doceslucro
4. Clique "Connect"
```

✅ **Próximo passo**: Configurar

---

## ⚙️ PASSO 3: Configurar Web Service

**Nome da App:**
```
doces-lucros-luz
```

**Ambiente:**
```
Python 3
```

**Região:**
```
Ohio (recomendado) ou escolha a mais próxima
```

**Branch:**
```
master
```

**Build Command:**
```bash
chmod +x render-build.sh && ./render-build.sh
```

**Start Command:**
```bash
cd backend && gunicorn config.wsgi:application --bind 0.0.0.0:10000
```

✅ **Próximo passo**: Variáveis de ambiente

---

## 🔐 PASSO 4: Gerar SECRET_KEY

**Execute no seu terminal local:**
```bash
cd /media/Arquivos/DjangoPython/DocesGIamor
python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

**Você vai receber algo assim:**
```
h7j2k3l9m2n4p0q8r5s3t1u9v2w4x6y8z0a3b5c7d9e1f3g5h7i9j1k3l5m7
```

**COPIE ESTE VALOR!** ☝️

✅ **Próximo passo**: Adicionar variáveis

---

## 📝 PASSO 5: Adicionar Variáveis de Ambiente

**No formulário do Render, clique em "Advanced"**

**Adicione cada variável:**

### 1️⃣ DEBUG
```
Key: DEBUG
Value: False
```

### 2️⃣ ALLOWED_HOSTS
```
Key: ALLOWED_HOSTS
Value: doces-lucros-luz.onrender.com
```

### 3️⃣ SECRET_KEY
```
Key: SECRET_KEY
Value: [Cole o valor que você gerou acima]
```

### 4️⃣ PYTHON_VERSION
```
Key: PYTHON_VERSION
Value: 3.11.7
```

### 5️⃣ DATABASE_URL (Render fornecerá)
```
Será preenchido automaticamente quando você adicionar PostgreSQL
```

✅ **Próximo passo**: Selecionar plano

---

## 💰 PASSO 6: Selecionar Plan

```
FREE (grátis)
- Sempre online
- 750 horas/mês (nunca dorme!)
- $0/mês
```

**Clique em "Free"**

✅ **Próximo passo**: Deploy!

---

## 🚀 PASSO 7: Iniciar Deploy

**Clique em "Create Web Service"**

**Agora o Render vai:**
1. ✅ Clonar repositório
2. ✅ Executar `render-build.sh`
3. ✅ Instalar dependências
4. ✅ Fazer build frontend
5. ✅ Instalar packages Python
6. ✅ Iniciar aplicação

**Tempo estimado: 5-10 minutos** ⏱️

**Você verá os logs em tempo real!**

---

## 🔍 PASSO 8: Monitorar Deploy

**No dashboard do Render:**

1. **Veja os logs** (abas "Logs" e "Events")
2. **Procure por:**
   ```
   ✓ Build succeeded
   ✓ Deployment live
   ```

3. **Se houver erro**, veja a mensagem e avise!

---

## ✅ PASSO 9: Acessar Sua App

**Quando ver "Deployment live":**

```
🌍 https://doces-lucros-luz.onrender.com
```

**Clique no link e teste:**
- ✅ Página carrega?
- ✅ Imagem aparece?
- ✅ Calculadora funciona?
- ✅ Botão "Imprimir" funciona?

---

## 🎯 URLs Importantes

| Recurso | URL |
|---------|-----|
| **App** | https://doces-lucros-luz.onrender.com |
| **API** | https://doces-lucros-luz.onrender.com/api/ |
| **Admin** | https://doces-lucros-luz.onrender.com/admin/ |

---

## 🚨 PROBLEMAS COMUNS

### ❌ Erro: "Build failed"

**Verifique:**
- Build Command está correto?
- `render-build.sh` existe?
- `requirements.txt` tem todos os pacotes?

**Solução:**
```bash
# Teste localmente
cd /media/Arquivos/DjangoPython/DocesGIamor
./render-build.sh
```

### ❌ Erro: "Module not found"

**Adicione ao `requirements.txt`:**
```
pip install -r backend/requirements.txt
```

**Então faça commit:**
```bash
git add backend/requirements.txt
git commit -m "fix: adicionar pacotes faltantes"
git push origin master
```

### ❌ Erro: "Static files not found"

**Já está resolvido com whitenoise!** ✅

### ❌ App bota "502 Bad Gateway"

**Espere 1-2 minutos**, às vezes precisa de tempo para iniciar.

**Se persistir:**
1. Verifique variáveis de ambiente
2. Verifique `DEBUG=False`
3. Verifique SECRET_KEY

---

## 🔄 DEPOIS DO DEPLOY

### Adicionar PostgreSQL (Opcional)

1. No Render, clique "+ New"
2. Escolha "PostgreSQL"
3. Nomeie: `doces-lucros-luz-db`
4. Copie a `DATABASE_URL`
5. Adicione como variável de ambiente
6. Redeploy

### Redeploy (Se precisar)

**Opção 1: Automático**
```bash
git push origin master
# Deploy automático!
```

**Opção 2: Manual**
```
No Render Dashboard → seu app → "Manual Deploy"
```

---

## ✨ SUCESSO!

Quando a app estiver online, você terá:

✅ **App pública** (qualquer pessoa pode acessar)  
✅ **HTTPS automático** (seguro)  
✅ **URL bonita** (doces-lucros-luz.onrender.com)  
✅ **Sem dormir** (sempre disponível)  
✅ **Grátis para sempre** (Free tier)  

---

## 🎉 COMPARTILHE!

```
Link: https://doces-lucros-luz.onrender.com

Envie para clientes, amigos, família!
```

---

## 📞 PRÓXIMAS ETAPAS

- [ ] Deploy no Render
- [ ] Testar aplicação
- [ ] Adicionar PostgreSQL
- [ ] Configurar domínio custom (opcional)
- [ ] Setup de emails (opcional)

---

**Pronto? Comece pelo PASSO 1!** 🚀

**Dúvidas? Verifique RENDER_DEPLOY_COMPLETO.md para mais detalhes!**
