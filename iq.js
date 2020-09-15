"use strict";

var gViewTime;
var gMarkRate;
var gSizeX;
var gSizeY;
var gBoard;
var gIQ;
var gLevel = 1;

function createBoard() {
    let e = document.getElementById('container');
    if (e) {
        document.body.removeChild(e);
    }

    let container = document.createElement('div');
    container.className = 'container';
    container.id = 'container';
    document.body.appendChild(container);

    let title = document.createElement('div');
    title.innerHTML = `Level ${gLevel} IQ ${gIQ}`;
    title.style.color = 'white';
    container.appendChild(title);
    
    gBoard = {};
    for (let i = 0; i < gSizeY * gSizeX; ++i) {
        if (i % gSizeX === 0) {
            let newline = document.createElement('div');
            newline.className = 'break';
            container.appendChild(newline);
        }

        let square = document.createElement('div');
        square.className = 'square';
        square.selected = false;
        container.appendChild(square);

        gBoard[i] = square;
    }
    let newline = document.createElement('div');
    newline.className = 'break';
    container.appendChild(newline);

    let done = document.createElement('button');
    done.id = 'done';
    done.innerText = 'Done';
    done.disabled = true;
    done.onclick = showSolution;
    container.appendChild(done);
    gBoard.done = done;

    return gBoard;
}
function randomizeBoard() {
    for (let i = 0; i < gSizeY * gSizeX; ++i) {
        gBoard[i].style.background = '';
        gBoard[i].marked = Math.random() < gMarkRate;
        if (gBoard[i].marked) {
            gBoard[i].className = 'square selected';
        } else {
            gBoard[i].className = 'square';
        }
    }
}
function hideMarks() {
    gBoard.done.innerText = 'Done';
    for (let i = 0; i < gSizeY * gSizeX; ++i) {
        gBoard[i].className = 'square';
        gBoard[i].onclick = function() {
            gBoard[i].selected = !gBoard[i].selected;
            if (gBoard[i].selected) {
                gBoard[i].className = 'square selected';
            } else {
                gBoard[i].className = 'square';
            }
        };
    }
    gBoard.done.disabled = false;
}
function showSolution() {
    gBoard.done.innerText = 'Next';
    gBoard.done.onclick = startRound;

    let levelCompleted = true;
    for (let i = 0; i < gSizeY * gSizeX; ++i) {
        gBoard[i].onclick = function() {};
        if (gBoard[i].marked !== gBoard[i].selected) {
            levelCompleted = false;
            gBoard[i].style.background = 'red';
        } else {
            gBoard[i].style.background = 'green';
        }
    }
    if (levelCompleted) {
        gLevel++;
    } else {
        gLevel = Math.max(gLevel - 1, 1);
    }
}
function adjustLevel() {
    let minTime = 0.4;
    let maxTime = 5.5;
    let minSizeX = 4;
    let minSizeY = 4;
    let minRate = 0.15;
    let maxRate = 0.75;
    let levelSizeInterval = 10;
    let sigmoid = function(x, low, high, stretch) {
        return (Math.tanh((x / stretch - 0.5) * 1.5 * Math.PI) / 2 + 0.5) * (high - low) + low;
    }
    gSizeX = minSizeX + Math.floor(gLevel / levelSizeInterval / 2);
    gSizeY = minSizeY + Math.floor(gLevel / levelSizeInterval / 2 - 0.5) + 1;
    gMarkRate = sigmoid(gLevel, minRate, maxRate, 150);
    gViewTime = sigmoid(gLevel, maxTime, minTime, 200);
    gIQ = Math.round(sigmoid(gLevel, 79, 200, 110));
}
function startRound() {
    adjustLevel();
    gBoard = createBoard();
    gBoard.done.disabled = true;
    gBoard.done.innerText = 'Watch';
    gBoard.done.onclick = showSolution;
    randomizeBoard();
    setTimeout(hideMarks, gViewTime * 1000);
}
window.onload = startRound;