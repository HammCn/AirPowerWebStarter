FROM node:14-alpine

WORKDIR /action

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT ["node", "/action/index.js"]
