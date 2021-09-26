import { AuthorizationServiceConfiguration } from '@openid/appauth/built/authorization_service_configuration'
import { AuthorizationRequest } from '@openid/appauth/built/authorization_request'
import {
  GRANT_TYPE_AUTHORIZATION_CODE,
  TokenRequest,
} from '@openid/appauth/built/token_request'
import { NodeRequestor } from '@openid/appauth/built/node_support/node_requestor'
import { BaseTokenRequestHandler } from '@openid/appauth/built/token_request_handler'
import { NodeBasedHandler } from '@openid/appauth/built/node_support/node_request_handler'
import { AuthorizationNotifier } from '@openid/appauth/built/authorization_request_handler'
import { NodeCrypto } from '@openid/appauth/built/node_support/'
import { getRandomPort } from '~/modules/random-port'

const scope: string = [
  'activities:read',
  'activities:write',
  'projects:read',
  'projects:write',
  'suggestions:read',
  'user:read',
].join(' ')

const configuration: AuthorizationServiceConfiguration =
  new AuthorizationServiceConfiguration({
    authorization_endpoint: process.env.HACKARU_WEB_AUTHORIZATION_ENDPOINT,
    token_endpoint: process.env.HACKARU_API_TOKEN_ENDPOINT,
    revocation_endpoint: '',
  })

function buildAuthorizationRequest(redirectUri: string): AuthorizationRequest {
  return new AuthorizationRequest(
    {
      client_id: process.env.HACKARU_API_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
      scope,
    },
    new NodeCrypto()
  )
}

function buildNotifier(
  redirectUri: string,
  resolve: (accessToken: string) => void
): AuthorizationNotifier {
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

function buildTokenRequest(
  redirectUri: string,
  code: string,
  codeVerifier: string
): TokenRequest {
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

async function requestAccessToken(tokenRequest: TokenRequest) {
  const handler = new BaseTokenRequestHandler(new NodeRequestor())
  const request = await handler.performTokenRequest(configuration, tokenRequest)
  return request.accessToken
}

async function performAuthorizationRequest(
  resolve: (accessToken: string) => void
) {
  const port = await getRandomPort()
  const redirectUri = `http://127.0.0.1:${port}`

  const handler = new NodeBasedHandler(port)
  handler.setAuthorizationNotifier(buildNotifier(redirectUri, resolve))
  handler.performAuthorizationRequest(
    configuration,
    buildAuthorizationRequest(redirectUri)
  )
}

export function authorize(): Promise<string> {
  return new Promise((resolve) => performAuthorizationRequest(resolve))
}
