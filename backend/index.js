const express = require("express") //npm i express
const app = express()
const path = require("path") //npm i path
const morgan = require("morgan")//npm i morgan
const logger = require("./logger")
const methodOverride=require("method-override") //npm i method-override
const port = process.env.port || 3000
const fs2 = require("fs")
const cors = require("cors")
const AppError = require("./AppError")
const cookieParser = ("cookie-parser")//npm i cookie-parser
const utils = require("./utils")
const bcrypt = require("bcrypt")//npm i bcrypt
const Registrado = require("./controllers/user.controller.js")
const Admin = require("./controllers/admin.controller.js")

const dbConn = require("./config/db.config")

app.use(cors())

app.use(morgan("combined",{
    stream: fs2.createWriteStream("./access.log",{flags:"a"})
}))


app.use(utils.session({
    secret:"secreto",
    resave: false,
    saveUninitialized: true,
    cookie:{httpOnly:true}
  }))

//Method override
app.use(methodOverride("_method")) 
app.use(express.urlencoded({extended:true})) //recuperar request.body
app.use(express.json()) //usaremos JSON para los request.body

//Rutas de db
const ordenadoresRoutes = require("./routes/ordenadores.routes")
const userRoutes = require("./routes/usuarios.routes")
const adminRoutes = require("./routes/admin.routes")

//Enrutamiento
app.use(`/api/v1/ordenadores`,ordenadoresRoutes)
app.use(`/api/v1/usuarios`,userRoutes)
app.use(`/api/v1/admin`,adminRoutes)

const ruta = __dirname+"/../frontend"
app.set("views", path.join(__dirname,"views"))
app.use(express.static(ruta))

app.get("/", (req,res) =>{
    logger.access.info("Se ha accedido a la página principal de Administración de ordenadores")
    res.redirect("/index")
})

app.get("/index", (req,res) =>{
    logger.access.info("Se ha accedido a la página principal de Administración de ordenadores")
    utils.openFile("index",res)
})

app.get("/index/contact",(req,res)=>{
    utils.openFile("contact",res)
})

app.get("/index/mostrar/:id",utils.requireJWT,(req,res)=>{
    utils.openFile("mostrar",res)
})

app.get("/index/crear",utils.requireJWT,(req,res)=>{
    utils.openFile("crear",res)
})

app.get("/index/editar/:id",utils.requireJWT,(req,res)=>{
    utils.openFile("editar",res)
})
    
    
//Logeo
app.get("/index/registro",(req,res)=>{
    console.log("Hola1");
    res.render("registro.ejs")
})

app.get("/index/login",(req,res)=>{
    let err = false
    res.render("loggin.ejs",{err})
})

app.post("/index/login",async (req,res)=>{
    await Registrado.findByUsernameLog(req,res)
})

app.get("/index/login2",async(req,res)=>{
    const pass = req.session.cositas.pass
    console.log("Esta es la pass de login 2: "+pass);
    const decrypt= await bcrypt.compare(pass,req.session.usuarioRegistrado.pass)

    if(decrypt){
        const token = utils.jwt.sign({check:true},utils.claveJWT,{
            expiresIn:10000
        })
        req.session.token = token
        res.redirect("/index")
    }else{
        res.redirect("login")
    }
     
})

app.get("/index/logout",utils.requireJWT,(req,res)=>{
    utils.destroyToken(req,res)
    res.redirect("/")
})
//Admin
app.get("/index/admin",(req,res)=>{
    res.render("admin.ejs")
})

app.post("/index/admin",async (req,res)=>{
    await Admin.findByUsernameLog(req,res)
})

app.get("/index/admin2",async(req,res)=>{
    const pass = req.session.cositas.pass
    console.log("Esta es la pass de login 2: "+pass);

    if(pass == req.session.usuarioRegistrado.pass){
        const token = utils.jwt.sign({check:true},utils.claveJWT,{
            expiresIn:10000
        })
        req.session.token = token
        res.redirect("/index/admin/panelAdmin")
    }else{
        res.redirect("/index/admin")
    }
})

app.get("/index/admin/panelAdmin",(req,res)=>{
    utils.openFile("panelAdmin",res)
})

app.get("/index/admin/panelAdmin/mostrarAdmin/ordenadores/:id",(req,res)=>{
    utils.openFile("mostrarAdmin",res)
})

app.get("/index/admin/panelAdmin/mostrarAdmin/usuarios/:id",(req,res)=>{
    utils.openFile("mostrarAdmin",res)
})

app.get("/index/admin/panelAdmin/ordenadores/editar/:id",(req,res)=>{
    utils.openFile("editarAdmin",res)
})

app.get("/index/admin/panelAdmin/usuarios/editar/:id",(req,res)=>{
    utils.openFile("editarAdmin",res)
})










//Leantamos el servidor
app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`)
    dbConn.establishConexion()
})

app.use((err, req, res, next)=>{
    let {message = "FALLO GENERAL", status = 500} = err;
    if(status==400){
        res.redirect("/lahorteta/reserva")
    }else{
        res.status(status).send(message + " - " + status);
    }  
})