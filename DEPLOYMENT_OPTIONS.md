# 🚀 Guia: Como Disponibilizar a Aplicação na Web

**Data**: 20 de Outubro de 2025  
**Status**: Pronto para Deploy  

---

## 📋 Opções de Deploy (do mais fácil ao mais robusto)

### 1️⃣ **MAIS FÁCIL - Usar Ngrok (Teste Rápido)**

Perfeito para **testes e compartilhamento rápido**. Cria um tunnel público para sua máquina local.

```bash
# 1. Download e instale Ngrok
# https://ngrok.com/download

# 2. Registre uma conta (gratuito)
ngrok config add-authtoken SEU_TOKEN

# 3. Inicie o servidor local (já está rodando em 3000)
# Seu servidor já está em: http://localhost:3000

# 4. Em outro terminal, exponha para web
ngrok http 3000

# Você receberá uma URL pública:
# https://xxxxx-xxx-xxxxx.ngrok-free.app
```

**Vantagens**: 
- ✅ Instantâneo
- ✅ Sem configuração
- ✅ Funciona de qualquer lugar

**Desvantagens**:
- ❌ URL muda a cada restart
- ❌ Limite de requisições (gratuito)
- ❌ Não é para produção

---

### 2️⃣ **INTERMEDIÁRIO - Heroku (Cloud Fácil)**

Deploy em minutos na nuvem com nome de domínio próprio.

```bash
# 1. Instale Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# 2. Faça login
heroku login

# 3. Crie um app
heroku create seu-app-doces-lucros

# 4. Deploy
git push heroku master

# Sua app estará em:
# https://seu-app-doces-lucros.herokuapp.com

# 5. Ver logs
heroku logs --tail
```

**Vantagens**:
- ✅ URL permanente
- ✅ Muito fácil
- ✅ Gratuito (com limitações)
- ✅ Suporte para PostgreSQL

**Desvantagens**:
- ❌ Dynos gratuitos dormem após 30 min inatividade
- ❌ Poucos recursos
- ❌ Pago após créditos grátis

---

### 3️⃣ **RECOMENDADO - VPS + Nginx (Produção)**

**Máquina dedicada na nuvem com total controle.**

Provedores:
- 🌐 **DigitalOcean** - $5/mês (recomendado para começar)
- 🌐 **AWS EC2** - Pay-as-you-go
- 🌐 **Linode** - $5/mês
- 🌐 **Azure** - Variável
- 🌐 **Google Cloud** - Variável

#### Passo-a-passo DigitalOcean:

```bash
# 1. Crie um Droplet (Ubuntu 22.04)
# - Size: Basic ($5/mês)
# - Region: São Paulo ou mais próxima

# 2. SSH na máquina
ssh root@SEU_IP_DO_DROPLET

# 3. Instale dependências
apt-get update && apt-get upgrade -y
apt-get install -y python3 python3-pip python3-venv postgresql nginx git

# 4. Clone seu repositório
cd /var/www
git clone https://github.com/Roberton003/doceslucro.git
cd doceslucro

# 5. Setup Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 6. Configure variáveis de ambiente
cp .env.production .env
nano .env
# Edite com seus valores reais

# 7. Setup Database
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser

# 8. Instale Gunicorn
pip install gunicorn

# 9. Configure Frontend
cd ../frontend
npm install
npm run build

# 10. Configure Nginx (veja abaixo)

# 11. Inicie aplicação com Systemd (veja abaixo)
```

#### Configurar Nginx

```bash
# /etc/nginx/sites-available/doces-lucros-luz

upstream doces_backend {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;
    
    # Redirect HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu-dominio.com www.seu-dominio.com;
    
    # SSL (usar Let's Encrypt depois)
    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;
    
    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json;
    
    # Frontend
    location / {
        alias /var/www/doceslucro/frontend/dist/;
        try_files $uri /index.html;
        expires 7d;
    }
    
    # API Backend
    location /api/ {
        proxy_pass http://doces_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ativar:
```bash
sudo ln -s /etc/nginx/sites-available/doces-lucros-luz /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Systemd Service para Gunicorn

