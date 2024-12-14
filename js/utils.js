const player = new Audio();
const ul = document.getElementById("id01");
let isPlaying = false;
let currentSong = null;

// 动态填充歌曲列表
function initializeSongList() {
  ul.innerHTML = ""; // 清空列表，避免重复渲染
  Object.keys(sounds).forEach((song) => {
    const li = document.createElement("li");
    li.textContent = song;
    li.onclick = () => selectSong(song); // 绑定点击事件
    ul.appendChild(li);
  });
}

// 初始化歌曲列表
initializeSongList();

// 搜索歌曲功能
function searchSong(value) {
  const filter = value.toLowerCase();
  const items = ul.getElementsByTagName("li");
  for (let item of items) {
    item.style.display = item.textContent.toLowerCase().includes(filter)
      ? ""
      : "none";
  }
}

// 选择并播放歌曲
function selectSong(song) {
  currentSong = song;
  playSound(song);
  document.getElementById("currentSong").innerText = "当前播放：" + song;
}

// 播放歌曲
function playSound(song) {
  player.src = sounds[song];
  player.play();
  isPlaying = true;
  document.getElementById("playPauseBTN").innerHTML = "暂停 &#9208;";
  document.title = song;
}

// 播放或暂停
function playPause() {
  if (isPlaying) {
    player.pause();
    isPlaying = false;
    document.getElementById("playPauseBTN").innerHTML = "播放 &#9658;";
  } else {
    if (currentSong) {
      player.play();
      isPlaying = true;
      document.getElementById("playPauseBTN").innerHTML = "暂停 &#9208;";
    } else {
      alert("请先选择一首歌曲！");
    }
  }
}

// 停止播放
function stop() {
  player.pause();
  player.currentTime = 0;
  isPlaying = false;
  document.getElementById("playPauseBTN").innerHTML = "播放 &#9658;";
}

// 随机播放
function randomSound() {
  const songs = Object.keys(sounds);
  const randomSong = songs[Math.floor(Math.random() * songs.length)];
  selectSong(randomSong);
}

// 播放模式切换
let playMode = "list"; // "list", "random", "loop"

function changePlayMode() {
  const modeBTN = document.getElementById("modeBTN");
  if (playMode === "list") {
    playMode = "random";
    modeBTN.innerText = "模式: 随机播放";
  } else if (playMode === "random") {
    playMode = "loop";
    modeBTN.innerText = "模式: 单曲循环";
    player.loop = true;
  } else {
    playMode = "list";
    modeBTN.innerText = "模式: 顺序播放";
    player.loop = false;
  }
}

// 监听播放结束，切换歌曲
player.addEventListener("ended", () => {
  if (playMode === "list") {
    const songs = Object.keys(sounds);
    const currentIndex = songs.indexOf(currentSong);
    const nextIndex = (currentIndex + 1) % songs.length;
    selectSong(songs[nextIndex]);
  } else if (playMode === "random") {
    randomSound();
  }
  // 单曲循环模式无需操作，播放器会自动循环
});

// 进度条控制
const progressBar = document.getElementById("progressBar");
player.addEventListener("timeupdate", () => {
  const progress = (player.currentTime / player.duration) * 100;
  progressBar.value = Math.round(progress);
});

progressBar.addEventListener("input", () => {
  player.currentTime = (progressBar.value / 100) * player.duration;
});
