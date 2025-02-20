const express = require("express")
const router = express.Router();
const mysql = require("mysql2"); //importacion para la base de datos


//crear la conexion
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'programacion2023', 
    database: 'portfolio',
    
});

conexion.connect((err) => {
    if (err) throw err;
    console.log('Conexión a la base de datos establecida');
  });


// Ruta para obtener los acontecimientos
router.get('/api/acontecimientos', (req, res) => {
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

  //Ruta para obtener los portfolios grupales
  router.get('/api/portfoliosgrupales', (req, res) => {
    const query2 = 'SELECT nombreProyecto, descripcionProyecto, duracionProyecto, tecnologiasProyecto, imgProyecto FROM proyectosGrupales;';

    
    conexion.query(query2, (err2, results2) => {
      if (err2) {
        res.status(500).send('Error en la base de datos');
        return;
      }
  
      console.log('Resultados de los acontecimientos:', results2);  // Imprimir los resultados de la consulta
      res.json(results2);  // Enviar los resultados como JSON
    });
  });  

//RUTA PARA LA PAGINA DE PRUEBA PORTFOLIO INDIVIDUAL
router.get('/portfIndividual1', (req, res) => {
    res.render('portfIndividual1', { 
        titulo: 'Página portfolio individual', 
        layout: false //desactivar q busque el archivo en la carpeta layout dentro de views 
    });
});
//RUTA PARA EL INDEX
router.get('/', (req, res) => {
    res.render('index', { 
        titulo: 'Página Principal_portfolio', 
        layout: false //desactivar q busque el archivo en la carpeta layout dentro de views 
    });
});



//para traerme el enrutado desde el index --> EXPORTAMOS EL ENRUTADOR DE LA APP
module.exports = router;



