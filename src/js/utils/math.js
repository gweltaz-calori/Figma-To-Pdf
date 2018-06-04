export const arrayMove = (array, from, to) => {
  array[from] = array.splice(to, 1, array[from])[0];
  return array;
};

export const clamp = (value, a, b) => {
  return value < a ? a : value > b ? b : value;
};
