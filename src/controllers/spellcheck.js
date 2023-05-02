const spellcheckService = require('../services/spellcheck')
const getSpellcheckWord = async (req, res) => {

    const word = req.params.word

    const result = spellcheckService.checkWord(word)
    if (!result) {
        return res.status(404).send({})
    }

    return res.status(200).send(result)

}

module.exports = {
    getSpellcheckWord,
}
