const mongoDB=require("mongodb")

let url = "mongodb://localhost:27017"

//const url = "mongodb+srv://maxisteCluster@cluster0.hidzn.mongodb.net?retryWrites=true&w=majority";
//const url = "mongodb+srv://maxisteCluster:almighty1@cluster0.hidzn.mongodb.net?retryWrites=true&w=majority";
//const url = "mongodb+srv://maxisteCluster:almighty1@cluster0.hidzn.mongodb.net/?retryWrites=true&w=majority";

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
            console.log("No se pudo conectar con la BD..valide Si esta corriendo el servidor de BD")
            console.log(err)
            
        })
    }

