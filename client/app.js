var el = document.querySelector('.me');

var text = window.location.hostname.toUpperCase();
el.innerHTML = '<div class="shadow"></div><div class="mask">' + text.split('').map(function (l) {
  return '<span>' + l + '</span>';
}).join('') + '</div>';

var letters = text.split('').map(function(letter) {
  var e = document.createElement('span');
  e.innerText = letter;
  return e;
});

var shadow = document.querySelector('.shadow');

letters.forEach(function(letter) {
  shadow.appendChild(letter);
});

function updateShadows(e) {
  var x, y;
  if (typeof e.pageX != 'undefined') {
    x = e.pageX;
    y = e.pageY;
  } else {
    x = (45 + Math.max(-45, Math.min(45, -e.gamma))) / 90 * window.innerWidth;
    y = (45 + Math.max(-45, Math.min(45, -e.beta))) / 90 * window.innerHeight * .75;
  }
  document.body.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, #fff, #ddd 100%)'
  letters.forEach(function(letter) {
    var rect = letter.getBoundingClientRect();
    var lx = (rect.right + rect.left) / 2;
    var ly = (rect.top + rect.bottom) / 2;
    var dx = x - lx;
    var dy = y - ly;
    var d = Math.sqrt(dx*dx + dy*dy);
    dx /= d; dy /= d;
    var shadow = [];
    var l = 1000;
    var h = 50;
    var p = Math.max(5, Math.ceil(d / 70));
    for(var i = 0; i < p + 1; i++) {
      var n = i / p;
      var opacity = (1 - Math.sqrt(n)) / 5 * Math.min(1, Math.max(.5, d / 100));
      var f = n * (h * d) / (l - h);
      var blur = (2 + n * 20) * Math.min(1, Math.max(.05, d / 500));
      shadow.push((dx * -f) + 'px ' + (dy * -f) + 'px ' + blur + 'px rgba(0,0,0,' + opacity + ')');
    }
    letter.style.textShadow = shadow.join(', ');
  });
}

updateShadows({pageX: window.innerWidth / 2, pageY: 0});

document.addEventListener('mousemove', updateShadows, true);
// window.addEventListener('deviceorientation', updateShadows, true);
