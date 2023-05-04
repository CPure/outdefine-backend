const fs = require('fs')

const path = require('path');
const DICTIONARY_PATH = path.join(__dirname, '../../files/dictionary.txt');


const readDictionary = () => {
    const data = fs.readFileSync(DICTIONARY_PATH, 'utf8')
    const dictionary = new Set(data.split('\n').map(word => word.trim().toLowerCase()))
    return dictionary
}
const DICTIONARY = readDictionary()

const checkWord = (word) => {
    let result = null
    const regex = /^(?=.*[A-Z])[a-zA-Z]*(?:[a-z][A-Z]|[A-Z][a-z])[a-zA-Z]*$/
    const isCapitalCaseOrFullUpperCase = !regex.test(word) || word.charAt(0) === word.charAt(0).toUpperCase()
    if(isCapitalCaseOrFullUpperCase){
        if (DICTIONARY.has(word.toLowerCase())) {
            result = { "suggestions": [], "correct": true }
        }
        if(hasRepeatingCharacters(word.toLowerCase()) || isMissingVowels(word.toLowerCase())){
            result = null
        }
    }

    let suggestions
    if(isCapitalCaseOrFullUpperCase){
        suggestions = getSuggestions(word.toLowerCase())
    }else{
        suggestions = getSuggestions(word)
    }
    
    if (suggestions?.length > 0 && !result?.correct) {
        result = { "suggestions": suggestions, "correct": false }
    }
   
    if( hasMixedCasing(word) ){
        result = null
    }
    return result
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


