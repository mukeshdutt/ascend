import { useState } from 'react'
import type { FormEvent } from 'react'
import { Icon } from '../../shared/icons/Icon'
import './auth.css'

type LoginProps = {
  onLogin: (email: string) => void
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onLogin(email)
  }

  return (
    <div className="auth">
      {/* Brand / marketing panel */}
      <section className="auth-brand">
        <div className="auth-brand-top">
          <div className="brand">
            <i>◆</i>
            <span>Ascend</span>
          </div>
        </div>
        <div className="auth-brand-body">
          <div className="rocket">
            <Icon name="rocket" size={72} strokeWidth={1.6} />
          </div>
          <h2>Keep ascending 🚀</h2>
          <p>
            Track your interviews, study plans and progress across every module — all in one
            focused dashboard.
          </p>
        </div>
        <div className="auth-brand-foot">© 2026 Ascend. All rights reserved.</div>
      </section>

      {/* Form panel */}
      <section className="auth-form-panel">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <p className="auth-sub">Sign in to continue to your dashboard.</p>

          <label className="field">
            <span>Email</span>
            <div className="field-input">
              <Icon name="mail" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </label>

          <label className="field">
            <span>Password</span>
            <div className="field-input">
              <Icon name="lock" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} />
              </button>
            </div>
          </label>

          <div className="auth-row">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a className="forgot" href="#">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="auth-submit">
            Sign in
            <Icon name="arrowRight" size={18} />
          </button>

          <p className="auth-signup">
            Don't have an account? <a href="#">Create one</a>
          </p>
        </form>
      </section>
    </div>
  )
}
