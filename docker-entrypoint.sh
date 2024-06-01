#!/usr/bin/env sh
if [ "$DATABASE_AUTO_MIGRATE" == "true" ]; then
  npx prisma migrate deploy
fi

node server.js