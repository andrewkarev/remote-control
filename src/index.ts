import { join } from 'node:path';
import { cwd } from 'node:process';
import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws';
import { config } from 'dotenv';
import { httpServer } from './http_server/index';
import { HTTP_PORT, WS_PORT } from './common/constants';
import { executeCommand } from './service/executeCommand';
import { mouse } from '@nut-tree/nut-js';

config({ path: join(cwd(), '.env') });

mouse.config.mouseSpeed = 200;

httpServer.listen(HTTP_PORT).on('listening', () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});

const wss = new WebSocketServer({ port: Number(WS_PORT) });
console.log(`Start web socket server on the ${WS_PORT} port!`);

wss.on('connection', (ws) => {
  const duplexStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  duplexStream.on('data', async (data: WebSocket.RawData) => {
    try {
      const output = await executeCommand(data);

      duplexStream.write(output, (error) => {
        if (error instanceof Error) {
          console.log(`Operation failed with error: ${error.message}`);
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Operation failed with error: ${error.message}`);
      }
    }
  });

  wss.on('error', (error) => {
    console.log(`Operation failed with error: ${error.message}`);
  });

  ws.on('close', () => {
    console.log('Web socket connection is closed');
  });
});

wss.on('close', () => {
  console.log('Web socket connection is closed');
});

process.on('SIGINT', () => {
  wss.close();
  console.log('\nWeb socket server was closed');
  process.exit();
});
