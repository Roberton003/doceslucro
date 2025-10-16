#!/usr/bin/env python3
import requests
import time

BASE = 'http://localhost:8001'

print('1) Criando produto de teste...')
prod = {
    'name': 'Teste Produto CI',
    'serves': 2,
    'ingredients': []
}
resp = requests.post(f'{BASE}/api/products/', json=prod)
print('POST status', resp.status_code)
created = resp.json()
print('Created:', created)
prod_id = created.get('id')

print('2) Atualizando produto adicionando ingrediente...')
created['ingredients'].append({'name':'Ingrediente CI','quantity':100,'unit':'g','cost_per_unit':0.1})
resp2 = requests.put(f'{BASE}/api/products/{prod_id}/', json=created)
print('PUT status', resp2.status_code)
updated = resp2.json()
print('Updated:', updated)

print('3) Buscando produto e validando...')
resp3 = requests.get(f'{BASE}/api/products/{prod_id}/')
print('GET status', resp3.status_code)
product = resp3.json()
print('Product:', product)

# validate
ings = product.get('ingredients', [])
if any(i.get('name') == 'Ingrediente CI' for i in ings):
    print('TEST OK: ingrediente encontrado')
    exit(0)
else:
    print('TEST FAIL: ingrediente não encontrado')
    exit(2)
