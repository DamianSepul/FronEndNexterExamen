import { Component, OnInit, Injectable } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-usuarios',
  templateUrl: './login-usuarios.component.html',
  styleUrls: ['./login-usuarios.component.css'],
})
@Injectable({ providedIn: 'root' })

//Clase donde se realizan las funciones necesarias para realizar el login
export class LoginUsuariosComponent implements OnInit {
  constructor(
    private UsuariosService: UsuarioService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {}
  //Inicializacion del formulario
  form = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
  });

  get usuario(): FormControl {
    return this.form.get('usuario') as FormControl;
  }

  get contrasena(): FormControl {
    return this.form.get('contrasena') as FormControl;
  }
  //Se manda a llamar esta funcion a la hora de presionar el boton y llama a la funcion de loginusuarios en services

  Login() {
    this.UsuariosService.loginUsuarios(this.form.value).subscribe(
      (data) => {
        if (data === true) {
          this.toastr.info("Bienvenido!")
          this.router.navigateByUrl('Usuarios');
        }else{
          this.toastr.warning("Introdujo Mal el usuario de administrador","ERROR EN INICION DE SESION")
        }
      },
      (error) => {
        this.toastr.error("Ha ocurrido un error con el servidor","ERROR")
        console.log(error);
      }
    );
  }
}
