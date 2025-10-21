# 🚀 Guia de Deploy em Produção - Doces Lucros Luz

**Data**: 20 de Outubro de 2025  
**Status**: ✅ Pronto para Deploy  
**Vulnerabilidades**: 0

---

## 📋 Pré-Requisitos

- [x] ✅ npm audit: 0 vulnerabilidades
- [x] ✅ Django check: 0 issues
- [x] ✅ Build frontend: Bem-sucedido
- [x] ✅ Todas as validações funcionais
- [x] ✅ Documentação de segurança completa

---

## 1️⃣ Configuração de Variáveis de Ambiente

### Passo 1: Criar arquivo `.env.production`

```bash
# No servidor de produção:
cp .env.production .env.prod

# Editar com valores reais:
nano .env.prod
```

### Passo 2: Gerar SECRET_KEY Seguro

```bash
python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'

# Copiar a saída e colar no .env.prod:
# SECRET_KEY=sua-chave-super-secreta-aqui
```

### Passo 3: Configurar Variáveis Críticas

```env
# SEGURANÇA (OBRIGATÓRIO)
SECRET_KEY=<gerar-com-comando-acima>
DEBUG=False
ALLOWED_HOSTS=seu-dominio.com,www.seu-dominio.com

# BANCO DE DADOS
DATABASE_URL=postgresql://user:password@host:5432/dbname

# CORS
CORS_ALLOWED_ORIGINS=https://seu-dominio.com
CSRF_TRUSTED_ORIGINS=https://seu-dominio.com

# SSL/TLS
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True

# EMAIL (Opcional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=seu-email@example.com
EMAIL_HOST_PASSWORD=sua-senha-app
```

---

## 2️⃣ Preparação do Banco de Dados

### PostgreSQL em Produção

```bash
# 1. Criar database
createdb doces_lucros_luz

# 2. Criar usuário
createuser doceslucro_user -P

# 3. Conceder permissões
psql
# Na prompt SQL:
ALTER ROLE doceslucro_user CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE doces_lucros_luz TO doceslucro_user;
\q

# 4. Testar conexão
psql -U doceslucro_user -d doces_lucros_luz -h localhost
```

### Url de Conexão

```bash
# .env.prod
DATABASE_URL=postgresql://doceslucro_user:sua-senha@localhost:5432/doces_lucros_luz
```

---

## 3️⃣ Setup da Aplicação

### Backend

```bash
cd backend

# 1. Instalar dependências
pip install -r requirements.txt

# 2. Executar migrações
python manage.py migrate --settings=config.settings.production

# 3. Coletar arquivos estáticos
python manage.py collectstatic --settings=config.settings.production

# 4. Criar superusuário
python manage.py createsuperuser --settings=config.settings.production

# 5. Testar segurança
python manage.py check --deploy
```

### Frontend

```bash
cd frontend

# 1. Instalar dependências
npm install

# 2. Build para produção
npm run build

# 3. Verificar build
ls -lah dist/

# 4. npm audit final
npm audit
# Esperado: 0 vulnerabilities
```

---

## 4️⃣ Configuração de Servidor Web

### Opção A: Nginx + Gunicorn (Recomendado)

#### Gunicorn

```bash
# Instalar
pip install gunicorn

# Criar arquivo de configuração
cat > gunicorn_config.py << 'EOF'
import multiprocessing

bind = "127.0.0.1:8000"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
max_requests = 1000
max_requests_jitter = 50
timeout = 30
keepalive = 2
EOF

# Executar
gunicorn \
  --config gunicorn_config.py \
  --env DJANGO_SETTINGS_MODULE=config.settings.production \
  config.wsgi:application
```

#### Nginx

```nginx
# /etc/nginx/sites-available/doces-lucros-luz

upstream doces_backend {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu-dominio.com www.seu-dominio.com;
    
    # SSL certificates (usar Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/json;
    gzip_min_length 1024;
    
    # Backend API
    location /api/ {
        proxy_pass http://doces_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 30s;
    }
    
    # Frontend
    location / {
        alias /var/www/doces-lucros-luz/frontend/dist/;
        try_files $uri /index.html;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
    
    # Static files
    location /static/ {
        alias /var/www/doces-lucros-luz/backend/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Ativar site Nginx

```bash
sudo ln -s /etc/nginx/sites-available/doces-lucros-luz /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Opção B: Docker

