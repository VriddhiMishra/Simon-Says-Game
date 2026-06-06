let gameSeq=[];
let userSeq=[];
let btns=["yellow", "red", "green", "blue"];

let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started==false){
        console.log("Game Started");
        started=true;

        levelUp();
    }
});

function gameFlash(btn){
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
    h2.innerText=(`Level ${level}`);

    //random button choose
    let randIdx=Math.floor(Math.random()*3);
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
        h2.innerHTML=(`Game over! Your score was <b>${level}<b>. <br> Press any key to start again.`);
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}


function btnPress(){
    console.log("Button was pressed");
    let btn=this;
    console.log(this);
    userFlash(btn);

    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}