#!/bin/bash
# Load environment variables from .env.local into current shell session

if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
  echo "✅ Environment variables loaded from .env.local"
  echo "   NEXT_PUBLIC_SANITY_PROJECT_ID: $NEXT_PUBLIC_SANITY_PROJECT_ID"
  echo "   NEXT_PUBLIC_SANITY_DATASET: $NEXT_PUBLIC_SANITY_DATASET"
else
  echo "❌ .env.local file not found"
fi
