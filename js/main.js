import $ from 'jquery';
import 'slick-carousel';
import 'jquery.scrollto';
import '../sass/main.scss';
import Menu from './menu';
import Particles from './particles';

const menu = new Menu('#toggle-menu', '#global-nav, #toggle-menu-border');
$('#works-slider').slick({
  infinite: false,
  draggable: false,
  easing: 'swing',
  dots: true
});

const sections = $.map($('#global-nav a'), e => {
  return {
    id: e.hash,
    distance: $(e.hash).offset().top
  };
});

menu.click(() => {
  $('#global-nav a[href^="#"]').removeClass('active');
  const scrollTop = $(document).scrollTop();
  const nearestElement = sections.reduce((prev, current) => {
    const p = Math.abs(scrollTop - prev.distance);
    const c = Math.abs(scrollTop - current.distance);
    if(p > c) prev = current;
    return prev;
  });
  $(`a[href="${nearestElement.id}"]`, '#global-nav').addClass('active');
});

new Particles('#particles');

$('[href^="#"]').click(function(e) {
  e.preventDefault();
  $.scrollTo($(this.hash), 500);
  menu.visible = false;
});

$('#global-nav').click(function() {
  menu.visible = false;
});