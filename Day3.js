const fs = require('fs');
const priorityList = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function main() {
    const fileInput = fs.readFileSync('./Day3Input.txt', {encoding: 'utf8'});
    let fileInputArray = fileInput.split('\n');
    // const testInput = ['vJrwpWtwJgWrhcsFMMfFFhFp', 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'PmmdzqPrVvPwwTWBwg', 'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'ttgJtRGJQctTZtZT', 'CrZsJsPPZsGzwwsLwLmpwMDw'];

    let total = 0;
    for(const rucksack of fileInputArray) {
        const middle = rucksack.length/2;
        const firstHalf = rucksack.substring(0, middle);
        const secondHalf = rucksack.substring(middle);

        let found = '';
        for(const char of firstHalf) {
            if (secondHalf.includes(char)) {
                found = char;
            }
        }
        total += priorityList.indexOf(found)
    }

    const groupedInput = [];
    while(fileInputArray.length) {
        groupedInput.push(fileInputArray.splice(0, 3))
    }

    let groupedTotal = 0;
    for (const group of groupedInput) {
        let found = '';
        for(const char of group[0]) {
            if(group[1].includes(char) && group[2].includes(char)) {
                found = char
            }
        }
        groupedTotal += priorityList.indexOf(found);
    }

    console.log('Total priority:', total);
    console.log('Grouped total priority:', groupedTotal);
}

main();