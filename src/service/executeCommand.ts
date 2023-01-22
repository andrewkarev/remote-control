import WebSocket from 'ws';
import { commands } from '../common/commands';
import { moveMouseUp } from '../helpers/moveMouseUp';
import { moveMouseRight } from '../helpers/moveMouseRight';
import { moveMouseDown } from '../helpers/moveMouseDown';
import { moveMouseLeft } from '../helpers/moveMouseLeft';
import { getMouseCoordinates } from '../helpers/getMouseCoordinates';
import { drawCircle } from '../helpers/drawCircle';
import { drawRectangle } from '../helpers/drawRectangle';
import { drawSquare } from '../helpers/drawSquare';
import { printScreenshot } from '../helpers/printScreenshot';

export const executeCommand = async (rawData: WebSocket.RawData) => {
  const [command, ...args] = rawData.toString().split(' ');
  const result = [command];

  switch (command) {
    case commands.UP:
      await moveMouseUp(args[0]);
      break;
    case commands.RIGHT:
      await moveMouseRight(args[0]);
      break;
    case commands.DOWN:
      await moveMouseDown(args[0]);
      break;
    case commands.LEFT:
      await moveMouseLeft(args[0]);
      break;
    case commands.COORDINATES:
      const coordinates = await getMouseCoordinates();
      result.push(coordinates);
      break;
    case commands.DRAW_CIRCLE:
      await drawCircle(Number(args[0]));
      break;
    case commands.DRAW_RECTANGLE:
      await drawRectangle(Number(args[0]), Number(args[1]));
      break;
    case commands.DRAW_SQUARE:
      await drawSquare(Number(args[0]));
      break;
    case commands.PRINT_SCREENSHOT:
      const output = await printScreenshot();
      result.push(output);
      break;
  }

  console.log(command);

  return result.join(' ');
};
