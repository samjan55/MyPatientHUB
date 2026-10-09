import '@fortawesome/fontawesome-free/css/all.min.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const menu = [
  { icon: 'house', label: 'Dashboard', to: '/dashboard' },
  { icon: 'calendar-days', label: 'Appointments' },
  { icon: 'user-doctor', label: 'Find Doctor', to: '/finddoctor' },
  { icon: 'hospital', label: 'Find Clinic', to: '/findclinic' },
  { icon: 'comments', label: 'Chat' },
  { icon: 'cart-shopping', label: 'Find MarketPlace', to: '/marketplace', active: true },
  { icon: 'capsules', label: 'Find Pharmacy', to: '/findpharmacy' },
  { icon: 'users', label: 'My Dependents', to: '/my-dependents' },
  { icon: 'user', label: 'My Account', to: '/my-account' },
  { icon: 'gear', label: 'Settings', to: '/settings' },
]

const products = [
  { image: '/food1.jpeg', price: '5 RM', name: 'Food Panda', text: 'Fresh and healthy meals delivered to your door.' },
  { image: '/food2.jpeg', price: '10 RM', name: 'Grab Food', text: 'Order your healthy diet meals quickly and easily.' },
  { image: '/food3.jpeg', price: '15 RM', name: 'Deliveroo', text: 'Different people have different taste, and various types of food.' },
  { image: '/food4.jpeg', price: '20 RM', name: 'Minimalist', text: 'Simple and healthy food for every day.' },
]

const rows = [
  { image: '/food5.jpeg', name: 'Croissant and Coffee 🥐☕️', category: 'Coffee & Croissants', service: 'Foodpanda', color: '#13296d', discount: 0, price: '30$', id: '243598234' },
  { image: '/food6.jpeg', name: 'Avocado Berry Toast 🥑🍞', category: 'Toast', service: 'Grab Food', color: '#1677D2', discount: 5, price: '20$', id: '243598235' },
  { image: '/food7.jpeg', name: 'Egg Avocado Toast 🍳🍞', category: 'Toast', service: 'Deliveroo', color: '#14B8A6', discount: 10, price: '22$', id: '243598236' },
  { image: '/food8.jpeg', name: 'Fresh Salad Bowl 🥗', category: 'Salad', service: 'Foodpanda', color: '#13296d', discount: 15, price: '35$', id: '243598237' },
  { image: '/food9.jpeg', name: 'Choco Toast 🍫🍞', category: 'Toast', service: 'Grab Food', color: '#1677D2', discount: 0, price: '30 $', id: '243598238' },
  { image: '/food10.jpeg', name: 'Berry Toast 🍓🍞', category: 'Toast', service: 'Deliveroo', color: '#14B8A6', discount: 0, price: '38$', id: '243598239' },
  { image: '/food11.jpeg', name: 'French Toast ☕', category: 'Breakfast', service: 'Foodpanda', color: '#13296d', discount: 0, price: '20 $', id: '243598240' },
  { image: '/food12.jpeg', name: 'Yogurt Banana Split 🍌🍓', category: 'Healthy Breakfast', service: 'Grab Food', color: '#1677D2', discount: 0, price: '13 $', id: '243598241' },
  { image: '/food13.jpeg', name: 'Chicken Alfredo 🍗🍝', category: 'Pasta', service: 'Deliveroo', color: '#14B8A6', discount: 0, price: '18 $', id: '243598242' },
];

function Marketplace() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [perPage, setPerPage] = useState(7)

  const filtered = rows
    .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, perPage)

  return (
    <div className="dashboard">
      <aside className="sidebar">
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
              <Link key={item.label} to={item.to} className={item.active ? 'active' : ''}>
                {inner}
              </Link>
            ) : (
              <a key={item.label} href="#">{inner}</a>
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
              <span>Marketplace</span>
            </div>
            <h2>Marketplace</h2>
          </div>

          <div className="top-right">
            <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Type here..." />
            </div>
            <span className="logout" onClick={() => navigate('/login')}>
              <i className="fa-solid fa-circle-user"></i>
              Log out
            </span>
            <i className="fa-solid fa-gear"></i>
            <i className="fa-solid fa-bell"></i>
          </div>
        </header>

        <section className="content">
          <div className="mp-box">
            <h2>Search Marketplaces and order what you need</h2>

            <div className="mp-grid">
              {products.map((p) => (
                <div key={p.name}>
                  <img className="mp-img" src={p.image} alt={p.name} />
                  <div className="mp-info">
                    <span>Healthy Diet</span>
                    <span className="mp-price">{p.price}</span>
                  </div>
                  <div className="mp-name">{p.name}</div>
                  <p className="mp-text">{p.text}</p>
                  <button className="mp-btn">BUY NOW</button>
                </div>
              ))}
            </div>
          </div>

          <div className="mp-box">
            <h2>Other results for healthy diet search</h2>

            <div className="mp-toolbar">
              <div className="mp-entries">
                <select
                  className="mp-select"
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                >
                  <option value={9}>9</option>
                  <option value={5}>5</option>
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                </select>
                <span>entries per page</span>
              </div>

              <input
                className="mp-search"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="mp-table-wrap">
              <table className="mp-table">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>CATEGORY</th>
                    <th>SERVICE BY</th>
                    <th>DISCOUNT</th>
                    <th>PRICE</th>
                    <th>ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <div className="mp-cell">
                          <img className="mp-thumb" src={r.image} alt={r.name} />
                          <b>{r.name}</b>
                        </div>
                      </td>
                      <td>{r.category}</td>
                      <td>
                    <div className="mp-cell">
                    <span className="mp-logo" style={{ backgroundColor: r.color }}>
                    <i className="fa-solid fa-bowl-food"></i>
                       </span>
                      <b>{r.service}</b>
                </div>
                   </td>
                      <td>{r.discount}</td>
                      <td>{r.price}</td>
                      <td>{r.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Marketplace