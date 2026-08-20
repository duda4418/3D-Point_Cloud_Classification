import { useEffect, useState } from 'react'
import { AuthLayout } from './auth/components/AuthLayout.jsx'
import { getSession, signOut } from './auth/services/mockAuthService.js'
import { SignInPage } from './auth/pages/SignInPage.jsx'
import { SignUpPage } from './auth/pages/SignUpPage.jsx'
import { WelcomePage } from './auth/pages/WelcomePage.jsx'
import './App.css'

const routes = {
  '/': 'sign-in',
  '/sign-in': 'sign-in',
  '/sign-up': 'sign-up',
}

function getRoute() {
  return routes[window.location.pathname] ?? 'sign-in'
}

function App() {
  const [route, setRoute] = useState(getRoute)
  const [session, setSession] = useState(getSession)

  useEffect(() => {
    const handlePopState = () => setRoute(getRoute())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setRoute(getRoute())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSignOut = () => {
    signOut()
    setSession(null)
    navigate('/sign-in')
  }

  if (session) {
    return <WelcomePage user={session} onSignOut={handleSignOut} />
  }

  return (
    <AuthLayout>
      {route === 'sign-up' ? (
        <SignUpPage
          onAuthenticated={setSession}
          onNavigateToSignIn={() => navigate('/sign-in')}
        />
      ) : (
        <SignInPage
          onAuthenticated={setSession}
          onNavigateToSignUp={() => navigate('/sign-up')}
        />
      )}
    </AuthLayout>
  )
}

export default App
