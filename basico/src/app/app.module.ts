import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// socket.io
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment.prod';
import { WebsocketService } from './services/websocket.service';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';

import { FormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
