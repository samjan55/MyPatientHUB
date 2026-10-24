import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import heartImage from '../assets/hospital-login.jpeg'
import './login.css'

function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [lightOn, setLightOn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [particles, setParticles] = useState([])
  const [signingIn, setSigningIn] = useState(false)

  const [creepy, setCreepy] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const newParticles = []

    for (let i = 0; i < 35; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 5,
      })
    }

    setParticles(newParticles)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    setEmailError('')
    setPasswordError('')

    const value = email.trim()

    if (value === '') {
      setEmailError('Please enter your email or phone.')
      return
    }

    const isEmail = /^\S+@\S+\.\S+$/.test(value)
    const isPhone = /^\+?[0-9]{9,15}$/.test(value.replace(/[\s-]/g, ''))

    if (!isEmail && !isPhone) {
      setEmailError('Please enter a valid email or phone number.')
      return
    }

    if (password === '') {
      setPasswordError('Please enter your password.')
      return
    }

    setSigningIn(true)

    setTimeout(() => {
      navigate('/dashboard')
    }, 3000)
  }

  const handleEyes = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) / 50
    const y = (e.clientY - (rect.top + rect.height / 2)) / 50
    const clamp = (n) => Math.max(-4, Math.min(4, n * 4))

    e.currentTarget.style.setProperty('--px', `${clamp(x)}px`)
    e.currentTarget.style.setProperty('--py', `${clamp(y)}px`)
  }

  const handleSignUp = () => {
    if (creepy) return

    setCreepy(true)
    setTimeout(() => setLeaving(true), 1000)
    setTimeout(() => navigate('/signup'), 1400)
  }

  return (
    <div
      className={`login-page ${lightOn ? 'light-on' : ''} ${
        leaving ? 'leaving' : ''
      }`}
    >

      {/* ================= LEFT SIDE ================= */}

      <div className="heart-side">

        <div className="particles">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            ></span>
          ))}
        </div>

        <div className="heart-content">

          <div className="heart-title" translate="no">
            <span>♥</span>
            MyPatientHUB
          </div>

          <h1>
            {t('Smart Healthcare')}
            <br />
            <span>{t('In Your Hands')}</span>
          </h1>

          <p>{t('Your health. Your care. Your connection.')}</p>

          <div className="big-heart">

            <div className="heart-glow"></div>

            <img src={heartImage} alt="Medical Heart" />

            <div className="float-card float-card-1">
              <i className="fa-solid fa-shield-halved"></i>
              {t('Secure Data')}
            </div>

            <div className="float-card float-card-2">
              <i className="fa-regular fa-clock"></i>
              {t('24/7 Care')}
            </div>

            <div className="float-card float-card-3">
              <i className="fa-solid fa-file-medical"></i>
              {t('Smart Records')}
            </div>

            <div className="heart-ecg">
              <svg viewBox="0 0 500 100">
                <polyline
                  points="
                    0,50
                    80,50
                    105,50
                    120,20
                    135,80
                    155,8
                    175,50
                    260,50
                    280,50
                    295,20
                    310,80
                    330,10
                    350,50
                    500,50
                  "
                />
              </svg>
            </div>

          </div>

          <div className="stats-row">
            <div>
              <strong>10K+</strong>
              <span>{t('Patients')}</span>
            </div>

            <div>
              <strong>500+</strong>
              <span>{t('Doctors')}</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>{t('Support')}</span>
            </div>
          </div>

        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div className="login-side">

        <div className="login-lang">
          <LanguageSwitcher />
        </div>

        <div className="login-particles">
          {particles.slice(0, 12).map((particle) => (
            <span
              key={particle.id}
              className="login-particle"
              style={{
                left: `${particle.left}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            ></span>
          ))}
        </div>


        {/* ================= LAMP ================= */}

        <div className="lamp-area">

          <button
            type="button"
            className={`lamp ${lightOn ? 'lamp-on' : ''}`}
            onClick={() => setLightOn(!lightOn)}
          >
            <div className="lamp-head"></div>
            <div className="lamp-light"></div>
            <div className="lamp-neck"></div>
            <div className="lamp-base"></div>
          </button>

          <span>
            {lightOn ? t('HEALTH SYSTEM ON') : t('TURN ON THE LIGHT')}
          </span>

        </div>


        {/* ================= LOGIN CARD ================= */}

        <div className={`login-card ${lightOn ? 'card-visible' : ''}`}>

          <div className="card-logo">

            <div className="card-logo-icon">♥</div>

            <div>
              <strong translate="no">MyPatientHUB</strong>
              <small>{t('Healthcare Platform')}</small>
            </div>

          </div>

          <h2>{t('Welcome Back')}</h2>

          <p className="card-subtitle">
            {t('Sign in to continue to your account')}
          </p>


          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="input-group">

              <label>{t('Email or Phone')}</label>

              <div className="input-box">

                <i className="fa-regular fa-envelope"></i>

                <input
                  type="text"
                  placeholder={t('Enter your email or phone')}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError('')
                  }}
                  disabled={!lightOn || signingIn}
                />

              </div>

              {emailError && <p className="error">{t(emailError)}</p>}

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <label>{t('Password')}</label>

              <div className="input-box">

                <i className="fa-solid fa-lock"></i>

                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('Enter your password')}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordError('')
                  }}
                  disabled={!lightOn || signingIn}
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={!lightOn || signingIn}
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

              {passwordError && <p className="error">{t(passwordError)}</p>}

            </div>


            {/* OPTIONS */}

            <div className="login-options">

              <label>
                <input type="checkbox" disabled={!lightOn || signingIn} />
                {' '}
                {t('Remember me')}
              </label>

              <a href="#">{t('Forgot password?')}</a>

            </div>


            {/* ================= SIGN IN (ambulance) ================= */}

            <button
              type="submit"
              className={`sign-in-button ${signingIn ? 'signing-in' : ''}`}
              disabled={!lightOn || signingIn}
            >

              <span className="sign-text">{t('SIGN IN')}</span>

              <svg
                className="ambulance"
                width="46"
                height="25"
                viewBox="0 0 64 34"
                aria-hidden="true"
              >
                <rect x="2" y="6" width="38" height="18" rx="3" fill="#fff" />
                <path d="M40 12h10l8 7v5H40z" fill="#dfe8ee" />
                <path
                  d="M20 10v10M15 15h10"
                  stroke="#e24b4a"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <rect
                  className="amb-light"
                  x="14"
                  y="2"
                  width="12"
                  height="4"
                  rx="1"
                />
                <circle cx="14" cy="26" r="5" fill="#1b2b34" stroke="#fff" strokeWidth="1.5" />
                <circle cx="48" cy="26" r="5" fill="#1b2b34" stroke="#fff" strokeWidth="1.5" />
              </svg>

            </button>


            {/* ================= SIGN UP (creepy eyes) ================= */}

            <div
              className={`creepy-wrap ${creepy ? 'creepy-go' : ''}`}
              onMouseMove={handleEyes}
            >
              <div className="signup-wrap">
                <button
                  type="button"
                  className="sign-up-button"
                  onClick={handleSignUp}
                >
                  <span className="signup-plus">+</span>
                  <span>{t('SignUP')}</span>
                  <i className="fa-solid fa-arrow-right signup-arrow"></i>
                </button>
              </div>
            </div>
          </form>

          <p className="bottom-text">
            {t('Secure healthcare access with MyPatientHUB')}
          </p>

        </div>

      </div>

    </div>
  )
}

export default Login