//la logica de negocio debe ser ignorante que estamos conun API REsT

const mongoDB=require("mongodb") //conexion de la bd
const mongoDBUtil=require("./mongoDBUtil") //se comprueba la conexion 


//exports.dato=100

exports.listarPeliculas=function(){ 
    //find todas las pelicuals
    let coleccionPeliculas= mongoDBUtil.esquemaPeliculas.collection("peliculas")

}

exports.buscarPeliculas=function(idPelis){
   
   /* //find todas las pelicuals
    let peliculaAux=null
    coleccionPeliculas.findOne({_id:idPelis}, function(err,pelicula){
        if(err){
            console.log(err) 
            return
        }
        peliculaAux=pelicula;
    })
*/

    let coleccionPeliculas= mongoDBUtil.esquemaPeliculas.collection("peliculas")
        //return coleccionPeliculas.findOne( { _id : idPelis })

     //Cuidado que _id tiene como valor ObjectId
    //return coleccionPeliculas.findOne({_id: new mongoDB.ObjectId(idPelis)})
    return coleccionPeliculas.findOne({_id: new mongoDBUtil.ObjectId(idPelis)}) //adecuando con mongoUtil

}

exports.insertarPeliculas=function(pelicula){
    //find todas las pelicuals
    console.log("DE la capa de negocio insertra pelicula (LN) ", pelicula)
}

exports.modificarPeliculas=function(pelicula){
    //find todas las pelicuals
}

exports.eliminarPeliculas=function(idPelis){
    //find todas las pelicuals
}