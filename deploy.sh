#!/bin/bash

# Build and push Docker image
docker buildx build --platform linux/amd64 -t gcr.io/river-imprint-368914/nestjs-test-app . --push

# Deploy to Cloud Run
gcloud run deploy nestjs-test-app \
  --image gcr.io/river-imprint-368914/nestjs-test-app \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --env-vars-file .env.yaml
