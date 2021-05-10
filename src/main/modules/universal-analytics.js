const ua = require('universal-analytics')
const { machineIdSync } = require('node-machine-id')

module.exports.createVisitor = () => {
  return ua(process.env.GOOGLE_ANALYTICS_ID, machineIdSync(), {
    strictCidFormat: false,
  })
}
