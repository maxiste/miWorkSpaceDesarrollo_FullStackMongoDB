const mongoDB=require("mongodb");


const url="mongodb://localhost:2017";

//la funcion connect es asincronica
//nos da un objeto que represental al servidor de BAse Datps
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
    .insertOne({_id:500, titulo:"LOs Bingueros", director:"Mariano Ozores",year: 1979},
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
        .insertOne({_id:500, nombre:"Maxiste", genero:"Terror",year: 1979},
        function(err,result){
    
            if(err){
                console.log(err)
                return
            }
            console.log("Actor insertado Correctamente..!")
        })

})

