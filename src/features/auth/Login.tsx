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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onLogin(email)
  }

  return (
    <div className="auth">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-brand-mark">
          <i>◆</i>
          <span>Ascend</span>
        </div>

        <h1>Welcome back</h1>
        <p className="auth-sub">Sign in to continue to your dashboard.</p>

        <label className="field">
          <span>Email</span>
          <div className="field-input">
            <Icon name="mail" size={18} />
            <input
              type="email"
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

        <button type="submit" className="auth-submit">
          Sign in
          <Icon name="arrowRight" size={18} />
        </button>
      </form>
    </div>
  )
}
