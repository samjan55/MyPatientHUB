 import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import doctarhero from '../assets/find doctar .jpeg'
import doctor1 from '../assets/doctar 1.jpeg'
import doctor2 from '../assets/doctar2.jpeg'
import doctor3 from '../assets/doctar3.jpeg'
import doctor4 from '../assets/doctar4.jpeg'
import doctor5 from '../assets/finddoctar5.jpeg'
import herosmall from '../assets/finddoctar2.jpeg'
import herosmall2 from '../assets/finddoctar3.jpeg'
import herosmall3 from '../assets/finddoctar4.jpeg'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import image from '../assets/avatar 1.jpeg'
import './FindDoctor.css'

// key = کلید ترجمه در findDoctor.js ، location = کلید داخل locations
const doctors = [
  { id: 1, name: 'Dr. Mustafa', key: 'cardiologist', specialty: 'Cardiologist', years: 10, image: doctor1, icon: 'fa-heart-pulse', color: 'doctor-blue', location: 'kabul' },
  { id: 2, name: 'Dr. Sara', key: 'neurologist', specialty: 'Neurologist', years: 8, image: doctor2, icon: 'fa-brain', color: 'doctor-purple', location: 'kabul' },
  { id: 3, name: 'Dr. Bilal', key: 'dermatologist', specialty: 'Dermatologist', years: 7, image: doctor3, icon: 'fa-hand-dots', color: 'doctor-pink', location: 'mazar' },
  { id: 4, name: 'Dr. Madiha', key: 'pediatrician', specialty: 'Pediatrician', years: 9, image: doctor5, icon: 'fa-child', color: 'doctor-green', location: 'kabul' },
  { id: 5, name: 'Dr. Ali', key: 'generalPhysician', specialty: 'General Physician', years: 7, image: doctor4, icon: 'fa-user-doctor', color: 'doctor-orange', location: 'kabul' },
  { id: 6, name: 'Dr. Shamsir', key: 'generalPhysician', specialty: 'General Physician', years: 7, image: image, icon: 'fa-user-doctor', color: 'doctor-orange', location: 'heart' },
]

const services = [
  { icon: 'fa-heart-pulse', key: 'primaryCare' },
  { icon: 'fa-truck-medical', key: 'emergencyCare' },
  { icon: 'fa-x-ray', key: 'imagingServices' },
  { icon: 'fa-hospital', key: 'urgentCare' },
]

// name = نام انگلیسی برای لینک (URL) ، key و textKey = برای نمایش
const specialties = [
  { icon: 'fa-syringe', name: 'Anesthesiology', key: 'anesthesiology', textKey: 'specialistDoctors' },
  { icon: 'fa-hand-dots', name: 'Dermatology', key: 'dermatology', textKey: 'skinSpecialists' },
  { icon: 'fa-truck-medical', name: 'Emergency Medicine', key: 'emergencyMedicine', textKey: 'emergencySpecialists' },
  { icon: 'fa-brain', name: 'Neurology', key: 'neurology', textKey: 'brainSpecialists' },
  { icon: 'fa-comments', name: 'Consultation', key: 'consultation', textKey: 'medicalConsultation' },
  { icon: 'fa-eye', name: 'Ophthalmology', key: 'ophthalmology', textKey: 'eyeSpecialists' },
]

