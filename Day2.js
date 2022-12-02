const fs = require('fs');

// Part 1
// A & X = Rock
// B & Y = Paper
// C & Z = Scissors

// Part 2 
// X = loss
// Y = draw
// Z = win

function runStrategy() {
  const fileInput = fs.readFileSync('./Day2Input.txt', {encoding: 'utf8'});
  let fileInputArray = fileInput.split('\n');
  //let testData = ['A Y', 'B X', 'C Z'];
  let totalScore1 = 0
  let totalScore2 = 0

  for (let line of fileInputArray) {
    let result1 = calculateResult(line[0], line[2]);
    let score1 = calculatePoints(result1, line[2]);
    totalScore1 += score1;

    let newHand = getHand(line[0], line[2]);
    let result2 = calculateResult(line[0], newHand);
    let score2 = calculatePoints(result2, newHand);
    totalScore2 += score2;
  }

  console.log('Total Score (strat 1):', totalScore1);
  console.log('Total Score (strat 2):', totalScore2);
}

function getHand(opponentMove, guide) {
  let hand;
  switch (opponentMove) {
    case 'A':
      hand = guide === 'X' ? 'Z' : guide === 'Y' ? 'X' : 'Y';
      break;
    case 'B':
      hand = guide === 'X' ? 'X' : guide === 'Y' ? 'Y' : 'Z';
      break;
    case 'C':
      hand = guide === 'X' ? 'Y' : guide === 'Y' ? 'Z' : 'X';
      break;
  }

  return hand;
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