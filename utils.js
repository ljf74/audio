// Cached DOM Elements
const player = new Audio();
let sounds_key = Object.keys(sounds);
let rnd = Math.random;
let m = 0;

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
    } else {
      playSound(idolSong);
      document.getElementById("currentSong").innerText = idolSong;
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
}

function handlePlaySound() {
  // Use the CSS :checked pseudoclass to select the selected radio button
  const selSoundInp = document.querySelector('input[name="sound"]:checked');
  playSound(selSoundInp.value);
   document.getElementById("currentSong").innerText = selSoundInp.value;
}

// Play or Pause
var count = 0;
var playPauseBTN = document.getElementById("playPauseBTN");

function playPause() {
  if (count == 0) {
    count = 1;
    player.play();
    playPauseBTN.innerHTML = "Pause &#9208;";
  } else {
    count = 0;
    player.pause();
    playPauseBTN.innerHTML = "Play &#9658;";
  }
}

function stop() {
  playPause();
  player.pause();
  player.currentTime = 0;
  playPauseBTN.innerHTML = "Play &#9658;";
}

function toggleSong(id) {
  if (count == 0) {
    count = 1;
    w3.hide(id);
  } else {
    count = 0;
    w3.show(id);
  }
}