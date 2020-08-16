const container = document.querySelector(".js-clock");
const clock = container.querySelector("h1");
const TODAY = container.querySelector("h3");

function getTime() {
  // Clock

  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clock.innerText = `${hours}:${minutes}`;
  clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;

  if (seconds >= 50) {
    countDown(seconds);
  } else {
    clock.style.color = "#ecf0f1";
  }

  // Calendar

  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  const thisMonth = month[date.getMonth()];
  const today = date.getDate();

  if (today === 1 || today === 21 || today === 31) {
    TODAY.innerText = `${thisMonth} ${today}st`;
  } else if (today === 2 || today === 22) {
    TODAY.innerText = `${thisMonth} ${today}nd`;
  } else if (today === 3 || today === 23) {
    TODAY.innerText = `${thisMonth} ${today}rd`;
  } else {
    TODAY.innerText = `${thisMonth} ${today}th`;
  }
}

// Blink when seconds > 50

function countDown(seconds) {
  if (seconds % 2 != 0) {
    clock.style.color = "#bdc3c7";
  } else {
    clock.style.color = "#ecf0f1";
  }
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