```dockerfile
# Dockerfile.prod
FROM python:3.11-slim

WORKDIR /app

# Backend
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# Frontend
FROM node:18-alpine AS frontend_build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Final
FROM python:3.11-slim
WORKDIR /app
COPY --from=frontend_build /app/frontend/dist /app/static/
COPY backend/ .
COPY --from=0 /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=config.settings.production

EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "config.wsgi:application"]
```

---

## 5️⃣ SSL/TLS com Let's Encrypt

```bash
# Instalar Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obter certificado
sudo certbot certonly --nginx -d seu-dominio.com -d www.seu-dominio.com

# Auto-renew (cron)
0 0 1 * * /usr/bin/certbot renew --quiet
```

---

## 6️⃣ Monitoramento e Logging

### Logs Django

```bash
# /var/log/doces-lucros-luz/
mkdir -p /var/log/doces-lucros-luz
chmod 755 /var/log/doces-lucros-luz
```

### Systemd Service

```ini
# /etc/systemd/system/doces-lucros-luz.service

[Unit]
Description=Doces Lucros Luz Web Service
After=network.target

[Service]
Type=notify
User=www-data
Group=www-data
WorkingDirectory=/var/www/doces-lucros-luz/backend
Environment="PATH=/var/www/doces-lucros-luz/backend/venv/bin"
Environment="DJANGO_SETTINGS_MODULE=config.settings.production"
ExecStart=/var/www/doces-lucros-luz/backend/venv/bin/gunicorn \
    --workers 4 \
    --bind 127.0.0.1:8000 \
    config.wsgi:application
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

Ativar serviço:
```bash
sudo systemctl daemon-reload
sudo systemctl enable doces-lucros-luz
sudo systemctl start doces-lucros-luz
sudo systemctl status doces-lucros-luz
```

---

## 7️⃣ Checklist Final de Deploy

### Segurança
- [ ] ✅ SECRET_KEY configurado (não default)
- [ ] ✅ DEBUG = False
- [ ] ✅ ALLOWED_HOSTS configurado
- [ ] ✅ HTTPS/SSL ativo
- [ ] ✅ SECURE_SSL_REDIRECT = True
- [ ] ✅ Security headers ativados
- [ ] ✅ npm audit: 0 vulnerabilities
- [ ] ✅ Django check --deploy: OK

### Performance
- [ ] ✅ Cache configurado (Redis/Memcached)
- [ ] ✅ Gzip compression habilitado
- [ ] ✅ CDN para assets estáticos
- [ ] ✅ Database indices otimizados
- [ ] ✅ Frontend build minificado

### Backup & Disaster Recovery
- [ ] ✅ Backups automáticos configurados
- [ ] ✅ Plano de recuperação testado
- [ ] ✅ Database replicado (standby)
- [ ] ✅ Documentação de restore

### Monitoramento
- [ ] ✅ Logs centralizados
- [ ] ✅ Alertas configurados
- [ ] ✅ Health checks ativos
- [ ] ✅ Métricas de performance

---

## 🆘 Troubleshooting

### Erro: "ALLOWED_HOSTS"
```python
# Adicionar ao .env.prod
ALLOWED_HOSTS=seu-dominio.com,www.seu-dominio.com
```

### Erro: "SECRET_KEY"
```bash
# Gerar nova chave
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

### Erro: "Database Connection"
```bash
# Testar conexão
psql -U user -d database -h host

# Verificar DATABASE_URL
echo $DATABASE_URL
```

### Erro: "Static Files Not Found"
```bash
python manage.py collectstatic --noinput
```

---

## 📞 Support

- 📧 Email: seu-email@example.com
- 🐛 Issues: https://github.com/Roberton003/doceslucro/issues
- 📖 Docs: https://seu-dominio.com/api/docs/

---

**Status**: ✅ Pronto para deploy em produção  
**Data**: 20 de Outubro de 2025  
**Vulnerabilidades**: 0 ✅
