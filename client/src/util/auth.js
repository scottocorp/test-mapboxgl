import React, { PropTypes, Children, createElement, Component } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import auth0 from 'auth0-js'
import Auth0Lock from 'auth0-lock'
import createHistory from 'history/createBrowserHistory'

const ACCESS_TOKEN = 'access_token'
const ID_TOKEN = 'id_token'
const EXPIRES_AT = 'expires_at'

export const authType = PropTypes.shape({
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.func.isRequired,
  getAccessToken: PropTypes.func.isRequired
})

export class AuthProvider extends Component {
  static propTypes = {
    clientId: PropTypes.string,
    domain: PropTypes.string,
    window: PropTypes.shape({
      localStorage: PropTypes.shape({
        setItem: PropTypes.func,
        getItem: PropTypes.func
      })
    })
  }
  static defaultProps = {
    window: window || {},
    clientId: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN
  }
  static childContextTypes = {
    auth: authType
  }
  getChildContext() {
    return {
      auth: {
        login: this.login,
        logout: this.logout,
        isAuthenticated: this.isAuthenticated,
        getAccessToken: () => this.getLocal(ACCESS_TOKEN)
      }
    }
  }

  constructor(props, context) {
    super(props, context)
    this.state = { parsed: false }
    this.auth = new auth0.WebAuth({
      clientID: props.clientId,
      domain: props.domain,
      audience: 'https://arupdigital.au.auth0.com/userinfo',
      redirectUrl: process.env.AUTH0_REDIRECT_URL,
      responseType: 'token id_token',
      scope: 'openid profile generate-reports'
    })
    this.parse()
  }

  componentDidMount() {
    this.setState({ parsed: true })
  }

  getLocal(token) {
    return this.props.window.localStorage.getItem(token)
  }
  setLocal(token, value) {
    this.props.window.localStorage.setItem(token, value)
  }

  parse() {
    const { window } = this.props
    const { hash } = window.location
    if (hash && /access_token/.test(hash)) {
      this.auth.parseHash(hash, (error, authResult) => {
        if (
          error ||
          !authResult.accessToken ||
          !authResult.idToken ||
          !authResult.expiresIn
        ) {
          throw new Error('Failed to auth: ' + error)
        }

        let expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        )
        this.setLocal(ACCESS_TOKEN, authResult.accessToken)
        this.setLocal(ID_TOKEN, authResult.idToken)
        this.setLocal(EXPIRES_AT, expiresAt)

        window.history.replaceState(
          '',
          (document && document.title) || 'title',
          window.location.pathname + window.location.search
        )
      })
    }

    this.parsed = true
  }

  login = () => {
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain, {
      oidcConformant: true,
      auth: {
        audience: process.env.AUTH0_AUDIENCE,
        redirectUrl: process.env.AUTH0_REDIRECT_URL,
        clientId: process.env.AUTH0_CLIENT_ID,
        domain: process.env.AUTH0_DOMAIN,
        responseType: 'token id_token',
        authParseHash: false,
        params: { scope: 'openid profile generate-reports' }
      },
      theme: {
        logo:
          'https://s3-ap-southeast-2.amazonaws.com/arupdigital-assets/logo.png'
      }
    })
    this.lock.show()
  }

  logout = () => {
    let localStorage = this.props.window.localStorage
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(ID_TOKEN)
    localStorage.removeItem(EXPIRES_AT)
  }

  isAuthenticated = () => {
    let expiresAt = this.getLocal(EXPIRES_AT)
    return expiresAt && new Date().getTime() < expiresAt
  }

  render() {
    return this.state.parsed ? Children.only(this.props.children) : null
  }
}

export function withAuth(WrapperComponent) {
  class Authenticate extends Component {
    static WrapperComponent = WrapperComponent
    static contextTypes = {
      auth: authType.isRequired
    }
    render() {
      const props = {
        ...this.context.auth,
        ...this.props
      }
      return createElement(WrapperComponent, props)
    }
  }
  return hoistStatics(Authenticate, WrapperComponent)
}
