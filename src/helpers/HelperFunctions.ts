const randomBetween = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

const range = (x: number, y: number, z = 1): number[] => (x > y ? [] : [x, ...range(x + z, y)]);

export { randomBetween, range };
