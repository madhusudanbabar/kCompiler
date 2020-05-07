FROM node:latest
WORKDIR /kCompiler
COPY package.json /kCompiler
RUN npm install
COPY . /kCompiler
CMD node index.js
EXPOSE 3000