import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import hospitalImage from '../assets/hospital.jpeg'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import './Dashboard.css'

const cards = [
  {
    title: 'Promotion by Clinics',
    chart: 'clinic-chart',
    prefix: 'clinic',
    button: true,
    items: [
      { icon: 'heart-pulse', color: 'pink', name: 'Klinik Lee Healthcare', pct: '19%' },
      { icon: 'hospital', color: 'blue', name: 'Klinik Bandar Baru Nilai', pct: '4%' },
      { icon: 'kit-medical', color: 'green', name: 'Klinik Mediviron Giant Nilai', pct: '10%' },
      { icon: 'house-medical', color: 'yellow', name: 'KLINIK NILAI IMPIAN', pct: '21%' },
      { icon: 'stethoscope', color: 'dark', name: 'Klinik Mediviron', pct: '2%' },
    ],
  },
  {
    title: 'Promotion by Pharmacies',
    chart: 'pharmacy-chart',
    prefix: 'pharmacy',
    button: true,
    items: [
      { icon: 'pills', color: 'blue', name: 'ALPRO PHARMACY NILAI', pct: '15%' },
      { icon: 'capsules', color: 'light', name: 'ALPRO PHARMACY PEKAN NILAI', pct: '12%' },
      { icon: 'prescription-bottle-medical', color: 'pink', name: 'OK PHARMACY', pct: '5%' },
      { icon: 'mortar-pestle', color: 'green', name: 'PHARMART PHARMACY NILAI', pct: '9%' },
      { icon: 'capsules', color: 'dark', name: 'Health Lane Family Pharmacy', pct: '14%' },
    ],
  },
  {
    title: 'Smart Market Usage by app',
    chart: 'market-chart',
    prefix: 'market',
    button: true,
    items: [
      { icon: 'utensils', color: 'pink', name: 'Food Panda', pct: '25%' },
      { icon: 'motorcycle', color: 'blue', name: 'Grab Food', pct: '3%' },
      { icon: 'heart-pulse', color: 'green', name: 'MySejahtera', pct: '15%' },
    ],
  },
  {
    title: 'Health Index',
    type: 'health',
  },
]

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

