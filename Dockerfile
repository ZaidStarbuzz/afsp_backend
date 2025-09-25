# Use the official Node.js 18 image
FROM node:22 AS builder

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# =====================
# Production stage
# =====================
FROM node:22 AS production

WORKDIR /app

# Only copy necessary files
COPY package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV PORT=8080

# Expose port
EXPOSE 8080

# Start the app
CMD ["node", "dist/main.js"]
