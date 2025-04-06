#!/bin/bash

yarn prisma db push --accept-data-loss 
node dist/src/main 