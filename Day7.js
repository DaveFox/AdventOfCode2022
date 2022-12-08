const fs = require('fs');

function main() {
  const fileInput = fs.readFileSync('./Day7Input.txt', {encoding: 'utf8'});
  const fileInputString = fileInput.split('\n');
  const testInput = ['$ cd /', '$ ls', 'dir a', '14848514 b.txt', '8504156 c.dat', 'dir d', '$ cd a', '$ ls', 'dir e', '29116 f', '2557 g', '62596 h.lst',
   '$ cd e', '$ ls', '584 i', '$ cd ..', '$ cd ..', '$ cd d', '$ ls', '4060174 j', '8033020 d.log', '5626152 d.ext', '7214296 k'];

   const dirMap = new Map();
   let currentLevel = [];

  for (const cmdLine of fileInputString) {

    if(cmdLine.split(' ')[0] === '$') {
      // command
      if (cmdLine.split(' ')[1] === 'cd') {
        if (cmdLine.split(' ')[2].trim() === '..') {
          // go up a level
          currentLevel.pop();
        } else {
          // go to new dir
          currentLevel.push(cmdLine.split(' ')[2])
        }
      }
    } else if (cmdLine.split(' ')[0] === 'dir') {
      // sub dir
    } else {
      const size = Number(cmdLine.split(' ')[0]);
      const key = currentLevel.join('.');

      dirMap.set(key, (dirMap.get(key) || 0) + size);

      if (currentLevel.length > 1) {
        for(let i = currentLevel.length -1; i > 0; i--) {
          const upperDirKey = currentLevel.slice(0, i).join('.');
          dirMap.set(upperDirKey, (dirMap.get(upperDirKey) || 0) + size)
        }
      }
    }
  }

  console.log(dirMap);

  let totalSize = 0;
  for(const size of dirMap.values()) {
    if (size <= 100000) {
      totalSize += size;
    }
  }
  console.log('Total size under 100000:', totalSize);
}

function dirSize() { };

main();