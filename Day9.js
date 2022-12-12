const fs = require('fs');

function main() {
  const fileInput = fs.readFileSync('./Day9Input.txt', {encoding: 'utf8'});
  const fileInputString = fileInput.split('\n');
  const testInput = ['R 4', 'U 4', 'L 3', 'D 1', 'R 4', 'D 1', 'L 5', 'R 2']

  // Grid for dev ref
  // 0,2 1,2 2,2
  // 0,1 1,1 2,1
  // 0,0 1,0 2,0

  const head = {
    start: [0,0],
    position: [0,0],
  };

  const tail = {
    start: [0,0],
    position: [0,0],
    visited: [[0,0]]
  };

  for(const line of fileInputString) {
    const instruction = line.split(' ')[0];
    const distance = Number(line.split(' ')[1]);
    if(instruction === 'U') headMoveUp(distance, head, tail);
    if(instruction === 'D') headMoveDown(distance, head, tail);
    if(instruction === 'R') headMoveRight(distance, head, tail)
    if(instruction === 'L') headMoveLeft(distance, head, tail)
  }

  console.log('Tail visited unique positions:', tail.visited.length);
}

function sameColumn(pos1, pos2) {
  return (pos1[0] === pos2[0]);
}

function sameRow(pos1, pos2) {
  return (pos1[1] === pos2[1]);
}

function tailNotVisited(tail) {
  let hasVisited = true;
  for(const beenTo of tail.visited) {
    if(beenTo[0] === tail.position[0] && beenTo[1] === tail.position[1]) hasVisited = false;
  }
  return hasVisited;
}

function headMoveUp(distance, head, tail) {
  for (let i=0; i < distance; i++) {
    head.position[1]++;
    if (sameColumn(tail.position, head.position) && Math.abs(tail.position[1] - head.position[1]) === 2) {
      tail.position[1]++;
      if(tailNotVisited(tail)) tail.visited.push([tail.position[0], tail.position[1]]);
    }
    if (!sameColumn(tail.position, head.position) && Math.abs(tail.position[1] - head.position[1]) === 2) {
      tail.position = [head.position[0], head.position[1] -1];
      if(tailNotVisited(tail)) tail.visited.push([tail.position[0], tail.position[1]]);
    }
  }
}

function headMoveDown(distance, head, tail) {
  for (let i=0; i < distance; i++) {
    head.position[1]--;
    if(sameColumn(tail.position, head.position) && Math.abs(tail.position[1] - head.position[1]) === 2) {
      tail.position[1]--;
      if(tailNotVisited(tail)) tail.visited.push([tail.position[0], tail.position[1]]);
    }
    if (!sameColumn(tail.position, head.position) && Math.abs(tail.position[1] - head.position[1]) === 2) {
      tail.position = [head.position[0], head.position[1] +1];
      if(tailNotVisited(tail)) tail.visited.push([tail.position[0], tail.position[1]]);
    }
  }
}

function headMoveRight(distance, head, tail) {
  for (let i=0; i < distance; i++) {
    head.position[0]++;
    if (sameRow(tail.position, head.position) && Math.abs(tail.position[0] - head.position[0]) === 2) {
      tail.position[0]++;
      if(tailNotVisited(tail)) tail.visited.push([tail.position[0], tail.position[1]]);
    }
    if (!sameRow(tail.position, head.position) && Math.abs(tail.position[0] - head.position[0]) === 2) {
      tail.position = [head.position[0] -1, head.position[1]];
      if(tailNotVisited(tail)) tail.visited.push([tail.position[0], tail.position[1]]);
    }
  }
}

function headMoveLeft(distance, head, tail) {
  for (let i=0; i < distance; i++) {
    head.position[0]--;
    if (tail.position[1] === head.position[1] && Math.abs(tail.position[0] - head.position[0]) === 2) {
      tail.position[0]--;
      if(tailNotVisited(tail)) tail.visited.push([tail.position[0], tail.position[1]]);
    }
    if (tail.position[1] !== head.position[1] && Math.abs(tail.position[0] - head.position[0]) === 2) {
      tail.position = [head.position[0] +1, head.position[1]];
      if(tailNotVisited(tail)) tail.visited.push([tail.position[0], tail.position[1]]);
    }
  }
}

main();