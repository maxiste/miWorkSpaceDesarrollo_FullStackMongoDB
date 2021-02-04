//
//En node podremos hacer cosas imposibles en el navegador
//-acceder al sistema de archivos
//-comunicarnos con otras aplicaciones (por ejemplo la BB.DD)
//-enviarle comandos al SO
//
//En node.js no disponemos de la mayoría de los objetos implícitos del navegador
//-document
//-window
//-alert
//-localStorage/sessionStorage
//-...
//
//Algunos si están:
//-console
//-JSON
//-...

//En Node.js la consola es la consola del sistema
console.log("Hola mundo")

//Módulos en node
const http = require("http")

let servidorHTTP = http.createServer( function(request, response){

    console.log("=======================================")
    console.log("Petición http recibida")
    //console.log(request)
    console.log(request.method)
    //console.log(request.headers)
    console.log(request.url)

    //Configuramos el head de la respuesta
    response.setHeader('content-type', 'text/html')

    let contenidoBody = crearHTML()
    //Response.end da por finalizada la petición y devuelve la respuesta
    //http
    //Si le pasamos algo por parámetro lo coloca en el body de la respuesta
    //Tiene que ser un string!
    response.end(contenidoBody)

} )

//Arrancamos el objeto server
//listen es una función asíncrona
servidorHTTP.listen(1000)

console.log("Esperando peticiones en el puerto 1000")


function crearHTML(){

    let html = `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Nuestra primera web chispas</title>
            </head>
            <body>
                <h2 align="center">
                    <font color="lightGreen">
                        Contenido HTML generado dinámicamente
                    </font>
                </h2>

                <table align="center" border="1">
                    <tr>
                        <th>Titulo</th>
                        <th>Director</th>
                    </tr>`;

    return html

}

function listarPeliculas(){
    //Simulamos una consulta a la bb.dd.
    return [
        {
            titulo : 'Indiana Jones',
            director : 'Steven Spielberg'
        },
        {
            titulo : 'Depredador',
            director : 'John McTiernan'
        },
        {
            titulo : 'Los Gremlins',
            director : 'Joe Dante'
        },
        {
            titulo : 'Tron',
            director : 'Steven Lisberger'
        },
        {
            titulo : 'El padrino',
            director : 'Scorsese'
        }
    ]    
}
