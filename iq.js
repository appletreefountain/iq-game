"use strict";
var gMinTime = 1.0;
var gMaxTime = 5.0;
var gMemorizationTime = gMaxTime;
var gMinRate = 0.15;
var gMaxRate = 0.9;
var gMarkRate = gMinRate;
var gLevel = 1;
var gSizeX = 4;
var gSizeY = 4;
var gBoard = {};

function createBoard() {
    var e = document.getElementById('container');
    if (e) {
        document.body.removeChild(e);
    }

    var container = document.createElement('div');
    container.className = 'container';
    container.id = 'container';
    document.body.appendChild(container);

    var title = document.createElement('div');
    title.innerHTML = `<h2>Level ${gLevel}</h2>`;
    title.style.color = 'white';
    container.appendChild(title);
    
    gBoard = {};
    for (var i = 0; i < gSizeY * gSizeX; ++i) {
        if (i % gSizeX == 0) {
            var newline = document.createElement('div');
            newline.className = 'break';
            container.appendChild(newline);
        }

        var square = document.createElement('div');
        square.className = 'square';
        container.appendChild(square);
        
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.style.display = 'none';
        square.appendChild(checkbox);

        gBoard[i] = {
            square: square,
            checkbox: checkbox,
        }
    }
    var newline = document.createElement('div');
    newline.className = 'break';
    container.appendChild(newline);

    var done = document.createElement('button');
    done.id = 'done';
    done.innerText = 'Done';
    done.disabled = true;
    done.onclick = showSolution;
    container.appendChild(done);
    gBoard.done = done;

    return gBoard;
}
function randomizeBoard() {
    for (var i = 0; i < gSizeY * gSizeX; ++i) {
        gBoard[i].checkbox.checked = false;
        gBoard[i].checkbox.style.display = 'none';
        gBoard[i].square.style.background = '';
        gBoard[i].marked = Math.random() < gMarkRate;
        if (gBoard[i].marked) {
            gBoard[i].square.className = 'square selected';
        } else {
            gBoard[i].square.className = 'square';
        }
    }
}
function hideMarks() {
    for (var i = 0; i < gSizeY * gSizeX; ++i) {
        gBoard[i].checkbox.style.display = 'block';
        gBoard[i].checkbox.disabled = false;
        gBoard[i].square.className = 'square';
    }
    gBoard.done.disabled = false;
}
function showSolution() {
    gBoard.done.innerText = 'Next';
    gBoard.done.onclick = startRound;

    var levelCompleted = true;
    for (var i = 0; i < gSizeY * gSizeX; ++i) {
        gBoard[i].checkbox.disabled = true;
        if (gBoard[i].marked !== gBoard[i].checkbox.checked) {
            levelCompleted = false;
            gBoard[i].square.style.background = 'red';
        } else {
            gBoard[i].square.style.background = 'green';
        }
    }
    adjustLevel(levelCompleted);
}
function adjustLevel(levelCompleted) {
    var deltaTime = 0.2;
    var deltaRate = 0.015;
    var levelIntervalTime = 3;
    var levelIntervalSize = 5;
    if (levelCompleted) {
        gLevel++;
        if (gLevel % levelIntervalSize === 0) {
            if (gLevel % (levelIntervalSize * 2) === 0) {
                gSizeY++;
            } else {
                gSizeX++;
            }
        } else {
            gMarkRate = Math.min(gMarkRate + deltaRate, gMaxRate);
        }
        if (gLevel % levelIntervalTime === 0) {
            gMemorizationTime = Math.max(gMemorizationTime - deltaTime, gMinTime);
        }
        return;
    }    
    if (gLevel === 1) {
        return;
    }
    if (gLevel % levelIntervalSize === 0) {
        if (gLevel % (levelIntervalSize * 2) === 0) {
            gSizeY--;
        } else {
            gSizeX--;
        }
    } else {
        gMarkRate = Math.max(gMarkRate - deltaRate, gMinRate);
    }
    if (gLevel % levelIntervalTime === 0) {
        gMemorizationTime = Math.min(gMemorizationTime + deltaTime, gMaxTime);
    }
    gLevel--;
}
function startRound() {
    gBoard = createBoard();
    gBoard.done.disabled = true;
    gBoard.done.innerText = 'Done';
    gBoard.done.onclick = showSolution;
    randomizeBoard();
    setTimeout(hideMarks, gMemorizationTime * 1000);
}
window.onload = startRound;