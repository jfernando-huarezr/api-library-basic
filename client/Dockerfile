FROM --platform=linux/amd64 node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit-dev
COPY . . 

CMD ["npm", "run", "dev"]