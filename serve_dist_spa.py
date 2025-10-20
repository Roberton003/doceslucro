#!/usr/bin/env python3
"""
Small static server with SPA history fallback for frontend/dist
Usage: python3 serve_dist_spa.py [port]

Serves files from frontend/dist and returns index.html for unknown routes
so client-side routing (/calcular) works.
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
        # If the requested path exists as a file, serve it normally
        path = self.translate_path(self.path)
        if os.path.exists(path) and not os.path.isdir(path):
            return super().do_GET()
        # If path looks like an asset folder, try to serve it (fallback to 404 if missing)
        if self.path.startswith('/assets/') or self.path.startswith('/icon') or self.path.startswith('/manifest') or self.path.startswith('/sw.js'):
            return super().do_GET()
        # Otherwise, serve index.html for SPA routing
        self.path = '/index.html'
        return super().do_GET()


with socketserver.TCPServer(("0.0.0.0", PORT), SPARequestHandler) as httpd:
    print(f"Serving {WEBROOT} on port {PORT} (SPA fallback enabled)")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down')
        httpd.server_close()
