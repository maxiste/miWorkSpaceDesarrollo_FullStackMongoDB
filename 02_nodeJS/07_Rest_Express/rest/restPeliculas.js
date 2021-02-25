//Logica de Control
const express =require("express")
const negocioPeliculas = require("../negocio/negocioPeliculas")
let router=express.Router()

//API REST para las peliculas
/*
    MÉTODO	URL			        BODY	FUNCIONALIDAD
    -------------------------------------------------------------------
    GET	    /peliculas		    -	    listar las películas
    GET	    /peliculas/:id  	-	    buscar a una película por su id
    POST	/peliculas		    {json}	insertar la película
    PUT 	/peliculas/:id  	{json}  modificar la película
    DELETE  /peliculas/:id  	-	    borrar una película
*/


router.get("/peliculas",listarPeliculas)
router.get("/peliculas/:id",buscarPeliculas)
router.post("/peliculas",insertarPeliculas)
router.put("/peliculas/:id",modificarPeliculas)
router.delete("/peliculas/:id",eliminarPeliculas)





//Exportamos el ROUTER
exports.router=router
///***********************************************//
/// Tarea de la logica de Control de un Api REST
//***********************************************//

//1 extraer de la peticion la informacion necesaria
//2 convertir esa informacion en algo que entieda la logica de negocio
//3 invocar la funcion logica de negocio 
//4 si la logica de negocio devuelve que le haga falta al cliente
// transformar al formato adecuado y proporcionar la respuesta

function listarPeliculas(request, response){
    console.log("Listar películas")
    //Aqui haría falta un criterio de búsqueda (lo ignoramos)
    negocioPeliculas
        .listarPeliculas()
        .then(function(peliculas){
             //sustituye y se usa la funcionalidades de express
            response.json(peliculas)
            //response.setHeader('Content-Type', 'application/json') //se ssutituye por lo arriba 
            //response.end(JSON.stringify(peliculas))
           
        })
        .catch(function(err){
           response.statusCode=err.codigo //ya no es necesario resUtil
           response.json(err)
           // console.log(err)
           // restUtil.devolverError(response, 500, "Error al listar las películas")
        })
}

//GET /peliculas/:id
function buscarPeliculas(request, response){
    console.log("Buscar películas en  nuestra BD")
    //sustituye y se usa la funcionalidades de express
    let id = request.params.id
    //let id = request.url.split("/").pop() //Esto mejor
    negocioPeliculas
        .buscarPeliculas(id)
        .then(function(pelicula){ //en negocio con express recibe la funcion resolve
           /* se quita y se ejecuta desde la logica de negocio con promesas con express
            if(!pelicula){
                restUtil.devolverError(response, 404, "La película solicitada no existe")
                return
            }
            */
            response.json(pelicula) 
            //sustituido por la linea anteior           
            //response.setHeader("Content-Type", "application/json")
            //response.end(JSON.stringify(pelicula))                     
        })
        .catch(function(err){
            response.statusCode=err.codigo //ya no es necesario resUtil
            response.json(err)
            //restUtil.devolverError(response, 500, "Error al buscar la película")
        })
}

//POST /peliculas
//CT: app/json
//-------------------------------
function insertarPeliculas(request, response){
    console.log("Insertar película en (LC)") 
  //Nota: express solo leera el body si hemos dado de alta  
  //que lo haremos en el rest
    //request.on("data", function(contenidoBody){
    //let pelicula = JSON.parse(contenidoBody)
    
      //sustituyendo por funcionalidades express   
    let pelicula =request.body
        negocioPeliculas
            .insertarPeliculas(pelicula)
            .then( function(peliculaInsertada){ //se lleva a la logica de negocio lo que corresponde

                //se deja esta linea porque response.json por defecto deja el statuscode
                response.statusCode = 201
                response.json(peliculaInsertada)

                //esto es de la logica de control
                //response.setHeader("Content-Type","application/json")
                //response.end(JSON.stringify( result.ops[0] ) )
            })
            .catch(function(err){
                response.statusCode=err.codigo
                response.json(err)
                //console.log(err)
                //restUtil.devolverError(response, 500, "Error al buscar la película")
            })
    
}


//PUT /peliculas/:id
//CT: app/json
function modificarPeliculas(request, response){
    console.log("Modificar película (LC)")
    //aqui hace falta la peli y el id
    let id = request.params.id
    let pelicula = request.body
    //aqui hace falta la peli y el id
    //sustituido todo
    /*
        let id = request.url.split("/").pop()

        request.on("data", function(contenidoBody){
            
            let pelicula = null
            
            try {
                pelicula = JSON.parse(contenidoBody)
            } catch(error){
                console.log("No es un JSON!")
                restUtil.devolverError(response, 400, "Formato incorrecto: no es un json")
            }

            //Nos aseguramos de que la película que venía en el body tenga el id 
            //que venía en la ruta

        */
        pelicula._id = id
        
        negocioPeliculas
        .modificarPeliculas(pelicula)
        .then(function(peliculaModificada){
                //al igual que el if que se colocadaba aqui
                response.json(peliculaModificada)
                //ssutiuido por express
                //response.setHeader('Content-Type', 'application/json')
                //response.end(JSON.stringify(result.value))
            })
        .catch(function(err){
            response.statusCode=err.codigo
                response.json(err)
        })
    
}

//DELETE /peliculas/:id
function eliminarPeliculas(request, response){
    console.log("Elimina las pelicula  en la (LC)")
    let id = request.params.id //de express
    //aqui hace falta el id de la pelicula por eso se extrae
    //let id = request.url.split("/").pop() se sustirute
    negocioPeliculas
        .eliminarPelicula(id) 
        .then(function(){
            //if 404
            response.json({codigo:200, mensaje: "Pelicula Borrada Correctamente"})
        })
        .catch(function(err){
            response.statusCode=err.codigo
            response.json(err)
        })
}
