# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the project
COPY . .

# Build the Vite app
RUN npm run build


# ---- Production stage ----
FROM nginx:stable-alpine AS production

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom nginx config (good for React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

