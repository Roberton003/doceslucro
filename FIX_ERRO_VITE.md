# 🔧 SOLUÇÃO: Erro "Permissão negada" no Render

**Erro**: `sh: 1: vite: Permissão negada`

**Causa**: Build command estava incorreto no `render.yaml`

**Solução**: Arquivo `render.yaml` foi corrigido ✅

---

## 🔄 O QUE FAZER AGORA

### PASSO 1: Fazer Push das Correções

```bash
cd /media/Arquivos/DjangoPython/DocesGIamor

git add render.yaml

git commit -m "fix: Corrigir render.yaml - solucionar erro vite"

git push origin master
```

### PASSO 2: Redeployar no Render

**Opção A: Auto-deploy (automático)**
```
O deploy vai começar automaticamente quando o push chegar
Aguarde 2-3 minutos
```

**Opção B: Manual Deploy (se preferir)**
```
1. Acesse: https://dashboard.render.com
2. Clique no seu serviço: "doces-lucros-luz"
3. Clique em "Manual Deploy"
4. Aguarde 8-10 minutos
```

### PASSO 3: Verificar Logs

```
Dashboard → doces-lucros-luz → Logs

Se vir "Deploy successful" ✅ está online!
```

---

## 📝 MUDANÇAS FEITAS

### Antes (❌ Errado)
```yaml
buildCommand: >
  cd frontend && npm install && npm run build && cd ../backend &&
  pip install -r requirements.txt
```

### Depois (✅ Correto)
```yaml
buildCommand: |
  pip install -r backend/requirements.txt && \
  cd frontend && npm install --legacy-peer-deps && npm run build && cd ..
```

### Benefícios
- ✅ Instala Python primeiro
- ✅ Usa caminhos absolutos
- ✅ Adiciona `--legacy-peer-deps` (evita erros npm)
- ✅ Sem problemas de permissão

---

## 🚀 COMANDOS RÁPIDOS

```bash
# Ver a correção
cat render.yaml

# Fazer commit
git add render.yaml && git commit -m "fix: render.yaml" && git push

# Verificar no dashboard
# https://dashboard.render.com
```

---

## ⏳ TEMPO ESPERADO

| Etapa | Tempo |
|-------|-------|
| Push para GitHub | 1 min |
| Render detecta push | 1 min |
| Build completo | 8-10 min |
| **TOTAL** | **~12 min** |

---

## ✅ QUANDO ESTIVER ONLINE

```
Seu app estará em:
https://doces-lucros-luz.onrender.com

✅ Teste no navegador
✅ Verifique se carrega
✅ Teste calculadora
✅ Teste print PDF
```

---

## 🆘 SE PERSISTIR O ERRO

**Verifique:**
1. ✅ `package.json` existe em `frontend/`
2. ✅ `requirements.txt` existe em `backend/`
3. ✅ Push foi bem-sucedido (`git push` retornou sucesso)
4. ✅ Ver logs no Render para mensagens de erro

**Se nada funcionar:**
```
Faça um Manual Deploy no Render:
Dashboard → doces-lucros-luz → Manual Deploy
```

---

## 📌 RESUMO

```
❌ Problema: render.yaml incorreto
✅ Solução: Arquivo corrigido
✅ Ação: git push + esperar deploy
✅ Resultado: App online em ~12 minutos
```

Boa sorte! 🚀
