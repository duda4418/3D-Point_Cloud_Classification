const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email) {
  if (!email.trim()) return 'Email is required.'
  if (!emailPattern.test(email)) return 'Enter a valid email address.'
  return ''
}

export function validatePassword(password) {
  if (!password) return 'Password is required.'
  if (password.length < 8) return 'Password must be at least 8 characters.'
  return ''
}

export function validateName(value, fieldName) {
  if (!value.trim()) return `${fieldName} is required.`
  if (value.trim().length < 2) return `${fieldName} must contain at least 2 characters.`
  return ''
}
