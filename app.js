let gameSeq=[];
let userSeq=[];
let highScore = Number(localStorage.getItem("highScore")) || 0;
let card = document.querySelector(".glass-card");
let btns=["yellow", "red", "green", "blue"];
let startBtn = document.querySelector("#start-btn");

const redSound = new Audio("assets/red.mp3");
const yellowSound = new Audio("assets/yellow.mp3");
const greenSound = new Audio("assets/green.mp3");
const blueSound = new Audio("assets/blue.mp3");
const gameOverSound = new Audio("assets/game-over.mp3");
const levelUpSound = new Audio("assets/level-up.mp3");

let started=false;
let level=0;
let score=0;

let h2=document.querySelector("h2");

function startGame(){

    if(started){
        return;
    }

    started = true;

    startBtn.style.display = "none";

    levelUp();
}

document.addEventListener("keypress", startGame);
startBtn.addEventListener("click", startGame);

function gameFlash(btn){
    playSound(btn.id);
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    score = level - 1;
    h2.innerText=(`Level ${level}`);

    if(level > 1){
    levelUpSound.play();
    }

    //random button choose
    let randIdx=Math.floor(Math.random()*btns.length);
    let randColor=btns[randIdx];
    gameSeq.push(randColor);
    console.log(gameSeq);
    let randBtn=document.querySelector(`.${randColor}`);
    console.log(randBtn);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        if(score > highScore){
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        h2.innerHTML=(`Game over! Your score was <b>${score}</b>. <br>High Score: <b>${highScore}</b><br> Press any key to start again.`);
        card.classList.add("game-over");
        setTimeout(() => {
            card.classList.remove("game-over");
        }, 400);
        gameOverSound.play();
        reset();
    }
}


function btnPress(){
    console.log("Button was pressed");
    let btn=this;
    console.log(this);
    userFlash(btn);

    let userColor=btn.getAttribute("id");
    playSound(userColor);
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function playSound(color){

    if(color === "red"){
        redSound.currentTime = 0;
        redSound.play();
    }

    else if(color === "yellow"){
        yellowSound.currentTime = 0;
        yellowSound.play();
    }

    else if(color === "green"){
        greenSound.currentTime = 0;
        greenSound.play();
    }

    else if(color === "blue"){
        blueSound.currentTime = 0;
        blueSound.play();
    }
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
    startBtn.style.display = "";
}