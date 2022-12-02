const fs = require('fs');

// A & X = Rock
// B & Y = Paper
// C & Z = Scissors

function runStrategy() {
  const fileInput = fs.readFileSync('./Day2Input.txt', {encoding: 'utf8'});
  let fileInputArray = fileInput.split('\n');
  let totalScore = 0

  for (let line of fileInputArray) {
    let result = calculateResult(line[0], line[2]);
    let score = calculatePoints(result, line[2]);
    totalScore += score;
  }

  console.log('Total Score:', totalScore);
}

function calculateResult(opponent, mine) {
  let res;
  switch (opponent) {
    case 'A':
      res = mine === 'X' ? 'd' : mine === 'Y' ? 'w' : 'l';
      break;
    case 'B':
      res = mine === 'X' ? 'l' : mine === 'Y' ? 'd' : 'w';
      break;
    case 'C':
      res = mine === 'X' ? 'w' : mine === 'Y' ? 'l' : 'd';
      break;
  }
  return res;
}

function calculatePoints(result, choice) {
  let points = result === 'w' ? 6 : result === 'd' ? 3 : 0;
  let choiceScore = choice === 'X' ? 1 : choice === 'Y' ? 2 : 3;
  return points + choiceScore;
}

runStrategy();