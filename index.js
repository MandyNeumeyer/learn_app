// Tasks Arrays --------------------------------------------------------------------------
let guest = ['CodecGo', 'FreeCodeCamp', 'Sololearn', 'Codecademy', 'Edabit', 'Grashopper'];

let mandy = ['CodecGo', 'FreeCodeCamp', 'Sololearn', 'Codecademy', 'Edabit', 'Grashopper'];

let any = ['CodecGo', 'FreeCodeCamp', 'Sololearn', 'Codecademy', 'Edabit', 'Grashopper'];


////////// Variables ////////////////////////////////////////////////////////////////////
let p = document.querySelector('p');
let span = document.querySelector('span');
let button = document.querySelector('.btn-11');
let arrow = document.querySelector('.arrow');
let diceSound = new Audio('./assets/wuerfelbecher.wav');
const checkbox = document.querySelector("input[type=checkbox]");
let board = document.querySelector('.board');



// pick random task variables
let time;
let tasks;
let task;
let isRunning = false;



//////// clock variables /////////////////////////////////////////////////////////////////
let clock = document.querySelector('#clock').addEventListener('onload', showTime);
let whatTime;
//////////////////////////////////////////////////////////////////////////////////////////

////Dropdown - choose user for a task start----------------------------------------------
let choice = document.getElementById('list')

let rtc_user
function getSelectValue() {
    rtc_user = choice.value;
    if (rtc_user !== "") {
        button.addEventListener('click', dice);
    }
    return rtc_user;
}
getSelectValue();
console.log("user is now: ", rtc_user);

////Dropdown - choose user for a task end------------------------------------------------

// pick random task / time start --------------------------------------------------------

function dice() {

    
    button.removeEventListener('click', dice);
    diceSound.play();
    setTimeout(() => {



        const randomNumber = Math.floor(Math.random() * 6) + 1;
        console.log('hellloooo from here')

        // choose task array after name
        if (rtc_user === 'Any') {
            tasks = any;

        } else if (rtc_user === 'Mandy') {
            tasks = mandy;

        } else if (rtc_user === 'Guest') {
            tasks = guest;
        }

        task = tasks[Math.floor(Math.random() * tasks.length)]; // hat nen task
        time = (randomNumber * 10)
        const diceImage = 'assets/dice/dice' + randomNumber + '_2.png'
        document.querySelector('img').setAttribute('src', diceImage);




        if (rtc_user !== "") {
            output(task, time, rtc_user);
            button.style.display = 'none'
            board.style.display = 'block';
            span.innerText = 'Goooooooo!!!\n 🥳 🥳 🥳 ';

        }
        startCountdown(time);
    }, 2000);
}

// pick random task end ---------------------------------------------------------------


// task picker outcome output on website start-----------------------------------------

function output(task, time, rtc_user) {

    p.innerHTML = `Congrats ${rtc_user} 🥳   
    The universe picked for you:
    <div style='color:#526987'>
    ${task}</div>
    for ${time} minutes!`
    arrow.style.visibility = 'visible'
}
// task picker outcome output on website end-------------------------------------------


// clock start ------------------------------------------------------------------------

function showTime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = h >= 12 ? 'PM' : 'AM';

    h = h % 12 || 12

    //show time with 2 digits (e.g.08:00)
    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    s = (s < 10) ? '0' + s : s;

    clock = document.querySelector('#clock');
    whatTime = `${h}:${m}:${s} ${ampm}`;
    clock.innerText = whatTime;


    setTimeout(showTime, 1000)
}

showTime()

// clock end ------------------------------------------------------------------------



// countdown timer start-------------------------------------------------------------

let counter;


