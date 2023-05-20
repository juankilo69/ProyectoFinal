const ordenaodresController = require("../controllers/ordenadores.controller")
const express = require("express")
const router = express.Router()

//Obtener bebidas
router.get("/",ordenaodresController.findAll)
//Obtener una bebida por id
router.get("/:id",ordenaodresController.findById)
// //Crear una bebida
router.post("/",ordenaodresController.create)
// //Actualizar una bebida
router.put("/:id",ordenaodresController.update)
// //Borrar una bebida
router.delete("/:id",ordenaodresController.delete)

module.exports = router