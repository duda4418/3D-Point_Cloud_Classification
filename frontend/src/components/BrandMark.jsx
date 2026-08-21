export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="brand-gradient" x1="5" y1="5" x2="35" y2="35">
          <stop stopColor="#5ed9ff" />
          <stop offset="1" stopColor="#1b5df6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="#0a2e64" />
      <path d="M10 25.5 19.8 9 30 25.5 19.8 31 10 25.5Z" fill="none" stroke="url(#brand-gradient)" strokeWidth="2" />
      <circle cx="19.8" cy="9" r="2.4" fill="#79e4ff" />
      <circle cx="10" cy="25.5" r="2.4" fill="#40a8ff" />
      <circle cx="30" cy="25.5" r="2.4" fill="#3d7cff" />
      <circle cx="19.8" cy="31" r="2.4" fill="#6ccfff" />
      <circle cx="20" cy="21" r="1.7" fill="white" />
    </svg>
  )
}
