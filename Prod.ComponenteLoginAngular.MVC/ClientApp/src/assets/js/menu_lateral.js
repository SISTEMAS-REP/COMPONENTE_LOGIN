// JavaScript Document

$(function() {
if ($('#sidebar-right-1').length) {
var columna = $('#sidebar-right-1');
var columnaHeight = $('#sidebar-right-1').height();
var columnaTop = $('#sidebar-right-1').offset().top;
var boleano = false;
if(window.innerWidth < "920") {
boleano = true;
}
$(window).scroll(function() {
if(window.innerWidth > "900") {
var columanMainOuterHeight = $('.main-oute').height();
if(columanMainOuterHeight > "500") {
if(boleano === true) {
boleano = false;
columnaTop = $('#sidebar-right-1').offset().top;
}
var limit = $('#caja-populares').offset().top - columnaHeight - 20;
var windowTop = $(window).scrollTop();
if (columnaTop < windowTop) {
columna.css({position: "fixed", top: 20});
} else {
columna.css(&#39;position&#39;, &#39;static&#39;);
}
if (limit < windowTop) {
var diff = limit - windowTop;
columna.css({ top: diff });
}
}
}else {
columna.css('position', 'static');
}
});
}
});
