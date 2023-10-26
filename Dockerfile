FROM node:16.19-alpine3.17 as base


COPY package.json ./
COPY yarn.lock ./
ARG NPM_TOKEN  
RUN echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc
RUN ["yarn", "install", "--frozen-lockfile", "--ignore-scripts"]
RUN rm -f .npmrc

COPY . .

RUN ["yarn", "build"]

FROM alpine:3.14 as web

COPY --from=base /build /build
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN apk add nginx
COPY nginx.config /etc/nginx/http.d/default.conf
CMD /docker-entrypoint.sh
