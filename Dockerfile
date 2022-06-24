FROM node:16-alpine

RUN apk add --no-cache bash

WORKDIR /home/node/app

COPY . .

RUN npm install
RUN npm run compile
RUN ls -l

CMD [ "npm", "start" ]

EXPOSE 3333