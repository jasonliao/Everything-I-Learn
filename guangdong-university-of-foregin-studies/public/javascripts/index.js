$(document).ready(function () {
  $('#fullpage').fullpage({
    anchors:['firstPage'],
    sectionsColor : ['#000'],
    paddingTop: '3em',
    loopHorizontal: false
  });
});

function addNum (result) {
  for(var i = 0; i < result.length; i++) {
    setTimeout(function () {
      $('.resultBox').append('<div class="item">' + result[i] + '</div>'); 
    }, 2000);
  }
}

function al() {
  alert(1);
}
