var chai = require('chai');

const findWords = require("./find_words").findWords;

let myGrid = [ ["P", "R", "S"], ["C", "A", "T"], ["D", "N", "T"], ["O", "D", "G"], ["G", "A", "B"] ];
let dictionary = new Set();

dictionary.add("CAT");
dictionary.add("DOG");

console.log(findWords(myGrid, dictionary))

// describe("Correct.js functions", function() {
//   let myGrid = [ ["P", "R", "S"], ["C", "A", "T"], ["D", "N", "T"], ["O", "D", "G"], ["G", "A", "B"] ];
//   let dictionary = new Set();

//   dictionary.add("CAT");
//   dictionary.add("DOG");

//   it('should find horizontal solutions', function(done) {

//     chai.expect("Hello World").to.equal('Hello World');
//     done()
//   });



// })

// describe("find_words", function() {

//   it('Main page content', function(done) {
//     chai.expect("Hello World").to.equal('Hello World');
//     done()
//   });

// })



// it('Main page content', function(done) {

//   expect("Hello World").to.equal('Hello World');
//   done()
// });