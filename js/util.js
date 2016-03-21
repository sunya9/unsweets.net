exports.rgba = function(r, g, b, a) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

exports.getRandomArbitary = function(min, max) {
  return Math.random() * (max - min) + min;
};