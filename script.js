let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCounter = 1;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsList = document.getElementById("lapsList");

function updateDisplay() {
  const formattedTime = 
    `${hours.toString().padStart(2, "0")}:` +
    `${minutes.toString().padStart(2, "0")}:` +
    `${seconds.toString().padStart(2, "0")}`;
  display.textContent = formattedTime;
}

function startStopwatch() {
  if (!isRunning) {
    timer = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 1000);
    startStopBtn.textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(timer);
    startStopBtn.textContent = "Start";
    isRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(timer);
  isRunning = false;
  seconds = minutes = hours = 0;
  lapCounter = 1;
  updateDisplay();
  startStopBtn.textContent = "Start";
  lapsList.innerHTML = "";
}

function recordLap() {
  if (isRunning) {
    const lapTime = display.textContent;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCounter++}: ${lapTime}`;
    lapsList.prepend(li);
  }
}

startStopBtn.addEventListener("click", startStopwatch);
lapBtn.addEventListener("click", recordLap);
resetBtn.addEventListener("click", resetStopwatch);

// Initialize display
updateDisplay();
