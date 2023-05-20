const logger = require("../logger")
const Admin = require("../models/admin.model.js")
const AppError = require("../AppError")
const utils = require("../utils.js")
const bcrypt = require("bcrypt")

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next)
        .catch(e=>next(e))
    }
}

exports.findByUsername = wrapAsync(async function(req,res,next){
    const { username } = req.params
    await Admin.findByUsername(username,function(err,usuario){
        if(err){
            logger.error.error("Ha habido un error en la busqueda del usuario")
            res.status(500).json("Ha habido un error en la busqueda del usuario")
        }else if(!usuario){
            logger.error.error(`No existe el usuario con ID ${id}`)
            res.status(404).json(`No existe el usuario con ID ${id}`)
        }else res.send(usuario)
    })
})

exports.findByUsernameLog = async function(req, res){
    const {username,pass} = req.body
    console.log("username pasado: "+username);
    console.log("password pasada: "+pass);
    let registrado2 = null
    await Admin.findByUsername(username,function(err,usuario){
        if(err){
            console.log("mal :"+ err);
        }else if(!usuario){
            console.log("no hay usuario");
            res.redirect("/index/admin")
        }else{
            console.log("Hola2");
            registrado2 = usuario
            
            req.session.usuarioRegistrado = usuario
            req.session.cositas = {username,pass}
            
            res.redirect("/index/admin2")
        } 
    })
}

exports.create = wrapAsync(async function(req,res,next){
    console.log(req.body);
    const newAdmin = new Admin(req.body)
    if(!newAdmin.valid()){
        logger.error.error(`No se ha podido crear el ordenador, por errores en el formulario`)
        throw new AppError(`No se ha podido crear el ordenador, por errores en el formulario`, 400);
    }
        
    await Admin.create(newAdmin, function(err,usuario){
        if(!usuario){
            logger.error.error("Ha habido un error en la creación del usuario")
            res.status(500).json("Ha habido un error en la creación del usuario")
        }
        else {
            console.log("Hola3");
            const token = utils.jwt.sign({check:true},utils.claveJWT,{
                expiresIn:1440
            })
            req.session.usuarioRegistrado = newAdmin
            req.session.token = token
            
            res.redirect("/index/admin/panelAdmin")
        }
    })
})