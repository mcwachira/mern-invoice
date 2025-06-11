ARG NODE_VERSION=20.19.2-alpine

FROM    node:${NODE_VERSION}

LABEL name="mern-invoice"
LABEL license="MIT"
LABEL description="Mern invoice Image"

# Install pnpm globally
RUN npm install -g pnpm

ENV NODE_ENV=development

# Set working dir at the root of the monorepo
WORKDIR /app

RUN addgroup --system invoice \
    && adduser --system --ingroup invoice invoice


# Copy monorepo root files
COPY ../../pnpm-workspace.yaml ./
COPY ../../package.json ./
COPY ../../pnpm-lock.yaml ./
COPY ../../.npmrc ./

 # Copy only necessary packages (install step)
COPY ../../apps/api/package.json ./apps/api/

# Install only the workspace dependencies
RUN pnpm install --frozen-lockfile

# Copy full source (after install step to benefit from Docker layer caching)
COPY --chown=invoice:invoice ../../ ./

# Set permissions
RUN chown -R invoice:invoice /app

USER invoice

# Enter the API directory
WORKDIR /app/apps/api

# Start dev script
CMD ["pnpm", "run", "dev"]
