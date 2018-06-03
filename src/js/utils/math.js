export const arrayMove = (array, from, to) => {
  array.splice(to, 0, array.splice(from, 1)[0]);
};

export const clamp = (value, a, b) => {
  return value < a ? a : value > b ? b : value;
};