function FindDoctor() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [doctorSearch, setDoctorSearch] = useState('')
  const [locationSearch, setLocationSearch] = useState('')

  const locations = t('locations', { returnObjects: true })
  const cityName = (key) =>
    typeof locations === 'object' && locations[key] ? locations[key] : key

  const handleSearch = (e) => {
    e.preventDefault()
  }

  // جستجو هم در انگلیسی و هم در زبان انتخاب‌شده کار می‌کند
  const filteredDoctors = doctors.filter((doctor) => {
    const search = doctorSearch.trim().toLowerCase()
    const location = locationSearch.trim().toLowerCase()

    const doctorText = `${doctor.name} ${t(doctor.name)} ${doctor.specialty} ${t(doctor.key)}`.toLowerCase()
    const locationText = `${doctor.location} ${cityName(doctor.location)}`.toLowerCase()

    return doctorText.includes(search) && (!location || locationText.includes(location))
  })

  const doctorToShow = selectedDoctor

  return (
    <div className={`find-doctor-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main find-doctor-main">

        <Header
          title="Find Doctor"
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
          onSearch={setDoctorSearch}
        />

        <section className="content find-doctor-content">

          {/* HERO CARD */}

          <header className="doctor-header">

            <div className="doctor-header-decoration"></div>

            <div className="doctor-hero-layout">

              {/* LEFT CONTENT */}

              <div className="doctor-hero-text">

                <span className="doctor-hero-eyebrow">
                  <i className="fa-solid fa-heart-pulse"></i>
                  {t('heroEyebrow')}
                </span>

                <h1>
                  {t('heroTitle')}
                  <br />
                  <span>{t('heroTitleHighlight')}</span>
                </h1>

                <p>{t('heroDescription')}</p>

                <div className="doctor-hero-actions">

                  <a href="#doctors" className="doctor-hero-button">
                    <i className="fa-solid fa-user-doctor"></i>
                    {t('exploreDoctors')}
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>

                  <div className="doctor-trust">
                    <span className="doctor-trust-icon">
                      <i className="fa-solid fa-shield-heart"></i>
                    </span>

                    <span>
                      <strong>{t('careYouCanTrust')}</strong>
                      <small>{t('yourHealthComesFirst')}</small>
                    </span>
                  </div>

                </div>

                <div className="doctor-hero-badge">
                  <i className="fa-solid fa-circle-check"></i>
                  {t('healthPriority')}
                </div>

              </div>

              {/* RIGHT DOCTOR IMAGE COLLAGE */}

              <div className="doctor-hero-visual">

                <div className="doctor-visual-glow"></div>
                <div className="doctor-visual-circle"></div>

                <div className="doctor-visual-cross cross-one">
                  <i className="fa-solid fa-plus"></i>
                </div>

                <div className="doctor-visual-cross cross-two">
                  <i className="fa-solid fa-plus"></i>
                </div>

                <div className="doctor-visual-heart">
                  <i className="fa-solid fa-heart-pulse"></i>
                </div>

                <div className="doctor-hero-main-photo">
                  <img src={doctarhero} alt={t('healthcareProfessional')} />

                  <div className="doctor-photo-label">
                    <span className="doctor-photo-status"></span>

                    <span>
                      <strong>{t('professionalCare')}</strong>
                      <small>{t('hereForYourHealth')}</small>
                    </span>

                    <i className="fa-solid fa-shield-heart"></i>
                  </div>
                </div>

                <div className="doctor-float-photo doctor-float-one">
                  <img src={herosmall} alt={t('neurologySpecialist')} />
                  <span><i className="fa-solid fa-brain"></i></span>
                </div>

                <div className="doctor-float-photo doctor-float-two">
                  <img src={herosmall2} alt={t('dermatologySpecialist')} />
                  <span><i className="fa-solid fa-hand-dots"></i></span>
                </div>

                <div className="doctor-float-photo doctor-float-three">
                  <img src={herosmall3} alt={t('pediatricSpecialist')} />
                  <span><i className="fa-solid fa-heart-pulse"></i></span>
                </div>

                <div className="doctor-floating-card doctor-floating-top">
                  <span className="doctor-floating-icon">
                    <i className="fa-solid fa-user-doctor"></i>
                  </span>

                  <span>
                    <strong>{t('expertDoctors')}</strong>
                    <small>{t('professionalCare')}</small>
                  </span>
                </div>

                <div className="doctor-floating-card doctor-floating-bottom">
                  <span className="doctor-rating-icon">
                    <i className="fa-solid fa-heart"></i>
                  </span>

                  <span>
                    <strong>{t('patientFirst')}</strong>
                    <small>{t('careWithCompassion')}</small>
                  </span>
                </div>

              </div>

            </div>

          </header>

          {/* SEARCH CARD */}

          <section className="search-card">

            <div className="search-title">

              <div className="search-heading-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>

              <div>
                <h2>{t('searchTitle')}</h2>
                <p>{t('searchDescription')}</p>
              </div>

            </div>

            <form className="search-form" onSubmit={handleSearch}>

              <div className="search-input">
                <i className="fa-solid fa-user-doctor"></i>

                <input
                  type="text"
                  placeholder={t('doctorPlaceholder')}
                  value={doctorSearch}
                  onChange={(e) => setDoctorSearch(e.target.value)}
                  aria-label={t('doctorPlaceholder')}
                />
              </div>

              <div className="search-input">
                <i className="fa-solid fa-location-dot"></i>

                <input
                  type="text"
                  placeholder={t('locationPlaceholder')}
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  aria-label={t('locationPlaceholder')}
                />
              </div>

              <button type="submit" className="search-button">
                <i className="fa-solid fa-magnifying-glass"></i>
                {t('searchDoctors')}
              </button>

            </form>

          </section>

          {/* CHOOSE YOUR DOCTOR */}

          <section className="choose-doctor" id="doctors">

            <div className="choose-doctor-heading">
              <span>{t('meetSpecialists')}</span>
              <h2>{t('chooseDoctor')}</h2>
              <p>{t('chooseDoctorDescription')}</p>
            </div>

            <div className="doctor-selection">

              {filteredDoctors.length === 0 && (
                <div className="no-results">
                  <h3>{t('noDoctors')}</h3>
                  <p>{t('noDoctorsDescription')}</p>
                </div>
              )}

              {filteredDoctors.map((doctor) => (
                <button
                  type="button"
                  key={doctor.id}
                  className={`doctor-avatar-card ${
                    selectedDoctor?.id === doctor.id ? 'active-doctor' : ''
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                  aria-pressed={selectedDoctor?.id === doctor.id}
                >

                  <div className={`doctor-avatar-placeholder ${doctor.color}`}>
                    <img
                      src={doctor.image}
                      alt={t(doctor.name)}
                      className="doctor-photo"
                    />

                    <span className="doctor-online-dot"></span>
                  </div>

                  <h3>{t(doctor.name)}</h3>

                  <p>{t(doctor.key)}</p>

                  <span className="doctor-select-label">
                    {selectedDoctor?.id === doctor.id
                      ? t('selected')
                      : t('viewDetails')}
                  </span>

                </button>
              ))}

            </div>

            {/* SELECTED DOCTOR PROFILE */}

            {doctorToShow && (
              <div className="selected-doctor-details">

                <div className={`selected-doctor-image ${doctorToShow.color}`}>
                  <img
                    src={doctorToShow.image}
                    alt={t(doctorToShow.name)}
                    className="doctor-profile-photo"
                  />

                  <span className="profile-image-badge">
                    <i className="fa-solid fa-user-doctor"></i>
                    {t('doctorProfile')}
                  </span>
                </div>

                <div className="selected-doctor-info">

                  <span className="doctor-available">
                    <span className="available-dot"></span>
                    {t('doctorInformation')}
                  </span>

                  <h2>{t(doctorToShow.name)}</h2>

                  <h3>
                    <i className={`fa-solid ${doctorToShow.icon}`}></i>
                    {t(doctorToShow.key)}
                  </h3>

                  <p className="doctor-experience">
                    <i className="fa-solid fa-briefcase-medical"></i>
                    {doctorToShow.years} {t('experience')}
                  </p>

                  <p className="doctor-experience">
                    <i className="fa-solid fa-location-dot"></i>
                    {cityName(doctorToShow.location)}
                  </p>

                  <p className="doctor-description">
                    {t(`${doctorToShow.key}Description`)}
                  </p>

                  <div className="doctor-profile-actions">

                    <button
                      type="button"
                      className="doctor-profile-button"
                      onClick={() =>
                        alert(t('profileFor', { name: t(doctorToShow.name) }))
                      }
                    >
                      {t('viewProfile')}
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>

                    <button
                      type="button"
                      className="doctor-message-button"
                      onClick={() => navigate('/appointments')}
                    >
                      <i className="fa-regular fa-comment-dots"></i>
                      {t('contactDoctor')}
                    </button>

                  </div>

                </div>

                <button
                  type="button"
                  className="close-doctor-profile"
                  onClick={() => setSelectedDoctor(null)}
                  aria-label={t('closeProfile')}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

              </div>
            )}

          </section>

          {/* SPECIAL SERVICES */}

          <section className="special-services" id="services">

            <div className="doctor-section-heading">

              <div>
                <span className="small-label">{t('servicesLabel')}</span>
                <h2>{t('specialServices')}</h2>
                <p>{t('servicesDescription')}</p>
              </div>

              <div className="section-heading-icon">
                <i className="fa-solid fa-stethoscope"></i>
              </div>

            </div>

            <div className="service-grid">

              {services.map((service) => (
                <div className="service-card" key={service.key}>

                  <div className="service-icon">
                    <i className={`fa-solid ${service.icon}`}></i>
                  </div>

                  <div className="service-content">
                    <h3>{t(service.key)}</h3>
                    <p>{t(`${service.key}Description`)}</p>
                  </div>

                  <i className="fa-solid fa-chevron-right service-arrow"></i>

                </div>
              ))}

            </div>

          </section>

          {/* SPECIALTIES */}

          <section className="specialty-section" id="specialties">

            <div className="section-heading">
              <span className="small-label">{t('specialtyLabel')}</span>
              <h2>{t('doctorsBySpecialty')}</h2>
              <p>{t('specialtyDescription')}</p>
            </div>

            <div className="specialty-grid">

              {specialties.map((specialty) => (
                <Link
                  key={specialty.name}
                  to={`/specialty?specialty=${encodeURIComponent(specialty.name)}`}
                  className="specialty-card"
                >

                  <div className="specialty-icon">
                    <i className={`fa-solid ${specialty.icon}`}></i>
                  </div>

                  <div className="specialty-content">
                    <h3>{t(specialty.key)}</h3>
                    <p>{t(specialty.textKey)}</p>
                  </div>

                  <i className="fa-solid fa-chevron-right specialty-arrow"></i>

                </Link>
              ))}

            </div>

          </section>

          {/* FOOTER */}

          <footer className="doctor-footer">

            <div className="footer-logo" translate="no">
              <i className="fa-solid fa-heart-pulse"></i>
              MyPatientHUB
            </div>

            <p>{t('footerDescription')}</p>

            <div className="footer-links">
              <Link to="/dashboard">{t('home')}</Link>
              <a href="#services">{t('services')}</a>
              <a href="#specialties">{t('specialties')}</a>
              <a href="mailto:info@mypatienthub.com">{t('contact')}</a>
            </div>

            <div className="copyright">
              © 2026 MyPatientHUB. {t('allRightsReserved')}
            </div>

          </footer>

        </section>

      </main>

    </div>
  )
}

export default FindDoctor