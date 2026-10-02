import { Link } from 'react-router-dom'
import MapView from '../components/MapView'

const selects = ['Specialty', 'Gender', 'Condition', 'Languages']
const ages = [
  { value: 'all', label: 'All Ages' },
  { value: 'children', label: 'Children' },
  { value: 'adults', label: 'Adults' },
]
const views = [
  { value: 'online', label: 'Online Scheduling' },
  { value: 'primary', label: 'Primary Care' },
]

const markers = [
  { pos: [34.5553, 69.2075], text: 'MyPatientHUB Clinic' },
  { pos: [34.5353, 69.175], text: 'Medical Clinic' },
]

function FindClinic() {
  return (
    <div className="clinic-page">
      <header className="clinic-header">
        <div className="clinic-breadcrumb">
          <Link to="/dashboard">
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </Link>
          <i className="fa-solid fa-chevron-right"></i>
          <span>Find Clinic</span>
        </div>

        <div className="clinic-top-icons">
          <button type="button" className="clinic-top-icon">
            <Link to="/">
              <i className="fa-solid fa-circle-user"></i>
            </Link>
          </button>

          <button type="button" className="clinic-menu-toggle">
            <Link to="/dashboard">
              <i className="fa-solid fa-bars"></i>
            </Link>
          </button>

          <button type="button" className="clinic-top-icon clinic-settings">
            <Link to="/dashboard">
              <i className="fa-solid fa-gear"></i>
            </Link>
          </button>
        </div>

        <div className="clinic-heading">
          <h1>Find Clinic</h1>
        </div>

        <div className="clinic-search-title">
          <h2>Find a Clinic</h2>
          <p>Search Clinics and schedule an appointment with doctors through Clinic.</p>
        </div>

        <div className="clinic-search">
          <input type="text" placeholder="Search" />
        </div>

        <div className="clinic-location-search">
          <input type="text" placeholder="Zip Code or Neighborhood" />
        </div>

        <div className="clinic-buttons">
          <button type="button">CURRENT</button>
          <button type="button">SEARCH</button>
        </div>
      </header>

      <section className="clinic-view-switch">
        <button type="button" className="clinic-view-btn active">
          <i className="fa-solid fa-map-location-dot"></i>
          Map
        </button>
        <button type="button" className="clinic-view-btn">
          <i className="fa-solid fa-list"></i>
          List
        </button>
      </section>

      <section className="clinic-filter-card">
        <div className="clinic-location-fields">
          <input type="text" placeholder="Primary Care" />
          <input type="text" placeholder="Zip code or Neighborhood" />
        </div>

        <div className="clinic-filter-block">
          <h2>Filter By</h2>
          {selects.map((s) => (
            <button type="button" className="clinic-select" key={s}>
              <span>{s}</span>
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          ))}
        </div>

        <div className="clinic-filter-block">
          <h2>Providers Who Treat</h2>
          {ages.map((a) => (
            <label className="clinic-check" key={a.value}>
              <input type="checkbox" name="age" value={a.value} />
              <span>{a.label}</span>
            </label>
          ))}
        </div>

        <div className="clinic-filter-block">
          <h2>View Only</h2>
          {views.map((v) => (
            <label className="clinic-check" key={v.value}>
              <input type="checkbox" name="view" value={v.value} />
              <span>{v.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="clinic-map-section">
        <div className="clinic-map-buttons">
          <button type="button" className="clinic-map-btn active">
            <i className="fa-solid fa-map"></i>
            Map
          </button>
          <button type="button" className="clinic-map-btn">
            <i className="fa-solid fa-satellite"></i>
            Satellite
          </button>
        </div>

        <MapView id="clinic-map" className="clinic-map" markers={markers} />
      </section>

      <footer className="clinic-footer">
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

        <button
          type="button"
          className="clinic-back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="fa-solid fa-chevron-up"></i>
        </button>
      </footer>
    </div>
  )
}

export default FindClinic