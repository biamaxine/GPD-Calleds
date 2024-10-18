import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthFormComponent } from '../../shared/components/auth-form/auth-form.component';
import { SnackBarComponent } from '../../shared/components/material/snack-bar/snack-bar.component';
import {
  isSignInAdminDto,
  SignInAdminDto,
} from '../../shared/dto/sign-in-admin.dto';
import { isSignInDto, SignInDto } from '../../shared/dto/sign-in.dto';
import { isSignUpDto, SignUpDto } from '../../shared/dto/sign-up.dto';
import { FormFieldConfig } from '../../shared/interfaces/form-field-config.interface';
import { HttpService } from '../../shared/services/http.service';

interface Config {
  title: string;
  button: string;
  link1: string;
  link2: string;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  path: 'sign-up' | 'sign-in' | 'admin/sign-in' = 'sign-in';

  forms: {
    'sign-up': FormFieldConfig[];
    'sign-in': FormFieldConfig[];
    'admin/sign-in': FormFieldConfig[];
  } = {
    'sign-up': [
      {
        label: 'CPF',
        placeholder: '000.000.000-00',
        ico: 'badge',
        type: 'number',
        verifier: (v: string) => {
          return v.length === 11;
        },
      },
      {
        label: 'Nome',
        placeholder: 'Fulano de Tal',
        ico: 'person',
        type: 'text',
      },
      {
        label: 'Setor',
        placeholder: 'GPD',
        ico: 'apartment',
        type: 'text',
      },
      {
        label: 'Telefone',
        placeholder: '(92) 9 8765-4321',
        ico: 'phone',
        type: 'number',
        verifier: (v: string) => {
          return v.length === 11;
        },
      },
    ],
    'sign-in': [
      {
        label: 'CPF',
        placeholder: '000.000.000-00',
        ico: 'badge',
        type: 'number',
        verifier: (v: string) => {
          return v.length === 11;
        },
      },
    ],
    'admin/sign-in': [
      {
        label: 'CPF',
        placeholder: '000.000.000-00',
        ico: 'badge',
        type: 'number',
        verifier: (v: string) => {
          return v.length === 11;
        },
      },
      {
        label: 'Senha',
        placeholder: '********',
        ico: 'key',
        type: 'password',
      },
    ],
  };

  config: {
    'sign-up': Config;
    'sign-in': Config;
    'admin/sign-in': Config;
  } = {
    'sign-up': {
      title: 'Cadastro do Servidor',
      button: 'Cadastrar',
      link1: 'Acesso Servidor',
      link2: 'Acesso Administrativo',
    },
    'sign-in': {
      title: 'Acesso Servidor',
      button: 'Entrar',
      link1: 'Acesso Administrativo',
      link2: 'Ainda não tenho conta',
    },
    'admin/sign-in': {
      title: 'Acesso Administrativo',
      button: 'Entrar',
      link1: 'Acesso Servidor',
      link2: 'Ainda não tenho conta',
    },
  };

  dto?: SignUpDto | SignInDto | SignInAdminDto;

  constructor(
    private readonly location: Location,
    private readonly element: ElementRef,
    private readonly renderer: Renderer2,
    private readonly http: HttpService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(this.element.nativeElement, 'sign-in');
    this.location.go(`auth/${this.path}`);
  }

  click = {
    link1: () => {
      if (this.path === 'sign-in')
        this.updatePath('admin/sign-in', 'admin-sign-in');
      else this.updatePath('sign-in', 'sign-in');
    },
    link2: () => {
      if (this.path === 'sign-up')
        this.updatePath('admin/sign-in', 'admin-sign-in');
      else this.updatePath('sign-up', 'sign-up');
    },
  };

  updateDto(dto: SignUpDto | SignInDto | SignInAdminDto) {
    switch (this.path) {
      case 'sign-up':
        if (isSignUpDto(dto)) this.dto = dto;
        else this.dto = undefined;
        return;
      case 'sign-in':
        if (isSignInDto(dto)) this.dto = dto;
        else this.dto = undefined;
        return;
      default:
        if (isSignInAdminDto(dto)) this.dto = dto;
        else this.dto = undefined;
        return;
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.path === 'sign-up' && isSignUpDto(this.dto)) {
      this.http.auth.signUp(this.dto).subscribe({
        next: next => {
          console.log(next);
          this.updatePath('sign-in', 'sign-in');
        },
        error: ({ error }) => {
          console.log(error);

          let message: string[] = error.message;
          if (typeof error.message === 'string') message = [error.message];

          this.openSnackBar(message, 'end', 'close', 'negative');
        },
      });
    }
    if (this.path === 'sign-in' && isSignInDto(this.dto)) {
      this.http.auth.signIn(this.dto).subscribe({
        next: next => {
          console.log(next);
        },
        error: ({ error }) => {
          console.log(error);

          let message: string[] = error.message;
          if (typeof error.message === 'string') message = [error.message];

          this.openSnackBar(message, 'end', 'close', 'negative');
        },
      });
    }
    if (this.path === 'admin/sign-in' && isSignInAdminDto(this.dto)) {
      this.http.auth.signInAdmin(this.dto).subscribe({
        next: next => {
          console.log(next);
        },
        error: ({ error }) => {
          console.log(error);

          let message: string[] = error.message;
          if (typeof error.message === 'string') message = [error.message];

          this.openSnackBar(message, 'end', 'close', 'negative');
        },
      });
    }
  }

  private openSnackBar(
    messages: string[],
    horizontalPosition: 'center' | 'end' | 'start',
    ico?: string,
    type?: 'positive' | 'negative',
  ) {
    for (const message of messages) {
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message, ico, type },
        verticalPosition: 'top',
        horizontalPosition,
        // duration: 3000,
      });
      return;
    }
  }

  private updatePath(
    to: 'sign-up' | 'sign-in' | 'admin/sign-in',
    className: 'sign-up' | 'sign-in' | 'admin-sign-in',
  ) {
    this.path = to;
    this.location.go(`auth/${to}`);

    for (const path of ['sign-up', 'sign-in', 'admin-sign-in']) {
      this.renderer.removeClass(this.element.nativeElement, path);
    }
    this.renderer.addClass(this.element.nativeElement, className);

    this.dto = undefined;
  }
}
