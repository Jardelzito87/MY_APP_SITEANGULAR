import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { QuemSomosComponent } from './component/quem-somos/quem-somos.component';
import { ArtigosComponent } from './component/artigos/artigos.component';
import { ContatoComponent } from './component/contato/contato.component';
import { NaoEncontradosComponent } from './component/nao-encontrados/nao-encontrados.component';
 
export const routes: Routes = [
    {path:'',component: HomeComponent},                  //rota principal
    {path:'home', component: HomeComponent},            //rota do componente home
    {path:'quem-somos', component: QuemSomosComponent},//rota do componente quem-somos
    {path:'artigos', component: ArtigosComponent},    //rota do componente artigos
    {path:'contato', component: ContatoComponent},   //rota do componente contatos
    {path:'**', component: NaoEncontradosComponent},//rota para redirecionar paginas nao encontrada
];