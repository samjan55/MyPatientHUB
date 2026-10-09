import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const menu = [
  { icon: 'house', label: 'Dashboard', active: true },
  { icon: 'calendar', label: 'Appointments' },
  { icon: 'user-doctor', label: 'Find Doctor', to: '/finddoctor' },
  { icon: 'hospital', label: 'Find Clinic', to: '/findclinic' },
  { icon: 'message', label: 'Chat' },
  { icon: 'store', label: 'Find MarketPlace', to:'/marketplace'},
  { icon: 'pills', label: 'Find Pharmacy', to: '/findpharmacy' },
  { icon: 'users', label: 'My Dependents', to: '/mydependents' },
  { icon: 'user', label: 'My Account' },
  { icon: 'gear', label: 'Settings' },
]

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
    button: false,
    items: [
      { icon: 'utensils', color: 'pink', name: 'Food Panda', pct: '25%' },
      { icon: 'motorcycle', color: 'blue', name: 'Grab Food', pct: '3%' },
      { icon: 'heart-pulse', color: 'green', name: 'MySejahtera', pct: '15%' },
    ],
  },
]

function Dashboard() {
  const navigate = useNavigate()
  const [sidebarHidden, setSidebarHidden] = useState(false)

  return (
    <div className="dashboard">
      <aside className={`sidebar ${sidebarHidden ? 'hide' : ''}`}>
        <div className="logo">
          <div className="logo-icon">M</div>
          <span>MyPatientHUB</span>
        </div>

        <div className="menu">
          {menu.map((item) => {
            const inner = (
              <>
                <i className={`fa-solid fa-${item.icon}`}></i>
                <span>{item.label}</span>
              </>
            )
            return item.to ? (
              <Link key={item.label} to={item.to}>{inner}</Link>
            ) : (
              <a key={item.label} href="#" className={item.active ? 'active' : ''}>
                {inner}
              </a>
            )
          })}
        </div>

        <div className="help">
          <i className="fa-solid fa-question"></i>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="top-title">
            <div className="breadcrumb">
              <i className="fa-solid fa-house"></i>
              <span>/</span>
              <span>Dashboard</span>
            </div>

            <button
              className="menu-toggle"
              onClick={() => setSidebarHidden(!sidebarHidden)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>

            <h2>Dashboard</h2>
          </div>

          <div className="top-right">
            <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Type here..." />
            </div>

            <span id="logout" className="logout" onClick={() => navigate('/')}>
              <i className="fa-solid fa-circle-user"></i>
              Log out
            </span>

            <i className="fa-solid fa-gear"></i>
            <i className="fa-solid fa-bell"></i>
          </div>
        </header>

        <section className="content">
          <h1>Welcome To MyPatientHUB!</h1>

          <div className="cards">
            {cards.map((card) => (
              <div className="card" key={card.title}>
                <div className="card-title">
                  <h3>{card.title}</h3>
                  <i className="fa-solid fa-circle-info"></i>
                </div>

                <div className="chart-content">
                  <div className={`donut ${card.chart}`}></div>

                  <div className="chart-list">
                    {card.items.map((it) => (
                      <p key={it.name}>
                        <i className={`fa-solid fa-${it.icon} ${card.prefix}-icon ${it.color}`}></i>
                        <span>{it.name}</span>
                        <b>{it.pct}</b>
                      </p>
                    ))}
                  </div>
                </div>

                {card.button && <button className="details">MORE DETAILS</button>}
              </div>
            ))}

            <div className="card health-card">
              <div className="card-title">
                <h3>Health Index</h3>
                <i className="fa-solid fa-circle-info"></i>
              </div>

              <div className="health-number">
                70%
                <span>+3%</span>
              </div>

              <div className="health-chart">
                <svg className="health-line" viewBox="0 0 600 150">
                  <path
                    d="M0 135 Q60 105 120 125 Q180 145 240 85 Q300 30 360 100 Q420 145 480 75 Q540 35 600 20"
                    fill="none"
                    stroke="#30345f"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <footer className="dashboard-footer">
          <p>© 2026, made with ♥ by MyPatientHUB for a better web.</p>
          <div>
            <a href="#">MyPatientHUB</a>
            <a href="#">About Us</a>
            <a href="#">Blog</a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default Dashboard