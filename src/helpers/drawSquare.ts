import { Button, down, left, mouse, right, up } from '@nut-tree/nut-js';

export const drawSquare = async (side: number) => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(side));
  await mouse.move(down(side));
  await mouse.move(left(side));
  await mouse.move(up(side));
  await mouse.releaseButton(Button.LEFT);
};
