## Aplicacion rest server

recuerden ejecutar ```npm install``` para las librerias

git tag -a v0.0.1 -m "Alpha inicio de proyecto"
git push --tags

//Crea un repositorio de heroku aleatorio
heroku create 

git remote -v

//Sube el repositorio de heroku
git push heroku master

//Necesitamos darle un start
"scripts": {
        "start": "node server/server.js",

