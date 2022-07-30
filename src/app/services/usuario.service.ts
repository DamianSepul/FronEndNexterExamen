import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AgregarUsuarioComponent } from '../components/agregar-usuario/agregar-usuario.component';
import { HomeComponent } from '../components/home/home.component';

@Injectable({
  providedIn: 'root',
})

// Clase donde se comunica con el controlador en el back end. Llama a las apis
export class UsuarioService {
  private myAppUrl = 'http://www.examencrud.somee.com/';
  private myApiUrl = 'api/Usuarios/';

  private actualizarForm = new BehaviorSubject<any>({} as any);
  constructor(private http: HttpClient) {}

  //Se utiliza para realizar el login del usuario administrador
  loginUsuarios(login: any): Observable<any> {
    return this.http.post(
      this.myAppUrl + this.myApiUrl + 'LoginUsuario',
      login
    );
  }

  //Obtiene los usuarios de la base de datos para mostrarlos en unas lista
  obtenerUsuarios(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  //Agrega los usuarios en la base de datos con sus respectivos datos
  introducirUsuarios(usuario: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
  }

  //Se actualiza un usuario ya existente mediante su id
  actualizarUsuarios(id: number, usuario: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, usuario);
  }

  //Actualiza el formulario con los datos a modificar del cliente
  actualizarFormulario(usuario: any) {
    this.actualizarForm.next(usuario);
  }

  //actualiza el formilario cuando se acaba de editar
  actualizar() {
    return this.actualizarForm.asObservable();
  }

  //Elimina un usuario mediante el numero de id
  borrarUsuario(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }
}
