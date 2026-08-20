import { useState } from 'react'
import { PasswordField } from '../components/PasswordField.jsx'
import { TextField } from '../components/TextField.jsx'
import { signIn } from '../services/mockAuthService.js'
import { validateEmail, validatePassword } from '../validation.js'

export function SignInPage({ onAuthenticated, onNavigateToSignUp }) {
  const [form, setForm] = useState({ email: '', password: '', remember: true })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (event) => {
    const { name, value, checked, type } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setFormError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setIsSubmitting(true)
    setFormError('')
    try {
      const user = await signIn(form)
      onAuthenticated(user)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to sign in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const useDemoAccount = () => {
    setForm((current) => ({
      ...current,
      email: 'demo@cloudpoint.dev',
      password: 'CloudPoint123!',
    }))
    setErrors({})
    setFormError('')
  }

  return (
    <div>
      <p className="eyebrow">Welcome back</p>
      <h1 className="auth-title">Sign in to your workspace</h1>
      <p className="auth-subtitle">Continue managing and exploring your 3D point-cloud projects.</p>

      <form className="form-stack" noValidate onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          error={errors.email}
          onChange={updateField}
        />
        <PasswordField
          id="password"
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={form.password}
          error={errors.password}
          onChange={updateField}
        />

        <div className="form-options">
          <label className="checkbox">
            <input name="remember" type="checkbox" checked={form.remember} onChange={updateField} />
            <span className="checkbox__box" aria-hidden="true" />
            <span>Remember me</span>
          </label>
          <button className="text-button" type="button" onClick={() => window.alert('Password reset will be connected when the authentication backend is available.')}>
            Forgot password?
          </button>
        </div>

        {formError && <p className="form-error" role="alert">{formError}</p>}

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="auth-switch">
        New to CloudPoint?{' '}
        <button className="text-button" type="button" onClick={onNavigateToSignUp}>Create an account</button>
      </p>

      <div className="demo-note">
        <strong>Frontend demo:</strong> use <strong>demo@cloudpoint.dev</strong> with <strong>CloudPoint123!</strong>, or create a local account.{' '}
        <button className="text-button" type="button" onClick={useDemoAccount}>Fill demo credentials</button>
      </div>
    </div>
  )
}
