# mazeclient

Browser client for maze game concept.

# Getting started

## Dependencies

You need [node](https://nodejs.org/en/) and optionally [docker](https://www.docker.com/products/docker-desktop).

## Building

### Docker

> **Note**: Run `docker network create maze-network` on first run.

`docker-compose up --build maze-client`

### Local

`npm install`

`npm run dev`

## Interacting

Navigate to `http://localhost:8080` in your browser.

We use [parcel](https://parceljs.org/) during development for hot-relading.

# Building

You can build the client for production.

`npm run build`
