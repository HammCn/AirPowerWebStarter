FROM node:16-alpine

WORKDIR /action

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT ["node", "/action/index.js"]
