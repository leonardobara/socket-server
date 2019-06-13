
import express from 'express';
import { SERVER_PORT } from '../global/environment';

import socketIO from 'socket.io';
import http from 'http';

import * as socketServ from '../sockets/socket';

export default class Server {

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private static _instance: Server;

    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
        // this.emitMessage();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private escucharSockets() {
        console.log('Escuchando conexiones');

        this.io.on('connection', client => {

            console.log('cliente conectado!');

            socketServ.mensaje(client, this.io);

            socketServ.Desconectar(client);

            /* client.on('message', (data) => {
                console.log('From client to you: ', data);

            }); */
            /*  client.on('mensaje', (data) => {
                 console.log(data);
 
             }); */

        });

    }

    /* private emitMessage() {

        try {

            this.io.on('connection', (server) => {
                server.emit('mensaje-nuevo', { hello: 'world' });
            });
        } catch (error) {
            console.log(error);

        }

        console.log('enviando..');

    }
 */
    start(callback: Function) {

        this.httpServer.listen(this.port, callback).on('error', console.log);

    }

}