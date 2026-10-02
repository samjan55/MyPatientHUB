import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

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
    navigate('/dashboard')
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="welcome">
          <h1>Welcome to MyPatientHUB!</h1>
          <p>We provide smart healthcare services in your hands.</p>
        </div>
      </div>

      <div className="login-box">
        <h2>Sign in to MyPatientHUB</h2>

        <div className="social">
          <button>
            <i className="fa-brands fa-facebook-f"></i>
            Facebook
          </button>
          <button>
            <i className="fa-brands fa-google"></i>
            Google
          </button>
        </div>

        <form id="loginForm" noValidate onSubmit={handleSubmit}>
          <input
            type="text"
            id="email"
            placeholder="Email or Phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p id="emailError">{emailError}</p>

          <input
            type="password"
            id="password"
            placeholder="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p id="passwordError">{passwordError}</p>

          <button type="submit" className="sign-in">
            SIGN IN
          </button>

          <div className="options">
            <a href="#">Forgot password?</a>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
          </div>
        </form>

        <div className="or">
          <span>or</span>
        </div>

        <button className="sign-up">SIGN UP</button>
      </div>

      <footer className="login-footer">
        <a href="#">Google Play Store APP</a>
        <a href="#">App Store APP</a>
        <a href="#">About MyPatientHUB</a>
        <a href="#">About Us</a>
        <a href="#">Our Blog</a>
      </footer>
    </div>
  )
}

export default Login