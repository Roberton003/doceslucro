#!/usr/bin/env bash
set -euo pipefail

API_URL=${API_URL:-http://localhost:8000/api}
EMAIL=${EMAIL:-admin@gidoces.com}
PASS=${PASS:-admin123}

echo "[simulate] POST $API_URL/token/"
TOKENS=$(curl -s -X POST "$API_URL/token/" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")
ACCESS=$(echo "$TOKENS" | python3 -c 'import sys,json
try:
    print(json.load(sys.stdin).get("access",""))
except Exception:
    print("")')
REFRESH=$(echo "$TOKENS" | python3 -c 'import sys,json
try:
    print(json.load(sys.stdin).get("refresh",""))
except Exception:
    print("")')

if [ -z "$ACCESS" ]; then
  echo "Failed to get access token. Response: $TOKENS"
  exit 2
fi

echo "[simulate] saving tokens to ./tmp_localstorage.json"
mkdir -p tmp
cat > tmp/localstorage.json <<EOF
{
  "access_token": "$ACCESS",
  "refresh_token": "$REFRESH"
}
EOF

echo "[simulate] GET $API_URL/users/profile/"
curl -s -D - -H "Authorization: Bearer $ACCESS" "$API_URL/users/profile/" | sed -n '1,200p'

echo "[simulate] GET /api/dashboard/ (if exists)"
curl -s -D - -H "Authorization: Bearer $ACCESS" "$API_URL/dashboard/" | sed -n '1,200p' || true

echo "[simulate] done. tokens saved in tmp/localstorage.json"
