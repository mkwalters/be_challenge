/* 
 * This program should find all words from a dictionary in a grid of letters. Words
 * can be matched in any direction (horizontally, vertically, and diagonally).
 * For example, if passed the dictionary {"cat", "dog", "bird", "plane"}, the program
 * should return the set {"cat", "dog"}. 
 * 
 * 	    |  C  |  C  |  C  |
 *      |  C  |  A  |  C  |
 *      |  C  |  C  |  T  |
 * 		|  D  |  O  |  G  |
 * 
 * Your task is to implement the main function and any other functions you may need to
 * complete the task. In addition to functionality, you'll be assessed on code efficiency,
 * overall structure/code decomposition, and error handling.
 */

/**
 * Finds all words from the dictionary that are present in the grid of letters
 * @param {Array} wordGrid Letter grid represented as an array of char arrays. 
 * The first array from the above example would be passed in
 * as ["C", "C", "C"] and the second would be ["C", "A", "C"], etc...)
 * @param {Set} dictionary Contains all words to look for in the letter grid
 * @returns {Set} All words from the dictionary that were found
 */

let myGrid = [ ["P", "R", "S"], ["C", "A", "T"], ["D", "N", "T"], ["O", "D", "G"], ["G", "A", "B"] ];
let dictionary = new Set();

dictionary.add("CAT");
dictionary.add("DOG");

async function findWords(wordGrid, dictionary) {

	let foundWords = new Set();

	for (let row = 0; row < wordGrid.length; row++) {
		for (let column = 0; column < wordGrid[row].length; column++) {

			let currentLetter = wordGrid[row][column];
			let currentMatches = [];

			dictionary.forEach( word => {
				if (word[0] == currentLetter) {
					 currentMatches.push(word);
				}
			})
			while (currentMatches.length > 0) {

				let currentMatch = currentMatches.pop();
				let directions = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];

				for (let i = 0; i < directions.length; i++) {
					if (peek(directions[i], wordGrid, currentMatch, row, column)) {
						 foundWords.add(currentMatch);
						 break;
					}
				}
			}
		}
	}
	return foundWords;

}

function peek(direction, wordGrid, currentMatch, row, column) {

	let directionVector = mapDirectionToVector(direction);

	for (let i = 0; i < currentMatch.length; i++) {
		if (currentMatch[i] != wordGrid[row + (i * directionVector.rowChange )][column + (i * directionVector.columnChange)]) break;
		if (i == currentMatch.length - 1) {
			return currentMatch;
		}
	}
}

function mapDirectionToVector(direction) {
	let map = {
		"north" : { "rowChange": 1, "columnChange": 0 },
		"northeast" : { "rowChange": 1, "columnChange": 1 },
		"east" : { "rowChange": 0, "columnChange": 1 },
		"southeast" : { "rowChange": -1, "columnChange": 1 },
		"south" : { "rowChange": 1, "columnChange": 0 },
		"southwest" : { "rowChange": -1, "columnChange": -1 },
		"west" : { "rowChange": 0, "columnChange": -1 },
		"northwest" : { "rowChange": 1, "columnChange": -1 },
	};
	return map[direction]
}

// console.log( mapDirectionToVector("east") );
// findWords(myGrid, dictionary);
module.exports.findWords = findWords;