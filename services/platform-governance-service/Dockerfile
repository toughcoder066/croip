FROM node:24-bookworm-slim AS base
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

FROM base AS dependencies
WORKDIR /app
COPY package.json ./
RUN npm install --ignore-scripts && npm cache clean --force

FROM dependencies AS build
COPY prisma ./prisma
RUN npx prisma generate
COPY tsconfig.json ./
COPY src ./src
RUN npm run build
RUN cp -r src/generated dist/src/

FROM build AS migration
CMD ["npx", "prisma", "db", "push", "--skip-generate"]

FROM build AS production-dependencies
RUN npm prune --omit=dev

FROM base AS runtime
ARG PORT=3010
ENV NODE_ENV=production
ENV PORT=${PORT}
ENV HOST=0.0.0.0
WORKDIR /app
RUN groupadd --system --gid 10001 idarms && useradd --system --uid 10001 --gid idarms idarms
COPY --from=production-dependencies --chown=idarms:idarms /app/node_modules ./node_modules
COPY --from=build --chown=idarms:idarms /app/dist ./dist
COPY --from=build --chown=idarms:idarms /app/prisma ./prisma
COPY --from=build --chown=idarms:idarms /app/package.json ./package.json
USER 10001
EXPOSE ${PORT}
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD ["node", "-e", "fetch('http://127.0.0.1:' + (process.env.PORT || 3010) + '/health/live').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]
CMD ["node", "dist/src/server.js"]
