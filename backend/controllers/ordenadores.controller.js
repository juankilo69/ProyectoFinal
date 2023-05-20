const logger = require("../logger")
const Ordenador = require("../models/ordenadores.model")
const AppError = require("../AppError")

exports.findAll = async function(req,res){
    await Ordenador.findAll(function(err,ordenadores){
        if(err){
            logger.error.error("Ha habido un error en la busqueda de los ordenaodres")
            res.status(500).json("Ha habido un error en la busqueda de los ordenaodres")
        }
        else res.send(ordenadores)
    })
}

exports.findById = async function(req,res){
    const { id } = req.params
    await Ordenador.findById(id,function(err,ordenadores){
        if(err){
            logger.error.error("Ha habido un error en la busqueda del ordenaodor")
            res.status(500).json("Ha habido un error en la busqueda del ordenaodor")
        }else if(!ordenadores){
            logger.error.error(`No existe el ordenador con ID ${id}`)
            res.status(404).json(`No existe el ordenador con ID ${id}`)
        }else res.send(ordenadores)
    })
}

exports.create = async function(req,res){
    console.log(req.body);
    const newOrdenador = new Ordenador(req.body)
        
    await Ordenador.create(newOrdenador, function(err,newOrdenador){
        if(err){
            logger.error.error("Ha habido un error en la creación del ordenador")
            res.status(500).json("Ha habido un error en la creación del ordenador")
        }
        else{
            res.send(newOrdenador)
            console.log(newOrdenador);
        } 
    })
}

exports.update = async function(req,res){
    const ordenador = new Ordenador(req.body)

    const { id } = req.params
    await Ordenador.update(id,ordenador,function(err,ordenador_updated){
        if(err){
            logger.error.error("Ha habido un error en la actualización del ordenador")
            res.status(500).json("Ha habido un error en la actualización del ordenador")
        }
        else{
            res.send(ordenador_updated)
            console.log(ordenador_updated);
        }    
    })
}

exports.delete = async function(req,res){
    const { id } = req.params
    Ordenador.delete(id,function(err,ordenador_deleted){
        if(err){
            logger.error.error("Ha habido un error en la eliminación del ordenador")
            res.status(500).json("Ha habido un error en la eliminación del ordenador")
        }
        else res.send(ordenador_deleted)
    })
}