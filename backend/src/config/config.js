const dotenv = require('dotenv')

dotenv.config()

const config = {
    DBURI : process.env.DBURI
}

module.exports = config