const adminController = require("../controllers/admin.controller")
const express = require("express")
const router = express.Router()


//Obtener un admin por username
router.get("/:username",adminController.findByUsername)
// //Crear un admin
router.post("/",adminController.create)

module.exports = router