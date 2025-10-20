#!/usr/bin/env python3
"""
SPA Server com fallback para index.html (Client-side routing)
"""
import http.server
import socketserver
import os
import sys
from pathlib import Path

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
DIST_DIR = Path(__file__).parent / 'frontend' / 'dist'

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIST_DIR), **kwargs)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()
    
    def do_GET(self):
        path = self.path
        # Remove query strings
        if '?' in path:
            path = path.split('?')[0]
        
        # Tenta servir o arquivo
        file_path = DIST_DIR / path.lstrip('/')
        
        # Se é um arquivo que existe, serve normalmente
        if file_path.exists() and file_path.is_file():
            return super().do_GET()
        
        # Se é uma rota (sem extensão), faz fallback para index.html
        if not path.endswith(('.js', '.css', '.png', '.jpg', '.gif', '.svg', '.woff', '.woff2')):
            self.path = '/index.html'
        
        return super().do_GET()

if __name__ == '__main__':
    os.chdir(DIST_DIR)
    
    handler = SPAHandler
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"SPA Server rodando em http://localhost:{PORT}")
        print(f"Servindo arquivos de: {DIST_DIR}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nServidor parado')
