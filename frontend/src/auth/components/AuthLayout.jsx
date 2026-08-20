import { BrandMark } from './BrandMark.jsx'
import { PointCloudGraphic } from './PointCloudGraphic.jsx'

export function AuthLayout({ children }) {
  return (
    <main className="app-shell">
      <section className="auth-panel" aria-label="Account access">
        <a className="brand" href="/sign-in" aria-label="CloudPoint home">
          <BrandMark />
          <span>CloudPoint</span>
        </a>
        <div className="auth-panel__content">{children}</div>
        <footer className="auth-footer">
          <span>© {new Date().getFullYear()} CloudPoint</span>
          <span>Secure 3D data workspace</span>
        </footer>
      </section>

      <aside className="visual-panel" aria-label="CloudPoint platform overview">
        <PointCloudGraphic />
        <div className="visual-panel__copy">
          <p className="visual-panel__label">From raw data to insight</p>
          <h2>See every point.<br />Understand the whole.</h2>
          <p className="visual-panel__text">
            Upload, classify, and explore complex 3D point clouds in one secure cloud workspace.
          </p>
        </div>
      </aside>
    </main>
  )
}
