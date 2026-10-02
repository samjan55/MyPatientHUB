import { Link } from 'react-router-dom'

const services = [
  { icon: '❤️', title: 'Primary Care and Internal MD', text: 'Our doctors partner with you to help you reach your wellness goals.' },
  { icon: '🩺', title: 'Emergency Care', text: 'We provide emergency care for adults and children.' },
  { icon: '❤️', title: 'Imaging Services', text: 'From X-ray to MR scan, we offer modern imaging services.' },
  { icon: '🏥', title: 'Urgent Care', text: 'We offer urgent care for patients who need quick attention.' },
]

const specialties = [
  { icon: 'syringe', name: 'Anesthesiology', text: 'Specialist doctors' },
  { icon: 'hand-dots', name: 'Dermatology', text: 'Skin specialists' },
  { icon: 'truck-medical', name: 'Emergency Medicine', text: 'Emergency specialists' },
  { icon: 'brain', name: 'Neurology', text: 'Brain specialists' },
  { icon: 'comments', name: 'Consultation', text: 'Medical consultation' },
  { icon: 'eye', name: 'Ophthalmology', text: 'Eye specialists' },
]

function FindDoctor() {
  return (
    <div className="doctor-page">
      <header className="doctor-header">
        <div className="breadcrumb">
          <Link to="/dashboard">
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </Link>
          <i className="fa-solid fa-chevron-right"></i>
          <span>Find Doctor</span>
        </div>

        <div className="header-content">
          <div className="header-icon">
            <i className="fa-solid fa-user-doctor"></i>
          </div>
          <div>
            <h1>Find a Doctor</h1>
            <p>Find the right doctor and book your appointment with ease.</p>
          </div>
        </div>
      </header>

      <section className="search-card">
        <div className="search-title">
          <h2>Search for a Doctor</h2>
          <p>Search by doctor name, specialty or location.</p>
        </div>

        <div className="search-form">
          <div className="search-input">
            <i className="fa-solid fa-user-doctor"></i>
            <input type="text" placeholder="Doctor name or specialty" />
          </div>

          <div className="search-input">
            <i className="fa-solid fa-location-dot"></i>
            <input type="text" placeholder="City, area or ZIP code" />
          </div>

          <button type="button" className="search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
            Search Doctors
          </button>
        </div>
      </section>

      <section className="special-services">
        <h2>Special Services</h2>

        {services.map((s) => (
          <div className="service-card" key={s.title}>
            <div className="service-icon">{s.icon}</div>
            <div className="service-content">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
            <i className="fa-solid fa-chevron-right service-arrow"></i>
          </div>
        ))}
      </section>

      <section className="specialty-section">
        <div className="section-heading">
          <span className="small-label">FIND YOUR SPECIALIST</span>
          <h2>Doctors by Specialty</h2>
          <p>Select a specialty to find available doctors and schedule an appointment.</p>
        </div>

        <div className="specialty-grid">
          {specialties.map((s) => (
            <Link
              key={s.name}
              to={`/specialty?specialty=${encodeURIComponent(s.name)}`}
              className="specialty-card"
            >
              <div className="specialty-icon">
                <i className={`fa-solid fa-${s.icon}`}></i>
              </div>
              <div className="specialty-content">
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </div>
              <i className="fa-solid fa-chevron-right specialty-arrow"></i>
            </Link>
          ))}
        </div>
      </section>

      <footer className="doctor-footer">
        <div className="footer-logo">
          <i className="fa-solid fa-heart-pulse"></i>
          MyPatientHUB
        </div>

        <p>Making healthcare easier and more accessible.</p>

        <div className="footer-links">
          <Link to="/dashboard">Home</Link>
          <a href="#">About Us</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>

        <div className="copyright">© 2026 MyPatientHUB. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default FindDoctor