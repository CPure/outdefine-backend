const getSpellcheckWord = async (req, res) => {
    const word = req.params.word

    return res.status(200).send({'message': word})
  }
  
  module.exports = {
    getSpellcheckWord,
  }
  