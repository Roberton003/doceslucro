# 🚀 Deploy Heroku - Passo-a-Passo

**Status**: Pronto para Deploy

---

## 📋 Pré-Requisitos

- ✅ Conta Heroku criada em https://heroku.com
- ✅ Heroku CLI instalado
- ✅ Git instalado

---

## 🔧 Instalação do Heroku CLI

### No Linux/Mac:
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

### No Windows (usar WSL ou):
```bash
# https://devcenter.heroku.com/articles/heroku-cli#download-and-install
```

### Verificar instalação:
```bash
heroku --version
```

---

## 🚀 Passo-a-Passo de Deploy

### 1️⃣ Login no Heroku

```bash
heroku login
# Vai abrir um navegador para autenticar
# Depois confirme no terminal
```

### 2️⃣ Criar aplicação no Heroku

```bash
cd /media/Arquivos/DjangoPython/DocesGIamor

# Crie o app (escolha um nome único)
heroku create seu-app-doces-lucros
# Vai retornar algo como:
# Creating app... done, ⬢ seu-app-doces-lucros
# https://seu-app-doces-lucros.herokuapp.com/

# Ou se quiser outro nome:
heroku create meu-app-unico-12345
```

### 3️⃣ Adicionar banco de dados PostgreSQL

```bash
# Adicionar PostgreSQL gratuito (Hobby)
heroku addons:create heroku-postgresql:hobby-dev

# Verificar se foi criado
heroku addons
```

### 4️⃣ Configurar Variáveis de Ambiente

```bash
# Gerar SECRET_KEY seguro
SECRET_KEY=$(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')

# Adicionar variáveis ao Heroku
heroku config:set DEBUG=False
heroku config:set SECRET_KEY="$SECRET_KEY"
heroku config:set ALLOWED_HOSTS="seu-app-doces-lucros.herokuapp.com"

# Verificar variáveis
heroku config
```

### 5️⃣ Fazer Deploy

```bash
# Adicionar remote do Heroku (se não foi automático)
git remote add heroku https://git.heroku.com/seu-app-doces-lucros.git

# Ou listar remotes existentes
git remote -v

# Deploy via Git
git push heroku master
# Ou se usar main branch:
git push heroku main

# Isso vai:
# 1. Build frontend (npm install + build)
# 2. Build backend (pip install)
# 3. Rodar migrações
# 4. Fazer deploy
```

### 6️⃣ Verificar Deploy

```bash
# Ver logs em tempo real
heroku logs --tail

# Abrir a app no navegador
heroku open

# Sua app está em:
# https://seu-app-doces-lucros.herokuapp.com
```

---

## ✅ Checklist de Deploy

- [ ] Heroku CLI instalado (`heroku --version`)
- [ ] Fez login (`heroku login`)
- [ ] App criado no Heroku
- [ ] PostgreSQL adicionado
- [ ] Variáveis de ambiente configuradas
- [ ] Git push heroku master executado
- [ ] Verificou logs (`heroku logs --tail`)
- [ ] Consegue acessar a URL

---

## 🔍 Troubleshooting

### Erro: "No such file or directory: 'npm'"
**Solução**: Heroku não detectou package.json. Certifique-se que está na raiz do projeto.

### Erro: "Command 'migrate' not found"
**Solução**: Adicione ao `Procfile`:
```
release: python manage.py migrate
```

### App fica offline após 30 minutos de inatividade (grátis)
**Solução**: Upgrade para plano pago OU use `Procfile` com worker dyno.

### Erro de conexão ao banco de dados
**Solução**: 
```bash
# Verificar DATABASE_URL
heroku config:get DATABASE_URL

# Testar conexão
heroku run python manage.py dbshell
```

### Erro: "Host not allowed"
**Solução**: Adicione seu domínio Heroku:
```bash
heroku config:set ALLOWED_HOSTS="seu-app-doces-lucros.herokuapp.com"
```

---

## 📱 Compartilhar Link

Depois do deploy, compartilhe:
```
https://seu-app-doces-lucros.herokuapp.com
```

**Qualquer pessoa pode acessar!** 🌍

---

## 🔐 Segurança

- ✅ DEBUG = False
- ✅ SECRET_KEY via variável de ambiente
- ✅ HTTPS automático
- ✅ ALLOWED_HOSTS configurado
- ✅ PostgreSQL seguro

---

## 💰 Custo

**Gratuito**:
- 550 dyno-hours/mês (suficiente se app dorme)
- PostgreSQL hobby-dev gratuito (100MB)

**Com upgrade**:
- Dyno básico: $7/mês (sempre online)
- PostgreSQL: $9/mês (mais espaço)

---

## 📊 Comandos Úteis Heroku

```bash
# Ver status
heroku status

# Reinicar app
heroku restart

# Ver logs
heroku logs --tail

# Rodar comando remoto
heroku run python manage.py createsuperuser

# Adicionar mais variáveis
heroku config:set VAR_NAME=value

# Remover app
heroku apps:destroy seu-app-doces-lucros

# Listar todos os apps
heroku apps

# Ver configuração
heroku config

# Ver dyno resources
heroku dyno:type
```

---

## 🎯 Próximas Ações

1. **Instalar Heroku CLI**:
   ```bash
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Fazer login**:
   ```bash
   heroku login
   ```

3. **Criar app**:
   ```bash
   cd /media/Arquivos/DjangoPython/DocesGIamor
   heroku create seu-app-doces-lucros
   ```

4. **Fazer deploy**:
   ```bash
   git push heroku master
   ```

5. **Compartilhar URL**:
   ```
   https://seu-app-doces-lucros.herokuapp.com
   ```

---

**Pronto? Vamos começar!** 🚀
