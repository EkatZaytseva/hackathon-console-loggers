const through2 = require('through2')
const streamify = require('stream-array')
const { Organization, StreamBinding } = require('@caseware/provider-bindings-models')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = new StreamBinding(async (credentials, context) => {
  const { orgId } = context.data.params
  const organizations = [
    JSON.stringify({ id: '1', displayName: 'Microsoft', name: 'Microsoft-1' }),
    JSON.stringify({ id: '2', displayName: 'Apple Inc.', name: 'Apple Inc.-1' }),
    JSON.stringify({ id: '3', displayName: 'Amazon', name: 'Amazon-1' }),
    JSON.stringify({ id: '4', displayName: 'Google', name: 'Google-1' }),
  ]
  const streamifyStream = streamify(organizations)

  const transform = context.createTransformStream(obj => {
    return new Organization(JSON.parse(obj.toString()))
  })

  context.createStream(streamifyStream, transform)
  let hasOrgs = true
  while (hasOrgs) {
    transform.write(JSON.stringify({ id: null, displayName: 'Google', name: 'Google-1' }))
    hasOrgs = false
  }
})
