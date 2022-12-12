const fs = require('fs');

function main() {
  const fileInput = fs.readFileSync('./Day9Input.txt', {encoding: 'utf8'});
  const fileInputString = fileInput.split('\n');
  const testInput = ['R 4', 'U 4', 'L 3', 'D 1', 'R 4', 'D 1', 'L 5', 'R 2'];
  const testInputLong = ['R 5', 'U 8', 'L 8', 'D 3', 'R 17', 'D 10', 'L 25', 'U 20'];

  // Grid for dev ref
  // 0,2 1,2 2,2
  // 0,1 1,1 2,1
  // 0,0 1,0 2,0

  const head = {
    position: [0,0],
  };

  const tail = {
    position: [0,0],
    visited: [[0,0]]
  };

  const knots = []
  const ropeLength = 9;
  for (let i=0; i < ropeLength; i++) {
    knots.push({
      position: [0,0],
      visited: [[0,0]]
    })
  }

  for(const line of fileInputString) {
    const instruction = line.split(' ')[0];
    const distance = Number(line.split(' ')[1]);
    if(instruction === 'U') headMoveUp(distance, head, tail, knots);
    if(instruction === 'D') headMoveDown(distance, head, tail, knots);
    if(instruction === 'R') headMoveRight(distance, head, tail, knots);
    if(instruction === 'L') headMoveLeft(distance, head, tail, knots);
  }

  console.log('Tail visited unique positions:', tail.visited.length);
  console.log('Knot tail visited unique positions:', knots[8].visited.length);
  // drawGrid(head, knots);
}

function tailNotVisited(tail) {
  let hasVisited = true;
  for(const beenTo of tail.visited) {
    if(beenTo[0] === tail.position[0] && beenTo[1] === tail.position[1]) hasVisited = false;
  }
  return hasVisited;
}

function drawGrid(head, knots) {
  console.log('');
  for(let i=15; i>=-10; i--) {
    let rowStr = '';
    for(let j=-15; j<20; j++) {
      let add = '.'
      if(head.position[0] === j && head.position[1] === i) {
        add = 'H';
      }
      for(const [index, knot] of knots.entries()) {
        if(knot.position[0] === j && knot.position[1] === i) {
          if(add !== 'H') add = `${index + 1}`
        }
      }
      if (i === 0 && j === 0) {
        add = 'S';
      }
      rowStr += add;
    }
    console.log(rowStr);
  }
}

function moveThingUpDown(leadingThing, thing, plusMinus) {
  if (Math.abs(thing.position[1] - leadingThing.position[1]) >= 2) {
    if (leadingThing.position[0] > thing.position[0]) thing.position[0]++;
    if (leadingThing.position[0] < thing.position[0]) thing.position[0]--;
    if (leadingThing.position[1] > thing.position[1]) thing.position[1]++;
    if (leadingThing.position[1] < thing.position[1]) thing.position[1]--;

    if(tailNotVisited(thing)) thing.visited.push([thing.position[0], thing.position[1]]);
    return;
  }

  if (Math.abs(thing.position[0] - leadingThing.position[0]) >= 2) {
    if (leadingThing.position[0] > thing.position[0]) thing.position[0]++;
    if (leadingThing.position[0] < thing.position[0]) thing.position[0]--;
    if (leadingThing.position[1] > thing.position[1]) thing.position[1]++;
    if (leadingThing.position[1] < thing.position[1]) thing.position[1]--;

    if(tailNotVisited(thing)) thing.visited.push([thing.position[0], thing.position[1]]);
    return;
  }
}

function moveThingRightLeft(leadingThing, thing, plusMinus) {
  if (Math.abs(thing.position[0] - leadingThing.position[0]) >= 2) {
    if (leadingThing.position[0] > thing.position[0]) thing.position[0]++;
    if (leadingThing.position[0] < thing.position[0]) thing.position[0]--;
    if (leadingThing.position[1] > thing.position[1]) thing.position[1]++;
    if (leadingThing.position[1] < thing.position[1]) thing.position[1]--;

    if(tailNotVisited(thing)) thing.visited.push([thing.position[0], thing.position[1]]);
    return;
  }

  if (Math.abs(thing.position[1] - leadingThing.position[1]) >= 2) {
    if (leadingThing.position[0] > thing.position[0]) thing.position[0]++;
    if (leadingThing.position[0] < thing.position[0]) thing.position[0]--;
    if (leadingThing.position[1] > thing.position[1]) thing.position[1]++;
    if (leadingThing.position[1] < thing.position[1]) thing.position[1]--;

    if(tailNotVisited(thing)) thing.visited.push([thing.position[0], thing.position[1]]);
    return;
  }
}

function headMoveUp(distance, head, tail, knots) {
  for (let i=0; i < distance; i++) {
    head.position[1]++;
    moveThingUpDown(head, tail, 1);

    for (const [index, knot] of knots.entries()) {
      if (index === 0 ) {
        moveThingUpDown(head, knot, 1);
      } else {
        moveThingUpDown(knots[index - 1], knot, 1)
      }
    }
  }
}

function headMoveDown(distance, head, tail, knots) {
  for (let i=0; i < distance; i++) {
    head.position[1]--;
    moveThingUpDown(head, tail, -1);

    for (const [index, knot] of knots.entries()) {
      if (index === 0 ) {
        moveThingUpDown(head, knot, -1);
      } else {
        moveThingUpDown(knots[index - 1], knot, -1)
      }
    }
  }
}

function headMoveRight(distance, head, tail, knots) {
  for (let i=0; i < distance; i++) {
    head.position[0]++;
    moveThingRightLeft(head, tail, 1)

    for (const [index, knot] of knots.entries()) {
      if (index === 0 ) {
        moveThingRightLeft(head, knot, 1);
      } else {
        moveThingRightLeft(knots[index - 1], knot, 1)
      }
    }
  }
}

function headMoveLeft(distance, head, tail, knots) {
  for (let i=0; i < distance; i++) {
    head.position[0]--;
    moveThingRightLeft(head, tail, -1)

    for (const [index, knot] of knots.entries()) {
      if (index === 0 ) {
        moveThingRightLeft(head, knot, -1);
      } else {
        moveThingRightLeft(knots[index - 1], knot, -1)
      }
    }
  }
}

main();