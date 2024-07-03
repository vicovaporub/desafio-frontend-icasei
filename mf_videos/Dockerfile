FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i -g live-server
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002
CMD ["npm", "start"]