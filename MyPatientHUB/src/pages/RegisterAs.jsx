 import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './RegisterAs.css'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const BLOOD = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const SPECIALTIES = [
  'General Physician', 'Cardiology', 'Pediatrics', 'Gynecology',
  'Dentistry', 'Surgery', 'Orthopedics', 'Neurology', 'Other',
]

const CLINICS = [
  'GP', 'Specialist Clinic', 'Dental Clinic',
  'Pediatric Clinic', 'Hospital',
]

const ROLES = [
  { key: 'patient', label: 'Patient', icon: 'fa-solid fa-user' },
  { key: 'doctor', label: 'Doctor', icon: 'fa-solid fa-user-doctor' },
  { key: 'hospital', label: 'Hospital', icon: 'fa-solid fa-hospital' },
]

const EMPTY = {
  firstName: '',
  lastName: '',
  month: '',
  day: '',
  year: '',
  address: '',
  blood: '',
  gender: '',
  specialty: '',
  fullName: '',
  clinic: '',
  phone: '',
  email: '',
}

const thisYear = new Date().getFullYear()
const YEARS = Array.from({ length: 111 }, (_, i) => thisYear - i)
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

/* منوی انتخابی */

function Select({
  value,
  onChange,
  placeholder,
  options,
  translateOption = (option) => option,
}) {
  return (
    <div className="ra-select">
      <select value={value} onChange={onChange}>
        <option value="">{placeholder}</option>

        {options.map((o) => (
          <option key={o} value={o}>
            {translateOption(o)}
          </option>
        ))}
      </select>

      <i className="fa-solid fa-chevron-down"></i>
    </div>
  )
}

