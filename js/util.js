export const rgba = function(r, g, b, a) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const getRandomArbitary = function(min, max) {
  return Math.random() * (max - min) + min;
};