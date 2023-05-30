'use strict'
var gSize = 4
var gNumbers = []
var gProgress = 0
var gCurrentTime
var gStopwatchInterval
function init() {
    renderGrid()
    getDifficulty()
}
function newGame() {
    gProgress = 0
    console.log(gProgress)
    renderGrid()
    saveSelection()
    gCurrentTime = 0
    console.log(gCurrentTime)
}
function renderGrid() {
    sortNumbers()
    var div = document.querySelector('.gameContainer')
    var strHtml = `<table class="gameTable">
    <tr><td colspan="${gSize}"><button onclick="newGame()" class="inputs">New Game</button></td></tr>
    <tr><td colspan="${gSize}" class="difficulty">Choose difficulty level:
    <select class="inputs" name="difficulty" id="difficulty" onchange="getDifficulty()">
            <option value=4>Easy</option>
            <option value=5>Medium</option>
            <option value=6>Hard</option>
        </select>
    </tr></td>
    <tr><td colspan="${gSize}" class="timer">0
    </td></tr>
    `
    for (var i = 0; i < gSize; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < gSize; j++) {
            var num = gNumbers.splice(0, 1)
            strHtml += `<td class="gridCell" onclick="onCellClick(this)"><span>${num}</span></td>`
        }
        strHtml += '</tr>'
    }
    strHtml += `
    <tr><td class="nextNum" colspan="${gSize}">1</td></tr>
    </table>`
    div.innerHTML = strHtml
    document.querySelector('.timer').innerText = 0
}
function onCellClick(cell) {
    if (+cell.innerText === gProgress + 1) {
        if (gProgress === 0) {
            startStopwatch()
        }
        cell.classList.toggle('clicked')
        gProgress++
        document.querySelector('.nextNum').innerText = gProgress
        
    }
    else {
        setTimeout(function () { cell.classList.toggle('error') }, 200)
        cell.classList.toggle('error')
    }
    checkWin()
}
//utils
function updateStopwatch() {
    var ms = Date.now() - gCurrentTime
    var difference = msToTime(ms)
    var timerCell = document.querySelector('.timer')
    timerCell.innerText = difference
}
function startStopwatch() {
    gCurrentTime = Date.now()
    gStopwatchInterval = setInterval(updateStopwatch, 10)
    
}
function stopStopwatch() {
    clearInterval(gStopwatchInterval)
}
function checkWin() {
    var progressTd = document.querySelector(".nextNum")
    if (gProgress === (gSize * gSize)) {
        progressTd.innerText = 'Glorious victory!'
        stopStopwatch()
        return true
    }
    return false
}
function getDifficulty() {
    var selectElement = document.getElementById('difficulty')
    gSize = selectElement.value
}
function saveSelection() {
    var selectElement = document.getElementById('difficulty')
    selectElement.options.selectedIndex = gSize - 4
}
function sortNumbers() {//fills gNumbers array and shuffles it
    for (var i = 0; i < (gSize * gSize); i++) {
        gNumbers[i] = i + 1
    }
    shuffleArray(gNumbers)
    console.log('gNumbers :', gNumbers)
}
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(3);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    // else return days + " Days"
    else return 0
}
