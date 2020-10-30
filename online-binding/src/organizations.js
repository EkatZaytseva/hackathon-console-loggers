const { Organization, StaticBinding } = require('@caseware/provider-bindings-models')
const { createLogger } = require('@caseware/provider-bindings-util')

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
 
  return [
    new Organization({
      id: orgData.id,
      name: orgData.name,
      companyStartDate: "1988",
      country: "Canada",
      address: "1 Toronto St, Suite 1400, Toronto, ON M5C 2V6, Canada",
      displayName: orgData.displayName,
      website: "www.caseware.com",
    })]
})
