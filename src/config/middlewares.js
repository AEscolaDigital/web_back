const cors = require('../middleware/cors')

const setupCors = (app) => {
  app.use(cors)
}

module.exports = setupCors