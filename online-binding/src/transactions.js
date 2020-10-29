const { Transaction, StreamBinding } = require('@caseware/provider-bindings-models')
//const { getTrans } = require('./util/request')

/**
 * [GET /organizations/{orgId}/accounts/{accountId|*}/transactions/{txnEntryId}?from_date=...&to_date=...]
 * This function is called when the service needs to access a single or list of available
 * transactions. Fetch the list of transactions and map each of them to the
 * given Transaction class.
 *
 * @param {any} credentials - The return value of the auth function
 * @param {BindingContext} context - The context of the request
 */
module.exports = new StreamBinding(async (credentials, context) => {
  
    const fs = require('fs');
    let orgData = JSON.parse(fs.readFileSync('../data/organizations.json', 'utf8'));
    let trData = JSON.parse(fs.readFileSync('../data/transctions.json', 'utf8'));
  
    const { orgId } = orgData.id; //context.params

  /**
   * Create a transformer stream that will push your transactions to the client as you get them.
   * This is a memory safe pattern that should be practiced to reduce the memory footprint of each
   * request made to your service.
   */
  const transformStream = context.createTransformStream(
    (line) =>
      new Transaction({
        entryID: line.entry_id,
        lineNumber: line.line_number,
        entryNumber: line.entry_number,
        postingDate: line.posting_date,
        postingStatus: line.posting_status,
        amount: line.amount,
        documentType: line.document_type,
        accountID: line.account_id,
        accountMainID: line.account_main_id,
        accountMainDescription: line.account_main_description,
      }),
  )

  // The transaction stream response
  const transactionStream = trData; //await getTrans(orgId)
  const jsonStream = context.filterJSON('*')

  // Piping all streams together
  context.createStream(transactionStream, jsonStream, transformStream)
})