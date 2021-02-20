//la logica de negocio debe ser ignorante que estamos conun API REsT

/* asi estaba antes
const mongoDB=require("mongodb") //conexion de la bd
const mongoDBUtil=require("./mongoDBUtil") //se comprueba la conexion 
*/
//const esquemaPeliculas=require("./mongoDBUtil").esquemaPeliculas //se comprueba me trae directamente

const ObjectId =require("mongodb").ObjectId
const mongoDBUtil=require("./mongoDBUtil") //se comprueba la conexion 
//exports.dato=100

exports.listarPeliculas=function(){ 
    //find todas las pelicuals
    let coleccionPeliculas= mongoDBUtil.esquemaPeliculas.collection("peliculas")
    
    //es una funcion sincrona, deveulve un cursos
    
    //let cursor=coleccionPeliculas.find({}) //si los quiero todos con llaves o sin ellas
    let cursor=coleccionPeliculas.find() //si los quiero todos y 
    //cuando especemos a recorrer el curso senocnes si que sera una funcion asincrona
    //toArray recorre el cursor y crea un array con todo los objetos (documentos)
    
    return cursor.toArray() //aqui llevamos el valor obtenemos lo cual es la promesa

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

        //return coleccionPeliculas.findOne({_id: new mongoDBUtil.ObjectId(idPelis)}) //adecuando con mongoUtil //qeuda feito aqui

    return coleccionPeliculas.findOne({_id: new ObjectId(idPelis)}) //adecuando con mongoUtil //qeuda feito aqui
}

exports.insertarPeliculas=function(pelicula){
    //find todas las pelicuals
    console.log("DE la capa de negocio insertra pelicula (LN) ", pelicula)

//validar que la peliculas es correcta ((lado Cliente LC Servi) y lado (servidor LC,LN))

   return  mongoDBUtil //no podemos utilizar promesas
    .esquemaPeliculas
    .collection("peliculas")
    .insertOne(pelicula)



}

exports.modificarPeliculas=function(pelicula){
    //find todas las pelicuals esto es un promesa en un pricncipio
    //validar 
   return  mongoDBUtil
    .esquemaPeliculas
    .collection("peliculas")
    //.updateOne({_id: new ObjectId(pelicula._id)},
    .findOneAndUpdate({_id: new ObjectId(pelicula._id)},
                {
                    $set: {
                        titulo      :pelicula.titulo,
                        director    :pelicula.director,
                        genero      :pelicula.genero,
                        year        :pelicula.year,
                        sinopsis    :pelicula.sinopsis,
                    }
                }   
                    ,
                    //con $unset eliminamos propiedades
                    //falta algo por aqui ////OJO AQUI NO ESTA FUNCIONANDO 
                  { returnOriginal:false,

                })

        }   

exports.eliminarPeliculas=function(idPelis){
    //find todas las pelicuals

   return  mongoDBUtil
    .esquemaPeliculas
    .collection("peliculas")
    .deleteOne({_id: new ObjectId(idPelis)})
}