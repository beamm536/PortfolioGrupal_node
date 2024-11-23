const express = require("express")

//traemos el enrutador def express
const router = express.Router();
router.get("/", (req, res)=>{
    res.render("misitioHome", {layout:"misitio"});
});

//para traerme el enrutado desde el index
module.exports = router;

//como lo integramos --> desde index.js