function startCountdown(time) {

    let minutes;
    let seconds;
    let sound = new Audio('./assets/SoulAlert.mp3');
    counter = time * 60;
    let startVisual = document.querySelector('.des-timer-1');
    let breakVisual = document.querySelector('.des-timer-2');
    let timer = document.querySelector('.timer')
    let progress = document.querySelector('.time')
    timer.style.color = 'cyan'
    let count = 0
    let interval = setInterval(() => {
        if (checkbox.checked) {
            arrow.style.visibility = 'hidden';
            startVisual.classList.add('visualCtdwn')
            startVisual.innerText = 'break'
            breakVisual.classList.remove('visualCtdwn')
            progress.classList.add('visualCtdwn')
            minutes = Math.floor(counter / 60);
            seconds = counter % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            span.innerHTML = `${minutes}:${seconds}`;
            span.style.fontFamily = 'Bungee, cursive';

            span.style.padding = '15px 0'
            span.style.color = '#fad648';
            span.style.fontSize = "35px";
            counter--;
            count++
            width = 100 - ((counter / (time * 60)) * 100)
            console.log('time, counter', time, counter);
            document.documentElement.style.setProperty("--bg-before", width + "%")

        } else if (!checkbox.checked) {

            if (count > 2) {
                breakVisual.innerText = 'resume'
            }
            startVisual.classList.remove('visualCtdwn')
            breakVisual.classList.add('visualCtdwn')





        }

        if (counter < 0) {
            sound.play();
            span.innerHTML = 'Done!';
            setTimeout(() => {
            }, 6000);
            p.innerHTML = ''
            clearInterval(interval);
            button.addEventListener('click', dice);

        }
    }, 1000);
    button.addEventListener('click', dice);
}
// 

// countdown timer end--------------------------------------------------------------



//music player start----------------------------------------------------------------
let playBtn = document.querySelector('.fa-play')
playBtn.addEventListener('click', togglePlayer);


let fwdBtn = document.querySelector('.fa-fast-forward');
fwdBtn.addEventListener('click', () => changeSong(false));

let backBtn = document.querySelector('.fa-fast-backward')
backBtn.addEventListener('click', () => changeSong())

let radioChannel = document.querySelector('#channel');
radioChannel.style.color = "cyan";



let stream1 = document.getElementById('stream1');
let stream2 = document.getElementById('stream2');
let stream3 = document.getElementById('stream3');
let stream4 = document.getElementById('stream4');
let radios = [stream1, stream2, stream3, stream4];
let activeSong
let currentSongIndex = 0;
let nextSongIndex = currentSongIndex + 1;

function togglePlayer(id) {
    activeSong = radios[currentSongIndex]
    console.log(activeSong)
    let playIcon = document.getElementById('play')
    if (activeSong.paused) {
        activeSong.play();
        radioChannel.style.display="block"
        switch (radios[currentSongIndex]) {
            case stream1:
                radioChannel.innerText = "RP Main Mix";
                break;
            case stream2:
                radioChannel.innerText = "Mellow";
                break;
            case stream3:
                radioChannel.innerText = "Rock";
                break;
            case stream4:
                radioChannel.innerText = "World";
                break;
            default:
                radioChannel.innerText = "";
        }

        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause', 'glow');
        

    } else {
        activeSong.pause();
        playIcon.classList.add('fa-play');
        playIcon.classList.remove('fa-pause', 'glow');
        radioChannel.style.display="none";
       


    }
 
}

function changeSong(next = true) {

    activeSong.pause()
    if (next) {
        currentSongIndex++;
        nextSongIndex = currentSongIndex + 1;
        if (currentSongIndex > radios.length - 1) {
            currentSongIndex = 0;
            nextSongIndex = currentSongIndex + 1
        } if (nextSongIndex > radios.length - 1) {
            nextSongIndex = 0;
        }
    } else {
        currentSongIndex--;
        nextSongIndex = currentSongIndex
        if (currentSongIndex < 0) {
            currentSongIndex = radios.length - 1;
            nextSongIndex = 0;
        }
    }

    togglePlayer(currentSongIndex)
}

//music player end-------------------------------------------------------------------

