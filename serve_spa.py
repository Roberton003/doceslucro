#!/usr/bin/env python3
"""
Servidor SPA com fallback para index.html
Uso: python3 serve_spa.py [porta]
"""
import http.server
import socketserver
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
WEBROOT = os.path.join(os.path.dirname(__file__), 'frontend', 'dist')

os.chdir(WEBROOT)


class SPARequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.translate_path(self.path)
        if os.path.exists(path) and not os.path.isdir(path):
            return super().do_GET()
        if (self.path.startswith('/assets/') or
                self.path.startswith('/icon') or
                self.path.startswith('/manifest') or
                self.path.startswith('/sw.js')):
            return super().do_GET()
        self.path = '/index.html'
        return super().do_GET()


try:
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), SPARequestHandler) as httpd:
        print(f"Serving {WEBROOT} on port {PORT} (SPA fallback enabled)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nShutting down')
            httpd.server_close()
except Exception as e:
    print(f"Erro ao iniciar servidor: {e}")
    sys.exit(1)
