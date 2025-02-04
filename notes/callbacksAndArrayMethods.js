// ! Callback functions and finding stuff in arrays and arrays of objects

const movies = [
  { name: "The Matrix", category: "Action", },
  { name: "Interstellar", category: "Sci-Fi", },
  { name: "28 Days Later", category: "Horror" },
  { name: "John Wick", category: "Action" },
  { name: "Arrival", category: "Sci-Fi" },
  { name: "Get Out", category: "horror" },
];

console.log(movies); // displays the array of objects

// function to be used as callback, defined separately
function checkMovieCategory(movie) {
  if (movie.category === "Action") {
    console.log(movie.name); // displays each movie object as it loops through
    return movie.name;
  }
}

// function with a callback
function funcWithACallback(exampleCallback) {
  for (let i = 0; i < movies.length; i++) {
    exampleCallback(movies[i]);
  }
}

// calling them together
funcWithACallback(checkMovieCategory);

// another familiar function
funcWithACallback(console.log);


// ! .find()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

// ? returns *first* *element* that satisifes testing function
// * otherwise returns undefined
// TODO Zorkington usecase: check if an item is in a room, or in your inventory, etc.

let office = [ "Jim", "Pam", "Michael", "Dwight", "Stanley", "Kevin", "Angela", "Erin"];

let character = "Kevin";

function search(target) {
  return target === character;
}

console.log("Find: ", office.find(search)); // displays "Find: kevin"

character = "Dwight"; // if lowercase, returns undefined

console.log("Find with anonymous callback: ", office.find(target => target === character)) // displays "Find with anonymous callback: Dwight"


// ! .map()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

// ? like .forEach(), but it returns an array
// ? returns new array with each element being the returned result of the callback function.
// * if an element doesn't have a returned value, that index of the new array will be undefined.
// TODO Zorkington usecase: not too many where a .forEach() won't be better.

const starWarsData = getStarWarsData();
const SWCharacters = starWarsData.results; // narrows down to just the character objects
// console.log(starWarsData) // displays star wars data
// console.log(SWCharacters) // displays star wars character objects

// create an array with just the name and height in inches
const mapResult = SWCharacters.map((character) => {
  return { name: character.name, height: Math.round(character.height / 2.54) }
})

console.log(mapResult);
// displays {name: "[character name]" height: [character height]} for each character


// ! .findIndex()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex

// ? returns *index* of *first* element that satisifes testing function
// * otherwise returns -1
// TODO Zorkington usecase: good for finding an index of an item to .splice() it from a room before adding it to inventory, for example. You can avoid .find() by just using this, and checking === -1 to make sure the item is there.

// get the first robot
let firstRobotIndex = SWCharacters.findIndex((character) => {
  return character.gender === "n/a"
})
console.log(firstRobotIndex); // displays 1

SWCharacters.splice(firstRobotIndex, 1)
console.log(SWCharacters) // displays star wars characters with C-3P0 (index 1) removed

// * you can programatically check if it found a result by making sure it doesn't === -1
// if (firstRobotIndex >= 0) {}
// if (firstRobotIndex !== -1) {
//   SWCharacters.splice(firstRobotIndex, 1)
// }


// ! .IndexOf()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

// ? like .findIndex(), but checks each element with equality to value inside parenthesis, doesn't use callback. Can't use with object values.
// TODO Zorkingotn usecase: similar to .findIndex().


// ! .includes()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

// ? checks if a value exists within an array. Doesn't work the way you might hope with objects (that's what .some() is for). No callback needed.
// TODO Zorkingotn usecase: Many! For example, depending on how your state machine is set up: Checking if the current room in your rooms state machine includes (has access to) the room the player would like to move to.


// ! .some()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some

// ? finds true if *any* element satisfies testing criteria
// ? returns false unless testing function satisfied (then returns true)
// * can work like .includes() for arrays of objects
// * can do basically anything as long as you can devise a testing function
// TODO Zorkingotn usecase: Many! For example, depending on how your state machine is set up: Checking if the current room in your rooms state machine includes (has access to) the room the player would like to move to.

let blackHairExists = SWCharacters.some((character) => character.hair_color === "black");

console.log(blackHairExists); // displays true

let greyHairExists = SWCharacters.some((character) => {
  console.log(character.hair_color)
  return character.hair_color.includes("grey");
});

console.log(greyHairExists); // displays true


// ! .filter()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

// ? returns array of just the elements that satisfy testing criteria
// ? returns empty array if no items pass the test
// * can do basically anything as long as you can devise a testing function
// TODO Zorkingotn usecase: Not many in my experience, but that might not be true for you!


























function getStarWarsData(){

  return {
      count: 82,
      next: "https://swapi.dev/api/people/?page=2",
      previous: null,
      results: [
        {
          name: "Luke Skywalker",
          height: "172",
          mass: "77",
          hair_color: "blond",
          skin_color: "fair",
          eye_color: "blue",
          birth_year: "19BBY",
          gender: "male",
          robot: false,
        },
        {
          name: "C-3PO",
          height: "167",
          mass: "75",
          hair_color: "n/a",
          skin_color: "gold",
          eye_color: "yellow",
          birth_year: "112BBY",
          gender: "n/a",
          robot: true,
        },
        {
          name: "R2-D2",
          height: "96",
          mass: "32",
          hair_color: "n/a",
          skin_color: "white, blue",
          eye_color: "red",
          birth_year: "33BBY",
          gender: "n/a",
          robot: true,
        },
        {
          name: "Darth Vader",
          height: "202",
          mass: "136",
          hair_color: "none",
          skin_color: "white",
          eye_color: "yellow",
          birth_year: "41.9BBY",
          gender: "male",
          robot: false,
        },
        {
          name: "Leia Organa",
          height: "150",
          mass: "49",
          hair_color: "brown",
          skin_color: "light",
          eye_color: "brown",
          birth_year: "19BBY",
          gender: "female",
          robot: false,
        },
        {
          name: "Owen Lars",
          height: "178",
          mass: "120",
          hair_color: "brown, grey",
          skin_color: "light",
          eye_color: "blue",
          birth_year: "52BBY",
          gender: "male",
          robot: false,
        },
        {
          name: "Beru Whitesun lars",
          height: "165",
          mass: "75",
          hair_color: "brown",
          skin_color: "light",
          eye_color: "blue",
          birth_year: "47BBY",
          gender: "female",
          robot: false,
        },
        {
          name: "R5-D4",
          height: "97",
          mass: "32",
          hair_color: "n/a",
          skin_color: "white, red",
          eye_color: "red",
          birth_year: "unknown",
          gender: "n/a",
          robot: true,
        },
        {
          name: "Biggs Darklighter",
          height: "183",
          mass: "84",
          hair_color: "black",
          skin_color: "light",
          eye_color: "brown",
          birth_year: "24BBY",
          gender: "male",
          robot: false,
        },
        {
          name: "Obi-Wan Kenobi",
          height: "182",
          mass: "77",
          hair_color: "auburn, white",
          skin_color: "fair",
          eye_color: "blue-gray",
          birth_year: "57BBY",
          gender: "male",
          robot: false,
        },
      ],
    };
    

}