// Get DOM elements
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentSongDisplay = document.getElementById('current-song');
const progressBar = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const songList = document.getElementById('song-list');

// Song list
const songs = [
    '逃.mp3',
    '發光的樹.mp3',
    'Tranquil Day.mp3',
    '畢業之後.mp3',
    '廣義戀愛論.mp3',
    '告白.mp3',
    'We still go out.mp3',
    'heartbroken wife.mp3',
    '貓男.mp3',
    '時間女神.mp3',
    '請你幸福.mp3',
    '我說了一個謊.mp3',
    '請求.mp3',
    '轉身.mp3',
    '迷霧.mp3',
    '獨思.mp3',
    '錯過.mp3',
    '完美擁抱.mp3',
    '活著.mp3',
    '相對論.mp3',
    '寂寞之雨.mp3',
    '雨碎江南.mp3',
    '雨中的覺悟.mp3'
];

let currentSongIndex = 0;
let isPlaying = false;

// Initialize playlist
function initializePlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.replace('.mp3', '');
        li.addEventListener('click', () => playSong(index));
        songList.appendChild(li);
    });
}

// Play song
function playSong(index) {
    currentSongIndex = index;
    audioPlayer.src = `music/${songs[currentSongIndex]}`;
    currentSongDisplay.textContent = songs[currentSongIndex].replace('.mp3', '');
    audioPlayer.play();
    isPlaying = true;
    updatePlayButton();
    updateActiveSong();
}

// Update play button
function updatePlayButton() {
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

// Update active song in playlist
function updateActiveSong() {
    const playlistItems = songList.getElementsByTagName('li');
    Array.from(playlistItems).forEach((item, index) => {
        item.classList.toggle('active', index === currentSongIndex);
    });
}

// Play/Pause
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
    updatePlayButton();
});

// Previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
});

// Next song
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
});

// Set progress bar
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
});

// Update duration
audioPlayer.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audioPlayer.duration);
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value / 100;
});

// Format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Auto play next song
audioPlayer.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});

// Initialize
initializePlaylist(); 