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

# Copy monorepo root config
COPY ../../pnpm-workspace.yaml ./
COPY ../../package.json ./

# Copy API package.json
COPY ../../apps/api/package.json ./apps/api/

# Install dependencies only for the API
RUN pnpm install --filter ./apps/api...

# Copy full source code (can optimize with .dockerignore)
COPY --chown=invoice:invoice ../../ ./

# Set correct permissions for running as non-root
RUN chown -R invoice:invoice /app

USER invoice

# Set working directory to API subfolder
WORKDIR /app/apps/api

# Run in dev mode
CMD ["pnpm","run", "dev"]
