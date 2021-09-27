FROM node:14-alpine

RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /workspace

COPY ./*.json ./

RUN npm ci

COPY ./src ./src
RUN npm run build
RUN npm prune --production

RUN ls -la

CMD [ "node", "./dist/app.js" ]