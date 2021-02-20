

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



//rellenar tu TablaPeliculas
function rellenarTablaPeliculas(peliculas){ //lo recibe como un array de objetos para luego parsearlo
   /* 
    let tabla=$("#tablaPeliculas")
    tabla.html('')
   */ 
    //or
   $("#tablaPeliculas").html("") //para vaciarla
   
   $(peliculas).each(function(pos,pelicula){
        $(`<tr>
                <td>${pelicula.titulo}<td>
                <td>${pelicula.director}<td>
                <td>${pelicula.genero}<td>
                <td>${pelicula.year}<td>

            </tr>`)
            .appendTo("#tablaPeliculas")

   })
       

    console.log(peliculas)

}

}
function mostrarError(error){
    console.log("Error!",error)
}

function verFormulario(){
    console.log("Viendo el Formualrio enrutadoo!!!")
    window.location.href="/formularioPeliculas.html"

}

function crearContenido(){
    $("body")
    .append(`<div class="text-center page-header">
    <h2 class="mt-4 mb-4">Aplicación de gestion de películas GestPeliculas 3000</h2>
</div>   

<div class="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul class="navbar-nav">
        <li class="nav-item active">
            <a class="nav-link" href="#">Peliculas</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Directores</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Actores</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Salir</a>
        </li>
    </ul>
</div> 

<h3 class="text-center mt-3 mb-3">
    Listado de películas
</h3>

<div class="row">

    <div class="col-sm-12 offset-sm-0 col-md-8 offset-md-2">

        <div class="text-center">
            <input type="button" id="btnNuevo"      class="btn btn-primary" value="Nuevo"/>
            <input type="button" id="btnActualizar" class="btn btn-primary" value="Actualizar"/>
        </div>

        <br/>

        <table class="table table-hover table-striped">    
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Director</th>
                    <th>Género</th>
                    <th>Año</th>
                </tr>
            </thead>
            <tbody id="tablaPeliculas"></tbody>
        </table>            

    </div>

</div>`)
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