const through2 = require('through2')
const streamify = require('stream-array')
const { Organization, StreamBinding } = require('../../../packages/provider-bindings-models/dist/src')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


module.exports = new StreamBinding(async (credentials, context) => {
 
  var fs = require('fs');
  var orgData = JSON.parse(fs.readFileSync('../data/organizations.json', 'utf8'));

  const { orgId } = orgData.id;//context.data.params

  const organizations = [
    JSON.stringify({ id: orgData.id, displayName: orgData.displayName, name: orgData.name})
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
    transform.write(JSON.stringify({ id: orgData.id, displayName: orgData.displayName, name: orgData.name }))
    hasOrgs = false
  }
})