const dbConn = require("../config/db.config")

let Usuario = function(usuario){
    this.username = usuario.username
    this.pass = usuario.pass
    this.valid = () => {
        return true
    }
}

Usuario.findAll = async function(result){
    const sql = "SELECT * FROM users"
    dbConn.query(sql,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res)
        }
    })
}

Usuario.findByUsername = async function(username,result){
    const sql = "SELECT * FROM users WHERE username = ?"
    await dbConn.query(sql,username,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res[0])
        }
    })
}

Usuario.create = async function(newUser,result){
    try{

        const sql = "INSERT into users set ?"
        dbConn.query(sql,newUser,function(err,res){
            if(err){
                console.log(err)
                result(err,null)
            }else{
                result(null,res)
            }
        })
    }catch(err){
        result(err,null)
    }
}

Usuario.update = async function(username,user,result){
    const sql = "UPDATE users SET ? WHERE username = ?"
    dbConn.query(sql,[user,username],function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res)
        }
    })
}

Usuario.delete = async function(username,result){
    const sql = "DELETE FROM users WHERE username = ?"
    dbConn.query(sql,username,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res)
        }
    })
}

module.exports = Usuario