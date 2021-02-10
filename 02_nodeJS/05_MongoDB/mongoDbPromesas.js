//debes haber instalado mongodb
const mongoDB=require("mongodb")

let coleccionPeliculas=null//se decalra aqui porque es global
mongoDB.connect("mongodb://localhost:27017",{useUnifiedTopology:true})
        .then(function(dbsAux){
            console.log("Conectadoooo")
            dbsS=dbsAux
            let esquemaPeliculas= dbsS.db("esquemaPeliculas")
            coleccionPeliculas=esquemaPeliculas.collection("peliculas")

            //sheinte lalamda asincrona no Pasamos callback y devuelve una promesa
            //concatenando promesas
            return coleccionPeliculas.insertOne({titulo:"Alien el Octavo Pasajero", director:"Steven Spilberg"})
        })
        .then(function(result){
            console.log("Pelicula Insertada...")
          return  coleccionPeliculas.findOne({titulo:"Alien"})

        })
        .then(function(pelicula){
            console.log("Peliculas : ",pelicula)
            return dbsS.close()
        })
        .then(function(){
            console.log("Desconectado..")
        })
        .catch(function(err){
            console.log(err)
        })
        //el bloque finally se sejecuta del ultimo then o despues de catch (lo qu toque)
        //no haremos ninguna llamda asincrona  dentro del finally porque el finally impklica que hemos
        .finally(function(){
            console.log("Fin de Verdad con Fianlly")
        })

        console.log("Finalizado")