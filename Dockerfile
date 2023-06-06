FROM node:16.14.0-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
ADD . .
CMD npm start
EXPOSE 8080
