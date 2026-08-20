const SESSION_KEY = 'cloudpoint.session'
const ACCOUNT_KEY = 'cloudpoint.mock-accounts'
const DEMO_ACCOUNT = {
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'demo@cloudpoint.dev',
}

const wait = (milliseconds = 450) => new Promise((resolve) => {
  window.setTimeout(resolve, milliseconds)
})

function readJson(storage, key, fallback) {
  try {
    return JSON.parse(storage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

function normaliseEmail(email) {
  return email.trim().toLowerCase()
}

function storeSession(user, remember = true) {
  const storage = remember ? window.localStorage : window.sessionStorage
  const otherStorage = remember ? window.sessionStorage : window.localStorage
  otherStorage.removeItem(SESSION_KEY)
  storage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function getSession() {
  return readJson(window.sessionStorage, SESSION_KEY, null)
    ?? readJson(window.localStorage, SESSION_KEY, null)
}

export async function signIn({ email, password, remember }) {
  await wait()
  const normalisedEmail = normaliseEmail(email)
  const accounts = readJson(window.localStorage, ACCOUNT_KEY, [])
  const account = normalisedEmail === DEMO_ACCOUNT.email
    ? DEMO_ACCOUNT
    : accounts.find((candidate) => candidate.email === normalisedEmail)
  const validPassword = normalisedEmail !== DEMO_ACCOUNT.email || password === 'CloudPoint123!'

  if (!account || !validPassword) {
    throw new Error('The email or password is incorrect. Try the demo account shown below.')
  }

  storeSession(account, remember)
  return account
}

export async function signUp({ firstName, lastName, email }, remember = true) {
  await wait(600)
  const normalisedEmail = normaliseEmail(email)
  const accounts = readJson(window.localStorage, ACCOUNT_KEY, [])

  if (normalisedEmail === DEMO_ACCOUNT.email || accounts.some((account) => account.email === normalisedEmail)) {
    throw new Error('An account with this email already exists. Sign in instead.')
  }

  const account = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: normalisedEmail,
  }

  window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify([...accounts, account]))
  storeSession(account, remember)
  return account
}

export function signOut() {
  window.localStorage.removeItem(SESSION_KEY)
  window.sessionStorage.removeItem(SESSION_KEY)
}
