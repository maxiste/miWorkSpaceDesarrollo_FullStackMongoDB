let fs=require("fs/promises")
/*
        fs.readFile("./recursos/fichero1.txt")
            .then(function(buffer){ //me promete el contenido del fichero
                console.log(buffer.toString())
            })
            .catch(function(err){
                console.log(err)
            })

            fs.readFile("./recursos/fichero2.txt")
            .then(function(buffer){ //me promete el contenido del fichero
                console.log(buffer.toString())
            })
            .catch(function(err){
                console.log(err)
            })   
            
            fs.readFile("./recursos/fichero3.txt")
            .then(function(buffer){ //me promete el contenido del fichero
                console.log(buffer.toString())
            })
            .catch(function(err){
                console.log(err)
            })

            fs.readFile("./recursos/fichero4.txt")
            .then(function(buffer){ //me promete el contenido del fichero
                console.log(buffer.toString())
            })
            .catch(function(err){
                console.log(err)
            })
*/
    ////////otra forma 
    let resultado=""
    fs.readFile("./recursos/fichero1.txt")
    .then(function(buffer){ //me promete el contenido del fichero
        console.log(buffer.toString())
        resultado=buffer.toString()
        return fs.readFile("./recursos/fichero2.txt")
    })
    .then(function(buffer){
        console.log(buffer.toString())
        resultado+= buffer.toString()
        return fs.readFile("./recursos/fichero3.txt")
    })
    .then(function(buffer){
        console.log(buffer.toString())
        resultado+= buffer.toString()
        return fs.writeFile("./recursos/resultado.txt", resultado)
    })
    .then(function(){
        console.log("Fichero Creado Correctamente")
    })
    .catch(function(err){
        console.log(err)
    })
    .finally(function(){
        console.log("fiun de Verdad")
    })

    console.log("Fin en Falsooo")