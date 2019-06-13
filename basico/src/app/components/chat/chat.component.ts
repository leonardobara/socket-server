import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public contenido: string;
  mensajeSubscription: Subscription;
  elemento: HTMLElement;

  mensajes: any[] = [];

  constructor(public chatServ: ChatService) { }

  ngOnInit() {

    this.elemento = document.getElementById('chat-msjs');

    this.mensajeSubscription = this.chatServ.listenMessage().subscribe((resp: string) => {

      this.mensajes.push(resp);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });
  }

  ngOnDestroy() {
    this.mensajeSubscription.unsubscribe();
  }

  enviar() {
    if (this.contenido.trim().length === 0) {
      return;
    }
    this.chatServ.sendMessage(this.contenido);

    this.contenido = '';
  }

}
