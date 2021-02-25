
let idPeliculaSel=null
function vaciarFormulario(){
    $("#formulario , input,select,textarea").val("")
    idPeliculaSel=null //porque no tiene datos

    modoInsercion()
   
}
function verListadoPeliculas(){ 
    window.location.href="/listadoPeliculas.html"


}

function insertarPeliculas(){
    let pelicula={
        titulo        : $("#titulo").val(),
        director      : $("#director").val(),
        genero        : $("#genero").val(),
        year          : $("#year").val(),
        sinopsis      : $("#sinopsis").val(),

    }

    $.ajax({
        type        :"POST",
        url         :"/peliculas",
        contentType :"application/json",
        data        :JSON.stringify(pelicula)

    })
    .done(verListadoPeliculas)
    .fail(mostrarError)


}

function mostrarError(){
    console.log("Errro!")
}
 
function obtenerPeliculas(idPelis){
    $.ajax({
        url     :"/peliculas/"+idPelis
    })
    .done(rellenarFormulario)
    .fail(mostrarError)

}

function rellenarFormulario(pelicula){ //modificacion de pelicula
   /* de esta forma
        $("#titulo").val(pelicula.titulo),
        $("#director").val(pelicula.director),
        $("#genero").val(pelicula.genero),
        $("#year").val(pelicula.year),
        $("#sinopsis").val(pelicula.sinopsis)
*/
 // de esta otra Qué cosas...
    idPeliculaSel=pelicula._id
    with(pelicula){
        $("#titulo").val(titulo)
        $("#director").val(director)
        $("#genero").val(genero)
        $("#year").val(year)
        $("#sinopsis").val(sinopsis)        
    }

    


}

function modificarPeliculas(){


    let pelicula={
        titulo        : $("#titulo").val(),
        director      : $("#director").val(),
        genero        : $("#genero").val(),
        year          : $("#year").val(),
        sinopsis      : $("#sinopsis").val(),

    }
    //me iguala la pelicula seleccionada anteriormente
    pelicula._id=idPeliculaSel
//ajax
    $.ajax({
        type        :"PUT",
        url         :"/peliculas/"+idPeliculaSel,
        contentType :"application/json",
        data        :JSON.stringify(pelicula)

    })
    .done(verListadoPeliculas) //muestra el cambio en la lista
    .fail(mostrarError)
}

function eliminarPeliculas(){
    //ajax
    $.ajax({
        type        :"DELETE",
        url         :"/peliculas/"+idPeliculaSel,
        contentType :"application/json"
       

    })
    .done(verListadoPeliculas) //muestra el cambio en la lista
    .fail(mostrarError)

}

function modoInsercion(){
  
    //con jquery
    $("#btnInsertar").attr("disabled",false) 
    $("#btnModificar").attr("disabled",true)
    $("#btnBorrar").attr("disabled",true)


}

//Para cuando el usuario selecciona una persona con JQ
function modoSeleccion(){
    $("#btnInsertar").prop("disabled",true) 
    $("#btnModificar").prop("disabled",false)
    $("#btnBorrar").prop("disabled",false)
}


$(inicializar)

function inicializar(){
    $("#btnVaciar").click(vaciarFormulario)
    $("#btnVolver").click(verListadoPeliculas)
    $("#btnInsertar").click(insertarPeliculas)
    $("#btnModificar").click(modificarPeliculas)
    $("#btnBorrar").click(eliminarPeliculas)
    


    //validamos si viene con id de pelicula por busqueda directa
    let codigo_trozado = window.location.href.split("?")
    if(codigo_trozado.length == 2){
        let id=codigo_trozado[1].split("=")[1] //trozamos para saber codigo
        //console.log("ID: "+id)
        obtenerPeliculas(id)
    
    }

}
