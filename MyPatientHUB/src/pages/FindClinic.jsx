 import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MapView from '../components/MapView'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

import medicalCityImage from '../assets/medicalCityImage.jpeg'
import heartImage from '../assets/Heart.jpeg'
import dentalImage from '../assets/dental.jpeg'
import CityImage from '../assets/city.jpeg'
import hospitalImage from '../assets/clinic-d.jpeg'
import DiagnosticImage from '../assets/Diagnostic.jpeg'

import './FindClinic.css'

const clinics = [
  {
    id: 1,
    name: 'City Hospital',
    type: 'General Hospital',
    address: 'Kabul, Afghanistan',
    pos: [34.5553, 69.2075],
    phone: '+93 700 000 001',
    hours: '8:00 AM – 8:00 PM',
    days: 'Saturday – Thursday',
    departments: ['General Medicine', 'Pediatrics', 'Emergency'],
    image: CityImage,
  },
  {
    id: 2,
    name: 'Heart Center',
    type: 'Cardiology Center',
    address: 'Kabul, Afghanistan',
    pos: [34.5353, 69.1750],
    phone: '+93 700 000 002',
    hours: '9:00 AM – 6:00 PM',
    days: 'Saturday – Thursday',
    departments: ['Cardiology', 'ECG', 'Heart Checkup'],
    image: heartImage,
  },
  {
    id: 3,
    name: 'Dental Clinic',
    type: 'Dental Care',
    address: 'Kabul, Afghanistan',
    pos: [34.5200, 69.1600],
    phone: '+93 700 000 003',
    hours: '8:00 AM – 5:00 PM',
    days: 'Saturday – Thursday',
    departments: ['Dental Care', 'Orthodontics', 'Teeth Cleaning'],
    image: hospitalImage,
  },
  {
    id: 4,
    name: 'Medical Center',
    type: 'Specialty Clinic',
    address: 'Kabul, Afghanistan',
    pos: [34.5400, 69.1900],
    phone: '+93 700 000 004',
    hours: '8:00 AM – 7:00 PM',
    days: 'Saturday – Thursday',
    departments: ['Internal Medicine', 'Laboratory', 'Consultation'],
    image: DiagnosticImage,
  },
  {
    id: 5,
    name: 'Diagnostic Center',
    type: 'Diagnostic Services',
    address: 'Kabul, Afghanistan',
    pos: [34.5100, 69.2000],
    phone: '+93 700 000 005',
    hours: '7:00 AM – 5:00 PM',
    days: 'Saturday – Thursday',
    departments: ['Laboratory', 'Ultrasound', 'X-Ray'],
    image: dentalImage,
  },
]

