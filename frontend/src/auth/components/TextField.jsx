export function TextField({ id, label, error, hint, ...inputProps }) {
  const errorId = error ? `${id}-error` : undefined
  const hintId = hint ? `${id}-hint` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        className="field__input"
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
      />
      {error && <p className="field__error" id={errorId}>{error}</p>}
      {hint && <p className="field__hint" id={hintId}>{hint}</p>}
    </div>
  )
}
