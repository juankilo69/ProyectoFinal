const dbConn = require("../config/db.config")

let Admin = function(admin){
    this.username = admin.username
    this.pass = admin.pass
    this.valid = () => {
        return true
    }
}

Admin.findAll = async function(result){
    const sql = "SELECT * FROM admin"
    dbConn.query(sql,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res)
        }
    })
}

Admin.findByUsername = async function(username,result){
    const sql = "SELECT * FROM admin WHERE username = ?"
    await dbConn.query(sql,username,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,res[0])
        }
    })
}

Admin.create = async function(newAdmin,result){
    try{

        const sql = "INSERT into admin set ?"
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

module.exports = Admin