```bash
# /etc/systemd/system/doces-lucros-luz.service

[Unit]
Description=Doces Lucros Luz Gunicorn
After=network.target

[Service]
Type=notify
User=www-data
Group=www-data
WorkingDirectory=/var/www/doceslucro/backend
Environment="PATH=/var/www/doceslucro/backend/venv/bin"
ExecStart=/var/www/doceslucro/backend/venv/bin/gunicorn \
    --workers 4 \
    --bind 127.0.0.1:8000 \
    --timeout 120 \
    config.wsgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Ativar:
```bash
sudo systemctl daemon-reload
sudo systemctl enable doces-lucros-luz
sudo systemctl start doces-lucros-luz
sudo systemctl status doces-lucros-luz
```

#### SSL com Let's Encrypt (Grátis)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d seu-dominio.com -d www.seu-dominio.com

# Auto-renew
sudo systemctl enable certbot.timer
```

---

### 4️⃣ **Docker + Container Registry**

Containerizar e fazer deploy com Docker.

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Backend
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# Frontend build
FROM node:18-alpine AS builder
WORKDIR /app
COPY frontend .
RUN npm install && npm run build

# Final
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /app/dist /app/static/
COPY backend .
COPY --from=0 /usr/local/lib/python*/site-packages /usr/local/lib/python3.11/site-packages

ENV PYTHONUNBUFFERED=1
EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "config.wsgi:application"]
```

Build e push:
```bash
docker build -t seu-username/doces-lucros-luz .
docker login
docker push seu-username/doces-lucros-luz

# Usar em qualquer plataforma: DigitalOcean, AWS, Azure, etc
```

---

## 📊 Comparação das Opções

| Opção | Custo | Setup | Performance | Domínio | Para |
|-------|-------|-------|-------------|---------|------|
| **Ngrok** | Grátis | 5 min | Média | Dinâmico | Testes rápidos |
| **Heroku** | Grátis+Pago | 10 min | Média | Fixo | MVP/Demo |
| **VPS** | $5-20/mês | 30 min | Excelente | Seu domínio | Produção |
| **Docker** | Variável | 20 min | Excelente | Flexível | Escalável |

---

## 🎯 RECOMENDAÇÃO PARA VOCÊ

Para **compartilhar com outras pessoas agora mesmo**:

### Opção A: **Ngrok** (Mais Rápido - 2 minutos)
```bash
# Terminal 1: seu servidor já está rodando
# http://localhost:3000

# Terminal 2: compartilhe com Ngrok
ngrok http 3000
# Envie a URL pública para seus amigos!
```

### Opção B: **DigitalOcean** (Melhor - $5/mês)
- Crie um Droplet
- Siga os passos acima
- Registre um domínio (opcional)
- Seu app fica online 24/7

---

## ✅ Checklist antes de Deploy

- [ ] Variáveis de ambiente configuradas (`.env.production`)
- [ ] SECRET_KEY gerado e seguro
- [ ] DEBUG = False
- [ ] ALLOWED_HOSTS correto
- [ ] Database migrado para PostgreSQL (em produção)
- [ ] SSL/TLS ativado
- [ ] Backups configurados
- [ ] Logs centralizados
- [ ] Monitoramento ativo

---

## 🔐 Segurança antes de Compartilhar

```bash
# 1. Gerar SECRET_KEY seguro
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'

# 2. Verificar segurança
python manage.py check --deploy

# 3. npm audit
npm audit
# Esperado: 0 vulnerabilities ✅

# 4. HTTPS/SSL obrigatório
SECURE_SSL_REDIRECT=True
```

---

## 📞 Próximas Ações

**Qual opção você prefere?**

1. **Ngrok** - Para testar agora (2 min)
2. **DigitalOcean** - Para usar por tempo indeterminado ($5/mês)
3. **Heroku** - Versão grátis fácil

Posso ajudar com setup de qualquer uma! 🚀
