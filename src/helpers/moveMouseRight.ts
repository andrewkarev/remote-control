import { mouse, right } from '@nut-tree/nut-js';

export const moveMouseRight = async (offset: string) => {
  await mouse.move(right(Number(offset)));
};
