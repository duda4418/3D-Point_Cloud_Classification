import { useState } from 'react'
import { PasswordField } from '../components/PasswordField.jsx'
import { TextField } from '../components/TextField.jsx'
import { signUp } from '../services/mockAuthService.js'
import { validateEmail, validateName, validatePassword } from '../validation.js'

export function SignUpPage({ onAuthenticated, onNavigateToSignIn }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '', acceptedTerms: false,
  })
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
      firstName: validateName(form.firstName, 'First name'),
      lastName: validateName(form.lastName, 'Last name'),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: form.confirmPassword !== form.password ? 'Passwords do not match.' : '',
      acceptedTerms: form.acceptedTerms ? '' : 'You must accept the terms to continue.',
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setIsSubmitting(true)
    setFormError('')
    try {
      const user = await signUp(form)
      onAuthenticated(user)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to create your account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <p className="eyebrow">Get started</p>
      <h1 className="auth-title">Create your account</h1>
      <p className="auth-subtitle">Set up your workspace and turn complex 3D data into clear insight.</p>

      <form className="form-stack" noValidate onSubmit={handleSubmit}>
        <div className="form-row">
          <TextField
            id="first-name"
            label="First name"
            name="firstName"
            autoComplete="given-name"
            placeholder="Alex"
            value={form.firstName}
            error={errors.firstName}
            onChange={updateField}
          />
          <TextField
            id="last-name"
            label="Last name"
            name="lastName"
            autoComplete="family-name"
            placeholder="Morgan"
            value={form.lastName}
            error={errors.lastName}
            onChange={updateField}
          />
        </div>
        <TextField
          id="signup-email"
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
          id="signup-password"
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={form.password}
          error={errors.password}
          hint="Use at least 8 characters."
          onChange={updateField}
        />
        <PasswordField
          id="confirm-password"
          label="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Repeat your password"
          value={form.confirmPassword}
          error={errors.confirmPassword}
          onChange={updateField}
        />

        <div>
          <label className="checkbox">
            <input name="acceptedTerms" type="checkbox" checked={form.acceptedTerms} onChange={updateField} />
            <span className="checkbox__box" aria-hidden="true" />
            <span>I agree to the Terms of Service and Privacy Policy.</span>
          </label>
          {errors.acceptedTerms && <p className="field__error" role="alert">{errors.acceptedTerms}</p>}
        </div>

        {formError && <p className="form-error" role="alert">{formError}</p>}

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account?{' '}
        <button className="text-button" type="button" onClick={onNavigateToSignIn}>Sign in</button>
      </p>
    </div>
  )
}
