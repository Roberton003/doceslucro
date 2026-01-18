#!/bin/bash
set -e

# Configuration
NEW_PROJECT_ID="doces-giamor-prod"
BILLING_ACCOUNT_ID="" # Optional: If you know it, fill it here. Otherwise script will prompt/list.

echo "🍬 DocesGIamor - Independent GCP Setup 🍬"
echo "============================================"

# 1. Check Auth
echo "[1/6] Checking Authentication..."
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
    echo "⚠️  You are not logged in."
    echo "Launching browser for authentication..."
    gcloud auth login
else
    echo "✅ Authenticated as $(gcloud auth list --filter=status:ACTIVE --format="value(account)")"
fi

# 2. Check/Create Project
echo "[2/6] Verifying Project '$NEW_PROJECT_ID'..."
if gcloud projects describe $NEW_PROJECT_ID > /dev/null 2>&1; then
    echo "✅ Project '$NEW_PROJECT_ID' already exists."
else
    echo "Creating project '$NEW_PROJECT_ID'..."
    gcloud projects create $NEW_PROJECT_ID --name="Doces GIamor"
    echo "✅ Project created."
fi

# 3. Link Billing (Crucial Step)
echo "[3/6] Checking Billing..."
BILLING_ENABLED=$(gcloud beta billing projects describe $NEW_PROJECT_ID --format="value(billingEnabled)")

if [ "$BILLING_ENABLED" != "true" ]; then
    echo "⚠️  Billing is NOT enabled for this project."
    echo "Please select a billing account to link:"
    gcloud beta billing accounts list
    
    echo "Enter the Billing Account ID from the list above:"
    read BILLING_ID
    
    if [ -n "$BILLING_ID" ]; then
        gcloud beta billing projects link $NEW_PROJECT_ID --billing-account=$BILLING_ID
        echo "✅ Billing linked."
    else
        echo "❌ No Billing ID provided. Exiting."
        exit 1
    fi
else
    echo "✅ Billing is already enabled."
fi

# 4. Set Project Context
echo "[4/6] Setting active project..."
gcloud config set project $NEW_PROJECT_ID

# 5. Enable APIs
echo "[5/6] Enabling necessary APIs (Cloud Run, Artifact Registry, etc)..."
gcloud services enable cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    run.googleapis.com \
    sqladmin.googleapis.com \
    secretmanager.googleapis.com

# 6. Deploy
echo "[6/6] Launching Deployment via Cloud Build..."
echo "🚀 Submitting build..."
gcloud builds submit --config cloudbuild.yaml .

echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "Your app should now be live on Cloud Run in the '$NEW_PROJECT_ID' project."
echo "Check the URL above."
