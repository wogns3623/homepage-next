# syntax=docker/dockerfile:1

FROM node:16.15
WORKDIR /hompage-next
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
EXPOSE 80