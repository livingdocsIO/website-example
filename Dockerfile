FROM node:8-alpine

ADD . /app
WORKDIR /app

RUN npm install
RUN npm run design:build

EXPOSE 8080

CMD ["npm", "run", "start:website"]
