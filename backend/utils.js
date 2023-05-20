const fs = require("fs").promises //npm i fs
const claveJWT = "claveprivada"
const jwt = require("jsonwebtoken")
const session = require("express-session")

//MW JWT
 const requireJWT = (req,res,next)=>{
    const token = extractToken(req)
    console.log("Esto es el token1: "+token);
    if(token){
        jwt.verify(token,claveJWT,(err,token_decod)=>{
            if(err){
                res.status(401).json({msg:err})        
            }else{
                console.log("Esto es el token2: "+token_decod);
                next()
            }
        })
    }else{
        res.redirect("/index/login")
    }
}

const requireAdminJWT =(req,res,next)=>{
    const token = extractToken(req)

    if(token){
        jwt.verify(token,claveJWT,(err,token_decod)=>{
            if(err){
                res.status(401).json({msg:err})
            }else if(req.session.usuarioRegistrado.esAdmin) {
                console.log(token_decod);
                next()
            }
            else{
                openFile("403", res);
            }
        })
    }else{
        res.redirect("/index/login")
        
    }
}

function extractToken(req){
    if(req.header.authorization && req.headers.authorization.split(" ")[0]== "Bearer"){
        return req.headers.authorization.split(" ")[1]
    }else if(req.session && req.session.token){
        return req.session.token
    }
    return null
}

function destroyToken(req,res){
    const token = extractToken(req)
    if(token){
        jwt.sign(token,claveJWT,{expiresIn:1},(logout,err)=>{
            if(logout){
                req.session.destroy()
            }else{
                res.status(200).json({msg:err})
            }
        })
    }
}

async function openFile(file, res) {
    fs.readFile(`${__dirname}/../frontend/${file}.html`)
    .then(data=>{
        res.setHeader("Content-Type","text/html")
        res.writeHead(200)
        res.end(data)
    })
    .catch((err)=>{
        res.writeHead(500)
        res.end(`Error abriendo el archivo. Desc:${err}`)
    })
}

module.exports = {requireJWT,extractToken,jwt,claveJWT,session,destroyToken, requireAdminJWT, openFile}

