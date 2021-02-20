///////////////////////////////////////////////////////////////////////
 ///Validamos el comportamiento de la libreria Express de node////////
//////////////////////////////////////////////////////////////////////


//npm install express
const express = require("express")


//Cuando invocamos la funcion express nos devueven un objeto del tipo función
//Esa es la función que procesará todas las peticiones entrantes
let app = express()

//El objeto 'app' es la función que se le proporciona al servidor cuando se invoca 'createServer'
//const http = require("http") //Express ya incluye este require
//http
//    .createServer(app)
//    .listen(4000, function(){
//        console.log("Esperando peticiones en el puerto 4000")
//    })


//
//Indicando el puerto y arrancando el servidor
//

app.listen(4000, function(){
        console.log("Esperando peticiones en el puerto 4000")
    })

///////////////////////////////
//////CONFIGURANDO EXPRESS////
//////////////////////////////


//URLS Y METODOS

app.get('/saludar', saludar)
app.post('/directores', insertar)

function saludar(request, response){
    response.end("Hola que tal!")
}

function insertar(request, response){
    response.end("Insertado!")
}

//Podemos definir el callback en la propia llamada a get, post, put...
//Pero QUEDA FEISIMO!
app.get('/pagina', function(request, response){
    let html = `
        <html>
            <body>
                <marquee>
                    Html generado dinamicamente con Node.JS + Express
                </marquee>
            </body>
        </html>`;
    response.setHeader('Content-type', 'text/html')
    response.end(html)
})
///
//accediendo a los queryparams?
///

//get /peliculas?genero=accion&year=1998&actor=BriceWillis

//
//{
//  genero: "accion",
//  year    :"1988"
//  actor   :"Brice Willis"
//}
//
//

app.get('/peliculas', listarPeliculas) 

    function listarPeliculas(request,response){
        console.log("Listar Pelicuals")

        console.log("Query Pârametre" ,request.query)

        console.log("Genero " ,request.query.genero)
        console.log("Año" ,request.query.year)
        console.log("Actor" ,request.query.actor)

        response.end("listado de peliculas "+request.query["actor"])



}

//acediendo a laos valores de la ruta
//
//get /clientes/15
//{
//  id      : "15",
//  
//  
//}


app.get("/clientes/:id", buscarCliente) //donde los id se determina ci¡uando le colocas los : asume que es el

function buscarCliente(request,response){
    console.log(request.params)
    console.log("id:"+ request.params.id)
    response.end("listado de Cliente:"+ request.params.id)


}

//


///podmos mas de un paramtros en doble ruta

app.get("/clientes/:id", procesarMovida) //donde los id se determina ci¡uando le colocas los : asume que es el

function procesarMovida(request,response){
    console.log(request.params)
    console.log("con doble Ruta"+ request.params.dato1)
    response.end("listado Reultado de Buscauwra con mas un valor:"+ request.params.dato1+"2da ruta"+request.params.dato2)




}

app.get("/coches/:id",buscarCoche)

function buscarCoche(request,response){
    let coche={
        id  : request.params.id,
        marca   :"Renault",
        modelo  :"12"
    }
/* contenido statico
    response.setHeader("content-Type","application/json")
    response.end(JSON.stringify(coche))
*/
    //esto sustituye lo anterior
    response.json(coche)


}

//Accedieindo al body

///////////////////
///Si queremos que express lea le body debemos resytrar un objeto capaz de procesarlo
// essp objetos se llamn bodyPraser

////???????????????? LO QUE FALTA

/////Tenemos que hacer el requiere. este Modulo esta ya incluido en express, no hace falta
/*
POST /insertarFactura
CT:
----------------
codigo=fra-1&fecha=123456&total=12345
*/

//se tuliza para leer el body
let bodyParser =require("body-parser") //ya viene instaldao con express

//invocamos el json
let jsonBodyparser=bodyParser.json()
//Res¡gistramos el body parser

app.use(jsonBodyparser)

app.put("/aviones/:id",modifcarAvion)

function modifcarAvion(request,response){
    let idAvion=request.params.id
    //aqui si queremos lo validamos

    let avion=request.body

    console.log("Avion: ", avion)
    response.end("Modifcado")
}
app.use(express.static("./recursos"))

app.get("/",home)

function home(request,response){
    //express añade la funcion de 'sendfile'

    console.log(__dirname)
    response.sendFile(__dirname+"/recursos/09_Agenda.html")
}


app.disable('x-powered-by')