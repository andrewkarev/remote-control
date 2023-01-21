import { join } from 'node:path';
import { cwd } from 'node:process';
import { config } from 'dotenv';
import { httpServer } from './http_server/index';
import { mouse } from '@nut-tree/nut-js';
import { HTTP_PORT } from './common/constants';

config({ path: join(cwd(), '.env') });

httpServer.listen(HTTP_PORT).on('listening', () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});
