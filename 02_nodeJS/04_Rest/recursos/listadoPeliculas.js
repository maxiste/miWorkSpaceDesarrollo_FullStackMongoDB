

//obtenr peliculas
function obtnerPeliculas(){
     //Manera actual objeto ajax en jq como actual, siempre vamos a hacer dos funciones cuando utilicemos una funcion ajax
   
   $.ajax({
    type    :'GET', //por defecto es tes GET, pero es opcional
    //url     :'http://localhost:3000/peliculas', //por defecto es '/'
    url     :'./peliculas', // con rutas relativas
    async   :true //por defecto es asycrno si queremos lo colocamos
})
.done(rellenarTablaPeliculas)
.fail(mostrarError)
//.always(movida)
}


//rellenar tu TablaPeliculas
function rellenarTablaPeliculas(peliculas){ //lo recibe como un array de objetos para luego parsearlo
   console.log(peliculas)
    /* 
    let tabla=$("#tablaPeliculas")
    tabla.html('')
   */ 
    //or
   $("#tablaPeliculas").html("") //para vaciarla antes de cargar el listado
   
   $(peliculas).each(function(pos,pelicula){
        $(`<tr>
                <td>${pelicula.titulo}<td>
                <td>${pelicula.director}<td>
                <td>${pelicula.genero}<td>
                <td>${pelicula.year}<td>

            </tr>`)
            .click(function(){
                seleccionarPeliculas(pelicula._id)
            })
            .appendTo("#tablaPeliculas")

   })
      
   function seleccionarPeliculas(idPelis){
       alert(idPelis) //
       //podemos el manejo de cockies

       //sesionstore para obtener el id
       window.location.href="/formularioPeliculas.html?idPelicula="+idPelis

   }

    console.log(peliculas)

}

function mostrarError(error){
    console.log("Error!",error)
    console.log(argument)
}

function verFormulario(){
    console.log("Viendo el Formulario enrutadoo !!!")
    window.location.href="/formularioPeliculas.html"

}

function crearContenido(){
   //prueba en single pages
}

$(inicializar)
function inicializar(){
    console.log("Inicializando!")
  /* no es necesario si no 
    $("#botonActualizar").click(function(){
        obtnerPeliculas()
    })
*/
$("#btnActualizar").click(obtnerPeliculas)
$("#btnNuevo").click(verFormulario)
    obtnerPeliculas()
    
}  