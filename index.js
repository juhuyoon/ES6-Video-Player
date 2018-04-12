//3 pieces to build:

//Get the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


//Build the functions

function togglePlay() {
    const method = video.paused ? 'play' : 'pause'; //tertiaryfunction
    video[method]();
//     if(video.paused) {
//         video.play();//paused is a method that exists in the video
// } else {
//     video.pause();
// }
};

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    // console.log('update the button'); //to check it works
};

function skip() {
    console.log(this.dataset.skip); //to see how it works
    video.currentTime += parseFloat(this.dataset.skip); //parseFloat as this.dataset.skip is a string. 
};

function handleRangeUpdate() {
    video[this.name] =this.value;
    console.log(this.name); //to know what property is being used
    console.log(this.value);
};

function handleProgress() {
    const percent =(video.currentTime/video.duration) * 100; //properties of video
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) { //to navigate through the video by clicking on the video bar
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

//hook up the event listeners. 
video.addEventListener('click', togglePlay); //so that it plays/pauses when you click the video
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress) //for the video bar to update as it progresses through the video;

toggle.addEventListener('click', togglePlay); //so that it plays/pauses when you click the button
 
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); //to register when mouse is hovered over it. 

//to navigate through the video by clicking on video bar
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mousedown && scrub(e)); //when someone moves the mouse, it mouses down AND scrubs and to operate, mousedown MUST be true. 
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);