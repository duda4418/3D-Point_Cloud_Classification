import { BrandMark } from '../components/BrandMark.jsx'

export function WelcomePage({ user, onSignOut }) {
  return (
    <main className="welcome-page">
      <section className="welcome-card" aria-labelledby="welcome-heading">
        <BrandMark />
        <p className="eyebrow">Authentication successful</p>
        <h1 id="welcome-heading">Welcome, {user.firstName}</h1>
        <p>
          You are signed in as <strong>{user.email}</strong>. Your project dashboard will live here once the next frontend phase is ready.
        </p>
        <button className="secondary-button" type="button" onClick={onSignOut}>Sign out</button>
      </section>
    </main>
  )
}
