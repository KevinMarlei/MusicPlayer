//declarções 
let music = document.querySelector('audio');
let imageMusic = document.querySelector('img');
let title = document.querySelector('.title');
let artist = document.querySelector('.artist-name');
let musicDuration = document.querySelector('.end');
const btnPlay = document.querySelector('.btn-play');
const btnPrevious = document.querySelector('.btn-previous');
const btnPause = document.querySelector('.btn-pause');
const btnNext = document.querySelector('.btn-next');
let progressBar = document.querySelector('.progress-bar');
let currentTime = document.querySelector('.start');
let volumeInput = document.querySelector('.volume');

let indexMusic = 0;
let genderChoice;
let objectFiltered = objectMusic.filter((newObject) => newObject.gender === genderChoice);

//eventos
btnPlay.addEventListener('click', playMusic);
btnPause.addEventListener('click', pauseMusic);
btnNext.addEventListener('click', ()=>{
    indexMusic++;
    if(objectFiltered && objectFiltered.length > 0){
        if(indexMusic >= objectFiltered.length){
            indexMusic = 0;
        }
    }else{
        if(indexMusic >= objectMusic.length){
            indexMusic = 0;
        }
    }
    renderMusic(indexMusic);
});
btnPrevious.addEventListener('click', ()=>{
    indexMusic--;
    if(objectFiltered && objectFiltered.length > 0){
        if(indexMusic < 0){
            indexMusic = objectFiltered.length - 1; 
        }
    }else{
        if(indexMusic < 0){
            indexMusic = objectMusic.length - 1;
        }
    }
    renderMusic(indexMusic);
});

volumeInput.addEventListener('input', controlVolume);
volumeInput.addEventListener('wheel', function(event){
    volumeInput.value = parseInt(volumeInput.value) + (event.deltaY > 0 ? -1 : 1);
    volumeInput.value = Math.max(0, Math.min(100, volumeInput.value));
    controlVolume();
});
//funções
function playMusic() {
    music.play();
}

function pauseMusic(){
    music.pause();
}

function playNext(){
    indexMusic++;
    if(objectFiltered && objectFiltered.length > 0){
        if(indexMusic >= objectFiltered.length){
            indexMusic = 0
        }
    }else{
        if(indexMusic >= objectMusic.length){
            indexMusic = 0;
        }
    }
    renderMusic(indexMusic);
}
music.addEventListener('ended', playNext);

function renderMusic(index) {
    if (objectFiltered.length > 0 && index < objectFiltered.length) {
        music.setAttribute('src', objectFiltered[index].src);
        music.addEventListener('loadeddata', () => {
            title.textContent = objectFiltered[index].title;
            artist.textContent = objectFiltered[index].artist;
            imageMusic.src = objectFiltered[index].img;
            musicDuration.textContent = secondsToMinutes(Math.floor(music.duration));
            console.log(music.duration);
        });
    } else {
        music.setAttribute('src', objectMusic[index].src);
        music.addEventListener('loadeddata', () => {
            title.textContent = objectMusic[index].title;
            artist.textContent = objectMusic[index].artist;
            imageMusic.src = objectMusic[index].img;
            musicDuration.textContent = secondsToMinutes(Math.floor(music.duration));
            console.log(music.duration);
        });
    }
    playMusic();
}

function secondsToMinutes(seconds){
    let fieldMinutes = Math.floor(seconds / 60);
    let fieldSeconds = seconds % 60;
    if(fieldSeconds < 10){
        fieldSeconds = '0' + fieldSeconds;
    }
    return `${fieldMinutes}:${fieldSeconds}`;
}

function updateBar(){
    let percent = (music.currentTime / music.duration) * 100;
    progressBar.value = percent;
    currentTime.textContent = secondsToMinutes(Math.floor(music.currentTime));
}
music.addEventListener('timeupdate', updateBar);

function clickBar(){
    progressBar.addEventListener('input', ()=>{
        let percent = progressBar.value;
        let newTime = (percent / 100) * music.duration;
        music.currentTime = newTime;
    });
    updateBar();
}

