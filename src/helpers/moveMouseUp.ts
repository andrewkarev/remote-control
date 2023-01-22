import { mouse, up } from '@nut-tree/nut-js';

export const moveMouseUp = async (offset: string) => {
  await mouse.move(up(Number(offset)));
};
