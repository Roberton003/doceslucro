# 🔒 Guia de Segurança - Doces GIamor Backend

## Visão Geral
Este documento descreve as medidas de segurança implementadas no backend Django e as melhores práticas para manutenção.

## ✅ Correções Implementadas

### 1. SECRET_KEY Segura
- ✅ Removida SECRET_KEY hardcoded
- ✅ Configurada via variável de ambiente
- ✅ Nova chave gerada: `django-insecure-vhRfe0HqknstBr-gaszbCUvnMMsb39KRWN3KMjkX2mg`

### 2. Permissões de Arquivo
- ✅ Arquivos sensíveis com permissões `600`
- ✅ `.env`, `settings/*.py`, `db.sqlite3` protegidos

### 3. Dependências Atualizadas
- ✅ `requirements.txt` completo com todas as dependências
- ✅ Versões específicas para evitar vulnerabilidades

### 4. Configurações de Produção Reforçadas
- ✅ Headers de segurança adicionais
- ✅ Proteção contra clickjacking (`X_FRAME_OPTIONS = 'DENY'`)
- ✅ Política de referrer segura
- ✅ Cookies seguros (`HttpOnly`, `SameSite`)

### 5. Rate Limiting Implementado
- ✅ Throttling configurado (100 req/hora para anônimos, 1000 req/hora para usuários)
- ✅ Proteção contra ataques de força bruta

## 🔧 Manutenção de Segurança

### Verificações Diárias
Execute o script de verificação de segurança:
```bash
./security_check.sh
```

### Atualizações de Dependências
```bash
# Verificar vulnerabilidades
pip install --upgrade -r requirements.txt
pip audit

# Atualizar requirements.txt se necessário
pip freeze > requirements.txt
```

### Renovação de SECRET_KEY
```bash
# Gerar nova chave
python3 -c "import secrets; print('SECRET_KEY=django-insecure-' + secrets.token_urlsafe(32))"

# Atualizar .env
# Reiniciar aplicação
```

### Monitoramento de Logs
- Logs de erro em `logs/django_error.log`
- Monitorar tentativas de acesso não autorizado
- Configurar alertas para atividades suspeitas

## 🚨 Alertas de Segurança

### Críticos (Corrija Imediatamente)
- SECRET_KEY hardcoded ou padrão
- Permissões de arquivo incorretas (diferente de 600)
- requirements.txt vazio
- DEBUG=True em produção

### Avisos (Monitore)
- Dependências desatualizadas
- Logs com muitos erros 4xx/5xx
- Alto tráfego de um único IP

## 📋 Checklist de Deploy

Antes de cada deploy em produção:

- [ ] Executar `./security_check.sh`
- [ ] Verificar variáveis de ambiente
- [ ] Usar PostgreSQL (não SQLite)
- [ ] Configurar SSL/TLS
- [ ] Definir `DEBUG=False`
- [ ] Configurar `ALLOWED_HOSTS`
- [ ] Testar CORS settings
- [ ] Verificar configurações de email

## 🔐 Variáveis de Ambiente Necessárias

```bash
# Django Core
SECRET_KEY=your-super-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DJANGO_SETTINGS_MODULE=config.settings.production

# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# CORS
CORS_ALLOW_ALL_ORIGINS=False
CORS_ALLOWED_ORIGINS=https://yourdomain.com

# CSRF
CSRF_TRUSTED_ORIGINS=https://yourdomain.com

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

## 📞 Contato de Segurança

Em caso de suspeita de vulnerabilidade:
1. Isole o sistema afetado
2. Execute verificação completa
3. Altere todas as credenciais
4. Documente o incidente
5. Implemente correções

---
**Última atualização:** Outubro 2025
**Status:** ✅ Seguro após correções