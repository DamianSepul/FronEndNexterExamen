import { Component, Injectable, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import ciudades from '../../../app/ciudadesEstados.json';
import estados from '../../../app/estados.json';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ListaUsuariosComponent } from '../lista-usuarios/lista-usuarios.component';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css'],
})

//Componente que realiza las funciones necesarias para añadir un usuario en la base de datos y actualizar
export class AgregarUsuarioComponent implements OnInit {
  listaEstados: any[] = [];
  listaCiudad: any[] = [];
  submitted: boolean = false;
  form: FormGroup;
  estadoCiudad: string = '';
  id = 0;
  suscription!: Subscription;
  constructor(
    private UsuariosService: UsuarioService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private listaUsuarios: ListaUsuariosComponent
  ) {
    //Inicialiar el formulario con sus respectivas validaciones
    this.form = this.formBuilder.group({
      id: 0,
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      codigoPostal: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      estado: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    //Obtencion de la lista de los estados de la republica mexicana
    this.listaEstados = estados;
    //Actializa el formulario con los datos de los usuarios a modificar
    this.suscription = this.UsuariosService.actualizar().subscribe(
      (data) => {
        this.form.patchValue({
          nombre: data.nombre,
          direccion: data.estado,
          telefono: data.telefono,
          codigoPostal: data.codigoPostal,
        });
        this.id = data.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  //Funcion que manda a agregar los datos del formulario a la base de datos
  agregar() {
    //En caso de no tener id , se introduce por primera vez
    if (this.id == 0 || this.id == undefined) {
      const usuario: any = {
        nombre: this.form.get('nombre')?.value,
        direccion: this.form.get('direccion')?.value,
        telefono: this.form.get('telefono')?.value,
        codigoPostal: this.form.get('codigoPostal')?.value,
        estado: this.form.get('estado')?.value,
        ciudad: this.form.get('ciudad')?.value,
      };
      this.UsuariosService.introducirUsuarios(usuario).subscribe(
        (data) => {
          this.toastr.success(
            'Usuario Añadido exitosamente!!!',
            'Usuario Añadido'
          );
          this.listaUsuarios.obtenerUsuarios();
          this.form.reset();
          window.location.reload();
        },
        (error) => {
          this.toastr.error('A ocurrido un error!!', 'ERROR');
          console.log(error);
        }
      );
    }
    //Si tiene id, significa que se modificara un usuario
    else {
      const usuario: any = {
        id: this.id,
        nombre: this.form.get('nombre')?.value,
        direccion: this.form.get('direccion')?.value,
        telefono: this.form.get('telefono')?.value,
        codigoPostal: this.form.get('codigoPostal')?.value,
        estado: this.form.get('estado')?.value,
        ciudad: this.form.get('ciudad')?.value,
      };

      this.UsuariosService.actualizarUsuarios(usuario.id, usuario).subscribe(
        (data) => {
          this.toastr.success(
            'Usuario actualizado correctamente!!',
            'Usuario Actualizado'
          );
          this.listaUsuarios.obtenerUsuarios();
          this.form.reset();
          this.id = 0;
          window.location.reload();
        },
        (error) => {
          this.toastr.error('A ocurrido un error!!', 'ERROR');
          console.log(error);
        }
      );
    }
  }

  //Se selecciona el estado
  estado() {
    if (this.form.value.estado != '')
      this.estadoCiudad = this.form.value.estado;
  }
  //Como estado como parametro, se busca el listado de ciudades
  ciudad(xestado: any) {
    this.listaCiudad = ciudades[this.estadoCiudad];
  }
}
