const usuarioController = require("../controllers/user.controller")
const express = require("express")
const router = express.Router()

//Obtener usuarios
router.get("/",usuarioController.findAll)
//Obtener un usuario por id
router.get("/:username",usuarioController.findByUsername)
// //Crear un usuario
router.post("/",usuarioController.create)
// //Actualizar un usuario
router.put("/:username",usuarioController.update)
// //Borrar un usuario
router.delete("/:username",usuarioController.delete)

module.exports = router