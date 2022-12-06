const fs = require('fs');

function main() {
  const fileInput = fs.readFileSync('./Day5Input.txt', {encoding: 'utf8'});
  const fileInputArray = fileInput.split('\n');
  const testInput = ['    [D]    ', '[N] [C]    ', '[Z] [M] [P]', ' 1   2   3 ', '', 'move 1 from 2 to 1', 'move 3 from 1 to 3', 'move 2 from 2 to 1', 'move 1 from 1 to 2'];

  const startScenario = separateInput(fileInputArray);
  const stacks = buildStacks(startScenario.setOfStacks, startScenario.stacks);
  const stacksCopy = JSON.parse(JSON.stringify(stacks));

  for (const command of startScenario.commands) {
    let numMove = Number(command.split('move ')[1].split(' ')[0]);
    const moveFrom = Number(command.split('from ')[1].split(' ')[0]);
    const moveTo = Number(command.split('to ')[1]);

    const multiCrate = stacksCopy[moveFrom-1].splice(0, numMove);
    stacksCopy[moveTo-1].unshift(...multiCrate);

    while(numMove > 0) {
      let temp = stacks[moveFrom-1].shift();
      stacks[moveTo-1].unshift(temp);
      numMove--;
    }
  }

  let stackString = '';
  for(let z=0; z<stacks.length; z++){
    stackString += stacks[z][0];
  }
  let stackString2 = '';
  for(let z=0; z<stacksCopy.length; z++){
    stackString2 += stacksCopy[z][0];
  }

  console.log('Top of stacks (one at a time):', stackString);
  console.log('Top of stacks (multi):', stackString2);
}

function separateInput(input) {
  let stacks = []
  let stackIndex = 0;
  let commands = [];

  for (let [index,line] of input.entries()) {
    if (line.includes('[')) {
      stacks.push(line);
    } else if (line.startsWith(' 1')) {
      stackIndex = index;
    } else if (line.length){
      commands.push(line)
    }
  }

  const numberOfStacks = Number(input[stackIndex].split(' ').filter((item) => item !== '').splice(-1, 1)[0]);
  const setOfStacks = Array.from(Array(numberOfStacks), () => []);

  return {setOfStacks, stacks, commands};
}

function buildStacks(setOfStacks, stackLines) {
  for (let line of stackLines) {
    const positions = []
    for(let i=0; i<line.length; i+=4) {
      positions.push(line.substring(i,i+4))
    }
    for (const [index, value] of positions.entries()) {
      if(value.includes('[')) {
        setOfStacks[index].push(value.trim());
      }
    }
  }
  return setOfStacks;
}

main()