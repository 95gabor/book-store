ARG TAG=20.18.0-alpine3.19
ARG CI=true
ARG PORT=3000

FROM node:${TAG} AS prepare

USER node
WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm ci

COPY --chown=node . .


FROM prepare AS build

RUN npm run build


FROM node:${TAG} AS dependencies

USER node
WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm ci --only=production

FROM dependencies AS production

COPY --from=build --chown=node /home/node/app/dist ./dist
ENV HOST=0.0.0.0 PORT=${PORT}

EXPOSE ${PORT}

CMD  ["npm","run","start:prod"]
