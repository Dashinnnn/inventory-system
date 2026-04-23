FROM node:18-alpine

WORKDIR /app

# Copy the root package files for the monorepo
COPY package*.json ./
COPY turbo.json ./

# Copy the backend specific files
COPY apps/ims_api ./apps/ims_api

# Install dependencies
RUN npm install --ignore-scripts --no-audit --include=dev || npm install --force

# Command to run the backend
CMD ["npm", "run", "dev", "--prefix", "apps/ims_api"]

