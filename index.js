// zero-th based months.  6 = July
var ODD_DAYS = {
  6: [1,2,3,4,12,13,14,15,16,17,18,26,27,28,29,30],
  7: [1,9,10,11,12,13,14,15,23,24,25,26,27,28,29],
  8: [6,7,8,9,10,11,12,20,21,22,23,24,25,26],
  9: [4,5,6,7,8,9,10,18,19,20,21,22,23,24]
}

function isOdd(date) {
  var month = date.getMonth();
  var dayOfMonth = date.getDate();
  return ODD_DAYS[month].includes(dayOfMonth);
}

function isEither(date) {
  var isSunday = date.getDay() === 0;
  if (!isSunday) return false;

  var hour = date.getHours();
  return (hour >= 16 && hour < 20);
}

function writeDate(date) {
  var elem = document.getElementById('today');
  elem.innerHTML = date.toLocaleString();
}

function writeSide(date) {
  var elem = document.getElementById('side');
  var eitherInfoElem = document.getElementById('either-side-info');
  if (isEither(date)) {
    elem.innerHTML = 'even or odd';
    eitherInfoElem.innerHTML = 'until 8pm.  Then park on the ' + (isOdd(date) ? 'odd' : 'even') + ' side.';
  } else {
    elem.innerHTML = isOdd(date) ? 'odd' : 'even';
    eitherInfoElem.innerHTML = null;
  }
}

function update() {
  var date = new Date();
  writeDate(date);
  writeSide(date);
}

function determineWhichSideToParkOn() {
  update();
  setInterval(update, 1000);
};

window.onload = determineWhichSideToParkOn;
