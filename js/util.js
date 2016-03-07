exports.rgba = function(r, g, b, a) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

exports.getRandomArbitary = function(min, max) {
  return Math.random() * (max - min) + min;
}

exports.debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};