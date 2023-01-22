import { Button, mouse, Point, straightTo } from '@nut-tree/nut-js';

export const drawCircle = async (radius: number) => {
  const center = await mouse.getPosition();

  await mouse.setPosition(new Point(center.x - radius, center.y));
  await mouse.pressButton(Button.LEFT);

  for (let i = 0; i <= Math.PI * 2; i += 0.01 * Math.PI) {
    const x = center.x - radius * Math.cos(i);
    const y = center.y - radius * Math.sin(i);

    await mouse.move(straightTo(new Point(x, y)));
  }

  await mouse.releaseButton(Button.LEFT);
};
