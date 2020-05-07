FROM node:latest
WORKDIR /kCompiler
COPY . /kCompiler
RUN apt update && apt upgrade
RUN apt install python python3 build-essential
RUN npm install
CMD node server.js
EXPOSE 3000