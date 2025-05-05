FROM node:22.15.0

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "./src/service.js"]
