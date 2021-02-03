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

//Modulos en Node
const http=require("http")

    let servidorHTTP=http.createServer(function(request,response){
        console.log("Peticion http Recibidoa")
       // console.log(request)
       console.log(request.method)
       console.log(request.header)
       console.log(request.url)

       let contenidoBody="Gracias por su Peticion"
       response.end(contenidoBody)
    })

    //arrancamos el objeto server
    //listen es una funcion asincronica
    servidorHTTP.listen(1000)
    console.log("esperando respuesta del puerto 1000")

