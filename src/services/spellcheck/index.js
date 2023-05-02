const fs = require('fs')
const DICTIONARY_PATH = './src/files/dictionary.txt'

const readDictionary = () => {
    const data = fs.readFileSync(DICTIONARY_PATH, 'utf8')
    const dictionary = new Set(data.split('\n').map(word => word.trim().toLowerCase()))
    return dictionary
}
const DICTIONARY = readDictionary()

const checkWord = (word) => {
    const hasAnyError = hasRepeatingCharacters(word) || isMissingVowels(word) || hasMixedCasing(word)

    console.log(hasRepeatingCharacters(word))
    if (hasAnyError) {
        return null
    }
    if (DICTIONARY.has(word)) {
        return { "suggestions": [], "correct": true }
    }
    const suggestions = getSuggestions(word)
    if (suggestions.length > 0) {
        return { "suggestions": suggestions, "correct": false }
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
        if (missingVowels === 1) {
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
        for (let j = 0; j < alphabet.length; j++) {
            const candidate = word.slice(0, i) + alphabet[j] + word.slice(i + 1)
            if (DICTIONARY.has(candidate)) {
                suggestions.push(candidate)
            }
        }
    }
    return suggestions
}

module.exports = {
    checkWord,
}

