const { OAuth2AC, Credentials } = require('@caseware/provider-bindings-models')

module.exports = new OAuth2AC({
  credentials: {
    client: {
      id: 'mock_client_id',
      secret: 'mock_client_secret',
    },
    auth: {
      tokenHost: 'https://url.com',
      tokenPath: 'oauth/access_token',
      authorizeHost: 'https://url.com',
      authorizePath: 'oauth/authorize',
    },
    http: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  },
  authorizeURL: {
    scope: 'mock:scope',
  },
  parseAccessToken: accessToken => {
    const credentials = new Credentials({
      accessToken: { accessToken: accessToken.token },
      refreshToken: null,
      expiresIn: 0,
    })

    return credentials
  },
})
