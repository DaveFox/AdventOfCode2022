const fs = require('fs');

function main() {
  const fileInput = fs.readFileSync('./Day8Input.txt', {encoding: 'utf8'});
  const fileInputString = fileInput.split('\n');
  const testInput = ['30373', '25512', '65332', '33549', '35390'];

  const heightmap = [];

  for(const row of fileInputString) {
    heightmap.push(Array.from(row.trim()));
  }

  const edgeNumber = (heightmap.length * 4) - 4;
  let numberTreesVisible = edgeNumber;

  for (let i=1; i < heightmap.length-1; i++) {
    for (let j=1; j < heightmap[i].length-1; j++) {
      const tree = heightmap[i][j];
      const visibleTop = checkTop(tree, i, j, heightmap);
      const visibleRight = checkRight(tree, j,  heightmap[i]);
      const visibleBottom = checkBottom(tree, i, j, heightmap);
      const visibleLeft = checkLeft(tree, j,  heightmap[i]);
      
      //console.log(tree, visibleTop, visibleRight, visibleBottom, visibleLeft, [i,j]);

      if(visibleTop || visibleRight || visibleBottom || visibleLeft) numberTreesVisible++;
    }
  }

  console.log('Number of trees visible:', numberTreesVisible);
}

function checkTop(tree, row, col, heightMap) {
  let visible = true;
  for (i=0; i < row; i++) {
    if (heightMap[i][col] >= tree) visible = false;
  }
  return visible;
}

function checkBottom(tree, row, col, heightMap) {
  let visible = true;
  for (i=row+1; i < heightMap.length; i++) {
    if (heightMap[i][col] >= tree) visible = false;
  }
  return visible;
}

function checkRight(tree, col, row) {
  let visible = true;
  for (i=col+1; i < row.length; i++) {
    if (row[i] >= tree) visible = false;
  }
  return visible;
}

function checkLeft(tree, col, row) {
  let visible = true;
  for (i=0; i<col; i++) {
    if (row[i] >= tree) visible = false;
  }
  return visible;
}

main();