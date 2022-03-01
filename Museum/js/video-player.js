let progressPrg = document.querySelector('.progress');
let isPlayed = false,
    isFullScreen = false,
    isVolume = true;
let video = document.getElementById('main-video');
let playBtn = document.querySelector('.play'),
    circleBtn = document.querySelector('.circle'),
    volumePrg = document.querySelector('.progress-volume'),
    volumeBtn = document.querySelector('.volume'),
    fullscreenBtn = document.querySelector('.scale');
// let videoSection = document.querySelector('.keydown-listener');



document.querySelector('.play').onclick = play;
document.querySelector('.circle').onclick = playCircle;
video.onclick = playCircle;
document.querySelector('.progress-volume').oninput = videoVolume;
document.querySelector('.volume').onclick = volumeOff;
document.querySelector('.scale').onclick = fullscreenOn;
document.querySelector('.progress').onclick = videoRewind;
document.onkeydown = keybackend;
document.onkeyup = shiftWasUp;

video.ontimeupdate = progressUpdate;

// videoSection.addEventListener('keydown', keybackend)
let shiftWasPressed = false;
function shiftWasUp(event)
{
  switch(event.key){
    case 'Shift':
        shiftWasPressed = false;
    break;
  }
}
function keybackend(event) {
  if(window.pageYOffset > 2600 && window.pageYOffset < 3800) {
    switch(event.key){
      case ' ':
        play();
        event.preventDefault();
      break;
      case 'f': 
      case 'F':
      case 'а':
      case 'А':
        fullscreenOn();
      break;
      case 'm':
      case 'M':
      case 'ь':
      case 'Ь':
        volumeOff();
      break;
      case 'Shift':
        shiftWasPressed = true;
      break;
      case '+':
        if(shiftWasPressed){
          if(video.playbackRate == 2)
            video.playbackRate = 1;
          else
            video.playbackRate = 2;
        }
      break;
    }
    console.log(`${event.repeat} ${event.key}`);
  }
}

function play() {
  if (isPlayed === false) {
    video.play();
    playBtn.classList.toggle('pause');
    circleBtn.classList.toggle('hid');
    isPlayed = true;  
  } else {
    video.pause();  
    playBtn.classList.toggle('pause');
    circleBtn.classList.toggle('hid');
    isPlayed = false;
  } 
}

function playCircle() {
  if (isPlayed === false) {
    video.play();
    circleBtn.classList.toggle('hid');
    playBtn.classList.toggle('pause');
    isPlayed = true;
  } else {
    video.pause();  
    playBtn.classList.toggle('pause');
    circleBtn.classList.toggle('hid');
    isPlayed = false;
  }
}

function volumeOff() {
  if (isVolume === true) {
    video.volume = 0;
    volumeBtn.classList.toggle('mute');
    volumePrg.style.background =  `#C4C4C4`;
    volumePrg.value = 0;
    isVolume = false;
  } else {
    video.volume = 0.4;
    volumeBtn.classList.toggle('mute');
    volumePrg.style.background = `linear-gradient(to right, #710707 0%, #710707 40%, #C4C4C4 40%, #C4C4C4 100%)`;
    volumePrg.value = 40;
    isVolume = true;
  }
}

function videoVolume() {
  let v = document.querySelector('.progress-volume').value;
  video.volume = v / 100;
  if (video.volume === 0) {
    volumeBtn.classList.add('mute');
    isVolume = false;
  } else {
    volumeBtn.classList.remove('mute');
    isVolume = true;
  }
}

function fullscreenOn() {
  if(isFullScreen)
  {
    document.exitFullscreen();
    isFullScreen = false;
  }
  else
  {
    video.requestFullscreen();
    isFullScreen = true;
  }
}

function progressUpdate() {
  let d = video.duration;
  let c = video.currentTime;
  progressPrg.value = (100 * c) / d;
  progressPrg.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressPrg.value}%, #C4C4C4 ${progressPrg.value}%, #C4C4C4 100%)`;
  if (progressPrg.value == 100) {
    video.pause();  
    playBtn.classList.remove('pause');
    circleBtn.classList.remove('hid');
    isPlayed = false;
  }
}

function videoRewind(event) {
  let w = this.offsetWidth;
  let o = event.offsetX;
  this.value = (100 * o) / w;
  progressPrg.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressPrg.value}%, #C4C4C4 ${progressPrg.value}%, #C4C4C4 100%)`;
  video.pause();
  video.currentTime = video.duration * (o / w);
  video.play();
}
