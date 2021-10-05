# syntax=docker/dockerfile:1
FROM node

ARG env
ARG port

ENV NODE_ENV=${env}
ENV PROJECT_ROOT=/app
ENV SERVER_PORT=${port}

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --include=dev

COPY . .

CMD [ "npm", "run", "start"]
