# ==== Build Stage =====
FROM alpine:latest AS build

WORKDIR /app

# copy source files and package.json
COPY src/ /app/src/

COPY tsconfig.json /app/
COPY package.json /app/
COPY package-lock.json /app/

# install node and dependencies
RUN apk add --no-cache nodejs npm
RUN npm install

# build
RUN npm run build

# ==== Production Stage =====
FROM alpine:latest

# for linking to source repository
LABEL org.opencontainers.image.source=https://github.com/pallandos/mini-monitoring

WORKDIR /app

# copy built files and package.json
COPY --from=build /app/dist/ /app/dist/
COPY package.json /app/
COPY package-lock.json /app/

# install node and production dependencies
RUN apk add --no-cache nodejs npm
RUN npm ci --only=production

# expose port
EXPOSE 3000

# start the application
CMD ["node", "dist/index.js"]