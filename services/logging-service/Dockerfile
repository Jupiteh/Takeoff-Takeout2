FROM node:20.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3004

CMD ["node", "dist/index.js"]
