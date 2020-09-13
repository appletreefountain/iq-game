"use strict";
var gMemorizationTime = 5.0;
var gSizeX = 4;
var gSizeY = 4;
var gMarkRate = 0.15;
var gLevel = 1;
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

    var newline = document.createElement('div');
    newline.className = 'break';
    container.appendChild(newline);
    
    gBoard = {};
    for (var y = 0; y < gSizeY; ++y) {
        for (var x = 0; x < gSizeX; ++x) {
            var ns = y * gSizeX + x;

            var square = document.createElement('div');
            square.className = 'square';
            container.appendChild(square);
         
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';
            checkbox.style.display = 'none';
            square.appendChild(checkbox);

            gBoard[ns] = {
                square: square,
                checkbox: checkbox,
            }
        }
        var newline = document.createElement('div');
        newline.className = 'break';
        container.appendChild(newline);
    }
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
    for (var y = 0; y < gSizeY; ++y) {
        for (var x = 0; x < gSizeX; ++x) {
            var ns = y * gSizeX + x;
            gBoard[ns].checkbox.checked = false;
            gBoard[ns].checkbox.style.display = 'none';
            gBoard[ns].square.style.background = '';
            gBoard[ns].marked = Math.random() < gMarkRate;
            if (gBoard[ns].marked) {
                gBoard[ns].square.className = 'square selected';
            } else {
                gBoard[ns].square.className = 'square';
            }
        }
    }
}
function hideMarks() {
    for (var y = 0; y < gSizeY; ++y) {
        for (var x = 0; x < gSizeX; ++x) {
            var ns = y * gSizeX + x;
            gBoard[ns].checkbox.style.display = 'block';
            gBoard[ns].checkbox.disabled = false;
            gBoard[ns].square.className = 'square';
        }
    }
    gBoard.done.disabled = false;
}
function showSolution() {
    gBoard.done.innerText = 'Next';
    gBoard.done.onclick = startRound;

    var levelCompleted = true;
    for (var y = 0; y < gSizeY; ++y) {
        for (var x = 0; x < gSizeX; ++x) {
            var ns = y * gSizeX + x;
            gBoard[ns].checkbox.disabled = true;
            if (gBoard[ns].marked) {
                gBoard[ns].square.style.background = 'blue';
                if (!gBoard[ns].checkbox.checked) {
                    levelCompleted = false;
                }
            } else {
                if (gBoard[ns].checkbox.checked) {
                    gBoard[ns].square.style.background = 'red';
                    levelCompleted = false;
                } else {
                    gBoard[ns].square.style.background = 'green';
                }
            }
        }
    }
    adjustLevel(levelCompleted);
}
function adjustLevel(levelCompleted) {
    if (levelCompleted) {
        gLevel++;
        if (gLevel % 5 == 0) {
            if (gLevel % 10 == 0) {
                gSizeY += 1;
            } 
            else {
                gSizeX += 1;
            }
        }
        else {
            gMarkRate = Math.min(gMarkRate + 0.015, 0.9);
        }
        if (gLevel % 3 == 0) {
            gMemorizationTime -= 0.2;
        }
    }
    else {
        if (gLevel == 1) {
            return;
        }
        if (gLevel % 5 == 0) {
            if (gLevel % 10 == 0) {
                gSizeY -= 1;
            } 
            else {
                gSizeX -= 1;
            }
        } 
        else {
            gMarkRate = Math.max(gMarkRate - 0.015, 0.15);
        }
        if (gLevel % 3 == 0) {
            gMemorizationTime += 0.2;
        }
        gLevel--;
    }
}
function startRound() {
    gBoard = createBoard();
    gBoard.done.disabled = true;
    gBoard.done.innerText = 'Done';
    gBoard.done.onclick = showSolution;
    randomizeBoard();
    setTimeout(hideMarks, gMemorizationTime * 1000);
}
window.onload = function() {
    startRound();
}