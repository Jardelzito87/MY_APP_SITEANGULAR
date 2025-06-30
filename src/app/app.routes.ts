import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { QuemSomosComponent } from './component/quem-somos/quem-somos.component';
import { ArtigosComponent } from './component/artigos/artigos.component';
import { ContatoComponent } from './component/contato/contato.component';
import { NaoEncontradosComponent } from './component/nao-encontrados/nao-encontrados.component';
import { LoginComponent } from './component/login/login.component';
import { authGuard } from './guards/auth.guard';
 
export const routes: Routes = [
    {path:'', redirectTo: '/home', pathMatch: 'full'},
    {path:'home', component: HomeComponent},
    {path:'quem-somos', component: QuemSomosComponent},
    {path:'artigos', component: ArtigosComponent},
    {path:'contato', component: ContatoComponent},
    {path:'login', component: LoginComponent},
    {path:'**', component: NaoEncontradosComponent}
];