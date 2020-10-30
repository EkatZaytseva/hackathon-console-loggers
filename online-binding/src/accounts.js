const { StaticBinding, NotImplemented, Account, AccountBalance } = require('@caseware/provider-bindings-models')
const accounts = require('./accounts.json');
 
 /**
  * [GET /organizations/{orgId}/accounts/{accountId?}?from_date=...&to_date=...&month_interval=...]
  * This function is called when the service needs to access a single or list of available
  * accounts. Using the arguments, fetch the list of accounts and map each of
  * them to the given Account class.
  *
  * @param {any} credentials - The return value of the auth function
  * @param {BindingContext} context - The context of the request.
  * @return {array[Account]} - A list of account objects
  */
 
 module.exports = new StaticBinding(async (credentials, context) => {
   /**
    * orgId is what you have selected to be the id property of any returned Organization object.
    * accountId is what you have selected to be the id property of any returned Account object.
    */
 
   /**
    * SPECIFIC_ACCOUNT and ALL_ACCOUNTS are two flags that will indicate if the request is asking for a specific account or all accounts.
    */
   const ALL_ACCOUNTS  = true;
 
   if (ALL_ACCOUNTS) {
     // Return the result of all account
     const accountsTagged = accounts.map((acc) => {
       return new Account({
         id: acc.id,
         tag: acc.Description,
         balances:  acc.Balances.map((balance) => {
           return new AccountBalance({
             date: new Date(balance.Date),
             balance: balance.Balance
           })
         })
       })
     })
     console.log(accountsTagged)
     return accountsTagged
   }
 
   // This will never run
   return NotImplemented
 })
