//aplicaicon que publique un Api REST

const http=require("http");

puerto=3000;
http.createServer(procesarPeticion)
    .listen(puerto, function(){
    console.log("Esperando peticiones en el peurto ---> " + puerto)

})
//metodo de triaje de la peticion recibida
function procesarPeticion(request,response){
    let metodo =request.method.toUpperCase();
    let url= request.url
   
    //metodos con corto Circuito donde doble aspersan hace que se vbalida el primero sin necesidda qie se vaya a la 2da condicion
    if (metodo=="GET" && url=="/peliculas"){
        listarPeliculas()
    } else if(metodo=="GET"&& url.match("^/peliculas/[0-9]+$")){
        //utilizando expresione regular else if(metodo=="GET"&& url.match("^/peliculas/[0-9]+$"){ nota cuando no consgue en la 2da expresion la toma false la expresion
        buscarPeliculas(request,response)

    }else if(metodo=="POST"&& url=="/peliculas"){
        insertarPeliculas(request,response)

    }else if(metodo=="PUT"&& url.match("^/peliculas/[0-9]+$")){
    modificarPeliculas(request,response)
 
    } else if(metodo=="DELETE"&&url.match("^/peliculas/[0-9]+$")){
        eliminarPeliculas(request,response)
     
    } else{
        //404
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

function listarPeliculas(request,response){
    console.log("listar")

    //response.end()
}

function buscarPeliculas(request,response){
    console.log("buscar")
}

function insertarPeliculas(request,response){
    console.log("Insertar")
}

function modificarPeliculas(request,response){
    console.log("Modificar")
}

function eliminarPeliculas(request,response){
    console.log("Eliminar")
}

//operadores logicas con cortocircuito
//if ((getA()) && (getB()){

//}

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

