const router = require('express-promise-router')()
const spellcheckController = require('../controllers/spellcheck')

/**
 * GET /api/spellcheck
 * @tags spellcheck

 */
router.get('/:word', spellcheckController.getSpellcheckWord)

module.exports = router