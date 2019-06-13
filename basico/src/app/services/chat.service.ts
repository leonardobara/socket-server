import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public socketServ: WebsocketService) { }

  sendMessage(mensaje: string) {

    const payload = {
      de: 'Leo',
      cuerpo: mensaje,
      para: 'El servidor'
    };

    this.socketServ.emit('mensaje', payload);

  }

  public listenMessage() {

    return this.socketServ.listenEventFromServer('mensaje-nuevo');
  }


}
