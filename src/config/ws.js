import { WebSocketServer } from "ws";

export const wss = new WebSocketServer({ port: 8080 });

export function broadcast(message) {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(message));
    }
  });
}