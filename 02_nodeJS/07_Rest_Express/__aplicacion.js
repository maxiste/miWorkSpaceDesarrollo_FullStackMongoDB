const express =require("express")

//de manera provisional
arrancarServidor()

let puerto=5000
function arrancarServidor(){
    let app=express()

    app.use(peliculaRouter)
    
    app.listen(puerto,function(){
        console.log("Esperando peticiones en el Puerto "+puerto)
    })

//API REST PARA LAS OELICUALS
/*
METODO      URL             BODY        FUNCIONALIDAD
-----------------------------------------------
GET         /peliculas      -           listar todas las peliculas
GET         /peliculas      -           listar todas las peliculas
POST         /peliculas      {json}          listar todas
PUT         /peliculas/:id    {json}           listar to
DELETE        /peliculas/:id     -           listar todas las


*/

}