function controlVolume(){
    const highVolume = document.querySelector('.high-volume');
    const mediumVolume = document.querySelector('.medium-volume');
    const lowVolume = document.querySelector('.low-volume');
    const zeroVolume = document.querySelector('.zero-volume');

    music.volume = volumeInput.value / 100
    if(music.volume > 0.75){
        highVolume.style.display = 'block';
        mediumVolume.style.display = 'none';
        lowVolume.style.display = 'none';
        zeroVolume.style.display = 'none';
    }
    if(music.volume >= 0.5 && music.volume < 0.75 || music.volume <= 0.5 && music.volume >= 0.25){
        highVolume.style.display = 'none';
        mediumVolume.style.display = 'block';
        lowVolume.style.display = 'none';
        zeroVolume.style.display = 'none';
    }
    if(music.volume < 0.25){
        highVolume.style.display = 'none';
        mediumVolume.style.display = 'none';
        lowVolume.style.display = 'block';
        zeroVolume.style.display = 'none';
    }
    if(music.volume === 0){
        highVolume.style.display = 'none';
        mediumVolume.style.display = 'none';
        lowVolume.style.display = 'none';
        zeroVolume.style.display = 'block';
    }
}

clickBar();
renderMusic(indexMusic);

//////////////////////////////////////////////////////

const btnListMusic = document.querySelector('.btn-list-music');
const btnCloseList = document.querySelector('.btn-close-list');
const divListBox = document.getElementById('list-box');
const divMusicalGender = document.querySelector('.musical-gender');
const lowBoxList = document.querySelector('.low-box-list');
const btnGender = document.querySelectorAll('.btn-gender');
const divBoxImage = document.getElementById('box-image');

btnListMusic.addEventListener('click', ()=>{
    btnListMusic.style.display = 'none';
    btnCloseList.style.display = 'flex';
    divListBox.style.display = 'flex';
    divMusicalGender.style.display = 'flex';
    divBoxImage.style.display = 'none';

    document.querySelectorAll('.btn-gender:not(:first-child)').forEach(btn => btn.remove());

    const uniqueGenders = [];
    objectMusic.forEach((allGender)=>{
        const gender = allGender.gender;
        if(!uniqueGenders.includes(gender)){
            uniqueGenders.push(gender);
            btnGender.forEach(()=>{
                const button = document.createElement('button');
                button.classList.add('btn-gender');
                button.textContent = gender;
                lowBoxList.appendChild(button);

                button.addEventListener('click', ()=>{
                    genderOrAllMusicCheck(button);
                });
            });
        }
    });
});

btnCloseList.addEventListener('click', ()=>{
    btnCloseList.style.display = 'none';
    btnListMusic.style.display = 'flex';
    divListBox.style.display = 'none';
    divMusicalGender.style.display = 'none';
    divBoxImage.style.display = 'block';
});

btnGender.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        if(btn.textContent === 'All Musics'){
            genderChoice = null;
            objectFiltered = objectMusic;
        }else{
            genderChoice = btn.textContent;
            objectFiltered = objectMusic.filter((newObject) => newObject.gender === genderChoice);
        }
        btnCloseList.style.display = 'none';
        btnListMusic.style.display = 'flex';
        divListBox.style.display = 'none';
        divMusicalGender.style.display = 'none';
        divBoxImage.style.display = 'block';
        indexMusic = 0;
        renderMusic(indexMusic);
    });
});

function genderOrAllMusicCheck(button){
    btnCloseList.style.display = 'none';
    btnListMusic.style.display = 'flex';
    divListBox.style.display = 'none';
    divMusicalGender.style.display = 'none';
    divBoxImage.style.display = 'block';

    if(button.textContent === 'All Musics'){
        genderChoice = null;
        objectFiltered = objectMusic;
    }else{
        genderChoice = button.textContent;
        objectFiltered = objectMusic.filter((newObject) => newObject.gender === genderChoice);
    }
    indexMusic = 0
    renderMusic(indexMusic);
}