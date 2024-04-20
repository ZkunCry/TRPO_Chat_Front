FROM node:18-alpine
WORKDIR /trpo-front

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm","start" ] 