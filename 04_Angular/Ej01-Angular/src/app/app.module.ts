import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

//este decorador le explicamos a Angular eb¡n que consiste extacamente nuestro modulo
@NgModule({
  //en declarations colocamos una lista exhaustiva de los compornentes
  //presentes en el moduki
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    //si queremos ek bidireccional binding y lo [(ngModel)] por eso debemos incluir ''FormMOdule
    FormsModule
  ],
  providers: [],
//En boostrap colocamos el componente

  bootstrap: [AppComponent]
})
export class AppModule { }
