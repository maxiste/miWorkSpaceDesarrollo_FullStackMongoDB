//////////////////////////////////////////////////////////////////////////////////////////////////
//informacion de todos los comentarios en 05_mongoDB la funciones hechas originalmente
//////////////////////////////////////////////////////////////////////////////////////////////////
const ObjectId =require("mongodb").ObjectId
const mongoDBUtil=require("../util/mongoDBUtil") //se comprueba la conexion con este js


exports.listarPeliculas=function(){ 

    //y tambien recibira el codigo que se ejecutara dentro de ella
    //recibe dos funciones como  parametros resolve y reject
    //el resolve es la funcion que se le promporcione a la promesa que es6a en en el then de restPeliculas 
    //no tiene return 
    return new Promise( function(resolve,reject){ 
        
        //sustutyendo con express
        let coleccionPeliculas= mongoDBUtil.esquemaPeliculas.collection("peliculas")
        let cursor=coleccionPeliculas.find() 
        
        cursor
            .toArray()
            .then(function(peliculas){ //recibe una funcion que as us vez recibe un objeto de tipo arreglo
                resolve(peliculas)
            })
            .catch(function(err){
                console.log(err)
                reject({codigo: 50 , mensaje:"Error al ejecutar la consulta"}) //el codigo puede ser cualqueir que hayas definido

            }) 

    })

   

}

exports.buscarPeliculas=function(idPelis){

    return new Promise(function(resolve,reject){
        console.log("Buscar Pelicula (LN)",idPelis)
        let coleccionPeliculas= mongoDBUtil.esquemaPeliculas.collection("peliculas")
        coleccionPeliculas
                .findOne({_id: new ObjectId(idPelis)}) 
                .then(function(pelicula){
                    resolve(pelicula)
                        if(!pelicula){
                            reject({codigo:40, mensaje:"No existe una pelicula con es ID",idPelis})
                            return
                        }

                })
                .catch(function(err){
                    console.log(err)
                    reject({codigo:50,mensaje:"Error al Ejecutar la Busqueda"})

                })

    })
    
}



exports.insertarPeliculas=function(pelicula){
    
    return new Promise ( function (resolve,reject){
        console.log("De la capa de negocio insertra pelicula (LN) ", pelicula)
    //validar por lo quese ealemnte se envia por la url
    //quitar el id de la pelicula quye no pueden decird su valor desde fuera de la loica de negocio   
    delete pelicula._id 
    //, cuando trataa de colocarle el 
    //id al docuemnto lo que hace es que lo obvia y coloca el auntogenerado
    
    let coleccionPeliculas= mongoDBUtil.esquemaPeliculas.collection("peliculas")
        coleccionPeliculas
            .insertOne(pelicula)
            .then(function(resultado){
                resolve(resultado.ops[0])
            })
            .catch(function(err){
                console.log(err)
                    reject({codigo:50,mensaje:"Error al Ejecutar inserccion en la BD"})

            })
    })

   

}

exports.modificarPeliculas=function(pelicula){ 
    return new Promise(function(resolve, reject){
        console.log("Capa de negocio Modifica la pelicula (LN) ", pelicula)   

    mongoDBUtil
            .esquemaPeliculas
            .collection("peliculas")
            .findOneAndUpdate({_id: new ObjectId(pelicula._id)},
                {
                    $set: {
                        titulo      :pelicula.titulo,
                        director    :pelicula.director,
                        genero      :pelicula.genero,
                        year        :pelicula.year,
                        sinopsis    :pelicula.sinopsis,
                    }
                },
                { 
                    returnOriginal:false,

                })
            .then(function(commandResult){ //se usa porque se dbe hacer varias operaciones
                console.log(commandResult) //validamos lo que posee el command result
                        
                        if(!commandResult.value){
                           
                            reject({codigo:40, mensaje:"No existe dicha pelicula Valida con el el ID Suministrado ",idPelis})
                            return
                        }
                        resolve(commandResult.value) //si va bien llega hasta aqui


                })
            .catch(function(err){
                    console.log(err)
                    reject({codigo:50,mensaje:"Error al Modificar Pelicula interno"})

                })



    })


   

        }   

exports.eliminarPeliculas=function(idPelis){
    //se puede eliminar las peliculas
    return new Promise(function(resolve, reject){
        console.log("Capa de negocio Modifica la pelicula (LN) ", idPelis)   
    mongoDBUtil
    .esquemaPeliculas
            .collection("peliculas")
            .deleteOne({_id: new ObjectId(idPelis)})
            .then(function(commandResult){

                    if(commandResult.deletedCount==0){
                        reject({codigo:40, mensaje:"No existe la pelicula a Eliminar  con este ID",idPelis})
                        return
                    }
                    resolve()

            })
            .catch(function(err){
                console.log(err)
                reject({codigo:50,mensaje:"Error al Eliminar la Pelicula interno"})

            })


    })

   
}