const { Organization, StaticBinding } = require('@caseware/provider-bindings-models')
const { createLogger } = require('@caseware/provider-bindings-util')
const streamify = require('stream-array')
const through2 = require('through2')
//const { getFiles } = require('./util/request')

const { error } = createLogger('organizations')

const orgData = require('./organizations.json')

/**
 * [GET /organizations]
 * This function is called when the service needs to access a single or list of available
 * organizations. Fetch the list of organizations and map each of them to the
 * given Organization class.
 *
 * @param {any} credentials - The return value of the auth function
 * @param {BindingContext} context - The context data of the request
 * @return {array[Organization]} - A list of organization objects
 */

module.exports = new StaticBinding(async (credentials, context) => {
  /**
   * orgId is what you have selected to be the id property of any returned Organization object.
   */
  const fs = require('fs');
  // let orgData = JSON.parse(fs.readFileSync('./organizations.json', 'utf8'));

  const orgId = orgData.id; //context.params
 
  const organizations = [
    JSON.stringify({ id: orgData.id, displayName: orgData.displayName, name: orgData.name})
    ]
  
  /*
  try {
    await getFiles(orgId).then((data) => {
      data.forEach((line) => {
        organizations.push(
          new Organization({
            id: line.id,
            name: line.name,
            displayName: line.name,
          }),
        )
      })
    })
  } catch (e) {
    error(e)
  }
  */

  // if (orgId) {
  //   // Returns a specific organization if `orgId` is specified in the context object
  //   return organizations.filter((organization) => organization.id === orgId)
  // }

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

  context.createStream(streamifyStream, transform, filter)
  let hasOrgs = true
  while (hasOrgs) {
    transform.write(JSON.stringify({ id: null, displayName: 'Google', name: 'Google-1' }))
    hasOrgs = false
  }
})