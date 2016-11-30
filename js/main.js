import $ from 'jquery';
import 'slick-carousel';
import 'jquery.scrollto';
import Menu from './menu';
import Particles from './particles';

const menu = new Menu('#toggle-menu', '#global-nav, #toggle-menu-border');
$('#works-slider').slick({
  infinite: false,
  draggable: false,
  easing: 'swing',
  dots: true
});

const $globalNav = $('#global-nav');
const hashLink = 'a[href^="#"]';
const sections = $.map($(hashLink, $globalNav), e => {
  return {
    id: e.hash,
    distance: $(e.hash).offset().top
  };
});

menu.setOnClickListener(() => {
  $(hashLink, $globalNav).removeClass('active');
  const scrollTop = $(document).scrollTop();
  const nearestElement = sections.reduce((prev, current) => {
    const p = Math.abs(scrollTop - prev.distance);
    const c = Math.abs(scrollTop - current.distance);
    if(p > c) prev = current;
    return prev;
  });
  $(`a[href="${nearestElement.id}"]`, $globalNav).addClass('active');
});

new Particles('#particles');

$(hashLink).click(e => {
  e.preventDefault();
  $.scrollTo($(e.currentTarget.hash), 500);
  menu.visible = false;
});

$globalNav.click(() => menu.visible = false);
