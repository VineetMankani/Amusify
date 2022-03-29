// Music Player
const playButton = document.querySelectorAll('.play')
const pauseButton = document.querySelectorAll('.pause')
const progressBar = document.querySelector('#progressBar')
const gif = document.querySelector('#gif')
// Navbar Top
const guessInput = document.querySelector('#guessInput')
const owner = document.querySelector('#owner')
const socialLinks = document.querySelector('#socialLinks')
// let button = document.querySelector("button")
const op = document.querySelector("#op")
// Navbar Left
const search = document.querySelector('#search')
// Main Content
const mainContent = document.querySelector('#mainContent')
const userInput = document.querySelector('#userInput')
const question = document.querySelector('#question')
const action = document.querySelector("#action")
const note = document.querySelector("#note")
const guess = document.querySelector("#guess")
const guessButton = document.querySelector("#guessButton")
const resultBox = document.querySelector("#resultBox")
const hintBox = document.querySelector("#hintBox")
const hintButton = document.querySelector("#hintButton")
const hint = document.querySelector("#hint")
const nextSong = document.querySelector("#nextSong")
const opt = document.querySelectorAll(".opt")
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")

const songs = [
    {
        "question":  "Guess The Web Series",
        "answer": "SQUID GAME",
        "option1": "ROUND 6",
        "option2": "HARRY POTTER",
        "option3": "STRANGER THINGS",
        "option4": "FRIENDS"
    },
    {
        "question":  "Guess The Web Series",
        "answer": "BROOKLYN NINE NINE",
        "option1": "THE OFFICE",
        "option2": "HARRY POTTER",
        "option3": "SPIDERMAN",
        "option4": "FRIENDS"
    },
    {
        "question":  "Guess The Web Series",
        "answer": "MONEY HEIST",
        "option1": "DARK",
        "option2": "GAME OF THRONES",
        "option3": "STRANGER THINGS",
        "option4": "BREAKING BAD"
    },
    {
        "question":  "Guess The Movie",
        "answer": "AVENGERS",
        "option1": "DARK",
        "option2": "HARRY POTTER",
        "option3": "GAME OF THRONES",
        "option4": "BATMAN"
    },
    {
        "question":  "Guess The Movie",
        "answer": "HARRY POTTER",
        "option1": "SHERLOCK",
        "option2": "THE OFFICE",
        "option3": "SPIDERMAN",
        "option4": "BATMAN"
    },
    {
        "question":  "Guess The Web Series",
        "answer": "DARK",
        "option1": "BREAKING BAD",
        "option2": "SPIDERMAN",
        "option3": "SHERLOCK",
        "option4": "STRANGER THINGS"
    },
    {
        "question":  "Guess The Movie",
        "answer": "TITANIC",
        "option1": "SHERLOCK",
        "option2": "THE OFFICE",
        "option3": "STRANGER THINGS",
        "option4": "BATMAN"
    },
    {
        "question":  "Guess The Web Series",
        "answer": "FRIENDS",
        "option1": "BREAKING BAD",
        "option2": "THE OFFICE",
        "option3": "SPIDERMAN",
        "option4": "STRANGER THINGS"
    },
    {
        "question":  "Guess The Web Series",
        "answer": "GAME OF THRONES",
        "option1": "BREAKING BAD",
        "option2": "STRANGER THINGS",
        "option3": "THE OFFICE",
        "option4": "SPIDERMAN"
    }
]

let random = Math.floor(Math.random()*songs.length)+1;
let audio = new Audio(`media/songs/${random}.mp3`)
console.log(random)

    // NAVBAR TOP

owner.addEventListener('click', ()=> {
    socialLinks.classList.add('shift')
    setTimeout(() => {
        socialLinks.classList.remove('shift')
    }, 500);
})

const correctSong = songs[random-1].answer
guessInput.addEventListener('submit', function(e){
    result.innerText = '';
    e.preventDefault()
    displayResult(correctSong)
    // console.dir(guess)
})

const result = document.createElement('div')

function displayResult(correctSong){
    const userInput = guess.value.toUpperCase()
    // console.log(userInput);
    // console.log(correctSong);
    if(userInput === correctSong){
        correctAnswerSelected(correctSong, result);
    }
    else if(!userInput){
        result.append('Enter Your Guess First :)')
        setTimeout(() => {
            result.append("\n Need Options?")
        }, 2000)
    }
    else{
        result.append(`Nopes!\n`)
        setTimeout(() => {
            result.append("\nNeed Options?")
        }, 2000)
    }
    resultBox.appendChild(result)
}

function correctAnswerSelected(correctSong, result){
    resultBox.innerText = ''
    result.innerText = ''
    hintButton.classList.add('d-none');
    nextSong.classList.remove('d-none');
    result.append(`That's Correct.\n`)
    result.append(`It is ${correctSong}!`)
    guessButton.innerText = 'GG!';
    resultBox.appendChild(result)
}

nextSong.addEventListener('click', function(){
    location.reload()
})

prev.addEventListener('click', ()=> { location.reload(); })
next.addEventListener('click', ()=> { location.reload(); })

hintButton.addEventListener('click', function() {
    if(progress===0){
        resultBox.innerText = 'Play The Song First :)'
    }
    else{
        hint.classList.remove('d-none')
    }
})

opt[0].innerText = songs[random-1].option1
opt[1].innerText = songs[random-1].option2
opt[2].innerText = songs[random-1].option3
opt[3].innerText = songs[random-1].option4

let r = Math.floor(Math.random()*4)
opt[r].innerText = songs[random-1].answer

for(let i=0; i<4; i++){
    opt[i].addEventListener('click', function(){
        opt[i].style.backgroundColor = 'red';
    })
}

opt[r].addEventListener('click', function(){
    correctAnswerSelected(correctSong, result)
    guess.value = opt[r].innerText
    guess.nextElementSibling.classList.add('bg-success')
    for(let i=0; i<4; i++){
        if(i!=r){
            opt[i].style.opacity = 0;
            opt[i].style.transition = '1s'
            setTimeout(() => {
                opt[i].classList.add('d-none');
            }, 750);
        }
    }
    opt[r].style.backgroundColor = '#228B22'
    opt[r].style.opacity = 1;
})

    // MUSIC PLAYER

playButton[0].addEventListener('click', play)
playButton[1].addEventListener('click', play)

pauseButton[0].addEventListener('click', pause)
pauseButton[1].addEventListener('click', pause)

let progress = 0;
audio.addEventListener('timeupdate', function(){
    progress = parseInt((audio.currentTime/audio.duration)*10000)
    progressBar.value = progress
    if(progress === 10000){
        songOver()
    }
})

progressBar.addEventListener('change', function() {
    audio.currentTime = ((progressBar.value*audio.duration)/10000)
})

function play(){
    audio.play();
    question.innerText = songs[random-1].question
    playButton[0].classList.add('d-none')
    pauseButton[0].classList.remove('d-none')
    playButton[1].classList.add('d-none')
    pauseButton[1].classList.remove('d-none')
    action.innerText = 'Playing..'
    resultBox.innerText = ''
    gif.style.opacity = 1;

}

function pause(){
    audio.pause();
    pauseButton[0].classList.add('d-none')
    playButton[0].classList.remove('d-none')
    pauseButton[1].classList.add('d-none')
    playButton[1].classList.remove('d-none')
    action.innerText = 'Paused'
    gif.style.opacity = 0;
}

function songOver(){
    // console.log('Ran Out Of Time')
    pause();
    action.innerText = 'Song Over.. Play Again?'
    // result.append(`The Answer was ${songs[random-1].answer}`)
}