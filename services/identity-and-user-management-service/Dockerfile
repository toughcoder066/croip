FROM node:24-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts && npm cache clean --force

FROM dependencies AS build
COPY prisma ./prisma
RUN npx prisma generate
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM build AS migration
CMD ["npm", "run", "prisma:deploy"]

FROM build AS production-dependencies
RUN npm prune --omit=dev

FROM node:24-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN groupadd --system --gid 10001 idarms && useradd --system --uid 10001 --gid idarms idarms
COPY --from=production-dependencies --chown=idarms:idarms /app/node_modules ./node_modules
COPY --from=build --chown=idarms:idarms /app/dist ./dist
COPY --from=build --chown=idarms:idarms /app/prisma ./prisma
COPY --from=build --chown=idarms:idarms /app/package.json ./package.json
USER 10001
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD ["node", "-e", "fetch('http://127.0.0.1:3000/health/live').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]
CMD ["node", "dist/src/server.js"]
