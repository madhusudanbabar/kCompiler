FROM node:latest
WORKDIR /kCompiler
COPY . /kCompiler
RUN npm install
CMD node index.js
EXPOSE 3000