function Dashboard() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDetails, setSelectedDetails] = useState(false)

  const userName = localStorage.getItem('userName') || t('Guest')
  const greeting = t(getGreeting())
  const query = searchTerm.trim().toLowerCase()

  const filteredCards = cards.filter((card) =>
    t(card.title).toLowerCase().includes(query)
  )

  return (
    <div className={`dashboard ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main">

        <Header
          title="Dashboard"
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
          onSearch={setSearchTerm}
        />

        <section className="content">

          {/* WELCOME CARD */}
          <div className="welcome-card">
            <div className="welcome-content">
              <div className="welcome-badge">
                <i className="fa-solid fa-heart-pulse"></i>
                <span translate="no">MYPATIENTHUB</span>
              </div>

              <h1 className="welcome-title">
                {greeting}،
                <br />
                <span>{userName}! 👋</span>
              </h1>

              <p className="welcome-text">
                {t('welcomeText')}
              </p>

              <div className="welcome-buttons">
                <button
                  className="welcome-primary"
                  onClick={() => navigate('/finddoctor')}
                >
                  <i className="fa-solid fa-user-doctor"></i>
                  {t('Find Doctor')}
                  <i className="fa-solid fa-arrow-right"></i>
                </button>

                <button onClick={() => navigate('/findclinic')}>
                  <i className="fa-solid fa-hospital"></i>
                  {t('Find Clinic')}
                  <i className="fa-solid fa-arrow-right"></i>
                </button>

                <button onClick={() => navigate('/findpharmacy')}>
                  <i className="fa-solid fa-pills"></i>
                  {t('Pharmacy')}
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>

              <div className="welcome-footer">
                <span>
                  <i className="fa-solid fa-shield-heart"></i>
                  {t('Your Health, Our Priority')}
                </span>

                <span>
                  <i className="fa-solid fa-lock"></i>
                  {t('Care Made Simple')}
                </span>
              </div>
            </div>

            <div className="welcome-image">
              <img
                src={hospitalImage}
                alt="MyPatientHUB Hospital"
                className="hospital-image"
              />

              <div className="hospital-tint"></div>
              <div className="hospital-glow"></div>

              <div className="medical-circle circle-one">
                <i className="fa-solid fa-stethoscope"></i>
              </div>

              <div className="medical-circle circle-two">
                <i className="fa-solid fa-heart-pulse"></i>
              </div>

              <div className="medical-circle circle-three">
                <i className="fa-solid fa-kit-medical"></i>
              </div>

              <div className="medical-circle circle-four">
                <i className="fa-solid fa-pills"></i>
              </div>

              <div className="medical-circle circle-five">
                <i className="fa-solid fa-syringe"></i>
              </div>
            </div>

            <div className="welcome-wave"></div>
          </div>

          <h1>{t('welcomeTitle', { name: 'MyPatientHUB' })}</h1>

          {/* FOUR DASHBOARD CARDS */}
          <div className="cards">
            {filteredCards.map((card) => {
              if (card.type === 'health') {
                return (
                  <div className="card health-card" key={card.title}>
                    <div className="card-title">
                      <h3>{t('Health Index')}</h3>
                      <i className="fa-solid fa-circle-info"></i>
                    </div>

                    <div className="health-number">
                      70%
                      <span>+3%</span>
                    </div>

                    <div className="health-chart">
                      <svg
                        className="health-line"
                        viewBox="0 0 600 150"
                      >
                        <path
                          d="M0 135 Q60 105 120 125 Q180 145 240 85 Q300 30 360 100 Q420 145 480 75 Q540 35 600 20"
                          fill="none"
                          stroke="#30345f"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                )
              }

              return (
                <div className="card" key={card.title}>
                  <div className="card-title">
                    <h3>{t(card.title)}</h3>
                    <i className="fa-solid fa-circle-info"></i>
                  </div>

                  <div className="chart-content">
                    <div className={`donut ${card.chart}`}></div>

                    <div className="chart-list">
                      {card.items.map((item) => (
                        <p key={item.name}>
                          <i
                            className={`fa-solid fa-${item.icon} ${card.prefix}-icon ${item.color}`}
                          ></i>
                          <span>{t(item.name)}</span>
                          <b>{item.pct}</b>
                        </p>
                      ))}
                    </div>
                  </div>

                  {card.button && (
                    <button
                      className="details"
                      onClick={() => setSelectedDetails(card)}
                    >
                      {t('MORE DETAILS')}
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  )}
                </div>
              )
            })}

            {query !== '' && filteredCards.length === 0 && (
              <div className="no-results">
                <i className="fa-solid fa-magnifying-glass"></i>
                <h3>{t('noResults')}</h3>
                <p>{t('tryLetters')}</p>
              </div>
            )}
          </div>
          {/* MORE DETAILS MODAL */}
{selectedDetails && (
  <div
    className="dashboard-details-overlay"
    onClick={() => setSelectedDetails(null)}
  >
    <div
      className="dashboard-details-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="details-title"
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <button
        type="button"
        className="dashboard-details-close"
        onClick={() => setSelectedDetails(null)}
        aria-label="Close details"
      >
        &times;
      </button>

      <div className="dashboard-details-header">
        <div className="dashboard-details-icon">
          <i className="fa-solid fa-chart-pie"></i>
        </div>

        <span className="dashboard-details-label">
          DASHBOARD ANALYTICS
        </span>

        <h2 id="details-title">
          {t(selectedDetails.title)}
        </h2>

        <p>
          {t('Detailed overview of your dashboard data')}
        </p>
      </div>

      {/* TOTAL */}
      <div className="dashboard-details-summary">
        <div>
          <span>{t('Total Listed Items')}</span>

          <h3>{selectedDetails.items.length}</h3>

          <p>{t('Items in this category')}</p>
        </div>

        <div className="dashboard-details-summary-icon">
          <i className="fa-solid fa-chart-line"></i>
        </div>
      </div>

      {/* DETAILS LIST */}
      <div className="dashboard-details-list">
        <h3>{t('Detailed Information')}</h3>

        {selectedDetails.items.map((item) => (
          <div
            className="dashboard-details-row"
            key={item.name}
          >
            <div className={`dashboard-details-item-icon ${item.color}`}>
              <i className={`fa-solid fa-${item.icon}`}></i>
            </div>

            <div className="dashboard-details-item-info">
              <h4>{t(item.name)}</h4>

              <div className="dashboard-details-progress">
                <span
                  style={{
                    width: `${parseFloat(item.pct)}%`,
                  }}
                ></span>
              </div>
            </div>

            <strong>{item.pct}</strong>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="dashboard-details-note">
        <i className="fa-solid fa-circle-info"></i>

        <p>
          {t(
            'These percentages represent the sample data displayed in this dashboard.'
          )}
        </p>
      </div>

      <button
        type="button"
        className="dashboard-details-done"
        onClick={() => setSelectedDetails(null)}
      >
        {t('Close Details')}
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>
)}
        </section>

        <footer className="dashboard-footer">
          <p>{t('footerText')}</p>

          <div>
            <a href="#" translate="no">MyPatientHUB</a>
            <a href="#">{t('About Us')}</a>
            <a href="#">{t('Blog')}</a>
          </div>
        </footer>
      </main>

    </div>
  )
}

export default Dashboard