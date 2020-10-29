const { CustomAuth, Credentials } = require('@caseware/provider-bindings-models')

module.exports = new CustomAuth({
  /*
  [GET /profile?noauth=false]
  This data is returned when the API client is looking to begin an authentication flow with the
  provider. The form property defines the fields that will be used to request input from the user.

  In this form object, the values of each top-level property define how to render the form to the
  user. `label` is used for any placeholder text, this can be localized in multiple languages using
  the format seen below. CaseWare supported languages are: en, fr, es, nl, de.

  The `type` value for each top-level property defines the input type. This is used to define what
  HTML input type to use for input.

  Each top-level property (username, password) will be returned to the getCredentials function as
  arguments with the user input values.

  */
  form: {
    username: {
      label: {
        en: 'Enter username',
        fr: 'Enter username (fr)',
        de: 'Enter username (de)',
        nl: 'Enter username (nl)',
        es: 'Enter username (es)',
      },
      type: 'text',
    },
    password: {
      label: {
        en: 'Enter password',
        fr: 'Enter password (fr)',
        de: 'Enter password (de)',
        nl: 'Enter password (nl)',
        es: 'Enter password (es)',
      },
      type: 'password',
    },
  },
  /*
    [POST /auth]
    This function is called when the API client wants to authenticate with the provider

    The arguments match the values specified in the form object above (eg. { username, password })

    This function should return a Credentials object.
    The background service will encrypt the Credentials so the API client cannot access this data.

    Handling an unauthorized request is as simple as returning null and the SDK will do the rest.
  */
  getCredentials: async ({ username, password }) => {
    const tokenString = JSON.stringify({ username, password })

    return new Credentials({
      accessToken: tokenString,
      refreshToken: null,
      expiresIn: null, // accessToken life span (in seconds)
    })
  },

  /*
    [GET /organizations /accounts /transactions]
    This function is called before each request that requires authentication from the API client.
    The argument is the accessToken property from the Credentials object returned in the above
    `getCredentials` function.

    The return value of this function is what is fed into the 'credentials' argument of the
    subsequent handler (see accounts.js, transactions.js, or organizations.js).

    Here, you can manually parse the accessToken into exactly what your functions require.

    If you do not need to use this, make sure to do a no-op pass through (eg, "(t) => t")

    Handling an unauthorized request is as simple as returning null and the SDK will do the rest.
  */
  callback: async accessToken => {
    const { username, password } = JSON.parse(accessToken)
    const key = `${username}:${password}`.toString('base64')
    return `Basic ${key}`
  },
  /*
    [POST /auth/refresh]
    This function is called when the API client wants to refresh the accessToken.

    This is only called if `expiryTime` is supplied in the Credentials object from `getCredentials`.

    The only argument provided is the `refreshToken` value specified in the Credentials object from
    the `getCredentials` function.

    This is useful if the provider uses the OAuth2 client-credentials flow that provides a short
    lived token.

    This function should return a Credentials object.

    Handling an unauthorized request is as simple as returning null and the SDK will do the rest.
  */
  refreshAccessToken: async () => {
    return new Credentials({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresIn: 3600, // accessToken life span (in milliseconds)
    })
  },
})
