const fs = require('fs');

function main() {
  const fileInput = fs.readFileSync('./Day6Input.txt', {encoding: 'utf8'});
  const fileInputString = fileInput.split('\n')[0];
  const testInput1 = ['mjqjpqmgbljsphdztnvjfqwrcgsmlb'][0];
  const testInput2 = ['bvwbjplbgvbhsrlpgdmjqwftvncz'][0];
  const testInput5 = ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'][0];

  const input = fileInputString;
  
  let foundPostion = 0;
  for (let i=3; i<input.length; i++) {
    let substring = input.slice(i - 3, i) + input[i]
    let comparison = '';
    let duplicate = false;

    for (let j=0; j<substring.length; j++) {
      if(comparison.includes(substring[j])) {
        duplicate = true;
      }
      comparison += substring[j];
    }

    if(!duplicate) {
      foundPostion = i
      break;
    }
  }
  console.log('First marker position:', foundPostion + 1);

  let foundMessagePostion = 0;
  for (let i=13; i<input.length; i++) {
    let substring = input.slice(i - 13, i) + input[i]
    let comparison = '';
    let duplicate = false;

    for (let j=0; j<substring.length; j++) {
      if(comparison.includes(substring[j])) {
        duplicate = true;
      }
      comparison += substring[j];
    }

    if(!duplicate) {
      foundMessagePostion = i
      break;
    }
  }
  console.log('First message position:', foundMessagePostion + 1);
}

main();