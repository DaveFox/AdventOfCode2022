const fs = require('fs');

function main() {
  const fileInput = fs.readFileSync('./Day6Input.txt', {encoding: 'utf8'});
  const fileInputString = fileInput.split('\n')[0];
  const testInput1 = ['mjqjpqmgbljsphdztnvjfqwrcgsmlb'][0];
  const testInput2 = ['bvwbjplbgvbhsrlpgdmjqwftvncz'][0];
  const testInput = ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'][0];

  let foundPostion = 0;
  for (let i=3; i<fileInputString.length; i++) {
    let substring = fileInputString.slice(i - 3, i) + fileInputString[i]
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
}

main();