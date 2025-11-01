// Alternate Side Parking logic (modern ES6+)
const NOV_1_2024 = new Date(2024, 10, 1); // November 1, 2024
const TRANSITION_START_HOUR = 16; // 4 PM
const TRANSITION_END_HOUR = 20;   // 8 PM
const SUNDAY = 0;

/** Calculate weeks since the Monday of the week containing Nov 1 2024 */
const getWeeksSinceNov1 = (date) => {
  // Monday of the week containing the given date
  const dayOfWeek = date.getDay(); // 0=Sun … 6=Sat
  const daysFromMonday = dayOfWeek === SUNDAY ? 6 : dayOfWeek - 1;
  const mondayCurrent = new Date(date);
  mondayCurrent.setDate(date.getDate() - daysFromMonday);
  mondayCurrent.setHours(0, 0, 0, 0);

  // Monday of the week containing Nov 1 2024 (which was a Friday)
  const novDay = NOV_1_2024.getDay();
  const daysFromMondayNov = novDay === SUNDAY ? 6 : novDay - 1;
  const mondayNov = new Date(NOV_1_2024);
  mondayNov.setDate(NOV_1_2024.getDate() - daysFromMondayNov);
  mondayNov.setHours(0, 0, 0, 0);

  const diffMs = mondayCurrent - mondayNov;
  return Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
};

/** Determine if the current week is an ODD week (starting from Nov 1 2024) */
const isOddWeek = (date) => getWeeksSinceNov1(date) % 2 === 0;

/** True if we are in the Sunday transition window (4 PM‑8 PM) */
const isWithinTransitionPeriod = (date) =>
  date.getDay() === SUNDAY &&
  date.getHours() >= TRANSITION_START_HOUR &&
  date.getHours() < TRANSITION_END_HOUR;

/** True if it is Sunday after the transition period (>= 8 PM) */
const isSundayAfterTransitionPeriod = (date) =>
  date.getDay() === SUNDAY && date.getHours() >= TRANSITION_END_HOUR;

/** Write current date and time into the page */
const writeDate = (date) => {
  const dateElem = document.getElementById('today');
  const timeElem = document.getElementById('time');
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: '2-digit', second: '2-digit' };
  dateElem.textContent = date.toLocaleDateString('en-US', dateOptions);
  timeElem.textContent = date.toLocaleTimeString('en-US', timeOptions);
};

/** Build a human‑readable countdown string */
const getCountdownText = (now) => {
  const end = new Date(now);
  end.setHours(TRANSITION_END_HOUR, 0, 0, 0);
  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);
  const parts = [];
  if (h > 0) parts.push(`${h} hour${h !== 1 ? 's' : ''}`);
  if (m > 0 || h > 0) parts.push(`${m} minute${m !== 1 ? 's' : ''}`);
  parts.push(`${s} second${s !== 1 ? 's' : ''}`);
  return parts.join(' ');
};

/** Update the side display based on the current date */
const writeSide = (date) => {
  const sideElem = document.getElementById('side');
  const eitherInfoElem = document.getElementById('either-side-info');
  sideElem.className = 'parking-side';

  if (isSundayAfterTransitionPeriod(date)) {
    // After transition, the side flips from the morning value
    const side = isOddWeek(date) ? 'EVEN' : 'ODD';
    sideElem.textContent = `${side} house numbers`;
    sideElem.classList.add(side.toLowerCase());
    eitherInfoElem.textContent = '';
  } else if (isWithinTransitionPeriod(date)) {
    sideElem.textContent = 'EVEN or ODD house numbers';
    sideElem.classList.add('either');
    const nextSide = isOddWeek(date) ? 'EVEN' : 'ODD';
    const countdown = getCountdownText(date);
    eitherInfoElem.innerHTML = `<strong>${countdown}</strong> until switch to <strong>${nextSide}</strong> side`;
  } else {
    const side = isOddWeek(date) ? 'ODD' : 'EVEN';
    sideElem.textContent = `${side} house numbers`;
    sideElem.classList.add(side.toLowerCase());
    eitherInfoElem.textContent = '';
  }
};

/** Main update loop */
const update = () => {
  const now = new Date();
  writeDate(now);
  writeSide(now);
};

/** Initialise the page and start the interval */
const determineWhichSideToParkOn = () => {
  update();
  setInterval(update, 1000);
};

window.onload = determineWhichSideToParkOn;

