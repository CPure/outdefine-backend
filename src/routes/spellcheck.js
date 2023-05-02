const router = require('express-promise-router')()
const spellcheckController = require('../controllers/spellcheck')

/**
 * @typedef Result
 * @property {Array} suggestions
 * @property {boolean} correct
 */

/**
 * GET /api/spellcheck
 * @tags spellcheck
 * @returns {Result}
 */
router.get('/:word', spellcheckController.getSpellcheckWord)

module.exports = router