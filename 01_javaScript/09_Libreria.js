
//funcion generica que cree un objeto arays de un formularios
//requisitos
//-el formualrio debe tener id
//-los campos del formulario debe tener  id
//-las propiedades del objeto cnicidiran con el id de los campos

function crearObjeto(idFormulario){ //simepre y cuando haya un id en este caso del formukarui
    //tomando en consideracion del objeto perosna ques e carga en el html

    //$("#"+idFormulario+" input") //aqui encuentra indifewrente el di definidi a la etiqueta sea form o no 
    //node develve lo que esta en el idformulario ques ean input, textarea
   // console.log($("#"+idFormulario+" input, textarea,select"))

    let objeto={}
    
    //version javaSCript
    //let nodos = document.querySlectorAll("#"+idFormulario+" input, textarea,select")


    //let nodos =$("#"+idFormulario+" input, textarea,select")

    //le assignamos el objeto las ropiedades necesarias con for
   /*
        for(nodo of nodos){
            let id =nodo.id

            let valor=nodo.value
            objeto[id]=valor

        }
    */
    //ahora utilizamos con each
   //Podemos utilizar la función 'each' de la misma manera que podiamos utilizar
   
   //$(`#${idFormulario} input,textarea,select`)
   $("#"+idFormulario+" input,textarea,select")
     .each(function(){
       objeto[this.id] = this.value
   })

return objeto
}

//Vacía los campos de un formulario
//Requisitos:
//-Que el formulario tenga id
//-Puede ser cualquier etiqueta
    //funcion vaciar campos de cualquier formularioa
    function vaciarFormulario(idFormulario){
        $(`#${idFormulario} input,textarea,select`)
        .val("")

    }

    //Rellena los campos  del formulario con funciones
    function rellenarFormulario(objeto){
        //propiedad es el nodo que voy a buscar del objeto
        for (let propiedad in objeto){
            $(`#${propiedad}`).val(objeto[propiedad])
        }
    }

    //Generar de tblas
    //parametro
    //-Array de objeto
    //-id para la tabla
    //nombre y orde de las columnas
    //stilo de la tabla


    //los parametros de las cabceraas debe 
    //por ello necesito necesito dos recorridos 

//Parámetros obligatorios
//-array de objetos.
//
//Parámetros opcionales:
//{
//    columnas    : [],
//    propiedades : [],
//    idTabla     : "",
//    class       : "", 
//    onclick     : function(obj que ocupa la fila en la que se ha hecho click){}
//}

    function generarTabla(objetos, parametrosOpcionales){
    //Comprobamos si vienen los nombres de las columnas
    //Si no vienen se utilizan los nombres de TODAS las propiedades del 
    //primer objeto que haya en 'objetos''

        let nombreColumnas=[]
        let nombresPropiedades=[]
        

        if(parametrosOpcionales && parametrosOpcionales.columnas){
            nombreColumnas=parametrosOpcionales.columnas
            nombresPropiedades=parametrosOpcionales.propiedades
        }else{
            let primerObjeto=objetos[0]
            for (let propiedad in primerObjeto){
                let x=propiedad.slice(0,1).toUpperCase()+propiedad.slice(1)
                //nombreColumnas.push(propiedad)
                nombreColumnas.push(x)
                nombresPropiedades,push(propiedad)
            }
        }

        console.log(nombreColumnas)
        console.log(nombresPropiedades)

//Comprobamos para agregarlo con el id de la tabla

let idTabla=null
if(parametrosOpcionales && parametrosOpcionales.idTabla){
    idTabla = parametrosOpcionales.idTabla
}else{
    idTabla="tabla - "+Date.now()
}

//Comprobamos si oblcick viene  bien la funcion
let onclick=null
if(parametrosOpcionales && parametrosOpcionales.onclick){
    onclick=parametrosOpcionales.onclick
}

////////////////////   ///////////
     //Creamos la tabla//
////////////////////   ///////////

        let tabla = $(`<table id="${idTabla}" border="1" align="center"></table>`)
        //Creamos la Cabecera
        let trCabcera = $(`<tr></tr>`)
        //Añadimos los TH correspondiente
        $(nombreColumnas).each(function(){
            trCabcera.append(`<th>${this}</th>`)
        })

/*
        let primerObjeto= objetos[0]
        for (let propiedad in primerObjeto){
            $(`<th>${propiedad}</th>`).apendTo(trCabcera)

        }
 */       
        tabla.append(trCabcera)

      //En este bucle recorremos los objetos y creamos los tr   
        $(objetos).each(function(pos, obj){
            let tr=$("<tr>")
         //En este bucle recorremos las propiedades y creamos los td
           $(nombresPropiedades).each(function(pos,nombresPropiedad){
            $(`<td>${obj[nombresPropiedad]}</td>`).appendTo(tr)

           })
           //sino traes han paso el onlick se le asigna al tr condicionando las filas con css
           if (onclick){
               tr.click(function (){
                  
                    $(`#${idTabla} tr`).css("background-color","white") //trayendo irectamente el tr corrspndiente del click
                    this.style.bacground="lightGreen"
                        onclick(obj)
                })
            }  
           tr.appendTo(tabla)
          
        })
    

        return tabla

    }
    
