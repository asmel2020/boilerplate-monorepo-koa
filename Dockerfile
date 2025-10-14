# ----------------------------------------------------
# Etapa 1 - Dependencias y build
# ----------------------------------------------------
FROM node:22.16.0-slim AS build

WORKDIR /app

# Copiamos manifests primero para aprovechar la cache de Docker
COPY package.json lerna.json  rspack.config.ts yarn.lock ./

COPY packages ./packages

# Instalar dependencias
RUN yarn install

# Build del proyecto (si es TypeScript)
RUN yarn build:prod

# ----------------------------------------------------
# Etapa 2 - Runtime ligero
# ----------------------------------------------------
FROM node:22.16.0-slim

WORKDIR /app

# Copiar dependencias node_modules compiladas
#COPY --from=build /app/node_modules ./node_modules
# Copiar build final o código fuente
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .

# Exponer puerto de Koa
EXPOSE 3000

# Comando de ejecución
CMD ["node", "dist/server.js"]