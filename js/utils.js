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
  idolSong = window.prompt("What song do you want to listen?").trim();
  if (idolSong == "") {
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

/// Play sound constantly
player.onended = () => {
  randomSound(sounds_key[Math.floor(Math.random() * sounds_key.length)])
}

// Adjust current song progress
const progressBar = document.getElementById('progressBar');

function updateProgressBar(value) {
    // 将滑动条的值转换为音频的当前时间
    const currentTime = (value / 100) * player.duration;
    player.currentTime = currentTime;

    // 更新滑块的位置
    progressBar.value = value;
}

// 监听滑动条的变化
progressBar.addEventListener('input', function() {
    updateProgressBar(progressBar.value);
});

// 当音频播放时，更新滑动条的位置
player.addEventListener('timeupdate', function() {
    const progress = (player.currentTime / player.duration) * 100;
    progressBar.value = Math.round(progress);
});