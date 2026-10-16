import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import patientimage from '../assets/patient-avatar.jpeg'
import './Settings.css'

const menu = [
  { icon: 'house', label: 'Dashboard', to: '/dashboard' },
  { icon: 'calendar', label: 'Appointments', to: '/appointments' },
  { icon: 'user-doctor', label: 'Find Doctor', to: '/finddoctor' },
  { icon: 'hospital', label: 'Find Clinic', to: '/findclinic' },
  { icon: 'comments', label: 'Chat', to: '/chat' },
  { icon: 'store', label: 'Find MarketPlace', to: '/marketplace' },
  { icon: 'prescription-bottle-medical', label: 'Find Pharmacy', to: '/findpharmacy' },
  { icon: 'users', label: 'My Dependents', to: '/mydependents' },
  { icon: 'user', label: 'My Account', to: '/myaccount' },
  { icon: 'gear', label: 'Settings', to: '/settings' },
]

const sections = [
  { id: 'basic-info', icon: 'user', label: 'Basic Info' },
  { id: 'password', icon: 'lock', label: 'Change Password' },
  { id: 'security', icon: 'shield-halved', label: '2FA' },
  { id: 'sessions', icon: 'laptop', label: 'Sessions' },
  { id: 'delete-account', icon: 'trash', label: 'Delete Account' },
]

const initialProfile = {
  firstName: '',
  lastName: '',
  gender: '',
  birthDate: '',
  email: '',
  bloodGroup: '',
  location: '',
  phone: '',
  height: '',
  weight: '',
}

function loadProfile() {
  try {
    const saved = JSON.parse(
      localStorage.getItem('mypatienthub_profile') || '{}'
    )

    return { ...initialProfile, ...saved }
  } catch {
    return initialProfile
  }
}

