const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const volumeSlider = document.getElementById('volume');
const progressBar = document.getElementById('progress');
const trackName = document.getElementById('track-name');
const thumbnail = document.getElementById('thumbnail');
const audio = document.getElementById('audio');
const currentTimeDisplay = document.getElementById('current-time');
const totalDurationDisplay = document.getElementById('total-duration');

let currentTrackIndex = 0;
const tracks = [
    { name: 'Matta', src: 'Matta.mp3', thumbnail: 'R.png' },
    { name: 'Kannazhaga', src: 'Kannazhaga.mp3', thumbnail: 'R.png' },
    { name: 'Inayae-MassTamilan.org', src: 'Inayae-MassTamilan.org.mp3', thumbnail: 'R.png' },
    { name: 'Naan-Pizhai-MassTamilan.so', src: 'Naan-Pizhai-MassTamilan.so (1).mp3', thumbnail: 'R.png' },
    { name: 'Ninaivirukka-MassTamilan.dev', src: 'Ninaivirukka-MassTamilan.dev.mp3', thumbnail: 'R.png' },
    { name: 'Ordinary Person-Music', src: 'Ordinary Person-Music.mp3', thumbnail: 'R.png' },
    { name: 'spotifydown.com - Nenjukulla Nee', src: 'spotifydown.com - Nenjukulla Nee.mp3', thumbnail: 'R.png' }
];

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const updateCurrentTime = () => {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    progressBar.value = (audio.currentTime / audio.duration) * 100;
};

const updateTotalDuration = () => {
    totalDurationDisplay.textContent = formatTime(audio.duration);
};

const playTrack = (index) => {
    const track = tracks[index];
    trackName.textContent = track.name;
    thumbnail.src = track.thumbnail;
    audio.src = track.src;
    audio.play();
    playButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    audio.onloadedmetadata = updateTotalDuration;
};

playButton.addEventListener('click', () => {
    audio.play();
    playButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');
});

pauseButton.addEventListener('click', () => {
    audio.pause();
    playButton.classList.remove('hidden');
    pauseButton.classList.add('hidden');
});

nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
});

prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
});

audio.addEventListener('timeupdate', updateCurrentTime);

progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Start by playing the first track
playTrack(currentTrackIndex);
