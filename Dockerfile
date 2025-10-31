# Install dependencies only when needed
# Desde aqui montamos la primera  imagen donde unicamente vamos a crear
# o instalar las dependencias, de esta forma las mantendremos en cache y no se volveran
# a instalar si no hay cambios en el package.json o el yarn.lock
# Asi cada vez que mandemos ejecutamos el yarn install no se volveran a descargar las dependencias
# unicamente las nuevas y esto optimiza mucho el proceso de build, lo hace mas rapido y eficiente
FROM node:24-alpine3.21 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
#-----end dependencies install  -----#




# Build the app with cache dependencies
# En esta segunda etapa copiamos las dependencias (node_modules) que ya estan instaladas en la
# primera etapa y copiamos el resto de archivos del proyecto para proceder a construir
FROM node:24-alpine3.21 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Copiamos el resto de archivos del proyecto
# COPY . . es como si estuvieramos haciendo . ./app
COPY . .
RUN yarn build
#-----end build app with cache -----#



# Production image, copy all the files and run next
FROM node:24-alpine3.21 AS runner

# Set working directory
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --prod

# Copiamos desde la etapa builder el directorio dist
# Builder es el nombre que le dimos a la segunda etapa o la imagen anterior
COPY --from=builder /app/dist ./dist

# # Copiar el directorio y su contenido
# RUN mkdir -p ./pokedex

# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# # Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser ./pokedex
# USER pokeuser

# EXPOSE 3000

CMD [ "node","dist/main" ]