// zero-th based months.  6 = July
var ODD_DAYS = {
  10: new Set([1,2,3,4,5,13,14,15,16,17,18,19,27,28,29,30]),
  11: new Set([1,2,3,11,12,13,14,15,16,17,25,26,27,28,29,30]),
  0: new Set([8,9,10,11,12,13,14,22,23,24,25,26,27,28]),
  1: new Set([5,6,7,8,9,10,11,19,20,21,22,23,24,25]),
  2: new Set([4,5,6,7,8,9,10,18,19,20,21,22,23,24]),
  3: new Set([1,2,3,4,5,6,7,15,16,17,18,19,20,21,29,30]),
  4: new Set([1,2,3,4,5,13,14,15,16,17,18,19,27,28,29,30,31]),
  5: new Set([1,2,10,11,12,13,14,15,16,24,25,26,27,28,29,30]),
  6: new Set([8,9,10,11,12,13,14,22,23,24,25,26,27,28]),
  7: new Set([5,6,7,8,9,10,11,19,20,21,22,23,24,25]),
  8: new Set([2,3,4,5,6,7,8,16,17,18,19,20,21,22,30]),
  9: new Set([1,2,3,4,5,6,14,15,16,17,18,19,20,28,29,30,31]),
}

function isOdd(date) {
  var month = date.getMonth();
  var dayOfMonth = date.getDate();
  return ODD_DAYS[month].has(dayOfMonth);
}

function isWithinTransitionPeriod(date) {
  var isSunday = date.getDay() === 0;
  if (!isSunday) return false;

  var hour = date.getHours();
  return (hour >= 16 && hour < 20);
}

function isSundayAfterTransitionPeriod(date) {
  var isSunday = date.getDay() === 0;
  if (!isSunday) return false;

  var hour = date.getHours();
  return hour >= 20;
}

function writeDate(date) {
  var elem = document.getElementById('today');
  elem.innerHTML = date.toLocaleString();
}

function writeSide(date) {
  var sideElem = document.getElementById('side');
  var eitherInfoElem = document.getElementById('either-side-info');
  if (isSundayAfterTransitionPeriod(date)) {
    // After transition period, the side flips from what it was in the morning
    sideElem.innerHTML = isOdd(date) ? 'even' : 'odd';
    eitherInfoElem = null;
  } else if (isWithinTransitionPeriod(date)) {
    sideElem.innerHTML = 'even or odd';
    // After transition period, the side flips from what it was in the morning
    var side = isOdd(date) ? 'even' : 'odd';
    eitherInfoElem.innerHTML = 'until 8pm.  Then park on the ' + side + ' side.';
  } else {
    sideElem.innerHTML = isOdd(date) ? 'odd' : 'even';
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
