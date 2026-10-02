import { Link, useSearchParams } from 'react-router-dom'
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
  { pos: [34.5553, 69.2075], text: 'Doctor Location' },
  { pos: [34.5353, 69.175], text: 'Medical Center' },
  { pos: [34.565, 69.23], text: 'Hospital' },
]

function Specialty() {
  const [params] = useSearchParams()
  const specialtyName = params.get('specialty') || 'Anesthesiology'

  return (
    <div className="specialty-page">
      <header className="specialty-header">
        <div className="breadcrumb">
          <Link to="/dashboard">
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </Link>
          <i className="fa-solid fa-chevron-right"></i>
          <Link to="/finddoctor">Find Doctor</Link>
          <i className="fa-solid fa-chevron-right"></i>
          <span className="specialty-name">{specialtyName}</span>
        </div>

        <div className="header-main">
          <div className="header-icon">
            <i className="fa-solid fa-user-doctor"></i>
          </div>
          <div className="header-content">
            <h1>{specialtyName}</h1>
            <p>Find doctors and schedule your appointment.</p>
          </div>
        </div>
      </header>

      <section className="search-card">
        <div className="search-title">
          <h2>Find a Doctor</h2>
          <p>Search doctors and schedule an appointment.</p>
        </div>

        <div className="search-form">
          <div className="search-input">
            <i className="fa-solid fa-user-doctor"></i>
            <input type="text" placeholder="Search a doctor by name, specialty" />
          </div>

          <div className="search-input">
            <i className="fa-solid fa-location-dot"></i>
            <input type="text" placeholder="Zip Code or Neighborhood" />
          </div>

          <button type="button" className="search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
            Search
          </button>
        </div>
      </section>

      <section className="view-switch">
        <button type="button" className="view-btn active">
          <i className="fa-solid fa-map-location-dot"></i>
          Map
        </button>
        <button type="button" className="view-btn">
          <i className="fa-solid fa-list"></i>
          List
        </button>
      </section>

      <section className="filter-card">
        <div className="location-fields">
          <input type="text" className="filter-input" placeholder="Primary Care" />
          <input type="text" className="filter-input" placeholder="Zip code or Neighborhood" />
        </div>

        <div className="filter-block">
          <h2 className="filter-title">Filter By</h2>
          <div className="filter-grid">
            {selects.map((s) => (
              <button type="button" className="select-box" key={s}>
                <span>{s}</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-block">
          <h3 className="filter-section-title">Providers Who Treat</h3>
          <div className="check-list">
            {ages.map((a) => (
              <label className="check-item" key={a.value}>
                <input type="checkbox" name="age" value={a.value} />
                <span>{a.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-block">
          <h3 className="filter-section-title">View Only</h3>
          <div className="check-list">
            {views.map((v) => (
              <label className="check-item" key={v.value}>
                <input type="checkbox" name="view" value={v.value} />
                <span>{v.label}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="sort-section">
        <div className="sort-title">
          <span>Sort By</span>
        </div>

        <button type="button" className="sort-button active">
          <i className="fa-solid fa-calendar-check"></i>
          Next Available
        </button>

        <button type="button" className="sort-button">
          <i className="fa-solid fa-location-arrow"></i>
          Distance
        </button>
      </section>

      <section className="map-section">
        <div className="map-header">
          <div className="map-type">
            <button type="button" className="map-type-btn active">
              <i className="fa-solid fa-map"></i>
              Map
            </button>
            <button type="button" className="map-type-btn">
              <i className="fa-solid fa-satellite"></i>
              Satellite
            </button>
          </div>
        </div>

        <MapView id="doctor-map" className="doctor-map" markers={markers} />
      </section>

      <footer className="specialty-footer">
        <div className="footer-logo">
          <i className="fa-solid fa-heart-pulse"></i>
          MyPatientHUB
        </div>

        <p>
          © 2026, made with <i className="fa-solid fa-heart"></i> by{' '}
          <strong>MyPatientHUB</strong>
          <br />
          for a better web.
        </p>

        <div className="footer-links">
          <Link to="/dashboard">MyPatientHUB</Link>
          <a href="#">About Us</a>
          <a href="#">Blog</a>
        </div>

        <button
          type="button"
          className="back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="fa-solid fa-chevron-up"></i>
        </button>
      </footer>
    </div>
  )
}

export default Specialty