/*
Using array methods to improve the quality of a paragraph
 and gather some information about that paragraph.
*fscp-javascript-syntax-part-ii*
__author: gordon.amamoo@amlitech.org
*/

let story = 'Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end.';

let overusedWords = ['really', 'very', 'basically'];

let unnecessaryWords = ['extremely', 'literally', 'actually'];

const storyWords = story.split(' ');
const wordCount = storyWords.length;
console.log("story words: " + wordCount);

//remove all non letters from the word and 
//convert all letters to lower case for comparison
const removePunctuation = word => {

  word = (word[word.length - 1] in nonletters) ?
    word.substring(0, word.length - 1) : word;
  word = (word[0] in nonletters) ?
    word.substring(1) : word;
  return word.toLowerCase()
}
const nonletters = { "!": 0, '"': 0, ".": 0, " ": 0, '-': 0, ",": 0, "": 0 };
const betterWords = storyWords.filter(word =>
  !unnecessaryWords.some(unnecessaryWord => unnecessaryWord ===
    removePunctuation(word)));
console.log("better words: " + betterWords.length);

//counting the number of over used words
const betterWordsLastIndex = betterWords.length - 1;
const overused = {};

// using  array methods to count
console.log();
overusedWords.forEach(overusedWord => {
  const wrapper = (overusedWord) => {
    let count = 0;
    const counter = (word, i) => {
      if (removePunctuation(word) === removePunctuation(overusedWord)) count++;
      if (i === betterWordsLastIndex) {
		  overused[overusedWord]=count;
       // console.log(`overusedWord - "${overusedWord}" :  ${count} times`)
      }
    }
    return counter
  }
  betterWords.forEach(wrapper(overusedWord))
})

//number of sentences
/* this works accurately for ASCII characters 
which are encoded with only a single code point */
count = 0;
let senCount;
const stringLastIndex = story.length - 1;
let charCount = 0;
console.log("\nnumber of sentences");
Array.prototype.forEach.call(story, (character, i) => {
  charCount++;
  if (character === "!" || character === ".") {
    count++;
    console.log(`${count}. ` + story.substring(i - charCount + 1, i + 1).trim())
    charCount = 0;
  };
  if (i === stringLastIndex) {
    console.log(`
Number of sentences: ${count}`);
    senCount = count;
  }
});

console.log("\nSummary!" +
  `\nWord count: ${wordCount}` +
  `\nSentence count: ${senCount}` +
  "\nNumber of times each overused word occurs"
);
for (overusedWord in overused) {
  console.log(`overusedWord - "${overusedWord}" :  ${overused[overusedWord]} times`)
}

//Extra Ideas
//1. For the overused words, remove it every other time it appears.
const removeWords = (wordArray, overUsedWords) => {
  const overused = {};
  const wordArrayLastIndex = wordArray.length - 1;
  overusedWords.forEach(overusedWord => wordArray.forEach((word, i) => {
    if (i === 0) count = 0;
    if (removePunctuation(word) === overusedWord) {
      if (((count++) % 2) !== 0) wordArray.splice(i, 1)
    }

  }));
  return wordArray.join(" ")
}

//finding the word that occurs the greatest
/*a function that finds the word that appears
the greatest number of times. */
/**
 * @param{storyWords} array of words
 *  */
const findGreatestWords = (storyWords) => {
  const lastIndex = storyWords.length - 1;
  const storyWordsCounts = [];
  const uniqueWords = [];
  const greatestWords = [];
  storyWords.forEach((word, i) => {
    let count = 0;
    word = removePunctuation(word);

    //skip non-words
    if (word in nonletters) return;

    //skip already counted words
    if (!uniqueWords.some(v => v === word
    )) uniqueWords.push(word);
    else return;

    //count the number of occurrences of a word
    storyWords.forEach((word1, i1) => {
      word1 = removePunctuation(word1)
      if (word === word1) count++;
      if (i1 === lastIndex) {
        storyWordsCounts[i] = count;
      }
    })
  })
  //console.log(uniqueWords)
  // console.log(storyWordsCounts)

  //get the highest word frequency
  const maxCount = storyWordsCounts.reduce((a, b) => {
    return a > b ? a : b
  })

  //get the word(s) with the highest frequency
  storyWordsCounts.forEach((v, i) => {
    if (v === maxCount) greatestWords.push(
      removePunctuation(storyWords[i])
    )
  })
  greatestWords.maxCount = maxCount;
  //console.log(maxCount)
  // console.log(greatestWords)

  return greatestWords
}

//Extra ideas
/**
 * @param{wordArray} array
 * @param{sampleWords} array  
 * */
const wordCounter = (wordArray, sampleWords) => {
  const lastIndex = wordArray.length - 1;
  let count = 0;
  const counts = {};
  sampleWords.forEach(sword => wordArray.forEach((word, i) => {
    if (i === 0) count = 0;
    if (removePunctuation(word) === sword) count++;
    if (i === lastIndex) {
      counts[sword] = count;
    }
  }));
  return counts
}
//a function to replace overused words with something else.
const replaceWords = (words, overUsedWords, newWords) => {
  const numOfTimes = wordCounter(storyWords, overUsedWords);
  overusedWords.forEach((overusedWord, i) => {
    const limit = numOfTimes[overusedWord];
    for (var j = 0; j < limit; j++) {
      words = words.replace(overusedWord, newWords[i])
    }
  });
  return words
}

//Extra ideas
//For the overused words, remove it every other time it appears.
console.log("********************")
console.log("\nstory without every other 'overused' word\n\n" +
  removeWords(storyWords, overusedWords))


// find the word that appears the greatest number of times.
console.log("********************")
const greatestWord = findGreatestWords(storyWords);
console.log(`\nWord(s) that occurred the greatest number of times: "${greatestWord.join(", ")}"  (${greatestWord.maxCount} times)\n`);

//replace overused words with something else.
const replacement = ['extremely', 'too', "simply"];
console.log("**********************")
console.log(`replacing all occurrences of  ${overusedWords.join(", ")} with ${replacement.join(", ")}\n`)

console.log(replaceWords(story, overusedWords, replacement))
