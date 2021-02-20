
const express =require("express")
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

router.get("/peliculas",listarPeliculas)
router.get("/peliculas/:id",buscarPeliculas)
router.post("/peliculas",insertarPeliculas)
router.put("/peliculas/:id",modificarPeliculas)
router.delete("/peliculas/:id",eliminarPeliculas)

//Exportamos el ROUTER
exports.router=router


function listarPeliculas(request, response){
    console.log("Listar películas")
    //Aqui haría falta un criterio de búsqueda (lo ignoramos)
    negocioPeliculas
        .listarPeliculas()
        .then(function(peliculas){
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify(peliculas))
        })
        .catch(function(err){
            console.log(err)
            restUtil.devolverError(response, 500, "Error al listar las películas")
        })
}

//GET /peliculas/:id
function buscarPeliculas(request, response){
    console.log("Buscar película")
    let id = request.url.split("/").pop() //Esto mejor
    negocioPeliculas
        .buscarPeliculas(id)
        .then(function(pelicula){
            if(!pelicula){
                restUtil.devolverError(response, 404, "La película solicitada no existe")
                return
            }            
            response.setHeader("Content-Type", "application/json")
            response.end(JSON.stringify(pelicula))                     
        })
        .catch(function(err){
            console.log(err)
            restUtil.devolverError(response, 500, "Error al buscar la película")
        })
}

//POST /peliculas
//CT: app/json
//-------------------------------
function insertarPeliculas(request, response){
    console.log("Insertar película (LC)")    
    request.on("data", function(contenidoBody){
        let pelicula = JSON.parse(contenidoBody)
        negocioPeliculas
            .insertarPeliculas(pelicula)
            .then( function(result){
                response.statusCode = 201
                response.setHeader("Content-Type","application/json")
                response.end(JSON.stringify( result.ops[0] ) )
            })
            .catch(function(err){
                console.log(err)
                restUtil.devolverError(response, 500, "Error al buscar la película")
            })
    })

}

//PUT /peliculas/:id
//CT: app/json
function modificarPeliculas(request, response){
    console.log("Modificar película (LC)")

    //aqui hace falta la peli y el id
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
        pelicula._id = id
        
        negocioPeliculas
        .modificarPeliculas(pelicula)
        .then(function(result){
                //if(result.value == null){
                if(!result.value){
                    restUtil.devolverError(response,404,"No existe la película que deseas Modificar")
                    return
                }
                response.setHeader('Content-Type', 'application/json')
                response.end(JSON.stringify(result.value))
            })
        .catch(function(err){
            console.log(err)
            restUtil.devolverError(response, 500, "Error al modificar la película") 
        })
    })    
}

//DELETE /peliculas/:id
function eliminarPeliculas(request, response){
    console.log("Elimina las pelicualas  película (LC)")
    //aqui hace falta el id de la pelicula
    let id = request.url.split("/").pop() 
    negocioPeliculas
        .eliminarPelicula(id) 
        .then(function(result){
            //if 404
            response.end("OK")
        })
        .catch(function(err){
            restUtil.devolverError(response, 500, "Error al Eliminar la película") 
        })
}
