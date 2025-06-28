import { Component, inject } from '@angular/core';
import { HomeComponent } from './component/home/home.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ArtigosComponent } from './component/artigos/artigos.component';
import { QuemSomosComponent } from './component/quem-somos/quem-somos.component';
import { ContatoComponent } from './component/contato/contato.component';
import { AuthService } from './services/auth.service';
 
 
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
  private authService = inject(AuthService);
  private router = inject(Router);
  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}