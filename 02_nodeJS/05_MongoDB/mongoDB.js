const mongoDB=require("mongodb");

//cadena de conexion mongo local
//const url="mongodb://localhost:2017";

//Cadena de conexion en Mongo db Atlas
//const url = "mongodb+srv://maxisteCluster:almighty1@cluster0.hidzn.mongodb.net/<dbname>?retryWrites=true&w=majority"
//const url = "mongodb+srv://maxisteCluster:almighty1@cluster0-shard-00-01.hidzn.mongodb.net?retryWrites=true&w=majority"

const url = "mongodb+srv://maxisteCluster@cluster0.hidzn.mongodb.net?retryWrites=true&w=majority";

//cluster0-shard-00-01.hidzn.mongodb.net:27017

//la funcion connect es asincronica
//nos da un objeto que represental al servidor de BAse Datps
/*
pasos
-conectar y obtner que representa al servidro de base de datos dbsS
-a dbsS le pedimos el esquema
-al esquema le pedimos la coleccion
-a la coleccion le pedimos que busque inserte modificque.....
*/

mongoDB.connect(url, {useUnifiedTopology:true}, function(err, dbsS){ //por cambios "useUnifiedTopology" de parametro de aucerdo a la vbersdion

    if(err){
        console.log(err) 
        return
    }
    console.log("Conexion Establecida con la BD....!!!")
    //cada bd necesitamos al esquema qye necesitamos
    let esquemPeliculas = dbsS.db("esquemaPeliculas")

    let coleccionPeliculas = esquemPeliculas.collection("peliculas")

/////
//insertOne
///////
                   

  coleccionPeliculas
    .insertOne({_id:500, titulo:"Los Bingueros", director:"Mariano Ozores",year: 1979},
    function(err,result){

        if(err){
            console.log(err)
            return
        }
        console.log("Pelicula Insertada..!")

        coleccionPeliculas.findOne({titulo:"2001"},  //para hacer en la misma 
        function(err,pelicula){
            if(err){
                console.log(err)
                return
            }
            console.log("Pelicula.. ", pelicula)

        })     
        dbsS.close(function(err){
            if(err){
                console.log(err)
                return
            }
            console.log("Desconectando...")

        })

    })
///isnert Many

    coleccionPeliculas
    .insertMany({titulo:"Ls Bingueros", director:"Mariano Ozores",year: 1979},
                                  {_id:500, titulo:"Alien el Octavo Pasajero", director:"Stev Spilberg",year: 1996},
                                  function(err,result){

                                    if(err){
                                        console.log(err)
                                        return
                                    }
                                    console.log("Pelicula Insertada..!")
                 })



    let coleccionActores = esquemPeliculas.collection("actores")

    /////
    //insertOne Actores
      coleccionActores
        .insertOne({_id:500, nombre:"Maxiste", generoInterprete:"Terror",year: 1972},
        function(err,result){
    
            if(err){
                console.log(err)
                return
            }
            console.log("Actor insertado Correctamente..!")
        })

})

