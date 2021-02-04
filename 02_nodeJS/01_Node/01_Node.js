console.log("Hola Mundo para Node")
//npm gestor proyectos Informacion comentario
//Modulos eb Node

//Crearemos una app que reciba peticiones desde el navegador
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
console.log("HOla MUndo en JS Max")

const { O_DIRECTORY } = require("constants")
//Modulos en Node
const http=require("http")


    let servidorHTTP=http.createServer(function(request,response){
        console.log("Peticion http Recibidoa")
       // console.log(request)
       console.log(request.method)
       //console.log(request.header)
       console.log(request.url)

       //Configuramos el head de la respuesta
       response.setHeader('context-type','text/html')
       
       let contenidoBody=crearHTML() 
       //Respojnse.end da por fianlziada la peticion y devuelve la respuesta
       //http
       //Si le pasamos algo por paremtro le coloca en el bodu de la respuesta
       //tiene quee un string

       response.end(contenidoBody)
    })

    //arrancamos el objeto server
    //listen es una funcion asincronica
    servidorHTTP.listen(1000)
    console.log("esperando respuesta del puerto 1000")

function crearHTML(){
    let html=`<html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head> 
                <body>
                    <h2>
                        <font>
                        Contenido HTML Generado Dinamicamente
                        </font>
                    </h2>
                        <table align="center" border ="1">
                            <tr>
                                <th>
                                    Titulo
                                </th>    
                                <th>
                                    Director
                                </th>    
                            </tr>`
              ;
    
             let peliculas=listarPeliculas()
             for (let pelicula of peliculas){
                 html+= `<tr>
                            <td>${pelicula.titulo}</td>
                            <td>${pelicula.director}</td>
                        </tr>`
             }
             html+=` </table>
                        <body>
                    </html>`
    return html
}
function listarPeliculas(){
    //simule consulta a la BD
    return [ {
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
    }]

}