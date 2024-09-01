// JS
let songIndex = 1000 /* assigned a value of 1000 so as to play first song on first click*/
let button = document.getElementById("playpause")
let GIF = document.getElementById("gif")
let seekbar = document.getElementById("myprogressbar")
let audioElement = new Audio()
let songArray = Array.from(document.getElementsByClassName("songItem"))
let musicname = document.querySelector('.music')
let musiclength = document.querySelector('.length')
function secondsToMinutesSeconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
}

let songs = [
    {songName: "Song A" , filePath: "songs/1.mp3" , coverPath: "covers/1.jpg"},
    {songName: "Song B" , filePath: "songs/2.mp3" , coverPath: "covers/2.jpg"},
    {songName: "Song C" , filePath: "songs/3.mp3" , coverPath: "covers/3.jpg"},
    {songName: "Song D" , filePath: "songs/4.mp3" , coverPath: "covers/4.jpg"},
    {songName: "Song E" , filePath: "songs/5.mp3" , coverPath: "covers/5.jpg"},
    {songName: "Song F" , filePath: "songs/6.mp3" , coverPath: "covers/6.jpg"},
    {songName: "Song G" , filePath: "songs/7.mp3" , coverPath: "covers/7.jpg"},
    {songName: "Song H" , filePath: "songs/8.mp3" , coverPath: "covers/8.jpg"},
    {songName: "Song I" , filePath: "songs/9.mp3" , coverPath: "covers/9.jpg"},
    {songName: "Song J" , filePath: "songs/10.mp3" , coverPath: "covers/10.jpg"}
]
songArray.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName
})
button.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        button.classList.replace("fa-circle-play" , "fa-circle-pause")
        GIF.style.opacity = 1
        document.getElementById(`${songIndex}`).classList.replace("fa-circle-play" , "fa-circle-pause")
    } 
    else{
        audioElement.pause()
        button.classList.replace("fa-circle-pause" , 'fa-circle-play')
        GIF.style.opacity = 0
        f1()
    }
})
audioElement.addEventListener('timeupdate', ()=>{
        let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
        seekbar.value = progress;

        // const minutes = Math.floor(parseInt(audioElement.currentTimeInSeconds) / 60);
        // const seconds = Math.floor(parseInt(audioElement.currentTimeInSeconds) % 60);   
        // Add leading zero if seconds is less than 10
        // const displaySeconds = seconds < 10 ? "0" + seconds : seconds;
    
        musiclength.innerHTML = `${secondsToMinutesSeconds(
            audioElement.currentTime
        )} / ${secondsToMinutesSeconds(audioElement.duration)}`;
})
audioElement.addEventListener('ended', ()=>{
        if (songIndex>=9) {
            songIndex = 0
        }
        else{
            songIndex = songIndex+1
        }
        audioElement.src = `songs/${songIndex+1}.mp3`
        audioElement.play()
        button.classList.replace("fa-circle-play" , "fa-circle-pause")
        f1()
        document.getElementById(`${songIndex}`).classList.replace("fa-circle-play" , "fa-circle-pause")
        GIF.style.opacity = 1
        musicname.innerText = songs[songIndex].songName
        // musiclength.innerText = counter
        audioElement.currentTime = 0
})
seekbar.addEventListener('change', ()=>{
    audioElement.currentTime = seekbar.value*audioElement.duration/100;
})
const f1 = ()=>{
    Array.from(document.getElementsByClassName('songstatus')).forEach((element)=>{
        element.classList.replace("fa-circle-pause" , 'fa-circle-play')
    })
}
Array.from(document.getElementsByClassName('songstatus')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if (songIndex!==parseInt(e.target.id)) {
            // audioElement.currentTime = 0           
            audioElement.src = `songs/${parseInt(e.target.id)+1}.mp3`
        }
        songIndex = parseInt(e.target.id)
        f1()
        if (audioElement.paused /*no need of audioElement.currentTime <= 0*/) {
            audioElement.play()          
            e.target.classList.replace("fa-circle-play" , "fa-circle-pause")
            button.classList.replace("fa-circle-play" , "fa-circle-pause")
            GIF.style.opacity = 1
        }
        else{
            audioElement.pause()
            // e.target.classList.replace("fa-circle-pause" , "fa-circle-play")
            button.classList.replace("fa-circle-pause" , "fa-circle-play")
            GIF.style.opacity = 0
        }
        musicname.innerText = songs[songIndex].songName
        // musiclength.innerText = counter
    })
})
document.getElementById("fwd").addEventListener('click', ()=>{
    if (songIndex>=9) {
        songIndex = 0
    }
    else{
        songIndex = songIndex+1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.play()
    button.classList.replace("fa-circle-play" , "fa-circle-pause")
    f1()
    document.getElementById(`${songIndex}`).classList.replace("fa-circle-play" , "fa-circle-pause")
    GIF.style.opacity = 1
    musicname.innerText = songs[songIndex].songName
    // musiclength.innerText = counter
    audioElement.currentTime = 0
})
document.getElementById("bwd").addEventListener('click', ()=>{
    if (songIndex<=0) {
        songIndex = 9
    }
    else{
        songIndex = songIndex-1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.play()
    button.classList.replace("fa-circle-play" , "fa-circle-pause")
    f1()
    document.getElementById(`${songIndex}`).classList.replace("fa-circle-play" , "fa-circle-pause")
    GIF.style.opacity = 1
    musicname.innerText = songs[songIndex].songName
    // musiclength.innerText = counter
    audioElement.currentTime = 0
}) 


