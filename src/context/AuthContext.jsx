import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Persist token and fetch user on reload
  useEffect(() => {
    if (token) {
      // Fake Store API doesn't have a /me endpoint
      // so we store user info in localStorage too
      const savedUser = localStorage.getItem('user')
      if (savedUser) setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (username, password) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!res.ok) throw new Error('Invalid credentials')
      const data = await res.json()

      const userData = { username, name: username }
      setToken(data.token)
      setUser(userData)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

const signup = async (name, username, password) => {
  setLoading(true)
  setError(null)
  try {
    const res = await fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, password })
    })
    if (!res.ok) throw new Error('Signup failed')

    // Auto login to get a real token
    const loginRes = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'mor_2314', password: '83r5^_' })
    })
    if (!loginRes.ok) throw new Error('Auto login failed')
    const loginData = await loginRes.json()

    // Use the ACTUAL user's info, not the demo account's
    const userData = { username, name }
    setToken(loginData.token)
    setUser(userData)
    localStorage.setItem('token', loginData.token)
    localStorage.setItem('user', JSON.stringify(userData))

    return { success: true }
  } catch (err) {
    setError(err.message)
    return { success: false, message: err.message }
  } finally {
    setLoading(false)
  }
}

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const isLoggedIn = !!token

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      error,
      login,
      signup,
      logout,
      isLoggedIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)