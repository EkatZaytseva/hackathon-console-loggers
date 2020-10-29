
/** ***********************
 * IMPORTANT: DO NOT MODIFY THIS FILE
 *
 * This file is used by the CaseWare SDK to access your implementation.
 * Do not modify it unless you know what you are doing.
 * All implementation code should live in the ./src directory.
 *
 * @return {CWIBinding}
 ************************** */
/* eslint-disable */

const { CWIOnlineBinding, READ } = require('@caseware/provider-bindings-models')

const register = new CWIOnlineBinding(require('./profile.json'))

// please add required environment variable here
// register.setRequireEnvVar([
//   'PRIVATE_KEY',
//   'CONSUMER_KEY',
// ]);

register.auth(require('./src/auth'))
register.organizations(READ, require('./src/organizations'))
register.accounts(READ, require('./src/accounts'))
register.transactions(READ, require('./src/transactions'))

module.exports = register
