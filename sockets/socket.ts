import { Socket } from 'socket.io';
import socketIO from 'socket.io';


export const Desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');

    });
}
export const mensaje = (cliente: Socket, server: socketIO.Server) => {

    cliente.on('mensaje', (payload: { de: string, cuerpo: string, para: string }) => {
        console.log('mensaje recibio', payload);

        server.emit('mensaje-nuevo', payload);

    });
}