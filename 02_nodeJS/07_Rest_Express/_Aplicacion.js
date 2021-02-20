//aplicaicon que publique un Api REST

//sin utilizar las librerias express
const http=require("http");
const negocioPeliculas = require("./negocioPeliculas.js") //importamos la capa de negocio
const restUtil=require("./restUtil")
const mongoDBUtil=require("./util/mongoDBUtil") //posiblemente no hace galta .js
const servidorWeb = require("./servidorWeb")


mongoDBUtil.conectar(arrancarServidor) //aqui esta llamando un callback
/*
//se sustituye por el codigo de mongoDBUtil
    //const mongoDB=require("mongodb")


        //de tipo promesas
    //proceso hecho en paralelo  
        mongoDB.connect("mongod://localhost:2017", {useUnifiedTopology:true})
        .then(function(dbsS){
            console.log("Conectado..... a la BD")
    /*
        // en este orden se ejcuta en este orden si lo colocamos aqui
        puerto=3000;
        http.createServer(procesarPeticion)
        .listen(puerto, function(){
        console.log("Esperando peticiones en el peurto ---> " + puerto)

        })    


        })
        .catch(function(err){
            console.log(err)
        })
*/
    
//los proceso se ejecutan en paralo si se hace esta manera, por ello colocamos el arranque del servidor con una funcion
function arrancarServidor(){
    console.log("Creando la conexion del Servidor http")
    puerto=3000;
    //
       http.createServer(procesarPeticion)
        .listen(puerto, function(){
        console.log("Esperando peticiones en el Servidor HTTP en el puerto ---> " + puerto)

    })

}

//



//metodo de triaje de la peticion recibida
//la responsabilidad de esta funcion es averiguar quien procesara esta peticion
function procesarPeticion(request,response){
  
    let metodo =request.method.toUpperCase();
    let url= request.url
    //para que salga toda la trazaen la consola de la speticiones
    console.log("==================================")
    console.log("Peticion recibida: "+metodo+" "+url)
   
    //metodos con corto Circuito donde doble aspersan hace que se vbalida el primero sin necesidda qie se vaya a la 2da condicion
    if (metodo=="GET" && url=="/peliculas"){
        listarPeliculas(request,response)
    } else if(metodo=="GET"&& url.match("^/peliculas/[0-9a-fA-F]{24}$")){
        //utilizando expresione regular else if(metodo=="GET"&& url.match("^/peliculas/[0-9]+$"){ nota cuando no consgue en la 2da expresion la toma false la expresion
        buscarPeliculas(request,response)

    }else if(metodo=="POST"&& url=="/peliculas"){
        insertarPeliculas(request,response)

    }else if(metodo=="PUT"&& url.match("^/peliculas/[0-9a-fA-F]{24}$")){
        modificarPeliculas(request,response)
 
    } else if(metodo=="DELETE"&&url.match("^/peliculas/[0-9a-fA-F]{24}$")){
        eliminarPeliculas(request,response)
     
    } else{
        //404
        //restUtil.devolverError(response,404,"Mensaje Vlidacion Inicial de carcateres No corresponde al codigo de la Pelicula")
        //response.end("")
        servidorWeb.devolverContenidoEstatico(request, response)
    }
}   

/////////////////////////////////////
//////Tareas a relizar por la logica de control 
////////////////////////////////////

//-Averiguar que nos estan pidiendo
//-Extraer de la peticion los cvalore snecesarios para proceesarla
//Estos valores podran venir cpomo:
// -parametros en la query (?)
// -parametros en la body
// -parametros en la url
// -parametros en la HEAD
// -un jJSON en el body (o cualquier otro formato)

//-Invocar la funcion con la logica de newgocio

//-si la logica de negocio ha devuelto algo que le interesa al clienye configuar
//la respues para entregarlo

//FIN

/// sin
//GET / peliculas
function listarPeliculas(request,response){
    console.log("listar las Peliculas de la BD")
    //llamaria directamente de negocio
    negocioPeliculas
    .listarPeliculas()
    .then(function(peliculas){
        response.setHeader('Content-Type','application/json')
        response.end(JSON.stringify(peliculas))

    })
    .catch(function(err){
        console.log(err)
        restUtil.devolverError(response,500,"Error al listar las peliculas que se quiere")

    })
    
}

//GET /peliculas/:id
//
//200 OK
//Content-Type : application/json
//-------------------------------
//{ pelicula }
//
//404 Not found
//Content-Type : application/json
//-------------------------------
//{ codigo:404, mensaje:"La pelicula solicitada no existe"}
//
//500 Internan server error
//Content-Type : application/json
//-------------------------------
//{ codigo:500, mensaje:"Error al buscar la pelicula."} 



