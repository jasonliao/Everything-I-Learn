$(document).ready(function () {
  $('#fullpage').fullpage({
    anchors:['firstPage'],
    sectionsColor : ['#000'],
    paddingTop: '3em',
    loopHorizontal: false
  });

  
});

function numberSort () {
  $('.resultBox').empty();
  numberArray.sort();
  for (var j = 0; j < numberArray.length; j++) {
    if (numberArray[j] % 100 === numberArray[j]) {
      if (numberArray[j] % 10 === numberArray[j]) {
        numberArray[j] = '0' + numberArray[j];
      }
      numberArray[j] = '0' + numberArray[j];
    }
    $('.resultBox').append('<div class="allItem">' + numberArray[j] + '</div>');
  } 
}

function seeAllClick () {
  $('.resultBox').empty();
  for (var j = 0; j < numberArray.length; j++) {
    if (numberArray[j] % 100 === numberArray[j]) {
      if (numberArray[j] % 10 === numberArray[j]) {
        numberArray[j] = '0' + numberArray[j];
      }
      numberArray[j] = '0' + numberArray[j];
    }
    $('.resultBox').append('<div class="allItem">' + numberArray[j] + '</div>');
  }
  $('.resultBox').append('<a href="javascript:void()" onclick="numberSort()">查看排序后结果</a>');
}

var number;
var numberArray = [];
var i = 0;

function addAllNumber () {
  numberArray = [].slice.call(arguments);
  var timer = setInterval(function () {
    if (numberArray[i] % 100 === numberArray[i]) {
      if (numberArray[i] % 10 === numberArray[i]) {
        numberArray[i] = '0' + numberArray[i];
      }
      numberArray[i] = '0' + numberArray[i];
    }
    $('.resultBox').append('<div class="item">' + numberArray[i] + '</div>');
    $('#numIndex').text(i+1);
    i++;
    if (i >= 5) {
      $('.item:first').remove();
    }
    if (i >= 30) {
      clearInterval(timer);
      $('#numIndex').html('所有号码已随机生成完毕,点击查看按钮查看全部!<a id="seeAll" href="javascript:void(0)" onclick="seeAllClick()">查看</a>');
    }
  }, 100);
}


