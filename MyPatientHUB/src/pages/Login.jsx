import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import heartImage from '../assets/heart.jpeg'

function Login() {
  const navigate = useNavigate()

  const [lightOn, setLightOn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [particles, setParticles] = useState([])
  const [signingIn, setSigningIn] = useState(false)

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

    if (email === '') {
      setEmailError('Please enter your email.')
      return
    }

    if (!email.includes('@')) {
      setEmailError('Please enter a valid email.')
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

  const handleSignUp = () => {
    alert('Sign Up page coming soon.')
  }

  return (
    <div className={`login-page ${lightOn ? 'light-on' : ''}`}>

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

          <div className="heart-title">
            <span>♥</span>
            MyPatientHUB
          </div>

          <h1>
            Smart Healthcare
            <br />
            <span>In Your Hands</span>
          </h1>

          <p>Your health. Your care. Your connection.</p>

          <div className="big-heart">

            <div className="heart-glow"></div>

            <img src={heartImage} alt="Medical Heart" />

            {/* Glass cards around the heart */}

            <div className="float-card float-card-1">
              <i className="fa-solid fa-shield-halved"></i>
              Secure Data
            </div>

            <div className="float-card float-card-2">
              <i className="fa-regular fa-clock"></i>
              24/7 Care
            </div>

            <div className="float-card float-card-3">
              <i className="fa-solid fa-file-medical"></i>
              Smart Records
            </div>

            {/* ECG line */}

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

        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div className="login-side">

        {/* Floating particles */}

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

          <span className={lightOn ? 'lamp-text-on' : ''}>
            {lightOn ? 'HEALTH SYSTEM ON' : 'TURN ON THE LIGHT'}
          </span>

        </div>


        {/* ================= LOGIN CARD ================= */}

        <div className={`login-card ${lightOn ? 'card-visible' : ''}`}>

          <div className="card-logo">

            <div className="card-logo-icon">♥</div>

            <div>
              <strong>MyPatientHUB</strong>
              <small>Healthcare Platform</small>
            </div>

          </div>

          <h2>Welcome Back</h2>

          <p className="card-subtitle">
            Sign in to continue to your account
          </p>


          {/* ================= FORM ================= */}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="input-group">

              <label>Email or Phone</label>

              <div className="input-box">

                <i className="fa-regular fa-envelope"></i>

                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError('')
                  }}
                  disabled={!lightOn || signingIn}
                />

              </div>

              {emailError && <p className="error">{emailError}</p>}

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <label>Password</label>

              <div className="input-box">

                <i className="fa-solid fa-lock"></i>

                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
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

              {passwordError && <p className="error">{passwordError}</p>}

            </div>


            {/* OPTIONS */}

            <div className="login-options">

              <label>
                <input type="checkbox" disabled={!lightOn || signingIn} />
                {' '}
                Remember me
              </label>

              <a href="#">Forgot password?</a>

            </div>


            {/* ================= SIGN IN ================= */}

            <button
              type="submit"
              className={`sign-in-button ${signingIn ? 'signing-in' : ''}`}
              disabled={!lightOn || signingIn}
            >

              <span className="sign-text">SIGN IN</span>

              <div className="login-room">

                <div className="room-back-wall"></div>
                <div className="room-left-wall"></div>
                <div className="room-right-wall"></div>
                <div className="room-ceiling"></div>
                <div className="room-floor"></div>

                <div className="room-door-frame">
                  <div className="room-door">
                    <span></span>
                  </div>
                </div>

                <div className="walking-person">
                  <div className="person-head"></div>
                  <div className="person-body"></div>
                  <div className="person-arm"></div>
                  <div className="person-leg person-leg-left"></div>
                  <div className="person-leg person-leg-right"></div>
                </div>

              </div>

            </button>


            {/* ================= SIGN UP ================= */}

            <button
              type="button"
              className="sign-up-button"
              onClick={handleSignUp}
              disabled={!lightOn || signingIn}
            >
              SIGN UP
            </button>

          </form>

          <p className="bottom-text">
            Secure healthcare access with MyPatientHUB
          </p>

        </div>

      </div>

    </div>
  )
}

export default Login