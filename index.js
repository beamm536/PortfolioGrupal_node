/*COMANDOS PARA METER POR TERMINAL ANTES DE EMPEZAR A CREAR FILES
npm init
npm i express
npm i express-handlebars
nodemon (para iniciar el proyecto)
*/

//IMPORTACIONES
const express = require("express");
const exphbs = require("express-handlebars");   
const mysql = require("mysql2"); //importacion para la base de datos

//servidor aplicaciones
const app = express();

//config handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//crear la conexion
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'programacion2023', 
    database: 'portfolio'
});

conexion.connect((err) => {
    if (err) throw err;
    console.log('Conexión a la base de datos establecida');
  });



// Ruta para obtener los acontecimientos
app.get('/api/acontecimientos', (req, res) => {
    const query = 'SELECT p.nombre_participante, p.descripcion_participante, a.nombre_acontecimiento, a.descripcion_acontecimiento, a.img_acontecimiento, a.pers_acontecimiento FROM participantes p LEFT JOIN acontecimientos a ON p.nombre_participante = a.pers_acontecimiento;';
    
    conexion.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Error en la base de datos');
        return;
      }
  
      console.log('Resultados de los acontecimientos:', results);  // Imprimir los resultados de la consulta
      res.json(results);  // Enviar los resultados como JSON
    });
  });


app.use(express.static("public"));//ruta para acceder a recursos estaticos --> lo q nos cargaria de la carpeta publica de plantilla q hemos incorporado

app.get('/portfIndividual1', (req, res) => {
    res.render('portfIndividual1', { 
        titulo: 'Página portfolio individual', 
        layout: false //desactivar q busque el archivo en la carpeta layout dentro de views 
    });
});
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