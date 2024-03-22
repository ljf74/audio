// Cached DOM Elements
const player = new Audio();
let sounds_key = Object.keys(sounds);

// Functions
let idolSong;

function playSound(name) {
  player.src = sounds[name];
  player.play();
}

function alertSound(idolSong) {
  idolSong = window.prompt("What song do you want to listen?");
  if (idolSong.trim() == "") {
    alert("Please enter a song name.");
    alertSound(idolSong);
  }
  try {
    if (!sounds_key.includes(idolSong)) {
      document.getElementById("currentSong").innerText =
        "Sorry, not in the Audio Library X_X";
      document.title = "Audio Library"
    } else {
      playSound(idolSong);
      document.getElementById("currentSong").innerText = idolSong;
      document.title = idolSong;
      document.getElementById("currentSong").style.color = getRandomColor();
      document.querySelector('.choiceSong').style.color = getRandomColor();
      console.clear();
    }
  } catch {
    if (idolSong == null) {
      alert(/xss/);
      return;
    }
    alert("Sorry, the song you inputed currently cant play");
  }
}

// random sound
function randomSound(currentSong) {
  currentSong = sounds_key[Math.floor(Math.random() * sounds_key.length)];
  playSound(currentSong);
  document.getElementById("currentSong").innerText = currentSong;
  document.title = currentSong;
  document.getElementById("currentSong").style.color = getRandomColor();
  document.querySelector('.randomSong').style.color = getRandomColor();
  console.clear();
}

function handlePlaySound() {
  // Use the CSS :checked pseudoclass to select the selected radio button
  const selSoundInp = document.querySelector('input[name="sound"]:checked');
  if (selSoundInp === null) {
    alert('You must choose one from song list!!!');
    return;
  }
  playSound(selSoundInp.value);
   document.getElementById("currentSong").innerText = selSoundInp.value;
  document.title = selSoundInp.value;
  document.getElementById("currentSong").style.color = getRandomColor();
  document.querySelector('.handlePlaySound').style.color = getRandomColor();
  console.clear();
}

// Play or Pause
var count = 0;
var playPauseBTN = document.getElementById("playPauseBTN");
var showSongBTN = document.getElementById("showBtn");

function playPause() {
  if (count == 0) {
    count = 1;
    player.play();
    playPauseBTN.innerHTML = "Pause &#9208;";
    playPauseBTN.style.color = getRandomColor();
  } else {
    count = 0;
    player.pause();
    playPauseBTN.innerHTML = "Play &#9658;";
    playPauseBTN.style.color = getRandomColor();
  }
}

function stop() {
  playPause();
  player.pause();
  player.currentTime = 0;
  playPauseBTN.innerHTML = "Play &#9658;";
  playPauseBTN.style.color = getRandomColor();
}

function toggleSong(id) {
  if (count == 0) {
    count = 1;
    w3.hide(id);
    showSongBTN.style.color = getRandomColor();
  } else {
    count = 0;
    w3.show(id);
    showSongBTN.style.color = getRandomColor();
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;