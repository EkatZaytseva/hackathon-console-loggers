const {
  Account,
  AccountBalance,
  StaticBinding,
  TaggedAccount,
} = require('@caseware/provider-bindings-models')

module.exports = new StaticBinding(async (credentials, context) => {
  const accountTagger = await context.getAccountTagger()
  console.log(accountTagger)
  const { orgId, accountId } = context.params
  const { SPECIFIC_ACCOUNT, ALL_ACCOUNTS } = context.flags
  const { PERIODS } = context.timeframe
  const accounts = [
    new Account({
      id: 'a',
      description: 'Cash',
      refId: '1',
      balances: [
        new AccountBalance({
          date: PERIODS[0],
          balance: 123456.0,
        }),
      ],
    }),
    new Account({
      id: 'b',
      description: 'Cash',
      refId: '2',
      balances: [
        new AccountBalance({
          date: PERIODS[0],
          balance: 4321,
        }),
      ],
    }),
    new TaggedAccount({
      id: 'c',
      description: 'Cash',
      refId: '3',
      balances: [
        new AccountBalance({
          date: PERIODS[0],
          balance: 4321,
        }),
      ],
      tag: 'hello',
    }),
  ]

  if (SPECIFIC_ACCOUNT) {
    const acc = accounts.filter(account => account.id === accountId)
    if (acc[0]) {
      return acc[0]
    }
  }

  return accounts
})
