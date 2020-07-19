var chai = require('chai');

const findWords = require("./find_words").findWords;


// let myGrid = [ ["P", "R", "S"], ["C", "A", "T"], ["D", "N", "T"], ["O", "D", "G"], ["G", "A", "B"] ];
// let dictionary = new Set();

// dictionary.add("CAT");
// dictionary.add("DOG");



// describe("Correct.js functions", function() {

//   it('', function(done) {

//     chai.expect("Hello World").to.equal('Hello World');
//     done()
//   });



// })

describe("find_words", function() {


  it('should find horizontal solutions', async () => {
    let myGrid = [ ["P", "R", "S"], ["C", "A", "T"], ["D", "N", "T"], ["A", "D", "G"], ["G", "A", "B"] ];
    let dictionary = new Set();

    dictionary.add("CAT");
    dictionary.add("DOG");
    let expected = new Set()
    expected.add("CAT");
    let foundWords = await findWords(myGrid, dictionary);

    chai.expect(foundWords).to.eql(expected);
  });

  it('should find diagnol solutions', async () => {
    let myGrid = [ ["P", "R", "S"], ["C", "O", "T"], ["D", "A", "T"], ["A", "D", "T"], ["G", "A", "B"] ];
    let dictionary = new Set();

    dictionary.add("CAT");
    dictionary.add("DOG");
    let expected = new Set()
    expected.add("CAT");
    let foundWords = await findWords(myGrid, dictionary);

    chai.expect(foundWords).to.eql(expected);
  });

  it('should find vertical solutions', async () => {
    let myGrid = [ ["P", "R", "S"], ["C", "O", "T"], ["A", "Q", "T"], ["T", "D", "T"], ["G", "A", "B"] ];
    let dictionary = new Set();

    dictionary.add("CAT");
    dictionary.add("DOG");
    let expected = new Set()
    expected.add("CAT");

    let foundWords = await findWords(myGrid, dictionary);


    chai.expect(foundWords).to.eql(expected);
  });

  it('should return nothing in an empty word grid', async () => {
    let myGrid = [ [], [], [], [], [] ];
    let dictionary = new Set();

    let expected = new Set()
    let foundWords = await findWords(myGrid, dictionary);


    chai.expect(foundWords).to.eql(expected);
  });

})



// it('Main page content', function(done) {

//   expect("Hello World").to.equal('Hello World');
//   done()
// });