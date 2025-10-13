#!/usr/bin/env bash
set -euo pipefail

# Simple smoke test: POST /api/token/ then GET /api/users/profile/
API_URL=${API_URL:-http://localhost:8000/api}
EMAIL=${EMAIL:-admin@gidoces.com}
PASS=${PASS:-admin123}

echo "POST $API_URL/token/ with $EMAIL"
RESP=$(curl -s -X POST "$API_URL/token/" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")

# Robust extraction: pipe JSON to python3 to avoid here-doc issues with large tokens/newlines
ACCESS=$(echo "$RESP" | python3 -c 'import sys, json
try:
  data = json.load(sys.stdin)
  print(data.get("access", ""))
except Exception:
  sys.exit(0)')

if [ -z "$ACCESS" ]; then
  echo "\nFailed to get access token. Response:\n$RESP"
  exit 2
fi

echo "Access token obtained (len=${#ACCESS})"
echo "\nGET $API_URL/users/profile/"
curl -s -D - -H "Authorization: Bearer $ACCESS" "$API_URL/users/profile/" | sed -n '1,120p'

echo "\nSmoke test completed."