function Settings() {
  const navigate = useNavigate()
  const location = useLocation()

  const [sidebarHidden, setSidebarHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('basic-info')
  const [invisible, setInvisible] = useState(false)
  const [profile, setProfile] = useState(loadProfile)
  const [saved, setSaved] = useState(false)

  const [passwords, setPasswords] = useState({
    current: '',
    newPassword: '',
    confirm: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [deleteConfirmed, setDeleteConfirmed] = useState(false)

  const userName =
    [profile.firstName, profile.lastName].filter(Boolean).join(' ') ||
    localStorage.getItem('userName') ||
    'Patient'

  const updateProfile = (e) => {
    const { name, value } = e.target

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))

    setSaved(false)
  }

  const saveProfile = (e) => {
    e.preventDefault()

    localStorage.setItem(
      'mypatienthub_profile',
      JSON.stringify(profile)
    )

    localStorage.setItem('userName', userName)
    setSaved(true)
  }

  const goToSection = (id) => {
    setActiveSection(id)

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handlePassword = (e) => {
    e.preventDefault()

    if (passwords.newPassword !== passwords.confirm) {
      alert('Passwords do not match.')
      return
    }

    alert('Password changes require backend authentication.')
  }

  return (
    <div className="settings-layout">

      {/* SIDEBAR */}

      <aside className={`settings-sidebar ${sidebarHidden ? 'hide' : ''}`}>

        <div className="settings-logo">
          <div className="settings-logo-icon">
            <i className="fa-solid fa-heart-pulse"></i>
          </div>
          <span>MyPatientHUB</span>
        </div>

        <nav className="settings-menu">
          {menu.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={location.pathname === item.to ? 'active' : ''}
            >
              <i className={`fa-solid fa-${item.icon}`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="settings-help">
          <i className="fa-solid fa-question"></i>
        </div>

      </aside>

      {/* MAIN */}

      <main className={`settings-main ${sidebarHidden ? 'expanded' : ''}`}>

        {/* TOPBAR */}

        <header className="settings-topbar">

          <div className="settings-top-title">
            <div className="settings-breadcrumb">
              <i className="fa-solid fa-house"></i>
              <span>/</span>
              <span>Account Settings</span>

              <button
                type="button"
                className="settings-menu-toggle"
                onClick={() => setSidebarHidden(!sidebarHidden)}
              >
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>

            <h2>Account Settings</h2>
          </div>

          <div className="settings-top-right">
            <button
              type="button"
              className="settings-logout"
              onClick={() => navigate('/login')}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Log out
            </button>

            <i className="fa-solid fa-gear"></i>
            <i className="fa-solid fa-bell"></i>
          </div>

        </header>

        <div className="settings-content">

          {/* PROFILE HERO */}

          <section className="settings-hero">

            <div className="settings-hero-left">
              <div className="settings-avatar">
                <img src={patientimage} alt="Patient" />
                <span className="settings-avatar-status"></span>
              </div>

              <div className="settings-hero-info">
                <span className="settings-hero-label">
                  MY PATIENT HUB ACCOUNT
                </span>

                <h1>{userName}</h1>

                <div className="settings-patient-badge">
                  <i className="fa-solid fa-heart-pulse"></i>
                  Patient
                </div>
              </div>
            </div>

            <div className="settings-hero-right">
              <span>Switch to invisible</span>

              <button
                type="button"
                className={`settings-switch ${invisible ? 'on' : ''}`}
                onClick={() => setInvisible(!invisible)}
                aria-label="Switch invisible status"
              >
                <span></span>
              </button>
            </div>

          </section>

          {/* SECTION NAVIGATION */}

          <nav className="settings-section-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={
                  activeSection === section.id ? 'active' : ''
                }
                onClick={() => goToSection(section.id)}
              >
                <i className={`fa-solid fa-${section.icon}`}></i>
                {section.label}
              </button>
            ))}
          </nav>

          {/* BASIC INFO */}

          <section id="basic-info" className="settings-card">

            <div className="settings-card-heading">
              <div className="settings-heading-icon">
                <i className="fa-solid fa-id-card"></i>
              </div>

              <div>
                <span>PERSONAL INFORMATION</span>
                <h2>Basic Info</h2>
                <p>Manage your personal and medical information.</p>
              </div>
            </div>

            <form onSubmit={saveProfile}>

              <div className="settings-form-grid">

                <label>
                  First Name
                  <input
                    name="firstName"
                    value={profile.firstName}
                    onChange={updateProfile}
                    placeholder="First Name"
                  />
                </label>

                <label>
                  Last Name
                  <input
                    name="lastName"
                    value={profile.lastName}
                    onChange={updateProfile}
                    placeholder="Last Name"
                  />
                </label>

                <label>
                  I'm
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={updateProfile}
                  >
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </label>

                <label>
                  Birth Date
                  <input
                    type="date"
                    name="birthDate"
                    value={profile.birthDate}
                    onChange={updateProfile}
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={updateProfile}
                    placeholder="example@email.com"
                  />
                </label>

                <label>
                  Blood Group
                  <select
                    name="bloodGroup"
                    value={profile.bloodGroup}
                    onChange={updateProfile}
                  >
                    <option value="">Select blood group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                      (group) => (
                        <option key={group}>{group}</option>
                      )
                    )}
                  </select>
                </label>

                <label>
                  Your Location
                  <input
                    name="location"
                    value={profile.location}
                    onChange={updateProfile}
                    placeholder="City, Country"
                  />
                </label>

                <label>
                  Phone Number
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={updateProfile}
                    placeholder="+93..."
                  />
                </label>

                <label>
                  Height (cm)
                  <input
                    type="number"
                    name="height"
                    value={profile.height}
                    onChange={updateProfile}
                    placeholder="Height"
                  />
                </label>

                <label>
                  Weight (kg)
                  <input
                    type="number"
                    name="weight"
                    value={profile.weight}
                    onChange={updateProfile}
                    placeholder="Weight"
                  />
                </label>

              </div>

              <div className="settings-form-actions">
                {saved && (
                  <span className="settings-saved">
                    <i className="fa-solid fa-circle-check"></i>
                    Changes saved
                  </span>
                )}

                <button type="submit" className="settings-primary-btn">
                  <i className="fa-solid fa-floppy-disk"></i>
                  Save Changes
                </button>
              </div>

            </form>
          </section>

          {/* PASSWORD */}

          <section id="password" className="settings-card">

            <div className="settings-card-heading">
              <div className="settings-heading-icon">
                <i className="fa-solid fa-lock"></i>
              </div>

              <div>
                <span>ACCOUNT SECURITY</span>
                <h2>Change Password</h2>
                <p>Keep your account safe with a strong password.</p>
              </div>
            </div>

            <div className="settings-password-layout">

              <form onSubmit={handlePassword}>

                <label>
                  Current Password
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Current Password"
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        current: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  New Password
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Confirm New Password
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm New Password"
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirm: e.target.value,
                      })
                    }
                  />
                </label>

                <label className="settings-checkbox-label">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                  Show passwords
                </label>

                <button type="submit" className="settings-primary-btn">
                  <i className="fa-solid fa-key"></i>
                  Change Password
                </button>

              </form>

              <div className="settings-password-guide">
                <div className="settings-guide-icon">
                  <i className="fa-solid fa-shield-heart"></i>
                </div>

                <h3>Password Requirements</h3>

                <p>Follow this guide for a strong password.</p>

                <ul>
                  <li>At least 8 characters</li>
                  <li>One special character</li>
                  <li>One number</li>
                  <li>Use a unique password</li>
                </ul>
              </div>

            </div>

          </section>

          {/* TWO FACTOR AUTHENTICATION */}

          <section id="security" className="settings-card">

            <div className="settings-card-heading">
              <div className="settings-heading-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>

              <div>
                <span>EXTRA PROTECTION</span>
                <h2>Two-Factor Authentication</h2>
                <p>Add another layer of security to your account.</p>
              </div>

              <span className="settings-demo-badge">Not configured</span>
            </div>

            <div className="settings-security-grid">

              <div className="settings-security-item">
                <div className="settings-security-icon">
                  <i className="fa-solid fa-key"></i>
                </div>

                <h3>Security Keys</h3>
                <p>No security keys</p>
                <span>Not Configured</span>
              </div>

              <div className="settings-security-item">
                <div className="settings-security-icon">
                  <i className="fa-solid fa-mobile-screen"></i>
                </div>

                <h3>SMS Number</h3>
                <p>No phone configured</p>
                <span>Not Configured</span>
              </div>

              <div className="settings-security-item">
                <div className="settings-security-icon">
                  <i className="fa-solid fa-shield"></i>
                </div>

                <h3>Authenticator App</h3>
                <p>Not configured</p>
                <span>Not Configured</span>
              </div>

            </div>

          </section>

          {/* SESSIONS */}

          <section id="sessions" className="settings-card">

            <div className="settings-card-heading">
              <div className="settings-heading-icon">
                <i className="fa-solid fa-laptop-medical"></i>
              </div>

              <div>
                <span>DEVICE ACTIVITY</span>
                <h2>Sessions</h2>
                <p>
                  Review devices that have logged into your account.
                </p>
              </div>
            </div>

            <div className="settings-session-item">

              <div className="settings-session-icon">
                <i className="fa-solid fa-desktop"></i>
              </div>

              <div>
                <h3>Current Browser</h3>
                <p>This device · Browser session</p>
              </div>

              <span className="settings-active-badge">
                DEMO
              </span>

            </div>

            <p className="settings-session-note">
              Real session tracking requires a connected authentication
              service.
            </p>

          </section>

          {/* DELETE ACCOUNT */}

          <section
            id="delete-account"
            className="settings-card settings-danger-card"
          >

            <div className="settings-card-heading">
              <div className="settings-heading-icon">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>

              <div>
                <span>DANGER ZONE</span>
                <h2>Delete Account</h2>
                <p>
                  Once you delete your account, there is no going back.
                  Please be certain.
                </p>
              </div>
            </div>

            <label className="settings-checkbox-label">
              <input
                type="checkbox"
                checked={deleteConfirmed}
                onChange={(e) => setDeleteConfirmed(e.target.checked)}
              />
              I want to delete my account.
            </label>

            <button
              type="button"
              className="settings-delete-btn"
              disabled={!deleteConfirmed}
              onClick={() =>
                alert('Account deletion requires backend authentication.')
              }
            >
              <i className="fa-solid fa-trash"></i>
              Delete Account
            </button>

          </section>

        </div>

        {/* FOOTER */}

        <footer className="settings-footer">
          <p>© 2026 MyPatientHUB. Your health, our priority.</p>

          <div>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/finddoctor">Find Doctor</Link>
          </div>
        </footer>

      </main>
    </div>
  )
}

export default Settings