function RegisterAs() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const formRef = useRef(null)

  const [role, setRole] = useState('')
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  // اگر کاربر بدون ثبت‌نام آمد، به صفحه ثبت‌نام برگردد
  useEffect(() => {
    if (!localStorage.getItem('mph_pending')) {
      navigate('/signup')
    }
  }, [navigate])

  const update = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
    setError('')
  }

  const chooseRole = (key) => {
    setRole(key)
    setForm(EMPTY)
    setError('')

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  const validate = () => {
    if (role === 'hospital') {
      if (!form.fullName.trim()) {
        return t('raErrors.fullName')
      }

      if (!form.address.trim()) {
        return t('raErrors.address')
      }

      if (!form.clinic) {
        return t('raErrors.clinic')
      }

      if (
        form.phone.trim() &&
        !/^\+?[0-9]{9,15}$/.test(form.phone.replace(/\s/g, ''))
      ) {
        return t('raErrors.phone')
      }

      if (form.email.trim() && !form.email.includes('@')) {
        return t('raErrors.email')
      }

      return ''
    }

    if (!form.firstName.trim()) {
      return t('raErrors.firstName')
    }

    if (!form.lastName.trim()) {
      return t('raErrors.lastName')
    }

    if (!form.month || !form.day || !form.year) {
      return t('raErrors.birthDate')
    }

    if (!form.address.trim()) {
      return t('raErrors.address')
    }

    if (!form.blood) {
      return t('raErrors.blood')
    }

    if (!form.gender) {
      return t('raErrors.gender')
    }

    if (role === 'doctor' && !form.specialty) {
      return t('raErrors.specialty')
    }

    return ''
  }

  const handleNext = (e) => {
    e.preventDefault()

    const message = validate()

    if (message) {
      setError(message)
      return
    }

    const pendingId = Number(localStorage.getItem('mph_pending'))

    const profiles = JSON.parse(
      localStorage.getItem('mph_profiles') || '{}'
    )

    profiles[pendingId] = { role, ...form }

    localStorage.setItem(
      'mph_profiles',
      JSON.stringify(profiles)
    )

    const users = JSON.parse(
      localStorage.getItem('mph_users') || '[]'
    )

    const updated = users.map((u) =>
      u.id === pendingId ? { ...u, role } : u
    )

    localStorage.setItem('mph_users', JSON.stringify(updated))

    localStorage.removeItem('mph_pending')
    localStorage.setItem('mph_current', String(pendingId))

    setDone(true)

    setTimeout(() => navigate('/dashboard'), 2000)
  }

  const roleLabel = ROLES.find((r) => r.key === role)?.label

  const translateRole = (key) => t(`raRoles.${key}`)

  const translateMonth = (value) => t(`raMonths.${value}`)

  const translateSpecialty = (value) =>
    t(`raSpecialties.${value}`, { defaultValue: value })

  const translateClinic = (value) =>
    t(`raClinics.${value}`, { defaultValue: value })

  /* ---------- صفحه تکمیل ثبت‌نام ---------- */

  if (done) {
    return (
      <div className="ra-page">
        <div className="ra-card ra-done">
          <div className="ra-check">
            <i className="fa-solid fa-check"></i>
          </div>

          <h2>{t('ra.registrationComplete')}</h2>

          <p>
            {t('ra.accountReady', {
              role: translateRole(role),
            })}
          </p>
        </div>
      </div>
    )
  }

  /* ---------- صفحه اصلی ---------- */

  return (
    <div className="ra-page">

      <div className="ra-hero">

        <h1>{t('ra.registerAs')}</h1>

        <div className="ra-roles">
          {ROLES.map((r) => (
            <button
              key={r.key}
              type="button"
              className={`ra-role ${
                role === r.key ? 'ra-role-on' : ''
              }`}
              onClick={() => chooseRole(r.key)}
            >
              <span className="ra-role-icon">
                <i className={r.icon}></i>
              </span>

              <span className="ra-role-label">
                {translateRole(r.key)}
              </span>
            </button>
          ))}
        </div>

      </div>

      {role && (
        <form
          className="ra-card ra-form"
          onSubmit={handleNext}
          ref={formRef}
          key={role}
        >

          <h2>
            {t('ra.registrationTitle', {
              role: translateRole(role),
            })}
          </h2>

          <p className="ra-sub">
            {t('ra.formDescription')}
          </p>

          <div className="ra-grid">

            {/* ===== PATIENT + DOCTOR ===== */}

            {role !== 'hospital' && (
              <>
                <div className="ra-field">
                  <label>{t('ra.firstName')}</label>

                  <input
                    type="text"
                    placeholder={
                      role === 'doctor'
                        ? t('ra.doctorFirstNamePlaceholder')
                        : t('ra.patientFirstNamePlaceholder')
                    }
                    value={form.firstName}
                    onChange={update('firstName')}
                  />
                </div>

                <div className="ra-field">
                  <label>{t('ra.lastName')}</label>

                  <input
                    type="text"
                    placeholder={
                      role === 'doctor'
                        ? t('ra.doctorLastNamePlaceholder')
                        : t('ra.patientLastNamePlaceholder')
                    }
                    value={form.lastName}
                    onChange={update('lastName')}
                  />
                </div>

                <div className="ra-field ra-full">
                  <label>{t('ra.birthDate')}</label>

                  <div className="ra-date">
                    <Select
                      value={form.month}
                      onChange={update('month')}
                      placeholder={t('ra.month')}
                      options={MONTHS}
                      translateOption={translateMonth}
                    />

                    <Select
                      value={form.day}
                      onChange={update('day')}
                      placeholder={t('ra.day')}
                      options={DAYS}
                    />

                    <Select
                      value={form.year}
                      onChange={update('year')}
                      placeholder={t('ra.year')}
                      options={YEARS}
                    />
                  </div>
                </div>

                <div className="ra-field">
                  <label>{t('ra.myAddress')}</label>

                  <input
                    type="text"
                    placeholder={t('ra.chooseLocation')}
                    value={form.address}
                    onChange={update('address')}
                  />
                </div>

                {role === 'doctor' ? (
                  <div className="ra-field">
                    <label>{t('ra.specialty')}</label>

                    <Select
                      value={form.specialty}
                      onChange={update('specialty')}
                      placeholder={t('ra.selectSpecialty')}
                      options={SPECIALTIES}
                      translateOption={translateSpecialty}
                    />
                  </div>
                ) : (
                  <div className="ra-field">
                    <label>{t('ra.bloodGroup')}</label>

                    <Select
                      value={form.blood}
                      onChange={update('blood')}
                      placeholder={t('ra.select')}
                      options={BLOOD}
                    />
                  </div>
                )}

                {role === 'doctor' && (
                  <div className="ra-field">
                    <label>{t('ra.bloodGroup')}</label>

                    <Select
                      value={form.blood}
                      onChange={update('blood')}
                      placeholder={t('ra.select')}
                      options={BLOOD}
                    />
                  </div>
                )}

                <div className="ra-field">
                  <label>{t('ra.gender')}</label>

                  <Select
                    value={form.gender}
                    onChange={update('gender')}
                    placeholder={t('ra.select')}
                    options={['Male', 'Female']}
                    translateOption={(value) =>
                      t(`raGender.${value}`)
                    }
                  />
                </div>
              </>
            )}

            {/* ===== HOSPITAL ===== */}

            {role === 'hospital' && (
              <>
                <div className="ra-field">
                  <label>{t('ra.fullName')}</label>

                  <input
                    type="text"
                    placeholder={t('ra.hospitalNamePlaceholder')}
                    value={form.fullName}
                    onChange={update('fullName')}
                  />
                </div>

                <div className="ra-field">
                  <label>{t('ra.address')}</label>

                  <input
                    type="text"
                    placeholder={t('ra.chooseLocation')}
                    value={form.address}
                    onChange={update('address')}
                  />
                </div>

                <div className="ra-field">
                  <label>{t('ra.clinicType')}</label>

                  <Select
                    value={form.clinic}
                    onChange={update('clinic')}
                    placeholder={t('ra.select')}
                    options={CLINICS}
                    translateOption={translateClinic}
                  />
                </div>

                <div className="ra-field">
                  <label>{t('ra.additionalPhone')}</label>

                  <input
                    type="tel"
                    placeholder={t('ra.phonePlaceholder')}
                    value={form.phone}
                    onChange={update('phone')}
                  />
                </div>

                <div className="ra-field">
                  <label>{t('ra.additionalEmail')}</label>

                  <input
                    type="email"
                    placeholder={t('ra.emailPlaceholder')}
                    value={form.email}
                    onChange={update('email')}
                  />
                </div>
              </>
            )}

          </div>

          {error && <p className="ra-error">{error}</p>}

          <div className="ra-actions">
            <button type="submit" className="ra-next">
              {t('ra.next')}
            </button>
          </div>

        </form>
      )}

    </div>
  )
}

export default RegisterAs