function buscarPeliculas(request,response){
    
    
    console.log("buscar Peliculas en (LC)")
    //aqui hace falta el id de la pelicula
    //let id = request.url.substring(11)
    //let id = request.url.split("/")[2] 
    let id=request.url.split("/").pop()//me trae la ultima parte luego que salte
    negocioPeliculas
        .buscarPeliculas(id) //leyendo las funciones de la capa de negocio
        .then(function(pelicula){
            if(!pelicula){
                //no ha fallado la query
                restUtil.devolverError(response, 404, "La pelicula no Existe")
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

//POST / peliculas /:id
//ct: app/json
//{peliculas}
//
//201 Created
//CT: app/json
//-------------------------------
//{ "_id" : "XXX" }
//O también:
//{ pelicula }
//
//400 Bad request
//CT: app/json
//-------------------------------
//{ codigo:400, mensaje:"Datos invalidos"}
//
//500...

function insertarPeliculas(request,response){

    console.log("Insertar pelicula logica de Control (LC) ")
    //el body de una peticion debemos leerla nosotros
    //por defecto no se lee el body
    //nostros somos lo que decidimos si lee o no
    //request.on ("data",callback) ordenamos su lectura
    //request.on es una funcion ASINCRONA
    request.on("data", function(contenidoBody){ //el request tiene el evento "on", cuand te hayas leido el body 

    let pelicula=JSON.parse(contenidoBody);
    negocioPeliculas
    .insertarPeliculas(pelicula) //para mongo es una promesa
    .then(function(result){

        console.log(result)
        response.statusCode=201
        response.setHeader("content-Type","applicacion/json")
        //solo el id
        //response.end(JSON.stringify({_id:result.insertId}))
        
        //si queremos repode con todo la informacion del objeto, te devuelve json completo
        response.end(JSON.stringify(result.ops[0]))

    })
    .catch(function(err){ //si viene aqui pasa algo al hacer el inseert en la BD
        console.log(err)
        restUtil.devolverError(response,500,"Error al buscar Peliculas")

    })

    //response.end() //damos la respuesta

 })

   
}

//PUT /peliculas/:id
//CT: app/json
//-------------------------------
//{ pelicula }
//
//200 OK
//
//400 Bad request
//
//404 Not found
//
//500

function modificarPeliculas(request,response){
    console.log("Modificar pelicula capa de Logica Control (lC) ")
    
    //aqui se rwquiere la pelicula y el id
    let id=request.url.split("/").pop()//me trae la ultima parte luego que salte

    request.on("data", function(contenidoBody){ //el request tiene el evento "on", cuand te hayas leido el body 
        let pelicula=JSON.parse(contenidoBody);
       
        pelicula._id=id //para que me traiga el id

        negocioPeliculas
        .modificarPeliculas(pelicula)
        .then(function(result){
            //deveolver un 200
            //si mooramos laconsole
            //console.log(result.message.)
           // if(result.modifiedCount==0){ //para visualizar el mensaje las veces que se modifica el registro
               
           //if(result.n == 0){ //se relaciona con los mensajes de la respuesta de la consola de mongo
           if(!result.value){ //se relaciona con los mensajes de la respuesta de la consola de mongo
                
                restUtil.devolverError(response,404,"No existen la Pelicula")
                return
            }
            response.end("OK")
            console.log(result)

        })
        .catch(function(err){
            console.log(err)
            restUtil.devolverError(response,500,"Error al Modificar  Peliculas")


        })
    //response.end() //damos la respuesta

    })    
}

//delete /peliculas/:id
function eliminarPeliculas(request,response){
    console.log("Eliminar desde la Capa Control (LC) ")

    //aqui se rwquiere la pelicula y el id
    let id=request.url.split("/").pop()//me trae la ultima parte luego que salte
   
    negocioPeliculas
        .eliminarPeliculas(id) //leyendo las funciones de la capa de negocio
        .then(function(result){

        response.end("OK")

    })
    .catch(function(){
        restUtil.devolverError(response,500,"Error al Borrar la  Peliculas")

    })
   
}

//operadores logicas con cortocircuito
//if ((getA()) && (getB()){

//}
/*
//manejo de expresiones rgualres
let texto="abcdefgh";

console.log(texto.match("cdf$")) //traae las pisiciones donde consiga
//termina en final
console.log(texto.match("cdf$")) //traae las pisiciones donde consiga

//comienza en comienza
console.log(texto.match("^cdf")) //traae las pisiciones donde consiga

//comienza y contenga nuemros
console.log(texto.match("^cdf-[0-9]")) //tla 2da parte debe ser numero


//comienza y contenga nuemros y tebga mnas de un valor numerico repetido
console.log(texto.match("^cdf-[0-9]+$")) //tla 2da parte debe ser numero
*/
