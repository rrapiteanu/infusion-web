import { Component } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import UserContext from './UserContext';

import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { meQuery } from "../graphql/user/query/me";


export const setAuth = async ({ token }) => {
  cookie.set('token', token, { expires: 1 })
  // localStorage.setItem('token', token)
  Router.push('/')
}

export const logout = () => {
  cookie.remove('token')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now().toString())
  // window.localStorage.removeItem('token')
  Router.push('/login')
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

export const withAuth = WrappedComponent =>
class AuthWrapper extends Component {

  constructor(props){
    super(props);
  }

  render() {

    const UntypedComponent = WrappedComponent as any;



    return (
      <UserContext.Consumer>
        {userContext =>
          <UntypedComponent
            { ...this.props }
            isAuth={userContext.isAuth}
            user={userContext.user}
          />
        }
      </UserContext.Consumer>
    );
  }
}

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps (ctx) {
      const token = auth(ctx)

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps, token }
    }

    constructor (props) {
      super(props)

      this.syncLogout = this.syncLogout.bind(this)
    }

    componentDidMount () {
      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount () {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout (event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

export const auth = ctx => {
  const { token } = nextCookie(ctx)

  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push('/login')
  }

  return token
}


export const getCurrentUser = (
  apolloClient: ApolloClient<NormalizedCacheObject>
) => {
  return new Promise(async (resolve, _reject) => {
    try {
      const response = await apolloClient.query({ query: meQuery });
      if (!response || !response.data || !response.data.me) {
        resolve(null);
      } else resolve(response.data.me);
    } catch (error) {
      resolve(null);
    }
  });
};