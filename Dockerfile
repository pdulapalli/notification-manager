FROM node:14-alpine

RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /workspace

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json

RUN npm ci

COPY ./src ./src
RUN npm run build
RUN npm prune --production

RUN ls -la

CMD [ "node", "./dist/app.js" ]