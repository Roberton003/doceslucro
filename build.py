#!/usr/bin/env python3
"""
Build script para Render - executa build do frontend + backend
"""
import os
import subprocess
import sys

def run_command(cmd, cwd=None):
    """Executa um comando e retorna o status"""
    print(f"\n{'='*60}")
    print(f"Executando: {cmd}")
    print(f"{'='*60}\n")
    
    result = subprocess.run(cmd, shell=True, cwd=cwd)
    if result.returncode != 0:
        print(f"\n❌ Comando falhou: {cmd}")
        sys.exit(1)
    return result.returncode

# 1. Build Frontend
print("📦 PASSO 1: Build Frontend")
os.chdir("frontend")
run_command("npm ci --legacy-peer-deps", cwd=".")
run_command("npm run build", cwd=".")
os.chdir("..")

# 2. Setup Backend
print("\n📚 PASSO 2: Setup Backend")
run_command("pip install -r requirements.txt", cwd="backend")

print("\n✅ Build concluído com sucesso!")
