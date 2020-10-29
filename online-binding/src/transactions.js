const { Transaction, StreamBinding } = require('@caseware/provider-bindings-models')

const transactions = [
  {
    id: '11',
    number: '11',
    posting: '2019-09-10',
    accountID: 'c',
    created: '2019-09-10',
    total: 9000.09,
    person: 'Anna',
    prop: 'erty',
  },
  {
    id: '22',
    number: '22',
    posting: '2019-10-03',
    created: '2019-10-03',
    accountID: 'c',
    total: 902.19,
    person: 'Jim',
    prop: 'erty',
  },
  {
    id: '33',
    number: '33',
    posting: '2019-09-03',
    created: '2019-09-03',
    accountID: 'c',
    total: 800.99,
    person: 'Steve',
    prop: 'erty',
  },
  {
    id: '44',
    number: '44',
    posting: '2019-09-08',
    created: '2019-09-08',
    accountID: 'c',
    total: 11.08,
    person: 'Bob',
    prop: 'erty',
  },
  {
    id: '55',
    number: '55',
    posting: '2019-07-10',
    created: '2019-07-10',
    accountID: 'c',
    total: 9100.09,
    person: 'Steve',
    prop: 'erty',
  },
  {
    id: '66',
    number: '66',
    posting: '2019-09-10',
    created: '2019-09-10',
    accountID: 'c',
    total: 90340.09,
    person: 'Steve',
    prop: 'erty',
  },
  {
    id: '77',
    number: '77',
    posting: '2019-09-11',
    created: '2019-09-11',
    accountID: 'c',
    total: 800.79,
    person: 'Jade',
    prop: 'erty',
  },
  {
    id: '88',
    number: '88',
    posting: '2019-09-01',
    created: '2009-09-01',
    accountID: 'c',
    total: 45600.93,
    person: 'Jib',
    prop: 'erty',
  },
]

module.exports = new StreamBinding(async (credentials, context) => {
  const { orgId, accountId, txnId } = context.params
  const { ALL_TXNS_ALL_ACCOUNTS, ALL_TXNS_SPECIFIC_ACCOUNT, SPECIFIC_TXN_SPECIFIC_ACCOUNT } = context.flags
  // Create a transformer stream that will recieve your raw transactions
  const transactionStream = context.createTransformStream(
    data =>
      new Transaction({
        entryID: data.id,
        enteredBy: data.person,
        amount: data.total,
        identifieType: data.prop,
        entryNumber: data.number,
        postingDate: data.posting,
        accountID: data.accountID,
      }),
  )

  // Write each transactions to the stream as you recieve it
  transactions.forEach(txn => transactionStream.write(txn))

  // Close the stream
  transactionStream.end()
  context.createStream(transactionStream)
})
