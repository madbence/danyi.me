var el = document.getElementById('me');

var text = window.location.hostname;
el.innerHTML = '<div id="shadow"></div><div id="mask">' + text + '</div>';
var letters = text.split('').map(function(letter) {
  var e = document.createElement('span');
  e.innerText = letter;
  return e;
});

var shadow = document.getElementById('shadow');

letters.forEach(function(letter) {
  shadow.appendChild(letter);
});

document.addEventListener('mousemove', function(e) {
  var x = e.pageX;
  var y = e.pageY;
  letters.forEach(function(letter) {
    var rect = letter.getBoundingClientRect();
    var lx = (rect.right + rect.left) / 2;
    var ly = (rect.top + rect.bottom) / 2;
    var dx = x - lx;
    var dy = y - ly;
    var d = Math.max(30, Math.min(400, Math.sqrt(dx*dx + dy*dy)));
    var shadow = [];
    var p = 6;
    for(var i = 1; i < p + 1; i++) {
      var n = i / p;
      var opacity = 0.15 * Math.max(0, 1 - Math.pow(n, 1.2));
      var f = Math.pow(n, 1.8) / 10;
      var blur = 20 * d / 500;
      shadow.push((dx * -f) + 'px ' + (dy * -f) + 'px ' + blur + 'px rgba(0,0,0,' + opacity + ')');
    }
    letter.style.textShadow = shadow.join(', ');
  });
});
