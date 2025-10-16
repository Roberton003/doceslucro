#!/usr/bin/env python3
"""
Mock API server for testing frontend interactions.
- Listens on 8001
- Routes starting with /api/ will be handled
- Supports GET/POST/PUT/DELETE and stores resources in memory
- Adds CORS headers so browser requests from localhost:5173 succeed
"""
import http.server
import socketserver
import json
from urllib.parse import urlparse
import sys
import time

PORT = 8001
DB = {}

def seed_db():
    """Populate DB with realistic example data for faster testing."""
    global DB
    DB = {}
    # example ingredients
    DB['ingredients'] = [
        {'id': 1, 'name': 'Açúcar', 'unit': 'g', 'cost_per_unit': 0.005},
        {'id': 2, 'name': 'Farinha de trigo', 'unit': 'g', 'cost_per_unit': 0.003},
        {'id': 3, 'name': 'Ovos', 'unit': 'un', 'cost_per_unit': 0.25},
        {'id': 4, 'name': 'Manteiga', 'unit': 'g', 'cost_per_unit': 0.02},
        {'id': 5, 'name': 'Leite', 'unit': 'ml', 'cost_per_unit': 0.001},
    ]

    # example packagings
    DB['packagings'] = [
        {'id': 1, 'name': 'Saco 1kg', 'unit': 'kg', 'size': 1},
        {'id': 2, 'name': 'Balde 5kg', 'unit': 'kg', 'size': 5},
    ]

    # example products/recipes
    DB['products'] = [
        {
            'id': 1,
            'name': 'Bolo de Chocolate (10 porções)',
            'serves': 10,
            'ingredients': [
                {'name': 'Farinha de trigo', 'quantity': 500, 'unit': 'g', 'cost_per_unit': 0.003},
                {'name': 'Açúcar', 'quantity': 300, 'unit': 'g', 'cost_per_unit': 0.005},
                {'name': 'Ovos', 'quantity': 4, 'unit': 'un', 'cost_per_unit': 0.25},
                {'name': 'Manteiga', 'quantity': 200, 'unit': 'g', 'cost_per_unit': 0.02},
            ],
        },
        {
            'id': 2,
            'name': 'Quindim (10 porções)',
            'serves': 10,
            'ingredients': [
                {'name': 'Açúcar', 'quantity': 500, 'unit': 'g', 'cost_per_unit': 0.005},
                {'name': 'Ovos', 'quantity': 12, 'unit': 'un', 'cost_per_unit': 0.25},
                {'name': 'Manteiga', 'quantity': 50, 'unit': 'g', 'cost_per_unit': 0.02},
            ],
        },
    ]

    # small helper summary fields for UI compatibility
    for prod in DB['products']:
        prod['ingredients_count'] = len(prod.get('ingredients', []))
        total = 0.0
        for ing in prod.get('ingredients', []):
            try:
                total += float(ing.get('quantity', 0)) * float(ing.get('cost_per_unit', 0))
            except Exception:
                pass
        prod['total_cost'] = round(total, 2)


