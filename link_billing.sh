#!/bin/bash
set -e

# Configuration - Detected from your previous run
BILLING_ID="011A96-E4D503-36BB21" 
PROJECT_ID="doces-giamor-prod"

echo "🍬 DocesGIamor - Billing Recovery & Deploy 🍬"
echo "==============================================="

# 1. Link Billing (Auto-Corrected)
echo "[1/4] Linking Billing Account '$BILLING_ID' to '$PROJECT_ID'..."
gcloud beta billing projects link $PROJECT_ID --billing-account=$BILLING_ID

# 2. Set Context
echo "[2/4] Setting active project..."
gcloud config set project $PROJECT_ID

# 3. Enable APIs
echo "[3/4] Enabling APIs (Cloud Run, SQL, Build)..."
gcloud services enable cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    run.googleapis.com \
    sqladmin.googleapis.com \
    secretmanager.googleapis.com

# 4. Deploy
echo "[4/4] Resuming Deployment..."
gcloud builds submit --config cloudbuild.yaml .

echo ""
echo "🎉 RECOVERY COMPLETE! App is deploying."
