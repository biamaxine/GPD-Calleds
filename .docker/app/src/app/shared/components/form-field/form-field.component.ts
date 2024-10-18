import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Palette } from '../../types/palette.type';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Output() value = new EventEmitter<string>();

  @Input() color: Palette = 'primary-500';

  @Input({ required: true }) label!: string;
  @Input() placeholder = '';
  @Input() ico = '';
  @Input() type: 'text' | 'password' | 'number' = 'text';
  @Input() verifier?: (value: string) => boolean;
  @Input() error?: string;

  hidden = true;
  focus = false;
  input!: string;

  onKeyUp(e: KeyboardEvent) {
    this.input = (e.target as HTMLInputElement).value;
    if (!this.verifier) return this.value.emit(this.input);
    if (this.verifier(this.input)) return this.value.emit(this.input);
    this.value.emit(undefined);
  }

  onBlur() {
    this.focus = false;

    if (this.input && this.input !== '')
      if (this.verifier) {
        const verify = this.verifier(this.input);
        if (!verify) {
          this.error = `"${this.input}" não corresponde a ${this.label}.`;
          return;
        }
      }

    this.error = undefined;
  }
}
