const express = require("express")
const bodyParser =require("body-parser") //ya viene instaldao con express
const mongoDBUtil = require("./util/mongoDBUtil")
const peliculasRouter = require("./rest/restPeliculas").router


mongoDBUtil.conectar(arrancarServidor)
puerto=5000;
function arrancarServidor(){
    
    let app = express()
//colocamos aqui los body parser

//se utiliza para leer el body con express y se colocaqueremo en negocio quer

let jsonBodyparser=bodyParser.json()
app.use(jsonBodyparser)
app.use(express.static("./recursos"))


    app.use(peliculasRouter)
    
    app.listen(puerto, function(){
        console.log("Esperando peticiones en el puerto---> " +puerto)
    })
}




