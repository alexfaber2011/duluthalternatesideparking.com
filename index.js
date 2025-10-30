// November 1st 2024 is the start of an ODD week (week 1)
// Weeks run Monday-Sunday
// Calculate week number based on weeks elapsed since Nov 1, 2024
function getWeeksSinceNov1(date) {
  var nov1_2024 = new Date(2024, 10, 1); // Nov 1, 2024

  // Get Monday of the week containing the given date
  var dayOfWeek = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  var daysFromMonday = (dayOfWeek === 0) ? 6 : dayOfWeek - 1; // Sunday counts as 6 days after Monday
  var mondayOfCurrentWeek = new Date(date);
  mondayOfCurrentWeek.setDate(date.getDate() - daysFromMonday);
  mondayOfCurrentWeek.setHours(0, 0, 0, 0);

  // Get Monday of the week containing Nov 1, 2024 (which was a Friday)
  // Nov 1, 2024 is a Friday, so its Monday is Oct 28, 2024
  var nov1DayOfWeek = nov1_2024.getDay(); // 5 (Friday)
  var daysFromMondayNov1 = (nov1DayOfWeek === 0) ? 6 : nov1DayOfWeek - 1; // 4 days
  var mondayOfNov1Week = new Date(nov1_2024);
  mondayOfNov1Week.setDate(nov1_2024.getDate() - daysFromMondayNov1);
  mondayOfNov1Week.setHours(0, 0, 0, 0);

  // Calculate weeks between these Mondays
  var weeksDiff = Math.round((mondayOfCurrentWeek - mondayOfNov1Week) / (7 * 24 * 60 * 60 * 1000));

  return weeksDiff;
}

function isOdd(date) {
  var weeksDiff = getWeeksSinceNov1(date);
  // Nov 1, 2024 week (week 0) is ODD
  // If weeksDiff is even (0, 2, 4...), it's an ODD week
  // If weeksDiff is odd (1, 3, 5...), it's an EVEN week
  return weeksDiff % 2 === 0;
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
  var dateElem = document.getElementById('today');
  var timeElem = document.getElementById('time');
  var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var timeOptions = { hour: 'numeric', minute: '2-digit', second: '2-digit' };
  dateElem.innerHTML = date.toLocaleDateString('en-US', dateOptions);
  timeElem.innerHTML = date.toLocaleTimeString('en-US', timeOptions);
}

function getCountdownText(date) {
  var transitionEndTime = new Date(date);
  transitionEndTime.setHours(20, 0, 0, 0);

  var diff = transitionEndTime - date;
  var hours = Math.floor(diff / (1000 * 60 * 60));
  var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diff % (1000 * 60)) / 1000);

  var timeText = '';
  if (hours > 0) {
    timeText += hours + ' hour' + (hours !== 1 ? 's' : '') + ' ';
  }
  if (minutes > 0 || hours > 0) {
    timeText += minutes + ' minute' + (minutes !== 1 ? 's' : '') + ' ';
  }
  timeText += seconds + ' second' + (seconds !== 1 ? 's' : '');

  return timeText;
}

function writeSide(date) {
  var sideElem = document.getElementById('side');
  var eitherInfoElem = document.getElementById('either-side-info');

  // Remove all classes
  sideElem.className = 'parking-side';

  if (isSundayAfterTransitionPeriod(date)) {
    // After transition period, the side flips from what it was in the morning
    var side = isOdd(date) ? 'EVEN' : 'ODD';
    sideElem.innerHTML = side + ' house numbers';
    sideElem.classList.add(side.toLowerCase());
    eitherInfoElem.innerHTML = '';
  } else if (isWithinTransitionPeriod(date)) {
    sideElem.innerHTML = 'EVEN or ODD house numbers';
    sideElem.classList.add('either');
    // After transition period, the side flips from what it was in the morning
    var nextSide = isOdd(date) ? 'EVEN' : 'ODD';
    var countdown = getCountdownText(date);
    eitherInfoElem.innerHTML = '<strong>' + countdown + '</strong> until switch to <strong>' + nextSide + '</strong> side';
  } else {
    var side = isOdd(date) ? 'ODD' : 'EVEN';
    sideElem.innerHTML = side + ' house numbers';
    sideElem.classList.add(side.toLowerCase());
    eitherInfoElem.innerHTML = '';
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
