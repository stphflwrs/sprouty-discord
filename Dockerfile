FROM node:dubnium-alpine AS builder

WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:dubnium-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --ignore-scripts --frozen-lockfile
COPY --from=builder /home/node/app/build ./build

CMD yarn start
