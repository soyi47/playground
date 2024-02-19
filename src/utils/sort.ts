import Car from '../Car';

export const sortCarByRank = (a: Car, b: Car): number => {
  return b.progress - a.progress;
};
