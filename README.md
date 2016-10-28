# flavorprint

## Running project locally

First install all dependencies
```bash
npm install
```

### In development mode

```bash
npm run start:dev
```

### In production mode

```bash
NODE_ENV=production npm run build
NODE_ENV=production APP_ENV=production APP_DOMAIN=localhost SERVE_ASSETS=1 PORT=3000 npm run start
```

## Building the project

```bash
npm install
NODE_ENV=production npm run build
docker build -t flavorprint/flavorprint:0.0.1 .
```

### Testing container locally

```bash
docker run --name fp -p 3000:3000 -e APP_DOMAIN=localhost flavorprint/flavorprint:0.0.1
```

Then navigate to http://localhost:3000
