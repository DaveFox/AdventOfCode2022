const fs = require('fs');

function main() {
  const fileInput = fs.readFileSync('./Day1Input.txt', {encoding: 'utf8'});
  let fileInputArray = fileInput.split('\n');
  // console.log(fileInputArray);
  let currTotal = 0;
  let highest = 0;
  let elfNum = 0;
  let highestElf = 0;
  const allCalories = [];

  for(let cal of fileInputArray) {
    if(cal.length === 1) {
      elfNum++;
      allCalories.push(currTotal);
      if(currTotal > highest) {
        highest = currTotal;
        highestElf = elfNum;
      }

      currTotal = 0;
    } else {
      currTotal += Number(cal);
    }
  }

  const sorted = allCalories.map((str) => Number(str)).sort((a, b) => a - b).reverse();

  console.log('Top Calorie:', highest, 'Top Elf:', highestElf);
  console.log('Top three total:', `${sorted[0]+sorted[1]+sorted[2]}`);
}

main();
