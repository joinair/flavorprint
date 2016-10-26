FROM node:6.9.1-slim

ENV PORT=3000
ENV APP_DOMAIN=fp.whisk.com
ENV APP_ENV=production
ENV SERVE_ASSETS=1

EXPOSE ${PORT}

COPY initializers/ /initializers
COPY node_modules/ /node_modules
COPY public/ /public
COPY src/ /src
COPY .babelrc /.babelrc

CMD NODE_ENV=production node -r 'babel-core/register' /initializers/server/index.js
