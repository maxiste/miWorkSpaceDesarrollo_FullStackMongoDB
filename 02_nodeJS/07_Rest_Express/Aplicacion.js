const express = require("express")
const mongoDBUtil = require("./util/mongoDBUtil")
const peliculasRouter = require("./rest/restPeliculas").router


mongoDBUtil.conectar(arrancarServidor)
puerto=5000;
function arrancarServidor(){
    
    let app = express()
    
    app.use(peliculasRouter)
    
    app.listen(puerto, function(){
        console.log("Esperando peticiones en el puerto---> " +puerto)
    })
}



