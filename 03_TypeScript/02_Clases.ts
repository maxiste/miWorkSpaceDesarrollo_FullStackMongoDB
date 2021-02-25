//////
//Clases
/////

//identidad
//Funcionalidad

//Las clases son los moldes que se utilizan para crear los objeto

//recordar el UpperCame para decalra las clases
//MaxisrteLedezma cada comienzo de paralabras o frase que hacen la clase en mayuscula

class CuentaBancaria{
    //identidad
    //Atriutos/campos/variables de clase/variable miembro
    IBAN        : string
    banco       : number
    sucursal    :number
    dc          :number
    libreta     :number

    //funcionalidaes
    toString():string{

        return this.IBAN + this.banco + this.dc + this.libreta + this.sucursal
    }
}

//instanciando un objeto

//sin usar yipo
//let cb1 =new CuentaBancaria()

//usando el tipò:

let cb1:CuentaBancaria=new CuentaBancaria() //como si fuera un constructor pero no es

cb1.IBAN="ABCD"

//cb1.IBAN=1234 NO LO PERMITE

cb1.banco = 1234
//cb1.banco = "ABCD"
cb1.sucursal = 5678
cb1.dc = 90
cb1.libreta = 1234567890

//
//cobstructores
//

//en typescrpt podmos tener un vcontructpor y solo uno

//no hay sobrecarga de constructores
//el cosntructor debe llarmarse constructor
//todas las clases tiene cosntructor aunque sea impliciatamente


class Libro {
    ISBN        :String

    autor       :string

    titulo      :string

    //cosntrcutor, lo colocamos el codufo necesrio para iniciliar el objeto
    constructor(ISBN,autor,titulo:string){ 
            this.ISBN=ISBN
            this.autor=autor
            this.titulo=titulo
        console.log("Creando un libro")
    }
  

}

//al modifcar el constructor con parametros no se pude decalra vacio
/*
    let libro1:Libro =new Libro();

    libro1.ISBN="ABCD"
    libro1.titulo="El orazon de las tienieblas"
    libro1.autor="Josepgh Conrad"
*/

let libro1:Libro=new Libro("ABCDS","el Coranzon Valiente","Josepth Conrrad")

console.log(libro1.titulo+","+libro1.autor)

///POdemos asignar valores por defecto a los parametrosa del cosbntrcutor (ebn relaidad a los aprametros)
//de cualquier constructort

class Alumno{
    nombre         :string
    direccion      :string
    negativos      :number

    constructor(nombre=null,direccion=null, negativos=0){
        this.nombre=nombre
        this.direccion=direccion
        this.negativos=negativos
    }

}

class Pruebas{
    dato1               :number
    public      datos2  :number
    protected   datos3  :number
    private     datos4  :number

    funcion1(){}
    public funcion2(){}
    protected funcion3(){}
    private funcion4(){}

}

let prueba:Pruebas=new Pruebas()

prueba.dato1=10
prueba.datos2=20

//prueba.datos3=20 //noson visilbles en el exterior
//prueba.datos4=20 //noson visilbles en el exterior

prueba.funcion1()
prueba.funcion2()

//prueba.funcion3() //no son accesibñles desde el exterior
//prueba.funcion3()

///
//TYPESCRIPT POSEE MUY BUENOS ATAJOS PARA DEFINIR CLASES Y CONSTRUCTORES 
///

class Punto{
    //x: number //no se necesario su secoloca el modifcador de acceso
    //y:number

    constructor(
        public x:number, 
        public y:number){ //al colocar el parametro de acceso se define automaticamente
        //no es necesario cuando le colcasa el modifcador de acceso public
            // this.x=x
            // this.y=y

    }
}

class Poligono{

    nombre      :string

    vertice     :number

    coordenadaVertices:Punto[ ] //utilizamos otra clase
    //coordenadaVertices=[{x:0,y:0} ]
    constructor(nombre:string,vertice:number,coordenadaVertices:Punto[]){
        this.nombre=nombre
        this.vertice=vertice
        this.coordenadaVertices=coordenadaVertices

    }
}

class Linea{
    punto1:number
    punto2:number
}

//si no colcoamos los modificaciodres de acceso ern los parametros  del cosntrcutor
//dicgos parametros se convierteen magicamente enb atributos de la clase
//cuyo valor sera en entregado al constructor

// obviansdo todo
class Poligonos{

   // nombre      :string

    //vertice     :number

    //coordenadaVertices:Punto[ ] //utilizamos otra clase
    //coordenadaVertices=[{x:0,y:0} ]
    constructor(
        public nombre:string,
        public vertice:number,
        public coordenadaVertices:Punto[]){
        //this.nombre=nombre
        //this.vertice=vertice
        //this.coordenadaVertices=coordenadaVertices

    }
}

//reducido
class Lines{
    //punto1:number //ya definidos en el cosntructor
    //punto2:number

    constructor(public punto1:Punto=null,
                public punto2:Punto=null){

        }
}

/////////////////////////////////////////////////////////
//la definicion de clases de abajo es la simplificacion como se define
/*
-pantalla de login y su registro de usuarios
-pantalla del catalogo
-pantalla de laca cesta/pedido
-pantalla de compra
    pedido->factura
-pantalla de facturas
*/

class Cliente{

    public constructor(
        public _id      :string =null,
        public login    :string =null,
        public pw       :string =null,
        public nombre   :string =null,
        public direccion :string =null,
        public telefon  :string =null,
        public correoE  :string =null,
    ){

    }
    
}

class Producto{
    public constructor(
        public _id          :string=null,
        public nombre       :string=null,
        public fabricante   :string=null,
        public imagen       :string=null,

        //simplificadno=????
        public precio       :number=null,
        public existencia   :number=null
    ){

    }
}

class detallePedido{
    public constructor(
        public _id          :string=null,
        public cantidad     :number=null,
        public precio       :number=null
        
    )
    {

    }

}

class Pedido{
    public constructor(
        public _id          :string=null,
        public codigo       :string=null,
        public fecha        :string=null,
        public  estado      :string=null,
        private  detalles   :detallePedido[] =null, //no dberia tener acceso desde el exterior

        //???? es una propiedad que no necesariamente deberia estra definida 
        private total        :number=0, //sin embargo no es necesario perque es calculado
        public existencia    :number=0
    ){

    }

    public getTotal():number{
        return this.total
    }

    public addDetalle(producto:Producto, cantidad, precio:number):void{
        //mirar si hay un detalle con ese producto
        //si no se añade del detalle
        //si esta se suma a la cantidad pedida

        //Recalcular el Total
        this.recalcularTotal()
    }

    public eliminarDetalle(producto:Producto){
        //BUscar ek detalle que tiene ese producto y eliminarki

         //Recalcular el Total
         this.recalcularTotal()

    }

    public modificarDetalle(){

         //Recalcular el Total
         this.recalcularTotal()

    }

    private recalcularTotal():void{


    }

}

///muestra de como estaria funcionando

let pedido:Pedido =new Pedido()

let detalle:detallePedido=new detallePedido() //lo permite decalrar vacio porque estoy inicializando las propiedades

detalle.cantidad=5

detalle.precio=5

//pedido.detalles=[] //no se tiene acceso desde el exterior
//pedido.total=99.99 //igual que el atnerior
