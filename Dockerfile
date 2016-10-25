FROM node:6.9.1-slim

EXPOSE 3000
ENV APP_ENV=production

COPY initializers/ /initializers
COPY node_modules/ /node_modules
COPY public/ /public
COPY src/ /src
COPY .babelrc /.babelrc

CMD node -r 'babel-core/register' /initializers/server/index.js
