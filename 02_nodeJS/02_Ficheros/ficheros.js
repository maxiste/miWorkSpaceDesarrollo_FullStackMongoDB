
const fs=require("fs");

//fs.readFile("./recursos/fichero1.txt")//rutas relativas se "./ toma donde se esta ejecutando copmo raiz de oden se ejecuta el js

//funcion sincrona

//let contenidoBuffer =fs.readFileSync("./recursos/fichero1.txt")

//console.log(process.cwd())

    if (process.cwd()==__dirname){
        let contenido1 =fs.readFileSync("./recursos/fichero1.txt")

        let contenido2 =fs.readFileSync("./recursos/fichero2.txt")
        
        let text2=contenido1.toString()+contenido2.toString()
        console.log("mis Ficheros"+text2)   
    }else {
        contenido1="NI mod no trae la carpeta"
        contenido2=contenido1+"Jder"+"\n"
        console.log("no est atrayendo el directorio igual al DIR -> "+__dirname)
        console.log("no est atrayendo el directorio process----> "+process.cwd())
    }

//let contenido1 =fs.readFileSync("./recursos/fichero1.txt")

//let contenido2 =fs.readFileSync("./recursos/fichero2.txt")

let text2=contenido1.toString()+contenido2.toString()
console.log("mis Ficheros"+text2)

/*
let contenidoString=contenidoBuffer.toString()
console.log(contenidoString)

*/
////
//Escritura de ficheros
//fs.writeFileSync("/recursos/fichero4.txt",text2)

///Excritura asincronica de ficheros
/////
let txt=""
let resultado=""
fs.readFile("./02_nodeJS/02_Ficheros/recursos/fichero1.txt", function(err, contenidoBuffer){
    //if(err!=null){
    if(err){
        console.log("Error:",err)
        return
    }        
    console.log("=============================")
    let contenido = contenidoBuffer.toString()
    console.log(contenido)
    resultado += contenido

    fs.readFile("./02_nodeJS/02_Ficheros/recursos/fichero2.txt",function(err,contenidoBuffer1){
        //
        if(err){
            console.log("Errrror",err)
            return
        }
        let contenido=contenidoBuffer1.toString()
        txt+=contenido
        console.log(contenido)

        fs.readFile("./02_nodeJS/02_Ficheros/recursos/fichero3.txt",function(err,contenidoBuffer1){
            //
            if(err){
                console.log("Errrror",err)
                return
            }
            let contenido=contenidoBuffer1.toString()
            txt+=contenido
            console.log(contenido)

            console.log("---------------------------------------------")
            console.log(resultado)

            fs.writeFile("./02_nodeJS/02_Ficheros/fichero4.txt", resultado, function(err){
                if(err){
                    console.log("Error:",err)
                    return                        
                }

                console.log("==========------Se tuvo que hace Cambios de ruta directas para que tomara donde estaba el archivo===================")
                console.log("FIN!!!!!!!")

            }) //escribir el resultado

            
        }) //fin fichero3


    }) //ficero 2

}) //se lee 1ero de una manera

/* si qureemos ir cargando los diferentes archivos
    fs.readFile("./recursos/fichero2.txt",function(err,contenidoBuffer1){
        //
        if(err){
            console.log("Errrror",err)
            return
        }
        let contenido=contenidoBuffer1.toString()
        txt+=contenido
        console.log(contenido)
    })

    fs.readFile("./recursos/fichero3.txt",function(err,contenidoBuffer1){
        //
        if(err){
            console.log("Errrror",err)
            return
        }
        let contenido=contenidoBuffer1.toString()
        txt+=contenido
        console.log(contenido)
    })
*/

/*
    //de lo anterior esta manera como debe ser forma 
    let contenido=fs.readFile("./recursos/fichero1.txt",function(){})
    console.log(contenido); //lee el fichero y lo guarda 
*/

////Espera activa se decarta
/*
    while(contenido==""){

    }
*/
// ejercicio anterior console.log("XD",txt)
console.log("Game Over")