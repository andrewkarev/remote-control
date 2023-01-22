import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

export const httpServer = http.createServer((req, res) => {
  try {
    const __dirname = path.resolve(path.dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    const readStream = fs.createReadStream(file_path);

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    });

    readStream.pipe(res);
  } catch (error) {
    res.writeHead(404);
    res.end(JSON.stringify(error));
    return;
  }
});
