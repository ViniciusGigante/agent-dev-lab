FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN mkdir -p /app/data

EXPOSE 3000

CMD ["npm", "start"]