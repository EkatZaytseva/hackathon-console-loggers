const streamify = require('stream-array');

const { Transaction, StaticBinding } = require('@caseware/provider-bindings-models')
const transactions = require('./transactions.json');
/**
 * [GET /organizations/{orgId}/accounts/{accountId|*}/transactions/{txnEntryId}?from_date=...&to_date=...]
 * This function is called when the service needs to access a single or list of available
 * transactions. Fetch the list of transactions and map each of them to the
 * given Transaction class.
 *
 * @param {any} credentials - The return value of the auth function
 * @param {BindingContext} context - The context of the request
 */
module.exports = new StaticBinding(async (credentials, context) => {


  const transactionsArray = transactions.map((line) => {
    return new Transaction({
      entryID: line.Entry_id,
      lineNumber: line.Line_number,
      entryNumber: line.Entry_number,
      postingDate: line.Posting_date,
      amount: line.Amount,
      accountID: line.Account_id,
    })
    // console.log(line)
    // console.log(transaction)
    // return transaction
  })
  console.log(transactionsArray)
  return transactionsArray
  /**
   * Create a transformer stream that will push your transactions to the client as you get them.
   * This is a memory safe pattern that should be practiced to reduce the memory footprint of each
   * request made to your service.
   */
  // const transformStream = context.createTransformStream(
  //   (line) => {
  //     console.log(line)
  //     new Transaction({
  //       entryID: line.entry_id,
  //       lineNumber: line.line_number,
  //       entryNumber: line.entry_number,
  //       postingDate: line.posting_date,
  //       postingStatus: line.posting_status,
  //       amount: line.amount,
  //       documentType: line.document_type,
  //       accountID: line.account_id,
  //       accountMainID: line.account_main_id,
  //       accountMainDescription: line.account_main_description,
  //     })
  //   }
  // )

  // // The transaction stream response
  // const transactionStream = streamify(transactions);
  // const jsonStream = context.filterJSON('*')
  // console.log("HERE")

  // // Piping all streams together
  // return context.createStream(transactionStream, jsonStream, transformStream)
})
