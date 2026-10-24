 import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import patientimage from '../assets/patient-avatar.jpeg'

import './Settings.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

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
  { id: 'basic-info', icon: 'user', label: 'basicInfo' },
  { id: 'password', icon: 'lock', label: 'changePassword' },
  { id: 'security', icon: 'shield-halved', label: 'twoFactor' },
  { id: 'sessions', icon: 'laptop', label: 'sessions' },
  { id: 'delete-account', icon: 'trash', label: 'deleteAccount' },
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
  const { t } = useTranslation()

  const navigate = useNavigate()
  const location = useLocation()

  const [sidebarHidden, setSidebarHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('basic-info')
  const [invisible, setInvisible] = useState(false)
  const [profile, setProfile] = useState(loadProfile)
  const [saved, setSaved] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
    t('patient')

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
      alert(t('passwordMismatch'))
      return
    }

    alert(t('backendPassword'))
  }

  return (
    <div
      className={`settings-layout ${
        sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN */}

      <main className="settings-main">

        <Header
          title={t('settings')}
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />

        <div className="settings-content">

          {/* PROFILE HERO */}

          <section className="settings-hero">

            <div className="settings-hero-left">
              <div className="settings-avatar">
                <img src={patientimage} alt={t('patient')} />
                <span className="settings-avatar-status"></span>
              </div>

              <div className="settings-hero-info">
                <span className="settings-hero-label">
                  {t('myPatientHubAccount')}
                </span>

                <h1>{userName}</h1>

                <div className="settings-patient-badge">
                  <i className="fa-solid fa-heart-pulse"></i>
                  {t('patient')}
                </div>
              </div>
            </div>

            <div className="settings-hero-right">
              <span>{t('switchInvisible')}</span>

              <button
                type="button"
                className={`settings-switch ${invisible ? 'on' : ''}`}
                onClick={() => setInvisible(!invisible)}
                aria-label={t('switchInvisible')}
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
                {t(section.label)}
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
                <span>{t('personalInformation')}</span>
                <h2>{t('basicInfo')}</h2>
                <p>{t('managePersonalInfo')}</p>
              </div>
            </div>

            <form onSubmit={saveProfile}>

              <div className="settings-form-grid">

                <label>
                  {t('firstName')}
                  <input
                    name="firstName"
                    value={profile.firstName}
                    onChange={updateProfile}
                    placeholder={t('firstName')}
                  />
                </label>

                <label>
                  {t('lastName')}
                  <input
                    name="lastName"
                    value={profile.lastName}
                    onChange={updateProfile}
                    placeholder={t('lastName')}
                  />
                </label>

                <label>
                  {t('gender')}
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={updateProfile}
                  >
                    <option value="">{t('selectGender')}</option>
                    <option value="Male">{t('male')}</option>
                    <option value="Female">{t('female')}</option>
                    <option value="Other">{t('other')}</option>
                    <option value="Prefer not to say">
                      {t('preferNotToSay')}
                    </option>
                  </select>
                </label>

                <label>
                  {t('birthDate')}
                  <input
                    type="date"
                    name="birthDate"
                    value={profile.birthDate}
                    onChange={updateProfile}
                  />
                </label>

                <label>
                  {t('email')}
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={updateProfile}
                    placeholder="example@email.com"
                  />
                </label>

                <label>
                  {t('bloodGroup')}
                  <select
                    name="bloodGroup"
                    value={profile.bloodGroup}
                    onChange={updateProfile}
                  >
                    <option value="">{t('selectBloodGroup')}</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                      (group) => (
                        <option key={group}>{group}</option>
                      )
                    )}
                  </select>
                </label>

                <label>
                  {t('location')}
                  <input
                    name="location"
                    value={profile.location}
                    onChange={updateProfile}
                    placeholder={t('cityCountry')}
                  />
                </label>

                <label>
                  {t('phone')}
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={updateProfile}
                    placeholder="+93..."
                  />
                </label>

                <label>
                  {t('height')}
                  <input
                    type="number"
                    name="height"
                    value={profile.height}
                    onChange={updateProfile}
                    placeholder={t('height')}
                  />
                </label>

                <label>
                  {t('weight')}
                  <input
                    type="number"
                    name="weight"
                    value={profile.weight}
                    onChange={updateProfile}
                    placeholder={t('weight')}
                  />
                </label>

              </div>

              <div className="settings-form-actions">
                {saved && (
                  <span className="settings-saved">
                    <i className="fa-solid fa-circle-check"></i>
                    {t('changesSaved')}
                  </span>
                )}

                <button type="submit" className="settings-primary-btn">
                  <i className="fa-solid fa-floppy-disk"></i>
                  {t('saveChanges')}
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
                <span>{t('accountSecurity')}</span>
                <h2>{t('changePassword')}</h2>
                <p>{t('strongPassword')}</p>
              </div>
            </div>

            <div className="settings-password-layout">

              <form onSubmit={handlePassword}>

                <label>
                  {t('currentPassword')}
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('currentPassword')}
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
                  {t('newPassword')}
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('newPassword')}
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
                  {t('confirmPassword')}
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('confirmPassword')}
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
                  {t('showPasswords')}
                </label>

                <button type="submit" className="settings-primary-btn">
                  <i className="fa-solid fa-key"></i>
                  {t('changePassword')}
                </button>

              </form>

              <div className="settings-password-guide">
                <div className="settings-guide-icon">
                  <i className="fa-solid fa-shield-heart"></i>
                </div>

                <h3>{t('passwordRequirements')}</h3>

                <p>{t('passwordGuide')}</p>

                <ul>
                  <li>{t('eightCharacters')}</li>
                  <li>{t('specialCharacter')}</li>
                  <li>{t('oneNumber')}</li>
                  <li>{t('uniquePassword')}</li>
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
                <span>{t('extraProtection')}</span>
                <h2>{t('twoFactorAuthentication')}</h2>
                <p>{t('securityDescription')}</p>
              </div>

              <span className="settings-demo-badge">
                {t('notConfigured')}
              </span>
            </div>

            <div className="settings-security-grid">

              <div className="settings-security-item">
                <div className="settings-security-icon">
                  <i className="fa-solid fa-key"></i>
                </div>

                <h3>{t('securityKeys')}</h3>
                <p>{t('noSecurityKeys')}</p>
                <span>{t('notConfigured')}</span>
              </div>

              <div className="settings-security-item">
                <div className="settings-security-icon">
                  <i className="fa-solid fa-mobile-screen"></i>
                </div>

                <h3>{t('smsNumber')}</h3>
                <p>{t('noPhone')}</p>
                <span>{t('notConfigured')}</span>
              </div>

              <div className="settings-security-item">
                <div className="settings-security-icon">
                  <i className="fa-solid fa-shield"></i>
                </div>

                <h3>{t('authenticatorApp')}</h3>
                <p>{t('notConfigured')}</p>
                <span>{t('notConfigured')}</span>
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
                <span>{t('deviceActivity')}</span>
                <h2>{t('sessions')}</h2>
                <p>{t('reviewDevices')}</p>
              </div>
            </div>

            <div className="settings-session-item">

              <div className="settings-session-icon">
                <i className="fa-solid fa-desktop"></i>
              </div>

              <div>
                <h3>{t('currentBrowser')}</h3>
                <p>{t('currentDevice')}</p>
              </div>

              <span className="settings-active-badge">
                {t('demo')}
              </span>

            </div>

            <p className="settings-session-note">
              {t('sessionNote')}
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
                <span>{t('dangerZone')}</span>
                <h2>{t('deleteAccount')}</h2>
                <p>{t('deleteDescription')}</p>
              </div>
            </div>

            <label className="settings-checkbox-label">
              <input
                type="checkbox"
                checked={deleteConfirmed}
                onChange={(e) => setDeleteConfirmed(e.target.checked)}
              />
              {t('confirmDelete')}
            </label>

            <button
              type="button"
              className="settings-delete-btn"
              disabled={!deleteConfirmed}
              onClick={() =>
                alert(t('backendDelete'))
              }
            >
              <i className="fa-solid fa-trash"></i>
              {t('deleteAccount')}
            </button>

          </section>

        </div>

        {/* FOOTER */}

        <footer className="settings-footer">
          <p>{t('footerText')}</p>

          <div>
            <Link to="/dashboard">{t('dashboard')}</Link>
            <Link to="/finddoctor">{t('findDoctor')}</Link>
          </div>
        </footer>

      </main>
    </div>
  )
}

export default Settings