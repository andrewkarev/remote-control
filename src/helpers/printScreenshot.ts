import { Region, mouse, screen } from '@nut-tree/nut-js';
import { SCREENSHOT_SIZE } from '../common/constants';
import Jimp from 'jimp';

export const printScreenshot = async () => {
  const mouseCoordinates = await mouse.getPosition();
  const left = mouseCoordinates.x - SCREENSHOT_SIZE.width / 2;
  const top = mouseCoordinates.y - SCREENSHOT_SIZE.height / 2;
  const width = SCREENSHOT_SIZE.width;
  const height = SCREENSHOT_SIZE.height;

  screen.highlight(new Region(left, top, width, height));

  const screenshot = await screen.grabRegion(new Region(left, top, width, height));

  const image = new Jimp({
    data: screenshot.data,
    width: screenshot.width,
    height: screenshot.height,
  });

  const bmpImage = await image.getBufferAsync(Jimp.MIME_PNG);
  const result = bmpImage.toString('base64');

  return result;
};
