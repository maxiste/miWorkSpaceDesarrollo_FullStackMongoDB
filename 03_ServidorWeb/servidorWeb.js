
const http = require("http")
const fs   = require("fs")
const { url } = require("inspector")

//Variables globales en Array Asocitivo para Manjeo de errores
let statusCodes={
    400:"peticion incorrecta",
    404:"El recurso no esta Disponible",
    405:"Metodo HPPT no adminitido"
}

let contentTypes={

    ico:"image/x-icon",
    css:"text/css",
    js:"application/javascript",
    html:"text/html"
}

//definicion dell servidor HTTP y lo peonesmo en amrcha
let servidor = http.createServer(procesarPeticion)
let puerto=2000
servidor.listen(puerto, function(){
    console.log("Esperando Peticiones por el puerto..."+puerto)
})


function procesarPeticion(request, response){
   let metodo=request.method.toUpperCase()
   let url=request.url

    console.log("==================================")
    console.log("Peticion recibida: "+metodo+" "+url)

    //solo que permite peticiones GET
    if (metodo != "GET"){
        //response.statusCode=405
        //response.end("Method not Allowed")
        
        //devolverError(405,"Metodo no Adminitdo",response)
        devolverError(405,response)
        return
    }
   
    //leer la url wuitando le query paramel fichero
        //let url = request.url

        //
        /*
            if(url=="favicon.ico"){
                response.statusCode=404
                response.end("Not Found")
                return
            }
        */
    leerFichero(url,response)
    
}

//Leera el fichero y lo colocará en el body de la respuesta con response.end(contenido del fichero)
function leerFichero(ruta, response){

    let url="./recursos"+ruta
    console.log("Buscando Ruta"+ruta)
    let extensiones=url.split(".").pop() //ya no hay stop
   
    fs.readFile(url, function(err, contenidoBuffer){
        if(err){
             //para Simpificar supndremos que si hay un error qes que el fichero no existe //404 //response.end("404")
            //con pagina    //  devolverError(404,"El recursoo no Existe nada",response)
           
            devolverError(404,response)
            return
        }

        let contenido = contenidoBuffer.toString() 
        //console.log(contenido)

        response.setHeader("content-type",contentTypes[extensiones])
        response.end(contenido)
    })
    //response.end("OK")
}


function devolverError(statusCode, response){ //se cambio quitando el parametro de mesnajes "statusCode, mesnaje, response"
    
    let mensaje=statusCodes[statusCode] ///adui se llam un array asociativo declarado
    
    let html=`<html>
                <head><meta charset="UTF-8"></head>
                <body>
                </body>
                    <h1 align="center">
                        <font color="lightreen">
                            WebSeerver3000
                        </font>
                    </h1>
                    <h2 align="center">
                        <font color="lightblue">
                            Se ha prducido un error
                        </font>
                    </h2>
                    <h1 align="center"> 
                        <font color="red">
                            ${statusCode}
                        </font>
                        ${mensaje}
                    </h1>
                </body>
            </html>`
                response.setHeader("content-type","text/html")
                response.end(html)
}