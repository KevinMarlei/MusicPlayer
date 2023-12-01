//declarações
let music = document.querySelector('audio');
let indexMusic = 0;
let musicDuration = document.querySelector('.end');
let image = document.querySelector('img');
let musicName = document.querySelector('.description h2');
let artistName = document.querySelector('.description i');
let volumeControl = document.querySelector('.volume');

renderMusic(indexMusic);
//eventos
document.querySelector('.btn-play').addEventListener('click', playMusic);
document.querySelector('.btn-pause').addEventListener('click', pauseMusic);
volumeControl.addEventListener('input', controlVolume);

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

function updateBar() {
    let range = document.querySelector('.progre[type="range"]');
    let theCurrentTime = document.querySelector('.start');
    
    let percentage = (music.currentTime / music.duration) * 100;

    range.value = percentage;
    theCurrentTime.textContent = secondsToMinutes(Math.floor(music.currentTime));
}

function clickBar() {
    let range = document.querySelector('.progre[type="range"]');
    let music = document.querySelector('audio');

    range.addEventListener('input', function() {
        // Obtém a porcentagem do controle deslizante
        let percentage = range.value;

        // Calcula o novo tempo da música com base na porcentagem
        let newTime = (percentage / 100) * music.duration;

        // Define o tempo da música
        music.currentTime = newTime;

        // Atualiza a barra de progresso
        updateBar();
    });
}

clickBar();

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

function controlVolume(){
   music.volume = volumeControl.value / 100;
}
// função para tocar a próxima música quando a atual chegar ao fim.
function playNext(){
    indexMusic++;
    if(indexMusic >= objectMusic.length){
        indexMusic = 0;
    }
    renderMusic(indexMusic);
}

