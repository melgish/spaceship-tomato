# spaceship-tomato
You say tomato but I say tomato.  A database for tracking my bucket gardening.

## First Time Setup

**IMPORTANT** copy `.env.sample` to `.env` file and change all the credentials. The development environment expects database to run locally in docker container.  Do this by running the following commands:

```sh
# start the database container
docker compose up -d tomato-db
```

## NPM Commands

### Install or Update dependencies
First, verify the database is running. Otherwise some of the commands below will fail

```sh
# install dependencies
npm ci
# generate prisma client
npm run prisma generate
```

### Common development Tasks
```sh
# Create migration after schema changes
npm run prisma migrate dev
# Deploy migration (like in production)
npm run prisma migrate deploy
# Run the ui in dev mode
npm run dev
# Run a production build
npm run build
# Run unit tests with coverage
npm run test -- --coverage
# Run lint and (maybe) formatting
npm run lint -- --fix
```

# Docker commands

These commands leverage the compose file in the project. You can override
anything in the file by copying it to `compose.override.yaml` and making any changes.

```sh
# Build the UI container
docker compose build tomato-ui
# Push the UI container to local repo
docker compose push tomato-ui
# Build and run a production build test
docker compose up -d --build tomato-ui
```