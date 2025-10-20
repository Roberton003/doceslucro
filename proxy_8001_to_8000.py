#!/usr/bin/env python3
"""
Minimal HTTP proxy to forward requests from port 8001 to localhost:8000.
Usage: python3 proxy_8001_to_8000.py
"""
import http.server
import socketserver
import urllib.request
import urllib.error
import sys
from urllib.parse import urlsplit, urlunsplit

LISTEN_PORT = 8001
TARGET = 'http://localhost:8000'

class ProxyHandler(http.server.BaseHTTPRequestHandler):
    def do_HEAD(self):
        self._proxy_request()
    def do_GET(self):
        self._proxy_request()
    def do_POST(self):
        self._proxy_request()
    def do_PUT(self):
        self._proxy_request()
    def do_DELETE(self):
        self._proxy_request()
    def do_PATCH(self):
        self._proxy_request()

    def _proxy_request(self):
        try:
            # Build target URL
            url = TARGET + self.path
            length = int(self.headers.get('Content-Length', 0))
            data = self.rfile.read(length) if length > 0 else None
            req = urllib.request.Request(url, data=data, method=self.command)
            # Copy headers
            for k,v in self.headers.items():
                # Avoid sending hop-by-hop headers
                if k.lower() in ('host','connection','keep-alive','proxy-authenticate','proxy-authorization','te','trailers','transfer-encoding','upgrade'):
                    continue
                req.add_header(k, v)
            # Force Host header to target
            req.add_header('Host', 'localhost:8000')
            with urllib.request.urlopen(req, timeout=10) as resp:
                self.send_response(resp.getcode())
                # Copy response headers
                for header, value in resp.getheaders():
                    if header.lower() == 'transfer-encoding':
                        continue
                    self.send_header(header, value)
                self.end_headers()
                body = resp.read()
                if body:
                    self.wfile.write(body)
        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            for header, value in e.headers.items():
                if header.lower() == 'transfer-encoding':
                    continue
                self.send_header(header, value)
            self.end_headers()
            try:
                self.wfile.write(e.read())
            except Exception:
                pass
        except Exception as e:
            self.send_response(502)
            self.end_headers()
            self.wfile.write(str(e).encode('utf-8'))

if __name__ == '__main__':
    with socketserver.TCPServer(('0.0.0.0', LISTEN_PORT), ProxyHandler) as httpd:
        print(f'Proxy running on 0.0.0.0:{LISTEN_PORT} -> {TARGET}')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nStopping proxy')
            httpd.server_close()
