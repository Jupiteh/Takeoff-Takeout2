FROM node:20.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm install typescript -g  # Ensure typescript is installed globally
RUN npx tsc

RUN npm run build

EXPOSE 3006

CMD ["node", "dist/index.js"]
