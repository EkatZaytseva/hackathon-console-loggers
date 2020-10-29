const through2 = require('through2')
const streamify = require('stream-array')
const { Organization, StreamBinding } = require('@caseware/provider-bindings-models')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = new StreamBinding(async (credentials, context) => {
  const { orgId } = context.data.params
  const organizations = [
    JSON.stringify({ id: '101.abc', displayName: 'Microsoft', name: 'Microsoft-1' }),
    JSON.stringify({ id: '105.def', displayName: 'Apple Inc.', name: 'Apple Inc.-1' }),
    JSON.stringify({ id: '103.ghi', displayName: 'Amazon', name: 'Amazon-1' }),
    JSON.stringify({ id: '104.jkl', displayName: 'Google', name: 'Google-1' }),
  ]
  const streamifyStream = streamify(organizations)

  const transform = context.createTransformStream(obj => {
    return new Organization(JSON.parse(obj.toString()))
  })
  const filter = through2.obj(function(chunk, enc, callback) {
    if (orgId && chunk.id === orgId) {
      this.push(chunk)
    }
    if (!orgId) {
      // ******* First entry creates Error ***
      // if(chunk.id=='ExtraId')
      // {
      //  this.push({ id123: '199.jkl', displayName: 'Google' })
      // }
      // *********** End of Test *********///

      // ******* Error in between ***
      // if(chunk.id=='104.jkl')
      // {
      //   this.push({ id123: '199.jkl', displayName: 'Google' })
      // }
      // *********** End of Test *********///
      this.push(chunk)
    }
    callback()
  })

  // ******* Error before invoking context.createFinalStream ***
  // throw Error ("Error before invoking context.createFinalStream")
  // *********** End of Test *********///

  context.createStream(streamifyStream, transform, filter)
  let hasOrgs = true
  while (hasOrgs) {
    transform.write(JSON.stringify({ id: null, displayName: 'Google', name: 'Google-1' }))
    hasOrgs = false
  }
})
