let gameSeq = [];  // Fixed variable name from gameseq to gameSeq
let userSeq = [];  // Fixed variable name from useseq to userSeq

let btns = ["yelllow","red","purple","green"];

let started = false; // Fixed variable name from starated to started
let level = 0;
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if (started==false) {
        console.log("Game has started");
        started = true;
        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];  // Reset user sequence to an empty array
    level++;
    h3.innerText = `Level ${level}`;  // Use backticks for string interpolation

    let randIdx = Math.floor(Math.random() * 3); // Corrected index to be between 0 and 3
    let randclr = btns[randIdx];
    let randBtn = document.querySelector(`.${randclr}`);  // Added dot for class selection
    gameSeq.push(randclr);
    console.log(gameSeq);
    gameflash(randBtn);
}

function check(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp(),1000);
        }
    } else {
        h3.innerHTML = `Game Over!<b>${level}</b> <br> Press any key to restart.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnpress() {
    console.log(this);
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);  // Use push() to add the color to the user sequence

    check(userSeq.length - 1);
}

let allbutt = document.querySelectorAll(".btn");
for (let btn of allbutt) {  // Added let for block scoping
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}