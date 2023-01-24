import { mouse, down } from '@nut-tree/nut-js';

export const moveMouseDown = async (offset: string) => {
  await mouse.move(down(Number(offset)));
};
