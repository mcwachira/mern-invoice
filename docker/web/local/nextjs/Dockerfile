ARG NODE_VERSION=20.19.2-alpine

FROM    node:${NODE_VERSION}

# Install pnpm globally
RUN npm install -g pnpm

# Set working dir at the root of the monorepo
WORKDIR /app

# Copy monorepo root files
COPY ../../pnpm-workspace.yaml ./
COPY ../../package.json ./
COPY ../../pnpm-lock.yaml ./
COPY ../../.npmrc ./

 # Copy only necessary packages (install step)
COPY ../../apps/web/package.json ./apps/web/

# Install only the workspace dependencies
RUN pnpm install --filter ./apps/web...

# Copy full source (after install step to benefit from Docker layer caching)
COPY . .


# Enter the web directory
WORKDIR /app/apps/api

# Start dev script
CMD ["pnpm", "run", "dev"]
