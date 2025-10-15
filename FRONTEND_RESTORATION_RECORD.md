# Registro de Restauração do Frontend

Data: 14 de outubro de 2025

Resumo:
- A fonte original do frontend havia sido perdida, mas o build de produção (`frontend/dist`) foi encontrado intacto.
- Para restaurar rapidamente a versão final (a página única modernizada), o diretório `frontend/dist` foi servido localmente via `python3 -m http.server`.
- A página compilada está disponível localmente em: `http://localhost:5173/calcular` (ou `http://localhost:5173/`).

Ações realizadas:
1. Inspeção do conteúdo de `frontend/dist` — confirmei `index.html`, `manifest.json`, `sw.js` e `assets/` com os bundles.
2. Iniciei um servidor estático simples na porta 5173 para exibir o build final.
3. Resolvi conflitos de porta encerrando processos `vite` que impediam o bind do servidor estático.
4. Confirmei que a página final corresponde ao que o usuário informou.

Arquivos relevantes:
- `frontend/dist/index.html` — HTML do PWA.
- `frontend/dist/manifest.json` — manifesto PWA.
- `frontend/dist/assets/index-DC-FGpDT.js` — bundle JS minificado.
- `frontend/dist/assets/index-B5GtcuSY.css` — bundle CSS minificado.

Próximos passos recomendados:
- Integrar `frontend/dist` ao backend Django usando WhiteNoise para servir a SPA em produção.
- (Opcional) Reconstruir o código-fonte React a partir do bundle para ter código editável (`SinglePage.jsx`) e substituir mocks por chamadas reais ao backend.
- Fazer commit no controle de versão (já realizado a seguir).

Observações técnicas:
- Para parar o servidor estático rodando no background: `pkill -f "http.server"`.
- Para integrar com Django, recomenda-se `whitenoise` e configurar `STATICFILES_DIRS` para apontar para `frontend/dist`.

Registro de comandos executados (principais):
- `cd frontend/dist && python3 -m http.server 5173`
- `ps aux | grep vite` e `kill <pids>` para liberar portas.

Contato:
- Se quiser que eu integre o `dist` ao backend automaticamente ou que eu gere o código-fonte React equivalente, diga A (integrar) ou B (reconstruir o source).