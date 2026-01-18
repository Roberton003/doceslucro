#!/bin/bash
set -e

PROJECT_ID="doces-giamor-prod"
USER_EMAIL="roberto.m0010@gmail.com"

echo "🔧 Fixing Permissions & Retrying Deploy for $PROJECT_ID"
echo "====================================================="

# 1. Grant explicit permissions to your user (to ensure allow list)
echo "[1/3] Granting Cloud Build permissions to $USER_EMAIL..."
# Ignoramos erros do add-iam no caso de já existirem, para não parar o script
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="user:$USER_EMAIL" \
    --role="roles/cloudbuild.builds.editor" > /dev/null 2>&1 || true

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="user:$USER_EMAIL" \
    --role="roles/storage.admin" > /dev/null 2>&1 || true

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="user:$USER_EMAIL" \
    --role="roles/serviceusage.serviceUsageConsumer" > /dev/null 2>&1 || true

echo "✅ Permissions updated."

# 2. Wait for propagation
echo "⏳ Waiting 30 seconds for Cloud permissions to propagate (Crucial)..."
sleep 30

# 3. Retry Deploy
echo "[3/3] Retrying Deployment..."
gcloud builds submit --config cloudbuild.yaml . --project $PROJECT_ID
