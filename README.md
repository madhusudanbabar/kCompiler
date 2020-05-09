# Compiler


  Last month, i had a training on docker by Mr. Vimal daga sir, under the linuxWorld India. this was a full fledged training for beginners to the professionals, under this training program, we learnt the docker from installation to creating our own repository of images on docker hub. 
  As a part of this training, we were supposed to complete a project using the concepts of docker, and here i have created an online compiler based on the docker.
This project is an example of an online compiler for technically any programming language but in this version i have implemented support for only three languages C, C++, and python,
User can write code directly into the editor or upload the program file,
This file will be sent to the server over http POST method, where the file will be executed on a docker container and output will be processed and the response will be sent back to the user
  This project is built using Angular framework for user interface / frontend & some material touch is given and express framework ( nodejs) is used for backend processing the data.

you can get the image from docker hub `docker pull krypto9/kcompiler:v2`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
