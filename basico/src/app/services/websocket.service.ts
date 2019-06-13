import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(private socket: Socket) {
    this.checkStatus();
    this.send('Hi Server nice to meet you');
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  public send(message: string): void {
    this.socket.emit('message', message);
  }

  // tslint:disable-next-line:ban-types
  emit(evento: string, payload?: any, callback?: Function) {
    this.socket.emit(evento, payload, callback);
  }

  listenEventFromServer(evento: string) {
    return this.socket.fromEvent(evento);
  }

}
