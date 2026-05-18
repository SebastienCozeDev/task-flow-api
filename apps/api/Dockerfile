FROM node:24-slim AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY apps/api/package.json apps/api/package.json

RUN npm ci

COPY apps/api apps/api

RUN npm run build -w apps/api
RUN npm prune --omit=dev

FROM node:24-slim AS production

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/apps/api ./apps/api

WORKDIR /usr/src/app/apps/api

USER node

EXPOSE 3000

CMD ["sh", "-c", "sleep 5 && npm run migration:run && node dist/main"]