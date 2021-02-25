//////
//Clases
/////
//identidad
//Funcionalidad
//Las clases son los moldes que se utilizan para crear los objeto
//recordar el UpperCame para decalra las clases
//MaxisrteLedezma cada comienzo de paralabras o frase que hacen la clase en mayuscula
var CuentaBancaria = /** @class */ (function () {
    function CuentaBancaria() {
    }
    //funcionalidaes
    CuentaBancaria.prototype.toString = function () {
        return this.IBAN + this.banco + this.dc + this.libreta + this.sucursal;
    };
    return CuentaBancaria;
}());
//instanciando un objeto
//sin usar yipo
//let cb1 =new CuentaBancaria()
//usando el tipò:
var cb1 = new CuentaBancaria(); //como si fuera un constructor pero no es
cb1.IBAN = "ABCD";
//cb1.IBAN=1234 NO LO PERMITE
cb1.banco = 1234;
//cb1.banco = "ABCD"
cb1.sucursal = 5678;
cb1.dc = 90;
cb1.libreta = 1234567890;
//
//cobstructores
//
//en typescrpt podmos tener un vcontructpor y solo uno
//no hay sobrecarga de constructores
//el cosntructor debe llarmarse constructor
//todas las clases tiene cosntructor aunque sea impliciatamente
var Libro = /** @class */ (function () {
    //cosntrcutor, lo colocamos el codufo necesrio para iniciliar el objeto
    function Libro(ISBN, autor, titulo) {
        this.ISBN = ISBN;
        this.autor = autor;
        this.titulo = titulo;
        console.log("Creando un libro");
    }
    return Libro;
}());
//al modifcar el constructor con parametros no se pude decalra vacio
/*
    let libro1:Libro =new Libro();

    libro1.ISBN="ABCD"
    libro1.titulo="El orazon de las tienieblas"
    libro1.autor="Josepgh Conrad"
*/
var libro1 = new Libro("ABCDS", "el Coranzon Valiente", "Josepth Conrrad");
console.log(libro1.titulo + "," + libro1.autor);
