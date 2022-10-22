//seleciona os botões
const btnRock = document.getElementById('rock')
const btnPaper = document.getElementById('paper')
const btnScissors = document.getElementById('scissors')
const btnStart = document.getElementById('start')
const btnReset = document.getElementById('reset')
const btnAudio = document.getElementById('audio')

//Seleciona áreas da pontuação e da escolha
const  displayPlayerScore = document.querySelector('.player-score span')
const  displayCpuScore = document.querySelector('.cpu-score span')
const  displayPlayerChoice = document.querySelector('.player-choice')
const  displayCpuChoice = document.querySelector('.cpu-choice')
const endMessage = document.querySelector('.end-message')
//seleciona as mensagens de feedback
const userWon = document.querySelector('.user-won')
const cpuWon = document.querySelector('.cpu-won')
const tieGame = document.querySelector('.tie-game')

//seleciona os audios
const bgAudio = document.getElementById('game-bg-audio')
const winAudio = document.getElementById('win-audio')
const loseAudio = document.getElementById('lose-audio')
const tieAudio = document.getElementById('tie-audio')
let audioActive = true
//configura volume do audio
bgAudio.volume = .15
winAudio.volume = .3
loseAudio.volume = .3
tieAudio.volune = .3



btnAudio.onclick = changeAudio

//Habilita os botões de escolha
function startGame () {
    btnRock.removeAttribute('disabled')
    btnPaper.removeAttribute('disabled')
    btnScissors.removeAttribute('disabled')
    if(audioActive){
        bgAudio
    }
    bgAudio.play()
}

//Desabilita os botões de escolha
function disabledButtons () {
    btnRock.setAttribute('disabled', true)
    btnPaper.setAttribute('disabled', true)
    btnScissors.setAttribute('disabled', true)
}

function playGame(event) {
    displayPlayerChoice.classList.remove('animate-blink')
    displayCpuChoice.classList.remove('animate-blink')

    const button = event.currentTarget
    const choice = button.getAttribute('id')
    const round = game.play(choice)

    displayChoiceImage(displayPlayerChoice, choice)
    displayChoiceImage(displayCpuChoice, round.cpuChoice)

    displayPlayerScore.innerHTML = round.playerPoints
    displayCpuScore.innerHTML = round.cpuPoints

    checkWinner()
}

const game = new RockPaperScissors(3)

//1. Ao clicar no botão Start habilita os botões de escolha
btnStart.onclick = startGame
btnReset.onclick = resetGame
//2. Ao clicar em botão de escolha inicia um round

function displayChoiceImage(element, choice) {
    element.innerHTML = ''
    const image = document.createElement('img')
    image.setAttribute('alt', `${choice} icon`)
    image.setAttribute('src', `./assets/img/${choice}.svg`)
    element.appendChild(image)
}

//Função que inicia um round


function checkWinner() {

    if(game.roundWinner === 'player') {
        winAudio.currentTime = 0
        winAudio.play()
        displayPlayerChoice.classList.add('animate-blink')
    } else if ( game.roundWinner === 'cpu') {
        loseAudio.currentTime = 0
        loseAudio.play()
        displayCpuChoice.classList.add('animate-blink')
    } else {
        tieAudio.currentTime = 0
        tieAudio.play()
        displayPlayerChoice.classList.add('animate-blink')
        displayCpuChoice.classList.add('animate-blink')
    }

    if(game.checkGameOver()) {
        disabledButtons()
        endMessage.style.display ='block'
        if(game.gameWinner === 'player') {
            userWon.style.display = 'block'
        } else if (game.gameWinner === 'cpu') {
            cpuWon.style.display = 'block'
        } else {
            tieGame.style.display = 'block'
        }

    }
}

function resetGame() {
    game.reset()
    endMessage.style.display ='none'
    userWon.style.display = 'none'
    cpuWon.style.display = 'none'
    tieGame.style.dysplay = 'none'
    displayPlayerScore.innerHTML = game.playerPoints
    displayCpuScore.innerHTML = game.cpuPoints
    displayPlayerChoice.classList.remove('animate-blink')
    displayCpuChoice.classList.remove('animate-blink')
}

function changeAudio() {
    if(audioActive) {
        bgAudio.pause()
        audioActive = false
        btnAudio.innerHTML = 'Music OFF'
    } else {
        bgAudio.play()
        audioActive = true
        btnAudio.innerHTML = 'Music ON'
    }
}
//Seleciona os botões de escolha
const choiceBtns = document.getElementsByClassName('choice-button')
for(let button of choiceBtns) {
    button.onclick = playGame
}
//3. Ao iniciar um round a escolha do player e escolha da cpu devem ser exibidas
//4. Ao fim do round a pontuação de player e cpu devem ser exibidas
//5. A cada round deve verificar se game over
//6.Deve ser possivel inciar novamente o jogo





