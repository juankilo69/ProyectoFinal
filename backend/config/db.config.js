const {connect} = require("http2")
const mysql = require("mysql") //npm i mysql

const dbConn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"administrar_pc"
})
//Si no establece conexion , se tumbara el servidor
dbConn.establishConexion = function(){
    dbConn.connect(function(err){
        if(err){
            console.log(err)
            process.exit(0)
        }else{
            console.log("DB MySQL connected")
            console.log(dbConn.state)
        }

    })
}

module.exports = dbConn