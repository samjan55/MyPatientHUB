 import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './SignUp.css'

const DEMO_CODE = '1234'
const HANDLE = 46

function SignUp() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const trackRef = useRef(null)

  const [mode, setMode] = useState('phone')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [slideX, setSlideX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [smsSent, setSmsSent] = useState(false)
  const [code, setCode] = useState('')

  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const getMax = () =>
    trackRef.current ? trackRef.current.offsetWidth - HANDLE - 8 : 0

  /* ---------- slider ---------- */

  const startDrag = (e) => {
    if (smsSent) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
  }

  const onMove = (e) => {
    if (!dragging) return
    const rect = trackRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - 4 - HANDLE / 2
    setSlideX(Math.min(Math.max(x, 0), getMax()))
  }

  const endDrag = () => {
    if (!dragging) return
    setDragging(false)

    if (slideX >= getMax() * 0.9) {
      setSlideX(getMax())
      setSmsSent(true)
      setError('')
    } else {
      setSlideX(0)
    }
  }

  /* ---------- mode ---------- */

  const switchMode = () => {
    setMode(mode === 'phone' ? 'email' : 'phone')
    setIdentifier('')
    setError('')
    setSmsSent(false)
    setSlideX(0)
    setCode('')
  }

  /* ---------- submit ---------- */

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const value = identifier.trim()

    if (mode === 'phone') {
      if (!/^\+?[0-9]{9,15}$/.test(value.replace(/\s/g, ''))) {
        setError(t('signupErrors.invalidPhone'))
        return
      }
    } else {
      if (!value.includes('@') || !value.includes('.')) {
        setError(t('signupErrors.invalidEmail'))
        return
      }
    }

    if (password.length < 6) {
      setError(t('signupErrors.shortPassword'))
      return
    }

    if (mode === 'phone') {
      if (!smsSent) {
        setError(t('signupErrors.slideFirst'))
        return
      }

      if (code !== DEMO_CODE) {
        setError(t('signupErrors.wrongCode'))
        return
      }
    }

    const users = JSON.parse(localStorage.getItem('mph_users') || '[]')

    if (users.some((u) => u.identifier === value)) {
      setError(t('signupErrors.accountExists'))
      return
    }

    // فقط برای نمایش (demo). در پروژه‌ی واقعی رمز باید در سرور هش شود.
    const newUser = {
      id: Date.now(),
      type: mode,
      identifier: value,
      password,
    }

    users.push(newUser)

    localStorage.setItem('mph_users', JSON.stringify(users))
    localStorage.setItem('mph_pending', String(newUser.id))

    setDone(true)
    setTimeout(() => navigate('/register-as'), 1500)
  }

  /* ---------- UI ---------- */

  return (
    <div className="su-page">

      <div className="su-glow"></div>

      <div className="su-card">

        {done ? (

          <div className="su-done">
            <div className="su-check">
              <i className="fa-solid fa-check"></i>
            </div>
            <h2>{t('signup.accountCreated')}</h2>
            <p>{t('signup.nextStep')}</p>
          </div>

        ) : (

          <form onSubmit={handleSubmit}>

            <h2 className="su-title">{t('signup.registerWith')}</h2>

            <div className="su-social">
              <button
                type="button"
                onClick={() => alert(t('signup.facebookComingSoon'))}
              >
                <i className="fa-brands fa-facebook-f"></i>
              </button>

              <button
                type="button"
                onClick={() => alert(t('signup.googleComingSoon'))}
              >
                <i className="fa-brands fa-google"></i>
              </button>
            </div>

            <div className="su-or"><span>{t('signup.or')}</span></div>

            <input
              className="su-input"
              type={mode === 'phone' ? 'tel' : 'email'}
              placeholder={
                mode === 'phone'
                  ? t('signup.phoneNumber')
                  : t('signup.emailAddress')
              }
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value)
                setError('')
              }}
            />

            <div className="su-pass">
              <input
                className="su-input"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('signup.password')}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
              />

              <button
                type="button"
                className="su-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={
                    showPassword
                      ? 'fa-regular fa-eye-slash'
                      : 'fa-regular fa-eye'
                  }
                ></i>
              </button>
            </div>

            {mode === 'phone' && (
              <>
                <div
                  className={`su-slider ${smsSent ? 'su-slider-done' : ''}`}
                  ref={trackRef}
                >
                  <div
                    className="su-slider-fill"
                    style={{ width: slideX + HANDLE + 4 }}
                  ></div>

                  <span className="su-slider-text">
                    {smsSent
                      ? t('signup.smsCodeSent')
                      : t('signup.slideForCode')}
                  </span>

                  <div
                    className="su-handle"
                    style={{
                      left: 4 + slideX,
                      transition: dragging ? 'none' : 'left .3s ease',
                    }}
                    onPointerDown={startDrag}
                    onPointerMove={onMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                  >
                    <i
                      className={
                        smsSent
                          ? 'fa-solid fa-check'
                          : 'fa-solid fa-chevron-right'
                      }
                    ></i>
                  </div>
                </div>

                {smsSent && (
                  <>
                    <input
                      className="su-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder={t('signup.enterCode')}
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value)
                        setError('')
                      }}
                    />

                    <p className="su-hint">
                      {t('signup.demoCode')}: {DEMO_CODE}
                    </p>
                  </>
                )}
              </>
            )}

            {error && <p className="su-error">{error}</p>}

            <button type="submit" className="su-main-btn">
              {t('signup.signUp')}
            </button>

            <p className="su-terms">
              {t('signup.terms')}
            </p>

            <div className="su-or"><span>{t('signup.or')}</span></div>

            <button
              type="button"
              className="su-alt-btn"
              onClick={switchMode}
            >
              {mode === 'phone'
                ? t('signup.signUpWithEmail')
                : t('signup.signUpWithPhone')}
            </button>

            <p className="su-member">
              {t('signup.alreadyMember')}{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/login')
                }}
              >
                {t('signup.signIn')}
              </a>
            </p>

          </form>
        )}

      </div>
    </div>
  )
}

export default SignUp