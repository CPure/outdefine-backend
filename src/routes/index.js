/**
 *
 * @param {import('express').Express} app
 */
const setupRoutes = (app) => {
    app.use('/api/spellcheck', require('./spellcheck'))
}

module.exports = setupRoutes
