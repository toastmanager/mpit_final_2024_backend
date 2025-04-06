FROM node:23-bullseye-slim
RUN corepack enable

# Installing dependecies
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Install Python (required for some LangChain dependencies)
RUN apt-get update && apt-get install -y python3 g++ make && rm -rf /var/lib/apt/lists/*

# Generating prisma files
COPY /prisma ./prisma
RUN yarn prisma generate

# Building app
COPY . .
RUN yarn build

# Removing source files
RUN rm -rf /src
RUN rm -rf /prisma
RUN rm -rf /test

# Running app
ENV NODE_ENV=production
ENTRYPOINT [ "sh", "entrypoint.sh" ]