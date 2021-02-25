import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module'; //se define como module principal
import { environment } from './environments/environment';


//este es el unico codigo que debe tener fuera proyecto de una funcion
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule) //que es el que se indica como prncipal en la seccion de importaciones 
  .catch(err => console.error(err));
