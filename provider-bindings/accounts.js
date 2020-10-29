

 const { StaticBinding, NotImplemented } = require('@caseware/provider-bindings-models')
 //const { extractAccounts } = require('./util/accounts-extractor')
 
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

    //For Hackathon: We're not using filtering by accountId

   //const { orgId, accountId } = context.params

   const fs = require('fs');
    let orgData = JSON.parse(fs.readFileSync('../data/organizations.json', 'utf8'));
    let acData = JSON.parse(fs.readFileSync('../data/accounts.json', 'utf8'));

    const { orgId } = orgData.id;
 
   /**
    * SPECIFIC_ACCOUNT and ALL_ACCOUNTS are two flags that will indicate if the request is asking for a specific account or all accounts.
    */
   //const { SPECIFIC_ACCOUNT, ALL_ACCOUNTS } = context.flags
   const {  ALL_ACCOUNTS } = true;
 
   /**
    * Not using PERIODS because our Synthetic Generator already let's the user set the start/end dates
    */
   // const { PERIODS } = context.timeframe
 
   const accounts = acData; // ? await extractAccounts(orgId) : []
 
   //if (SPECIFIC_ACCOUNT) {
     // Return the result of specific account
    // return accounts.filter((account) => account.id === accountId)
   //}
 
   if (ALL_ACCOUNTS) {
     // Return the result of all account
     return accounts
   }
 
   // This will never run
   return NotImplemented
 })