/*COMANDOS PARA METER POR TERMINAL ANTES DE EMPEZAR A CREAR FILES
npm init
npm i express
npm i express-handlebars
nodemon (para iniciar el proyecto)
*/

//IMPORTACIONES
const express = require("express");
const exphbs = require("express-handlebars");   
const rutas = require("./routes/rutas");//para importar las rutas desde el archivo rutas.js

//servidor aplicaciones
const app = express();

//---------------------------PUERTOOOOOOOOOOOOOOO----------------------
const port = 3000;

//config handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//ruta para acceder a recursos estaticos --> lo q nos cargaria de la carpeta publica de plantilla q hemos incorporado
app.use(express.static("public"));

//para usar el archivo de las rutas
app.use(rutas);


//iniciamos el servidor en el puerto 3000
app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});