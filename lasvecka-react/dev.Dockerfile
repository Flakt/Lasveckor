FROM node:lts-slim as builder

WORKDIR /app

COPY . .

RUN yarn

CMD yarn start

EXPOSE 3000
