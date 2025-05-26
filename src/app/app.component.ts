import { Component } from '@angular/core';
import { HomeComponent } from './component/home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ArtigosComponent } from './component/artigos/artigos.component';
import { QuemSomosComponent } from './component/quem-somos/quem-somos.component';
import { ContatoComponent } from './component/contato/contato.component';
 
 
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    HomeComponent,
    ArtigosComponent,
    QuemSomosComponent,
    ContatoComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MY-APP';
  // Aqui você pode adicionar propriedades e métodos que serão usados no template
 
}