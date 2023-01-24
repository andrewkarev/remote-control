import { mouse, left } from '@nut-tree/nut-js';

export const moveMouseLeft = async (offset: string) => {
  await mouse.move(left(Number(offset)));
};
