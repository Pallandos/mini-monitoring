FROM alpine:latest

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

# expose port
EXPOSE 3000

# start the application
CMD ["npm", "run", "start"]