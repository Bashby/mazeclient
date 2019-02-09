FROM node:10

# Init environment
WORKDIR /usr/src/app

# Install deps
COPY package*.json ./
RUN npm install

# Bundle app
COPY . .

# Start app
EXPOSE 8080
EXPOSE 8081
CMD [ "npm", "run", "dev"]
