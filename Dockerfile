# syntax=docker/dockerfile:1

FROM node:16.15
ENV NODE_ENV=production

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn", "start", "-p 80"]
EXPOSE 80