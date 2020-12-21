import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <div class="text-danger">
      {{ errorMessage }}
    </div>
  `
})
export class FormFieldErrorComponent {
  @Input('form-control') formCotrol: FormControl;

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  private mustShowErrorMessage(): boolean {
    return this.formCotrol.invalid && this.formCotrol.touched;
  }

  private getErrorMessage(): string | null {
    if (this.formCotrol.errors.required) {
      return '*dado obrigatório.';
    } else
    if (this.formCotrol.errors.email) {
      return '*formato de email inválido.';
    } else
    if (this.formCotrol.errors.minlength) {
      const requiredLength = this.formCotrol.errors.minlength.requiredLength;
      return `*deve ter no minimo ${ requiredLength } caracteres.`;
    } else
    if (this.formCotrol.errors.maxlength) {
      const requiredLength = this.formCotrol.errors.maxlength.requiredLength;
      return `*deve ter no máximo ${ requiredLength } caracteres.`;
    }
  }
}
