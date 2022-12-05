const fs = require('fs');

function main() {
  const fileInput = fs.readFileSync('./Day4Input.txt', {encoding: 'utf8'});
  let fileInputArray = fileInput.split('\n');
  //const testData = ['2-4,6-8','2-3,4-5','5-7,7-9','2-8,3-7','6-6,4-6','2-6,4-8'];

  let numPairsContained = 0;
  let numPairsOverlap = 0;
  for (let elfPair of fileInputArray) {
    const range1 = elfPair.split(',')[0];
    const range2 = elfPair.split(',')[1];
    const set1 = [];
    const set2 = [];
    for (let i = Number(range1.split('-')[0]); i <= Number(range1.split('-')[1]); i++) {
      set1.push(i);
    }
    for (let i = Number(range2.split('-')[0]); i <= Number(range2.split('-')[1]); i++) {
      set2.push(i);
    }

    const OneContainsTwo = set1[0] <= set2[0] && set1[set1.length-1] >= set2[set2.length-1];
    const TwoContainsOne = set2[0] <= set1[0] && set2[set2.length-1] >= set1[set1.length-1];
    if (OneContainsTwo || TwoContainsOne) numPairsContained++;

    const OneOverlapTwo = (set1[0] <= set2[set2.length-1] && set1[set1.length-1] >= set2[0]) || (set1[set1.length-1] <= set2[0] && set1[0] >= set2[set2.length-1]);
    if (OneOverlapTwo) numPairsOverlap++;
  }
  console.log('Pairs contained in other pair:',numPairsContained);
  console.log('Pairs overlapping other pair:',numPairsOverlap);
}

main();