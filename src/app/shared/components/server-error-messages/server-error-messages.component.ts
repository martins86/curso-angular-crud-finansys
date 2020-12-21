import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-error-messages',
  template: `
    <div class="alert alert-danger" *ngIf="serverErrorMessages">
      <strong> Erro no Servidor: </strong>
      <ul>
        <li *ngFor="let error of serverErrorMessages"> {{ error }} </li>
      </ul>
    </div>
  `
})
export class ServerErrorMessagesComponent {
  @Input('server-error-messages') serverErrorMessages: string[] = null;
}