function FindClinic() {
  const { t } = useTranslation()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [view, setView] = useState('map')
  const [mapStyle, setMapStyle] = useState('map')
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [clinicNotification, setClinicNotification] = useState(null)
  const [selectedClinic, setSelectedClinic] = useState(null)
  const [mapClinic, setMapClinic] = useState(null)

  const filteredClinics = clinics.filter((clinic) => {
    const searchText = search.toLowerCase().trim()
    const locationText = location.toLowerCase().trim()

    // جستجو هم در انگلیسی و هم در زبان انتخاب‌شده
    const clinicText = [
      clinic.name,
      t(clinic.name),
      clinic.type,
      t(clinic.type),
      ...clinic.departments,
      ...clinic.departments.map((department) => t(department)),
    ]
      .join(' ')
      .toLowerCase()

    const addressText = `${clinic.address} ${t(clinic.address)}`.toLowerCase()

    return (
      clinicText.includes(searchText) &&
      addressText.includes(locationText)
    )
  })

  // متن popup نقشه هم ترجمه می‌شود
  const markers = filteredClinics.map((clinic) => ({
    pos: clinic.pos,
    text: `<strong>${t(clinic.name)}</strong><br/>${t(clinic.address)}`,
  }))

  const showClinicOnMap = (clinic) => {
    setMapClinic(clinic)
    setView('map')

    setTimeout(() => {
      document
        .getElementById('clinic-map-section')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
    }, 300)
  }

  return (
    <div
      className={`find-clinic-layout ${
        sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main find-clinic-main">
        <Header
          title="Find Clinic"
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
          onSearch={setSearch}
        />

        <section className="clinic-content">
          {/* HERO */}

          <div className="clinic-hero">
            <div className="clinic-hero-content">
              <span className="clinic-hero-badge">
                <i className="fa-solid fa-location-dot"></i>
                {t('SMART HEALTHCARE')}
              </span>

              <h1>
                {t('Find Clinics')} <br />
                <span>{t('Near You')}</span>
              </h1>

              <p>
                {t('Discover nearby clinics and find the right healthcare for you.')}
              </p>

              <button
                type="button"
                className="clinic-hero-button"
                onClick={() =>
                  document
                    .querySelector('.clinic-search-card')
                    ?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                    })
                }
              >
                <i className="fa-solid fa-map-location-dot"></i>
                {t('Explore Clinics')}
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <div className="clinic-hero-image">
              <img
                src={medicalCityImage}
                alt={t('Find Clinics')}
                className="clinic-hospital-photo"
              />

              <div className="clinic-hospital-tint"></div>
              <div className="clinic-hospital-glow"></div>

              <div className="clinic-medical-icon clinic-icon-one">
                <i className="fa-solid fa-hospital"></i>
              </div>

              <div className="clinic-medical-icon clinic-icon-two">
                <i className="fa-solid fa-heart-pulse"></i>
              </div>

              <div className="clinic-medical-icon clinic-icon-three">
                <i className="fa-solid fa-location-dot"></i>
              </div>
            </div>
          </div>

          {/* SEARCH */}

          <section className="clinic-search-card">
            <div className="clinic-search-heading">
              <div className="clinic-section-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>

              <div>
                <h2>{t('Search Clinics')}</h2>
                <p>{t('Enter a clinic name and your preferred location.')}</p>
              </div>
            </div>

            <form
              className="clinic-search-form"
              onSubmit={(event) => {
                event.preventDefault()

                document
                  .getElementById('clinic-cards')
                  ?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
              }}
            >
              <label className="clinic-input-wrap">
                <i className="fa-solid fa-hospital"></i>

                <input
                  type="text"
                  placeholder={t('Clinic name or medical service')}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>

              <label className="clinic-input-wrap">
                <i className="fa-solid fa-location-dot"></i>

                <input
                  type="text"
                  placeholder={t('Zip code or neighborhood')}
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </label>

              <button
                type="submit"
                className="clinic-search-button"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                {t('Search Clinics')}
              </button>
            </form>
          </section>

          {/* CLINIC CARDS */}

          <section className="clinic-explorer">
            <div className="clinic-cards-section" id="clinic-cards">
              <div className="clinic-cards-heading">
                <span>{t('EXPLORE HEALTHCARE')}</span>
                <h2>{t('Discover Our Clinics')}</h2>
                <p>{t('Choose a clinic to explore its services.')}</p>
              </div>

              <div className="clinic-cards-grid">
                {filteredClinics.map((clinic) => (
                  <div
                    className="clinic-simple-card"
                    key={clinic.id}
                  >
                    <div className="clinic-simple-image">
                      <img
                        src={clinic.image}
                        alt={t(clinic.name)}
                      />

                      <span className="clinic-simple-label">
                        <i className="fa-solid fa-hospital"></i>
                        {t('Healthcare')}
                      </span>
                    </div>

                    <div className="clinic-simple-body">
                      <span className="clinic-simple-type">
                        {t(clinic.type)}
                      </span>

                      <h3>{t(clinic.name)}</h3>

                      <p>
                        <i className="fa-solid fa-location-dot"></i>
                        {t(clinic.address)}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setClinicNotification(clinic)
                          setSelectedClinic(null)
                        }}
                      >
                        {t('Explore Clinic')}
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>

                      <button
                        type="button"
                        onClick={() => showClinicOnMap(clinic)}
                      >
                        <i className="fa-solid fa-map-location-dot"></i>
                        {t('Show on Map')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredClinics.length === 0 && (
                <div className="clinic-no-results">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <h3>{t('No Clinics Found')}</h3>
                  <p>{t('Try another clinic name or location.')}</p>
                </div>
              )}
            </div>

            {/* NOTIFICATION */}

            {clinicNotification && (
              <div
                className="clinic-notification"
                role="status"
                aria-live="polite"
              >
                <button
                  type="button"
                  className="clinic-notification-close"
                  onClick={() => setClinicNotification(null)}
                  aria-label={t('Close notification')}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="clinic-notification-icon">
                  <i className="fa-solid fa-circle-check"></i>
                </div>

                <div className="clinic-notification-content">
                  <h3>{t('Clinic Selected!')}</h3>

                  <p>
                    {t('You selected')}{' '}
                    <strong>{t(clinicNotification.name)}</strong>
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedClinic(clinicNotification)
                      setClinicNotification(null)
                    }}
                  >
                    {t('View Details')}
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            )}

            {/* CLINIC DETAILS MODAL */}

            {selectedClinic && (
              <div
                className="clinic-details-backdrop"
                onClick={() => setSelectedClinic(null)}
              >
                <article
                  className="clinic-details-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${t(selectedClinic.name)} - ${t('Clinic details')}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    className="clinic-details-close"
                    onClick={() => setSelectedClinic(null)}
                    aria-label={t('Close details')}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>

                  <img
                    className="clinic-details-image"
                    src={selectedClinic.image}
                    alt={t(selectedClinic.name)}
                  />

                  <div className="clinic-details-content">
                    <span className="clinic-details-type">
                      {t(selectedClinic.type)}
                    </span>

                    <h2>{t(selectedClinic.name)}</h2>

                    <p className="clinic-detail-row">
                      <i className="fa-solid fa-location-dot"></i>
                      {t(selectedClinic.address)}
                    </p>

                    <p className="clinic-detail-row">
                      <i className="fa-solid fa-phone"></i>
                      <span dir="ltr">{selectedClinic.phone}</span>
                    </p>

                    <p className="clinic-detail-row">
                      <i className="fa-regular fa-clock"></i>
                      {t(selectedClinic.hours)}
                    </p>

                    <p className="clinic-detail-row">
                      <i className="fa-regular fa-calendar"></i>
                      {t(selectedClinic.days)}
                    </p>

                    <h3>{t('Available Departments')}</h3>

                    <div className="clinic-department-list">
                      {selectedClinic.departments.map((department) => (
                        <span key={department}>
                          {t(department)}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="clinic-call-button"
                      onClick={() =>
                        showClinicOnMap(selectedClinic)
                      }
                    >
                      <i className="fa-solid fa-map-location-dot"></i>
                      {t('Show on Map')}
                    </button>

                    <a
                      className="clinic-call-button"
                      href={`tel:${selectedClinic.phone.replace(/\s/g, '')}`}
                    >
                      <i className="fa-solid fa-phone"></i>
                      {t('Call Clinic')}
                    </a>
                  </div>
                </article>
              </div>
            )}

            {/* MAP AND LIST */}

            <div className="clinic-map-column">
              <div className="clinic-map-heading">
                <div>
                  <h2>{t('Explore Clinic Locations')}</h2>
                  <p>
                    {t('View clinic locations or select a center from the list.')}
                  </p>
                </div>

                <div className="clinic-view-switch">
                  <button
                    type="button"
                    className={view === 'map' ? 'active' : ''}
                    onClick={() => setView('map')}
                  >
                    <i className="fa-solid fa-map-location-dot"></i>
                    {t('Map')}
                  </button>

                  <button
                    type="button"
                    className={view === 'list' ? 'active' : ''}
                    onClick={() => setView('list')}
                  >
                    <i className="fa-solid fa-list"></i>
                    {t('List')}
                  </button>
                </div>
              </div>

              {view === 'map' ? (
                <div
                  className="clinic-map-section"
                  id="clinic-map-section"
                >
                  <div className="clinic-map-buttons">
                    <button
                      type="button"
                      className={mapStyle === 'map' ? 'active' : ''}
                      onClick={() => setMapStyle('map')}
                    >
                      {t('Map')}
                    </button>

                    <button
                      type="button"
                      className={mapStyle === 'satellite' ? 'active' : ''}
                      onClick={() => setMapStyle('satellite')}
                    >
                      {t('Satellite')}
                    </button>
                  </div>

                  <MapView
                    id="clinic-map"
                    className="clinic-map"
                    markers={markers}
                    selectedPosition={mapClinic?.pos}
                    mapStyle={mapStyle}
                  />
                </div>
              ) : (
                <div className="clinic-list-container">
                  <div className="clinic-list-header">
                    <div>
                      <span>{t('HEALTHCARE DIRECTORY')}</span>
                      <h3>{t('All Medical Centers')}</h3>
                      <p>
                        {t('Select a center to view its location on the map.')}
                      </p>
                    </div>

                    <span className="clinic-list-count">
                      {filteredClinics.length} {t('Centers')}
                    </span>
                  </div>

                  <div className="clinic-list-items">
                    {filteredClinics.map((clinic) => (
                      <button
                        type="button"
                        className="clinic-list-item"
                        key={clinic.id}
                        onClick={() => showClinicOnMap(clinic)}
                      >
                        <img
                          src={clinic.image}
                          alt={t(clinic.name)}
                          className="clinic-list-image"
                        />

                        <div className="clinic-list-info">
                          <span className="clinic-list-type">
                            {t(clinic.type)}
                          </span>

                          <h4>{t(clinic.name)}</h4>

                          <p>
                            <i className="fa-solid fa-location-dot"></i>
                            {t(clinic.address)}
                          </p>

                          <span className="clinic-list-departments">
                            {clinic.departments
                              .map((department) => t(department))
                              .join(' • ')}
                          </span>
                        </div>

                        <span className="clinic-list-action">
                          <i className="fa-solid fa-map-location-dot"></i>
                          {t('View Map')}
                        </span>
                      </button>
                    ))}

                    {filteredClinics.length === 0 && (
                      <div className="clinic-no-results">
                        <h3>{t('No Medical Centers Found')}</h3>
                        <p>{t('Try another clinic name or location.')}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="clinic-map-note">
                <i className="fa-solid fa-circle-info"></i>
                {t('Map markers show sample clinic locations.')}
              </div>
            </div>
          </section>

          {/* FOOTER */}

          <footer className="clinic-footer">
            <div className="clinic-footer-brand" translate="no">
              <i className="fa-solid fa-heart-pulse"></i>
              MyPatientHUB
            </div>

            <p>{t('Making healthcare easier and more accessible.')}</p>

            <div className="clinic-footer-links">
              <Link to="/dashboard">{t('Home')}</Link>
              <Link to="/finddoctor">{t('Find Doctor')}</Link>
              <Link to="/findpharmacy">{t('Find Pharmacy')}</Link>
            </div>

            <div className="clinic-copyright">
              © 2026 MyPatientHUB. {t('All rights reserved.')}
            </div>
          </footer>
        </section>
      </main>

      <button
        type="button"
        className="clinic-back-top"
        aria-label={t('Back to top')}
        onClick={() =>
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      >
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </div>
  )
}

export default FindClinic