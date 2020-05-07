FROM node:latest
WORKDIR /kCompiler
COPY . /kCompiler
RUN npm install
CMD node server.js
EXPOSE 3000