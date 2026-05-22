# ── Stage 1: Build ────────────────────────────────
FROM node:18-bookworm-slim AS builder

WORKDIR /app

# Install OpenSSL (required by Prisma engine)
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client targeting this exact OS
RUN npx prisma generate

# ── Stage 2: Production ───────────────────────────
FROM node:18-bookworm-slim

WORKDIR /app

# Install OpenSSL in production image too
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app .

EXPOSE 8080

CMD ["npm", "start"]
