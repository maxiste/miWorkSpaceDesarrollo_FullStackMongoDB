const mongoDB=require("mongodb")

let url ="mongodb://localhost:2017"
//esta propiedad se utilizar en la logica de negocio
exports.esquemaPeliculas=null

//exportamos esta funcion para invocarla desde n Aplicacion.js al Iniciar
exports.conectar=function(callback){
      console.log("Conectando al base de Datosooo")
      mongoDB.connect(url,{useUnifiedTopology:true})
            .then(function(dbsS){
                console.log("Conexion Establecida")
                //aquie hacemos el exporta de esquemaPeliculas
                exports.esquemaPeliculas = dbsS.db("esquemaPeliculas")
                //incovcamoa el callBack
                callback()
            })
        .catch(function(err){
            console.log("No se pudo conectar con la BD")
            console.log(err)
            
        })
    }

