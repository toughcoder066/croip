FROM node:24-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json ./
RUN npm install --ignore-scripts && npm cache clean --force

FROM dependencies AS build
COPY prisma ./prisma
RUN npx prisma generate
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM build AS migration
CMD ["npm", "run", "prisma:deploy"]

FROM node:24-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN groupadd --system --gid 10001 croip && useradd --system --uid 10001 --gid croip croip
COPY --from=build --chown=croip:croip /app/node_modules ./node_modules
COPY --from=build --chown=croip:croip /app/dist ./dist
COPY --from=build --chown=croip:croip /app/prisma ./prisma
COPY --from=build --chown=croip:croip /app/package.json ./package.json
USER 10001
EXPOSE 3021
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD ["node", "-e", "fetch('http://127.0.0.1:3021/health/live').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]
CMD ["node", "dist/server.js"]