class MockHandler(http.server.BaseHTTPRequestHandler):
    def _set_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    def _log_request(self, body_bytes=b''):
        try:
            with open('/tmp/mock_api_requests.log', 'a') as f:
                f.write(f"-----\n{time.strftime('%Y-%m-%d %H:%M:%S')}\n")
                f.write(f"Remote: {self.client_address}\n")
                f.write(f"Method: {self.command} Path: {self.path}\n")
                # headers
                for k, v in self.headers.items():
                    f.write(f"{k}: {v}\n")
                if body_bytes:
                    try:
                        f.write("Body: ")
                        f.write(body_bytes.decode('utf-8', errors='replace'))
                        f.write("\n")
                    except Exception:
                        f.write("Body: <binary>\n")
                f.write("-----\n")
        except Exception:
            pass

    def do_OPTIONS(self):
        self.send_response(204)
        self._set_cors_headers()
        self.end_headers()

    def do_GET(self):
        # debug endpoint to inspect in-memory DB
        if self.path == '/__debug/db':
            self.send_response(200)
            self._set_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            try:
                self.wfile.write(json.dumps(DB).encode())
            except Exception:
                self.wfile.write(b"{}")
            return

        # seed endpoint to populate DB with example data
        if self.path == '/__debug/seed':
            # log the request
            self._log_request()
            try:
                seed_db()
                self.send_response(200)
                self._set_cors_headers()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'ok': True, 'seeded_counts': {k: len(v) for k, v in DB.items()}}).encode())
            except Exception as e:
                self.send_response(500)
                self._set_cors_headers()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'ok': False, 'error': str(e)}).encode())
            return

        # normal API handling
        self._log_request()
        parsed = urlparse(self.path)
        if not parsed.path.startswith('/api/'):
            self.send_response(404)
            self.end_headers()
            return
        parts = parsed.path[len('/api/'):].strip('/').split('/')
        resource = parts[0] if parts and parts[0] else ''
        if resource == '':
            # list available resources
            self.send_response(200)
            self._set_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({k: len(v) for k, v in DB.items()}).encode())
            return
        if len(parts) == 1:
            # return list
            items = DB.get(resource, [])
            # normalize products for UI: ensure id exists and add summary fields
            if resource == 'products':
                normalized = []
                for it in items:
                    prod = dict(it)
                    # ensure id
                    if 'id' not in prod:
                        prod['id'] = None
                    # ingredients list normalization
                    ings = prod.get('ingredients', []) or []
                    prod['ingredients_count'] = len(ings)
                    total = 0.0
                    for ing in ings:
                        try:
                            q = float(ing.get('quantity', 0))
                            c = float(ing.get('cost_per_unit', 0))
                            total += q * c
                        except Exception:
                            pass
                    prod['total_cost'] = round(total, 2)
                    normalized.append(prod)
                items = normalized
            self.send_response(200)
            self._set_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(items).encode())
            return
        # single item
        item_id = parts[1]
        items = DB.get(resource, [])
        for it in items:
            if str(it.get('id')) == item_id:
                self.send_response(200)
                self._set_cors_headers()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(it).encode())
                return
        self.send_response(404)
        self._set_cors_headers()
        self.end_headers()

    def do_POST(self):
        parsed = urlparse(self.path)
        if not parsed.path.startswith('/api/'):
            self.send_response(404); self.end_headers(); return
        resource = parsed.path[len('/api/'):].strip('/').split('/')[0]
        length = int(self.headers.get('Content-Length', 0))
        data = self.rfile.read(length) if length else b'{}'
        # log request with body
        self._log_request(body_bytes=data)
        payload = json.loads(data.decode() or '{}')
        items = DB.setdefault(resource, [])
        new_id = (max([i.get('id',0) for i in items]) + 1) if items else 1
        payload['id'] = new_id
        items.append(payload)
        self.send_response(201)
        self._set_cors_headers()
        self.send_header('Content-Type','application/json')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode())

    def do_PUT(self):
        parsed = urlparse(self.path)
        if not parsed.path.startswith('/api/'):
            self.send_response(404); self.end_headers(); return
        parts = parsed.path[len('/api/'):].strip('/').split('/')
        resource = parts[0]
        if len(parts) < 2:
            self.send_response(400); self.end_headers(); return
        item_id = parts[1]
        length = int(self.headers.get('Content-Length', 0))
        data = self.rfile.read(length) if length else b'{}'
        # log request with body
        self._log_request(body_bytes=data)
        payload = json.loads(data.decode() or '{}')
        items = DB.setdefault(resource, [])
        for idx, it in enumerate(items):
            if str(it.get('id')) == item_id:
                payload['id'] = int(item_id)
                items[idx] = payload
                self.send_response(200)
                self._set_cors_headers()
                self.send_header('Content-Type','application/json')
                self.end_headers()
                self.wfile.write(json.dumps(payload).encode())
                return
        # if not found, create
        payload['id'] = int(item_id)
        items.append(payload)
        self.send_response(201)
        self._set_cors_headers()
        self.send_header('Content-Type','application/json')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode())

    def do_DELETE(self):
        parsed = urlparse(self.path)
        if not parsed.path.startswith('/api/'):
            self.send_response(404); self.end_headers(); return
        self._log_request()
        parts = parsed.path[len('/api/'):].strip('/').split('/')
        resource = parts[0]
        if len(parts) < 2:
            self.send_response(400); self.end_headers(); return
        item_id = parts[1]
        items = DB.setdefault(resource, [])
        new_items = [it for it in items if str(it.get('id')) != item_id]
        DB[resource] = new_items
        self.send_response(204)
        self._set_cors_headers()
        self.end_headers()

    def log_message(self, format, *args):
        # reduce logging noise
        sys.stdout.write("%s - - %s\n" % (self.address_string(), format%args))

if __name__ == '__main__':
    with socketserver.TCPServer(('0.0.0.0', PORT), MockHandler) as httpd:
        print(f"Mock API running on 0.0.0.0:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nStopping mock')
            httpd.server_close()
