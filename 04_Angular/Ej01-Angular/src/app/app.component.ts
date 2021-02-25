import { Component } from '@angular/core';
import { Vynilo } from './entidades/disco'; //aqui esta la clase creada

//ESTE ARCHIVO SE CONSIDERA COMO SI FUERA EL JS

//en Angular el @ es un Decorador
//Albergan Configuracion
@Component({
  selector: 'app-root', // lo que se encuentra en el idex html
  templateUrl: './app.component.html',
  //se puede definir la plantilla , ideal si eres una bad guy
  // template `<h1><marquees></marque></h1>`
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ej01-Angular';
  
  //este es na declaracion de una variable que se usa en la plantilla
  //se define modifcador de acceso
  //se deine el tipo
  public mensaje:string="Este es una variable que se llam del componente"
  public numero1:number=10
  public numero2:number=15

  //decalramos y definimos un arreglo
  


  //public disco:Vynilo // en este momento es undfined si no lo iniclaizamos
  public disco:Vynilo =new Vynilo()// inicilizamos la clase 

  public discos:Vynilo[]=[]

  public etiqcss:string="normal"


  public insertarDisco():void{
    console.log("Insertar Disco", this.disco)
    this.discos.push(this.disco)

    console.log(this.disco)
    this.vaciarFormulario()

  }

  public vaciarFormulario():void{
    console.log("Vaciando Formulario...")
    //no necesitamos buscar las cajas de texto y vaciarla
    //como el formualrio esta unido al  disco
    //el cambio se ve eb¡n el formualrio
    /*
      // 1 era froma de hacerlo
       this.disco.id = null
      this.disco.titulo = ""
      this.disco.cantante = ""
      this.disco.grupo = ""
      this.disco.year = null
    */
    // 2da forma or simplemnete inicializamos al objeto y ratcata
    this.disco= new Vynilo()//esta todo undefined

  }

  public btnRojo():void{
    this.etiqcss="error"
  }

  public btnBlue():void{
    this.etiqcss="normal"
  }
}
