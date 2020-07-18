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

let myGrid = [ ["P", "R", "S"], ["C", "A", "T"], ["E", "N", "T"], ["D", "O", "G"] ]
let dictionary = new Set()

dictionary.add("CAT")
dictionary.add("DOG")

async function findWords(wordGrid, dictionary) {
	// TODO: Implement me

	let foundWords = new Set();

	for (let row = 0; row < wordGrid.length; row++) {
		for (let column = 0; column < wordGrid[row].length; column++) {

			let currentLetter = wordGrid[row][column];
			let currentMatches = [];

			dictionary.forEach( word => {
				if (word[0] == currentLetter) {
					 currentMatches.push(word)
				}
			})
			while (currentMatches.length > 0) {

				currentMatch = currentMatches.pop()

				//PEEK EAST
				for (let i = 0; i < currentMatch.length; i++) {
					// need to check indices
					console.log(currentMatch[i] + " and " + wordGrid[row][column + i]);
					if (currentMatch[i] != wordGrid[row][column + i]) break;
					if (i == currentMatch.length - 1) {
						foundWords.add(currentMatch)
					}
				}

			}
		}
	}
	console.log(foundWords);

}

findWords(myGrid, dictionary);
module.exports.findWords = findWords;