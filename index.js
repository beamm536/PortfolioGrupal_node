/*
COMANDOS PARA METER POR TERMINAL ANTES DE EMPEZAR A CREAR FILES
npm init
npm i express
npm i express-handlebars
nodemon (para iniciar el proyecto)
*/

//IMPORTACIONES
const express = require("express");
const exphbs = require("express-handlebars");

//servidor aplicaciones
const app = express();

//config handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));//ruta para acceder a recursos estaticos --> lo q nos cargaria de la carpeta publica de plantilla q hemos incorporado

app.get('/', (req, res) => {
    res.render('index', { 
        titulo: 'Página Principal_portfolio', 
        layout: false //desactivar q busque el archivo en la carpeta layout dentro de views 
    });
});

//iniciamos el servidor en el puerto 3000
//app.listen(3000);
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});