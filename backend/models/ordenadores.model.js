const dbConn = require("../config/db.config")

let Ordenador = function(ordenador){
    this.nombre = ordenador.nombre
    this.precio = ordenador.precio
    this.caracteristicas = ordenador.caracteristicas
    this.valid = () => {
        if (Object.values(this).some(i=>!i))
            return false;
        else
            return (
                (/[A-Za-z]$/.test(this.nombre)) &&
                (/^([0-9]+(\.?[0-9]?[0-9]?)$)/.test(this.precio))
            )
    };
}

Ordenador.findAll = async function(result){
    const sql = "SELECT * FROM ordenadores"
    dbConn.query(sql,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res)
        }
    })
}

Ordenador.findById = async function(id,result){
    const sql = "SELECT * FROM ordenadores WHERE id = ?"
    dbConn.query(sql,id,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res[0])
        }
    })
}

Ordenador.create = async function(newOrdenador,result){
    const sql = "INSERT into ordenadores set ?"
    dbConn.query(sql,newOrdenador,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res)
        }
    })
}

Ordenador.update = async function(id,ordenador,result){
    const sql = "UPDATE ordenadores SET ? WHERE id = ?"
    dbConn.query(sql,[ordenador,id],function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res)
        }
    })
}

Ordenador.delete = async function(id,result){
    const sql = "DELETE FROM ordenadores WHERE id = ?"
    dbConn.query(sql,id,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res)
        }
    })
}

module.exports = Ordenador