import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { SignInAdminDto } from '../../dto/sign-in-admin.dto';
import { SignUpDto } from '../../dto/sign-up.dto';
import { FormFieldConfig } from '../../interfaces/form-field-config.interface';
import { FormFieldComponent } from '../form-field/form-field.component';
import { SignInDto } from './../../dto/sign-in.dto';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [FormFieldComponent],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent implements OnChanges {
  @Output() auth = new EventEmitter<SignUpDto | SignInDto | SignInAdminDto>();
  @Input({ required: true }) path!: 'sign-up' | 'sign-in' | 'admin/sign-in';
  @Input({ required: true }) formFieldList!: FormFieldConfig[];
  @Input() error: any;

  dto: any = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['path'] && !!changes['path'].isFirstChange()) {
      this.dto = {};
    }
    if (changes['error'] && !!changes['error'].isFirstChange()) {
      console.log(this.error);
    }
  }

  updateDto(label: string, value?: string) {
    const key = this.getKey(label);
    if (key) this.dto[key] = value;

    return this.emitAuth(this.dto);
  }

  private emitAuth(dto: SignUpDto | SignInDto | SignInAdminDto): void {
    return this.auth.emit(dto);
  }

  private getKey(label: string): string {
    const map: Record<string, string> = {
      CPF: 'cpf',
      Nome: 'name',
      Setor: 'sector',
      Telefone: 'phone',
      Senha: 'password',
    };

    return map[label] ?? '';
  }
}
