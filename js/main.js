//declarações
let music = document.querySelector('audio');
let indexMusic = 0;
let musicDuration = document.querySelector('.end');
let image = document.querySelector('img');
let musicName = document.querySelector('.description h2');
let artistName = document.querySelector('.description i');

renderMusic(indexMusic);
//eventos
document.querySelector('.btn-play').addEventListener('click', playMusic);
document.querySelector('.btn-pause').addEventListener('click', pauseMusic);

document.querySelector('.btn-next').addEventListener('click', ()=>{
    indexMusic++;
    if(indexMusic >= objectMusic.length){
        indexMusic = 0;
    }
    renderMusic(indexMusic);
});
document.querySelector('.btn-previous').addEventListener('click', ()=>{
    indexMusic--;
    if(indexMusic < 0){
        indexMusic = objectMusic.length -1;
    }
    renderMusic(indexMusic);
});

music.addEventListener('timeupdate', updateBar)
music.addEventListener('ended', playNext);
//funções
function playMusic() {
    music.play();
}

function pauseMusic() {
    
    music.pause();
}

function updateBar(){
    let bar = document.querySelector('progress');
    bar.style.width = (Math.floor((music.currentTime / music.duration) * 200) / 2) + '%';
    let theCurrentTime = document.querySelector('.start');
    theCurrentTime.textContent = secondsToMinutes(Math.floor(music.currentTime));
}

function secondsToMinutes(seconds){
    let fieldMinutes = Math.floor(seconds / 60);
    let fieldSeconds = seconds % 60;
    if(fieldSeconds < 10){
        fieldSeconds = '0' + fieldSeconds;
    }
    return `${fieldMinutes}:${fieldSeconds}`;
}


function renderMusic(index){
    music.setAttribute('src', objectMusic[index].src);
    music.addEventListener('loadeddata', ()=>{
        musicName.textContent = objectMusic[index].title;
        artistName.textContent = objectMusic[index].artist;
        image.src = objectMusic[index].img;
        musicDuration.textContent = secondsToMinutes(Math.floor(music.duration));
    });
    playMusic();
}
// função para tocar a próxima música quando a atual chegar ao fim.
function playNext(){
    indexMusic++;
    if(indexMusic >= objectMusic.length){
        indexMusic = 0;
    }
    renderMusic(indexMusic);
}

