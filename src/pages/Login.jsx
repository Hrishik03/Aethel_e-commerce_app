import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/AuthContext'

const Login = () => {
  const { login, signup, loading, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [isLoginView, setIsLoginView] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')

  const [form, setForm] = useState({
    name: '',
    username: '',
    password: ''
  })

  // Redirect if already logged in
  if (isLoggedIn) {
    navigate(from, { replace: true })
    return null
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!form.username || !form.password) {
      setFormError('Please fill in all fields.')
      return
    }

    let result
    if (isLoginView) {
      result = await login(form.username, form.password)
    } else {
      if (!form.name) {
        setFormError('Please enter your full name.')
        return
      }
      result = await signup(form.name, form.username, form.password)
    }

    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setFormError(result.message || 'Something went wrong. Try again.')
    }
  }

  const toggleView = () => {
    setIsLoginView(prev => !prev)
    setFormError('')
    setForm({ name: '', username: '', password: '' })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-xl p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="font-bold text-xl tracking-tight text-neutral-950">
              AETHEL
            </Link>
            <h1 className="text-xl font-bold text-neutral-950 mt-4">
              {isLoginView ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              {isLoginView
                ? 'Sign in to access your cart and orders.'
                : 'Register to start shopping with us.'}
            </p>
          </div>

          {/* Demo Credentials Hint */}
          {isLoginView && (
            <div className="mb-5 bg-neutral-50 border border-neutral-100 rounded-xl p-3 text-center">
              <p className="text-[11px] text-neutral-400 font-medium">
                Demo credentials
              </p>
              <p className="text-xs text-neutral-600 font-mono mt-0.5">
                username: <span className="font-bold">mor_2314</span> &nbsp;|&nbsp; password: <span className="font-bold">83r5^_</span>
              </p>
            </div>
          )}

          {/* Form */}
          <div className="flex flex-col gap-4">

            {/* Full Name — Signup only */}
            {!isLoginView && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="bg-neutral-50 border-neutral-200 text-sm"
                />
              </div>
            )}

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                Username
              </label>
              <Input
                type="text"
                name="username"
                placeholder="your_username"
                value={form.username}
                onChange={handleChange}
                className="bg-neutral-50 border-neutral-200 text-sm"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Password
                </label>
                {isLoginView && (
                  <span className="text-[10px] text-neutral-400 hover:text-neutral-700 cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="bg-neutral-50 border-neutral-200 text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>

            {/* Error */}
            {formError && (
              <p className="text-xs text-red-500 font-medium">{formError}</p>
            )}

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-6 bg-neutral-950 hover:bg-neutral-700 text-white rounded-xl font-semibold text-sm tracking-wide mt-2"
            >
              {loading
                ? 'Please wait...'
                : isLoginView ? 'Sign In' : 'Create Account'}
            </Button>
          </div>

          {/* Toggle */}
          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <button
              onClick={toggleView}
              className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors font-medium"
            >
              {isLoginView
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign In'}
            </button>
          </div>

        </div>

        {/* Trust Signal */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Your data is safe with SSL encryption</span>
        </div>

      </div>
    </div>
  )
}

export default Login