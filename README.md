# ECommerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## to get the database 
  
  npx json-server db.json

## install bootsrap 
 ## (steps)--> 
  
  1---> ng add @ng-bootstrap/ng-bootstrap
  2---> go to "angular.json"
  
   "styles": [
       "node_modules/bootstrap/dist/css/bootstrap.min.css"
   ]

   ## and

   "scripts": [
       "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    ]




  ***************************how to deploy the project   follow the below steps(you can ask to chatgpt  also ***********************************



  @echo off
echo ► Building Angular App...
ng build --base-href /E-Commerce/


rmdir /s /q temp-deploy
mkdir temp-deploy

echo ► Copying new build output...
xcopy dist\E-Commerce\browser\* temp-deploy\ /E /H /C /Y  ----------->>>  or you can copy the content of the folder browser folder contents in to temp-deploy folder

echo ► Deploying to GitHub Pages...
npx angular-cli-ghpages --dir=./temp-deploy

echo ► DONE! Visit: https://dheeraj6392.github.io/E-Commerce/
pause
