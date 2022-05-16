# syntax=docker/dockerfile:1

FROM node:16.15

ENV NODE_ENV=production
WORKDIR /hompage-next
COPY . .
RUN yarn build
CMD ["yarn", "start"]
EXPOSE 80