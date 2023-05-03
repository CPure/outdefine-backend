const fs = require('fs')

const readDictionary = () => {
    const data = fs.readFileSync(`${__dirname}\\dictionary.txt`, 'utf8')
    const dictionary = new Set(data.split('\n').map(word => word.trim().toLowerCase()))
    return dictionary
}
const DICTIONARY = readDictionary()

const checkWord = (word) => {

    if( hasMixedCasing(word)){
        return null
    }
    if (DICTIONARY.has(word)) {
        return { "suggestions": [], "correct": true }
    }
    const suggestions = getSuggestions(word)
    if (suggestions.length > 0) {
        return { "suggestions": suggestions, "correct": false }
    }
    if(hasRepeatingCharacters(word) || isMissingVowels(word)){
        return null
    }
}
const hasRepeatingCharacters = (word) => {
    if (DICTIONARY.has(word)) {
        return false
    }
    return /([a-zA-Z])\1+/.test(word)
}


const isMissingVowels = (word) => {
    const vowels = ['a', 'e', 'i', 'o', 'u']
    let misspelled = false

    if (!DICTIONARY.has(word.toLowerCase())) {
        let missingVowels = 0
        for (let i = 0; i < word.length; i++) {
            if (!vowels.includes(word[i].toLowerCase())) {
                missingVowels++
            }
        }
        if (missingVowels > 0 && missingVowels === word.length) {
            misspelled = true
        }
    }
    return misspelled
}


const hasMixedCasing = (word) => {
    let mixedCaseCount = 0
    for (let i = 0; i < word.length; i++) {
        if (word[i] !== word[i].toLowerCase() && word[i] !== word[i].toUpperCase()) {
            mixedCaseCount++
            if (mixedCaseCount >= 2) {
                return true
            }
        }
    }    
    return false
}


const getSuggestions = (word) => {
    const suggestions = []
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  

    for (let i = 0; i < word.length; i++) {       
      const candidate = word.slice(0, i) + word.slice(i + 1)
      if (DICTIONARY.has(candidate)) {
        suggestions.push(candidate)
      }
    }
  

    for (let i = 0; i < word.length; i++) {       
      for (let j = 0; j < alphabet.length; j++) {
        const candidate = word.slice(0, i) + alphabet[j] + word.slice(i + 1)
        if (DICTIONARY.has(candidate)) {
          suggestions.push(candidate)
        }
      }
    }
  

    for (let i = 0; i <= word.length; i++) {       
      for (let j = 0; j < alphabet.length; j++) {
        const candidate = word.slice(0, i) + alphabet[j] + word.slice(i)
        if (DICTIONARY.has(candidate)) {
          suggestions.push(candidate)
        }
      }
    }
  
    return suggestions.filter((value, index, self) => {
        return self.indexOf(value) === index
      })
  }
module.exports = {
    checkWord,
}


