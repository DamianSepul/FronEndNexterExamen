import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { LoginUsuariosComponent } from './components/login-usuarios/login-usuarios.component';

//Rutas que toma la aplicacion para moverse entre componentes
const routes: Routes = [
  {
    path: 'Usuarios',
    component: HomeComponent
  },
  {
    path: '',
    component: LoginUsuariosComponent
  },
  {
    path: '**',
    redirectTo:'',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
