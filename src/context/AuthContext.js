// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// auth reducer
import { login, logout } from 'src/store/apps/auth'
import { useDispatch } from 'react-redux'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      const userData = window.localStorage.getItem('userData')
        ? JSON.parse(window.localStorage.getItem('userData'))
        : ''
      console.log(userData)
      if (storedToken) {
        setLoading(false)
        userData.role = userData?.role.roleName
        setUser(userData)

        // console.log(window.location.pathname)
        router.replace(`${window.location.pathname}`)

        // router.replace('/dashboards/analytics')

        // setLoading(true)
        // await axios
        //   .get(authConfig.meEndpoint, {
        //     headers: {
        //       Authorization: storedToken
        //     }
        //   })
        //   .then(async response => {
        //     setLoading(false)
        //     setUser({ ...response.data.userData })
        //   })
        //   .catch(() => {
        //     localStorage.removeItem('userData')
        //     localStorage.removeItem('refreshToken')
        //     localStorage.removeItem('accessToken')
        //     setUser(null)
        //     setLoading(false)
        //     if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
        //       router.replace('/login')
        //     }
        //   })
        // dispatch(logout())

        dispatch(login({ token: storedToken, user: userData }))
      } else {
        // setLoading(true)
        // router.replace('/login')
        localStorage.removeItem('userData')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        setUser(null)
        setLoading(false)
        if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
          router.replace('/login')
        }
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    console.log(params)
    axios
      .post(authConfig.baseUrl + authConfig.loginEndpoint, params)
      .then(async response => {
        params.rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token) : null
        console.log(router.query)
        const returnUrl = router.query.returnUrl

        // console.log(response.data.user.role.roleName)
        const userData = { ...response?.data?.user }
        userData.role = userData?.role.roleName
        console.log(userData.role)
        setUser(userData)

        // setUser({ ...response.data.user })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.user)) : null

        // auth login dispatch

        // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        const redirectUrl = '/dashboards/analytics'
        dispatch(login({ token: response?.data?.token, user: response?.data?.user }))
        router.replace(redirectUrl)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
