import { mouse } from '@nut-tree/nut-js';

export const getMouseCoordinates = async () => {
  const coordinates = await mouse.getPosition();
  return `${coordinates.x},${coordinates.y}`;
};
