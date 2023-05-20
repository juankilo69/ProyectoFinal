const logger = require("../logger")
const Usuario = require("../models/user.model.js")
const AppError = require("../AppError")
const utils = require("../utils.js")
const bcrypt = require("bcrypt")

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next)
        .catch(e=>next(e))
    }
}

exports.findAll = async function(req,res){
    await Usuario.findAll(function(err,usuarios){
        if(err){
            logger.error.error("Ha habido un error en la busqueda de los ordenaodres")
            res.status(500).json("Ha habido un error en la busqueda de los ordenaodres")
        }
        else res.send(usuarios)
    })
}


exports.findByUsername = wrapAsync(async function(req,res,next){
    const { username } = req.params
    await Usuario.findByUsername(username,function(err,usuario){
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
    console.log("password pasada: "+pass);
    let registrado2 = null
    await Usuario.findByUsername(username,function(err,usuario){
        if(err){
            console.log("mal :"+ err);
        }else if(!usuario){
            console.log("no hay usuario");
            res.redirect("/index/login")
        }else{
            console.log("Hola2");
            registrado2 = usuario
            
            req.session.usuarioRegistrado = usuario
            req.session.cositas = {username,pass}
            
            res.redirect("/index/login2")
        } 
    })
}

exports.create = wrapAsync(async function(req,res,next){
    console.log(req.body);
    const newUsuario = new Usuario(req.body)
    newUsuario.pass = await bcrypt.hash(newUsuario.pass,12)
    if(!newUsuario.valid()){
        logger.error.error(`No se ha podido crear el ordenador, por errores en el formulario`)
        throw new AppError(`No se ha podido crear el ordenador, por errores en el formulario`, 400);
    }
        
    await Usuario.create(newUsuario, function(err,usuario){
        if(!usuario){
            logger.error.error("Ha habido un error en la creación del usuario")
            res.status(500).json("Ha habido un error en la creación del usuario")
        }
        else {
            console.log("Hola3");
            const token = utils.jwt.sign({check:true},utils.claveJWT,{
                expiresIn:1440
            })
            req.session.usuarioRegistrado = newUsuario
            req.session.token = token
            
            res.redirect("/index")
        }
    })
})

exports.update = async function(req,res){
    console.log(req.body);
    const usuario = new Usuario(req.body)
    usuario.pass = await bcrypt.hash(usuario.pass,12)
    if(!usuario.valid()){
        logger.error.error("No se ha podido crear el ordenador, por errores en el formulario")
        throw new AppError(`No se ha podido crear el ordenador, por errores en el formulario`, 400);
    }
    const { id } = req.params
    await Usuario.update(id,usuario,function(err,usuario_updated){
        if(err){
            logger.error.error("Ha habido un error en la actualización del usuario")
            res.status(500).json("Ha habido un error en la actualización del usuario")
        }
        else res.send(usuario_updated)
    })
}

exports.delete = async function(req,res){
    const { username } = req.params
    Usuario.delete(username,function(err,usuario_deleted){
        if(err){
            logger.error.error("Ha habido un error en la eliminación del usuario")
            res.status(500).json("Ha habido un error en la eliminación del usuario")
        }
        else res.send(usuario_deleted)
    })
}