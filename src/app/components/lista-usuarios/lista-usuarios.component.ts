import { Component, Injectable, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
@Injectable({ providedIn: 'root' })
//Componente donde se realizan los funciones de la lista de los usuarios
export class ListaUsuariosComponent implements OnInit {
  listaUsuarios: any[] = [];
  id: number | undefined;
  constructor(public usuarioservice: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  //Funcion para obtener los usuarios almacenados en la base  de datos
  obtenerUsuarios() {
    this.usuarioservice.obtenerUsuarios().subscribe(
      (data) => {
        this.listaUsuarios = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //Funcion para eliminar los usuarios de  la base  de datos
  eliminarUsuario(id: number) {
    this.usuarioservice.borrarUsuario(id).subscribe(
      (data) => {
        this.obtenerUsuarios();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //Funcion para actulizar un usuario de la base  de datos
  actualizarUsuario(usuario: any) {
    this.usuarioservice.actualizarFormulario(usuario);
  }
}
