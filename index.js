// zero-th based months.  6 = July
var ODD_DAYS = {
  10: new Set([1,2,3,11,12,13,14,15,16,17,25,26,27,28,29,30]),  // November
  11: new Set([1,9,10,11,12,13,14,15,23,24,25,26,27,28,29]),    // December
  0: new Set([6,7,8,9,10,11,12,20,21,22,23,24,25,26]),          // January
  1: new Set([3,4,5,6,7,8,9,17,18,19,20,21,22,23]),             // February
  2: new Set([3,4,5,6,7,8,9,17,18,19,20,21,22,23,31]),          // March
  3: new Set([1,2,3,4,5,6,14,15,16,17,18,19,20,28,29,30]),      // April
  4: new Set([1,2,3,4,12,13,14,15,16,17,18,26,27,28,29,30,31]), // May
  5: new Set([1,9,10,11,12,13,14,15,23,24,25,26,27,28,29]),     // June
  6: new Set([7,8,9,10,11,12,13,21,22,23,24,25,26,27]),         // July
  7: new Set([4,5,6,7,8,9,10,18,19,20,21,22,23,24]),            // August
  8: new Set([1,2,3,4,5,6,7,15,16,17,18,19,20,21,29,30]),       // September
  9: new Set([1,2,3,4,5,13,14,15,16,17,18,19,27,28,29,30,31]),  // October
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
