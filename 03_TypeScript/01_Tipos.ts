//para obtener erl trasnpilador4
//nom install +g typescript

import { totalmem } from "os"

//TYPESCRIPT
//-----------------

//ES UN LEG¡NGUAJE CREADO POR MICROSOFT
//SUPERCONJUNTO DE JS
//no permite hacer nada que no permita JS
//Oritenacion a objetos con clases
//no se compila
//no se interpreta
//se trasnpila a JS

//con herencia
//con interfaz
//no se ejecuta

//
//variable
//

//v.sin tipo
var x
let y
 const z=5

 //??? vliadar ???las variale sub tipo pueden guardar cualquier valor en cualquier momento ?????
 x=5
 x=true
 
 x="HOla"

 //variables de tipo
 //var|let|const nombre var:TIPO=valor

 let numero:number = 5

 let txt: string="Arreando"

 let activo:boolean=true

 console.log(numero)

 //tipo 'any'
 //Es igula que decalrar la varibale siun idncar el tipo

 let movida:any

 movida=5
 movida=true
 movida="Hola"

 //
 //Arreglos
 //

 //aqui delcaramos de tipo arra per no esta inicializado (indefined)
 let array1:[] //lo coloca undefine

 let array2:[]=[]//se deifne como arreglo

 //Array Tipados

 //let numeros:number[] //solo gaurda numeros

 //let palabras:string[] 

 let numeros:number[]=[]
 let palabras:string[] =[]

 palabras.push("Hola")
 numeros.push(1)
 numeros.push(2)
 numeros.push(3)

 //decalramos con any
 let cosas:any[]=[]

 cosas.push(true)
 cosas.push(0)
 cosas.push("dos")

 //
 //funciones
 //

 //podemos escribir las funciones como si estuvieramos en JS

 function sumar(s1,s2,s3){
     console.log(s1+s2,s3)
 }
//v alidemos esto
 console.log(sumar(10,20,30))

 console.log(sumar("10","20","30"))

 console.log(sumar(10,"20",30))

 console.log(sumar("10",20,30))

 //definiendo los tipos en los paarametros

function multiplicar(n1:number,n2:number){
    console.log(n1*n2)
} 
multiplicar(25,10)
//multiplicar("hola",true) //no lopermite
//

//definiendo el tipo del valor devuelto
function restar(n1:number,n2:number):number{
    return n1-n2
}

//let res2:boolean=restar(10,200); //no lo permite porque el tipo no corresponde


//disponemos dek tipo espcial 'void' para las funciones qwue o devuelv en nada
//su uso es opcional

function saludar(nombre:string):void{
    console.log("hola "+nombre)
}

saludar("MAxiste Ledezma")

//
//funciones con difernetes parametros recibisod que los declarados no lo hace y da un error


function dividir(n1:number,n2:number){
    console.log(n1/n2)
}

//dividir(1) //no transpila

dividir(1,2) //si lo hace

//dividir(1,2,3) //no trsnspi

//si necesitamos parametros variables los declaramos explicitamente con tales

function sumarNaturales(...numers:number[]):number{

    let total:number =0 //si no lo inicializas queda undefined
    for(let numero of numers){
        total+=numero
    }
    
return total   
}

console.log(sumarNaturales(1,2,3,4))

console.log(sumarNaturales(1,2,3,4,5555,666,0))

console.log(sumarNaturales(1))

console.log("Fin--esto es todo Amigos")

