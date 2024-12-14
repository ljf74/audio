// 缓存音频播放器和歌曲列表
const player = new Audio();
const sounds_key = Object.keys(sounds);
const progressBar = document.getElementById('progressBar');
const currentSongDisplay = document.getElementById("currentSong");
const playPauseBTN = document.getElementById("playPauseBTN");
const modeBTN = document.getElementById("modeBTN");

// 状态管理
let isPlaying = false;
let currentSongIndex = 0; // 当前歌曲索引
let playMode = "list"; // 播放模式: "list", "random", "loop"

// 播放歌曲
function playSound(name) {
  player.src = sounds[name];
  player.play();
  currentSongDisplay.innerText = name;
  document.title = name;
  isPlaying = true;
  playPauseBTN.innerHTML = "暂停 &#9208;";
  currentSongIndex = sounds_key.indexOf(name);
}

// 切换播放模式
function changePlayMode() {
  if (playMode === "list") {
    playMode = "random";
    modeBTN.innerText = "模式: 随机播放";
  } else if (playMode === "random") {
    playMode = "loop";
    modeBTN.innerText = "模式: 单曲循环";
    player.loop = true; // 开启单曲循环
  } else {
    playMode = "list";
    modeBTN.innerText = "模式: 顺序播放";
    player.loop = false; // 关闭单曲循环
  }
}

// 随机播放歌曲
function randomSound() {
  const randomSong = sounds_key[Math.floor(Math.random() * sounds_key.length)];
  playSound(randomSong);
}

// 顺序播放下一首
function playNext() {
  currentSongIndex = (currentSongIndex + 1) % sounds_key.length;
  playSound(sounds_key[currentSongIndex]);
}

// 手动播放选中歌曲
function handlePlaySound() {
  const selectedSong = document.querySelector('input[name="sound"]:checked');
  if (!selectedSong) {
    alert("请从歌曲列表中选择一首歌曲！");
    return;
  }
  playSound(selectedSong.value);
}

// 播放或暂停
function playPause() {
  if (isPlaying) {
    player.pause();
    isPlaying = false;
    playPauseBTN.innerHTML = "播放 &#9658;";
  } else {
    player.play();
    isPlaying = true;
    playPauseBTN.innerHTML = "暂停 &#9208;";
  }
}

// 停止播放
function stop() {
  player.pause();
  player.currentTime = 0;
  isPlaying = false;
  playPauseBTN.innerHTML = "播放 &#9658;";
}

// 监听歌曲播放结束，根据播放模式切换下一首
player.addEventListener("ended", () => {
  if (playMode === "list") {
    playNext();
  } else if (playMode === "random") {
    randomSound();
  } // 如果是 loop 模式，播放器的 loop 已经自动处理
});

// 更新进度条
player.addEventListener("timeupdate", () => {
  const progress = (player.currentTime / player.duration) * 100;
  progressBar.value = Math.round(progress);
});

// 监听滑动条手动调整进度
progressBar.addEventListener("input", () => {
  player.currentTime = (progressBar.value / 100) * player.duration;
});

// 显示歌曲列表并绑定点击播放功能
function displaySongList() {
  const listContainer = document.getElementById("id01");
  sounds_key.forEach(songName => {
    const li = document.createElement("li");
    li.innerText = songName;
    li.onclick = () => playSound(songName);
    listContainer.appendChild(li);
  });
}

// 初始化
displaySongList();