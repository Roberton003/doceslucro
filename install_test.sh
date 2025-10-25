#!/bin/bash

echo "📦 Instalando groq localmente..."
pip install groq==0.9.0 --quiet

echo "✅ Groq instalado!"
echo ""
echo "🔍 Testando imports novamente..."

cd /media/Arquivos/DjangoPython/DocesGIamor
python3 test_imports.py
