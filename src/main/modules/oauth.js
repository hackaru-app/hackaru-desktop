const {
  AuthorizationServiceConfiguration,
} = require('@openid/appauth/built/authorization_service_configuration')
const {
  RESPONSE_TYPE_CODE,
  AuthorizationRequest,
} = require('@openid/appauth/built/authorization_request')
const {
  GRANT_TYPE_AUTHORIZATION_CODE,
  TokenRequest,
} = require('@openid/appauth/built/token_request')
const {
  NodeRequestor,
} = require('@openid/appauth/built/node_support/node_requestor')
const {
  BaseTokenRequestHandler,
} = require('@openid/appauth/built/token_request_handler')
const {
  NodeBasedHandler,
} = require('@openid/appauth/built/node_support/node_request_handler')
const {
  AuthorizationNotifier,
} = require('@openid/appauth/built/authorization_request_handler')
const { NodeCrypto } = require('@openid/appauth/built/node_support/')
const { getRandomPort } = require('~/modules/random-port')

const scope = [
  'activities:read',
  'activities:write',
  'projects:read',
  'projects:write',
  'suggestions:read',
  'user:read',
].join(' ')

const configuration = new AuthorizationServiceConfiguration({
  authorization_endpoint: process.env.HACKARU_WEB_AUTHORIZATION_ENDPOINT,
  token_endpoint: process.env.HACKARU_API_TOKEN_ENDPOINT,
})

function buildAuthorizationRequest(redirectUri) {
  return new AuthorizationRequest(
    {
      client_id: process.env.HACKARU_API_CLIENT_ID,
      redirect_uri: redirectUri,
      grant_type: RESPONSE_TYPE_CODE,
      scope,
    },
    new NodeCrypto()
  )
}

function buildNotifier(redirectUri, resolve) {
  const notifier = new AuthorizationNotifier()

  notifier.setAuthorizationListener(async (request, response) => {
    if (response && request.internal && request.internal.code_verifier) {
      const codeVerifier = request.internal.code_verifier
      const tokenRequest = buildTokenRequest(
        redirectUri,
        response.code,
        codeVerifier
      )
      const accessToken = await requestAccessToken(tokenRequest)
      resolve(accessToken)
    }
  })
  return notifier
}

function buildTokenRequest(redirectUri, code, codeVerifier) {
  return new TokenRequest({
    client_id: process.env.HACKARU_API_CLIENT_ID,
    redirect_uri: redirectUri,
    grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
    code,
    extras: {
      code_verifier: codeVerifier,
    },
  })
}

async function requestAccessToken(tokenRequest) {
  const handler = new BaseTokenRequestHandler(new NodeRequestor())
  const request = await handler.performTokenRequest(configuration, tokenRequest)
  return request.accessToken
}

async function performAuthorizationRequest(resolve) {
  const port = await getRandomPort()
  const redirectUri = `http://127.0.0.1:${port}`

  const handler = new NodeBasedHandler(port)
  handler.setAuthorizationNotifier(buildNotifier(redirectUri, resolve))
  handler.performAuthorizationRequest(
    configuration,
    buildAuthorizationRequest(redirectUri)
  )
}

module.exports.authorize = function () {
  return new Promise((resolve) => performAuthorizationRequest(resolve))
}
