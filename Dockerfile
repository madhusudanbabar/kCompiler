FROM node:latest
WORKDIR /kCompiler
COPY . /kCompiler
RUN apt update && apt upgrade -y
RUN apt install python python3 build-essential -y
RUN npm install
CMD npm start
EXPOSE 3000