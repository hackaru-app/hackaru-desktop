const ua = require('universal-analytics')
const { v4: uuidv4 } = require('uuid')

module.exports.createVisitor = () => {
  return ua(process.env.GOOGLE_ANALYTICS_ID, uuidv4())
}
