const variants = {1: 'rock',
                  2: 'paper',
                  3: 'scissors'};

const scores = JSON.parse(localStorage.getItem('scores')) || {
  wins: 0,
  losses: 0,
  draws: 0
};



document.querySelector('.js-rock-button').addEventListener('click', () => makeRPSMove(1));

document.querySelector('.js-paper-button').addEventListener('click', () => makeRPSMove(2));

document.querySelector('.js-scissors-button').addEventListener('click', () => makeRPSMove(3));

document.body.addEventListener('keydown', (event) => {
  switch(event.key){
    case 'r':
    case 'R':
      makeRPSMove(1)
      break;
    case 'p':
    case 'P':
      makeRPSMove(2)
      break;
    case 's':
    case 'S':
      makeRPSMove(3)
      break;
  }
});

function makeRPSMove(yourMove){
  console.log('Game start.');

  const computerMove = getRandomIntInclusive(1, 3);
  console.log('Your move: ' + variants[yourMove]);
  console.log('Computer move: ' + variants[computerMove]);

  let result;
  if(yourMove === computerMove){
    scores.draws++;
    result = 'Draw';
  }
  else if(yourMove === (computerMove - 1) % 3){
    scores.losses++;
    result = 'You\'ve lost';
  }
  else{
    scores.wins++;
    result = 'You won';
  }

  localStorage.setItem('scores', JSON.stringify(scores));

  const lastGameScoreElem = document.querySelector('.js-last-game');
  lastGameScoreElem.innerHTML = `${result}! (You) <img src="Resourses/${variants[yourMove]}-emoji.png" class="move-icon"> VS. <img src="Resourses/${variants[computerMove]}-emoji.png" class="move-icon"> (Computer).`

  const scoresTextElem = document.querySelector('.js-scores');
  updateScoreElement();

  console.log(result);
  console.log(scores);
}


document.querySelector('.js-autoplay-button').addEventListener('click', () => autoPlay());

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  const autoplayButtonElement = document.querySelector('.js-autoplay-button');


  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerAutoMove = getRandomIntInclusive(1, 3);
      makeRPSMove(playerAutoMove);
    }, 2000);

    isAutoPlaying = true;
    autoplayButtonElement.textContent = 'Stop Autoplaying';
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoplayButtonElement.textContent = 'Start Autoplaying';
  }
  
}


document.querySelector('.js-reset-button').addEventListener('click', () => resetScores());

function resetScores(){
  scores.wins = 0;
  scores.losses = 0;
  scores.draws = 0;
  localStorage.removeItem('scores');

  document.querySelector('.js-last-game').textContent = 'Scores were reset.';
  updateScoreElement();
}



function updateScoreElement(){
  document.querySelector('.js-scores').textContent = `Wins: ${scores.wins}, Losses: ${scores.losses}, Draws: ${scores.draws}`;
}



function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}