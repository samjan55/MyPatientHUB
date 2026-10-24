import '@fortawesome/fontawesome-free/css/all.min.css'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import './Marketplace.css'
import afghani from '../assets/afghani.jpeg'
import pizza from '../assets/pizza.jpeg'
import kabab from '../assets/kabab.jpeg'
import burger from '../assets/burger.jpeg'
import chiken from '../assets/cheken.jpeg'
import drink from '../assets/drink.jpeg'
import pasta from '../assets/pasta.jpeg'
import caftereia from '../assets/cafeteria.jpeg'
import namak from '../assets/namak.jpeg'
import zifyat from '../assets/ziyfat.jpeg'
import afiyat from '../assets/afiyat.jpeg'
import cloud from '../assets/cloud.jpeg'
import kaboora from '../assets/kaboora.jpeg'
import cakeland from '../assets/cakeland.jpeg'
import buakhara from '../assets/buakhara.jpeg'
import orange from '../assets/orange .jpeg'
import chikenkebab from '../assets/chiken kebab.jpeg'
import chikenpizza from '../assets/chikenpizza.jpeg'
import cake from '../assets/cake.jpeg'
import classicburger from '../assets/classicburger.jpeg'
import pepsi from '../assets/pepsi.jpeg'
import welcardImage from '../assets/welc market.jpeg'

/* =========================
   FOOD CATEGORIES
========================= */

const categories = [
  { id: 1, name: 'Qabili Palaw', image: afghani },
  { id: 2, name: 'Pizza', image: pizza },
  { id: 3, name: 'Breakfast', image: '/food3.jpeg' },
  { id: 4, name: 'Kebab', image: kabab },
  { id: 5, name: 'Burger', image: burger },
  { id: 6, name: 'Chicken Wings', image: chiken },
  { id: 7, name: 'Drinks', image: drink },
  { id: 8, name: 'Salad', image: '/food8.jpeg' },
  { id: 9, name: 'Pasta', image: pasta },
  { id: 10, name: 'Desserts', image: '/food10.jpeg' },
]

/* =========================
   FOOD PRODUCTS
========================= */

const foods = [
  { id: 1, name: 'Afghan Qabili Palaw', category: 'Qabili Palaw', price: 7, image: afghani, restaurantId: 1, isNew: true, popular: true },
  { id: 2, name: 'Chicken Pizza', category: 'Pizza', price: 8, image: chikenpizza, restaurantId: 2, isNew: true, popular: true },
  { id: 3, name: 'Breakfast Special', category: 'Breakfast', price: 4, image: '/food8.jpeg', restaurantId: 1, isNew: true, popular: false },
  { id: 4, name: 'Chicken Kebab', category: 'Kebab', price: 6, image: chikenkebab, restaurantId: 3, isNew: false, popular: true },
  { id: 5, name: 'Classic Burger', category: 'Burger', price: 5, image: classicburger, restaurantId: 4, isNew: false, popular: true },
  { id: 6, name: 'Spicy Chicken Wings', category: 'Chicken Wings', price: 5, image: chiken, restaurantId: 3, isNew: true, popular: true },
  { id: 7, name: 'Pepsi', category: 'Drinks', price: 1, image: pepsi, restaurantId: 2, isNew: false, popular: true },
  { id: 8, name: 'Fresh Salad Bowl', category: 'Salad', price: 4, image: '/food8.jpeg', restaurantId: 5, isNew: false, popular: false },
  { id: 9, name: 'Chicken Alfredo Pasta', category: 'Pasta', price: 9, image: '/food13.jpeg', restaurantId: 4, isNew: true, popular: true },
  { id: 10, name: 'Chocolate Cake', category: 'Desserts', price: 3, image: cake, restaurantId: 6, isNew: false, popular: true },
  { id: 11, name: 'French Toast', category: 'Breakfast', price: 3, image: '/food11.jpeg', restaurantId: 1, isNew: false, popular: false },
  { id: 12, name: 'Avocado Toast', category: 'Breakfast', price: 4, image: '/food6.jpeg', restaurantId: 5, isNew: true, popular: false },
  { id: 13, name: 'Cheese Pizza', category: 'Pizza', price: 7, image: '/food13.jpeg', restaurantId: 2, isNew: false, popular: true },
  { id: 14, name: 'Beef Burger', category: 'Burger', price: 6, image: burger, restaurantId: 4, isNew: true, popular: true },
  { id: 15, name: 'Grilled Chicken Kebab', category: 'Kebab', price: 7, image: '/food4.jpeg', restaurantId: 3, isNew: false, popular: true },
  { id: 16, name: 'Orange Juice', category: 'Drinks', price: 2, image: orange, restaurantId: 6, isNew: true, popular: false },
  { id: 17, name: 'Vegetable Salad', category: 'Salad', price: 4, image: '/food8.jpeg', restaurantId: 5, isNew: false, popular: true },
]

/* =========================
   RESTAURANTS
   delivery = فقط عدد دقیقه
========================= */

const restaurants = [
  { id: 1, name: 'Cafeteria', image: caftereia, rating: 4.8, open: '08:00', close: '22:00', hours: '8:00 AM – 10:00 PM', delivery: '20–30', description: 'Afghan dishes, breakfast and traditional meals.' },
  { id: 2, name: 'Namak', image: namak, rating: 4.7, open: '09:00', close: '23:00', hours: '9:00 AM – 11:00 PM', delivery: '25–35', description: 'Pizza, soft drinks and delicious fast food.' },
  { id: 3, name: 'CAKE LAND', image: cakeland, rating: 4.6, open: '11:00', close: '23:00', hours: '11:00 AM – 11:00 PM', delivery: '30–40', description: 'Grilled chicken, kebab and chicken wings.' },
  { id: 4, name: 'Burger House', image: buakhara, rating: 4.5, open: '10:00', close: '22:00', hours: '10:00 AM – 10:00 PM', delivery: '20–30', description: 'Fresh burgers, pasta and tasty meals.' },
  { id: 5, name: 'Green Garden Cafe', image: kaboora, rating: 4.6, open: '07:00', close: '21:00', hours: '7:00 AM – 9:00 PM', delivery: '15–25', description: 'Breakfast, fresh salads and healthy food.' },
  { id: 6, name: 'Sweet Corner', image: afiyat, rating: 4.9, open: '09:00', close: '22:00', hours: '9:00 AM – 10:00 PM', delivery: '20–30', description: 'Cakes, desserts, juices and sweet treats.' },
  { id: 7, name: 'Family Restaurant', image: cloud, rating: 4.7, open: '08:00', close: '23:00', hours: '8:00 AM – 11:00 PM', delivery: '30–40', description: 'Family meals, Afghan food and international dishes.' },
  { id: 8, name: 'Fresh Bites', image: zifyat, rating: 4.5, open: '08:00', close: '21:00', hours: '8:00 AM – 9:00 PM', delivery: '15–25', description: 'Fresh sandwiches, salads and light meals.' },
]

function Marketplace() {
  const { t } = useTranslation()

  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [cart, setCart] = useState([])
  const [notice, setNotice] = useState(null)

  // ساعت کاری: AM و PM به زبان انتخاب‌شده
  const fmtHours = (hours) =>
    hours.replace(/AM/g, t('AM')).replace(/PM/g, t('PM'))

  // جستجو هم با نام انگلیسی و هم با نام دری یا پشتو
  const filteredFoods = foods.filter((food) => {
    const query = search.toLowerCase().trim()

    const matchesSearch =
      !query ||
      `${food.name} ${t(food.name)} ${food.category} ${t(food.category)}`
        .toLowerCase()
        .includes(query)

    const matchesCategory =
      activeCategory === 'All' || food.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const newFoods = filteredFoods.filter((food) => food.isNew)
  const popularFoods = filteredFoods.filter((food) => food.popular)

  const selectedFoods = selectedRestaurant
    ? foods.filter((food) => food.restaurantId === selectedRestaurant.id)
    : []

  function addToCart(food) {
    setCart((previous) => [...previous, food])
    setNotice(food)

    setTimeout(() => {
      setNotice(null)
    }, 2500)
  }

  function isRestaurantOpen(restaurant) {
    const now = new Date()
    const current = now.getHours() * 60 + now.getMinutes()

    const [openHour, openMinute] = restaurant.open.split(':').map(Number)
    const [closeHour, closeMinute] = restaurant.close.split(':').map(Number)

    const opening = openHour * 60 + openMinute
    const closing = closeHour * 60 + closeMinute

    if (closing < opening) {
      return current >= opening || current < closing
    }

    return current >= opening && current < closing
  }

  function renderFoodCard(food) {
    const restaurant = restaurants.find(
      (item) => item.id === food.restaurantId
    )

    return (
      <article className="mp-food-card" key={food.id}>
        <div className="mp-food-image-wrap">
          <img
            className="mp-food-image"
            src={food.image}
            alt={t(food.name)}
          />

          {food.isNew && <span className="mp-badge">{t('NEW')}</span>}
        </div>

        <div className="mp-food-details">
          <span className="mp-food-category">{t(food.category)}</span>

          <h3>{t(food.name)}</h3>

          <p className="mp-food-restaurant">
            <i className="fa-solid fa-store"></i>
            {restaurant && t(restaurant.name)}
          </p>

          <div className="mp-food-bottom">
            <span className="mp-food-price" dir="ltr">
              ${food.price.toFixed(2)}
            </span>

            <button
              className="mp-add-button"
              onClick={() => addToCart(food)}
            >
              <i className="fa-solid fa-plus"></i>
              {t('Add')}
            </button>
          </div>

          <button
            className="mp-view-restaurant"
            onClick={() => setSelectedRestaurant(restaurant)}
          >
            {t('View Restaurant')}
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </article>
    )
  }

  return (
    <div
      className={`marketplace-layout ${
        sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main">
        <Header
          title="Marketplace"
          onMenuClick={() => setSidebarOpen((previous) => !previous)}
          onSearch={setSearch}
        />

        <section className="content mp-page">

          {/* WELCOME CARD */}
          <section className="mp-welcome">
            <div className="mp-welcome-content">
              <span className="mp-welcome-tag">
                <i className="fas fa-heartbeat"></i>
                {t('HEALTHY FOOD MARKETPLACE')}
              </span>

              <h1>
                {t('Eat Healthy,')}
                <br />
                {t('Live Better!')}
              </h1>

              <p>
                {t(
                  'Discover delicious meals from your favorite restaurants and enjoy fresh food for a healthier lifestyle.'
                )}
              </p>

              <button
                className="mp-explore-button"
                onClick={() =>
                  document.getElementById('mp-categories')?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }
              >
                {t('Explore Foods')}
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>

            <div className="mp-welcome-image">
              <img
                src={welcardImage}
                alt={t('Delicious Afghan Food')}
              />

              <div className="mp-image-label">
                <i className="fas fa-star"></i>
                {t('Delicious Afghan Food')}
              </div>
            </div>
          </section>

          {/* SEARCH AND CART */}
          <div className="mp-page-toolbar">
            <div>
              <h2>{t('Find Your Favorite Food')}</h2>
              <p>{t('Explore food and restaurants.')}</p>
            </div>

            <div className="mp-cart-summary">
              <i className="fa-solid fa-cart-shopping"></i>
              {t('My Cart')}
              <span>{cart.length}</span>
            </div>
          </div>

          <div className="mp-search-box">
            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder={t('Search food...')}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                onClick={() => setSearch('')}
                aria-label={t('Clear search')}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          {/* CATEGORIES */}
          <section className="mp-section" id="mp-categories">
            <div className="mp-section-heading">
              <div>
                <h2>{t('Categories')}</h2>
                <p>{t('Choose your favorite food category.')}</p>
              </div>
            </div>

            <div className="mp-category-list">
              {categories.map((category) => (
                <button
                  className={`mp-category ${
                    activeCategory === category.name ? 'active' : ''
                  }`}
                  key={category.id}
                  onClick={() =>
                    setActiveCategory((previous) =>
                      previous === category.name ? 'All' : category.name
                    )
                  }
                >
                  <img
                    className="mp-category-image"
                    src={category.image}
                    alt={t(category.name)}
                  />

                  <span>{t(category.name)}</span>
                </button>
              ))}
            </div>
          </section>

          {/* NEW ARRIVALS */}
          <section className="mp-section">
            <div className="mp-section-heading">
              <div>
                <h2>{t('New Arrivals')}</h2>
                <p>{t('Discover new food choices.')}</p>
              </div>
            </div>

            <div className="mp-food-grid">
              {newFoods.length ? (
                newFoods.map(renderFoodCard)
              ) : (
                <p className="mp-empty">{t('No foods found.')}</p>
              )}
            </div>
          </section>

          {/* POPULAR FOODS */}
          <section className="mp-section">
            <div className="mp-section-heading">
              <div>
                <h2>{t('Popular Foods')}</h2>
                <p>{t('Popular meals to explore.')}</p>
              </div>
            </div>

            <div className="mp-food-grid">
              {popularFoods.length ? (
                popularFoods.map(renderFoodCard)
              ) : (
                <p className="mp-empty">{t('No foods found.')}</p>
              )}
            </div>
          </section>

          {/* RESTAURANTS */}
          <section className="mp-section" id="mp-restaurants">
            <div className="mp-section-heading">
              <div>
                <h2>{t('Restaurants')}</h2>
                <p>{t('Explore restaurant menus and opening hours.')}</p>
              </div>
            </div>

            <div className="mp-restaurant-grid">
              {restaurants.map((restaurant) => (
                <article
                  className="mp-restaurant-card"
                  key={restaurant.id}
                >
                  <img
                    className="mp-restaurant-image"
                    src={restaurant.image}
                    alt={t(restaurant.name)}
                  />

                  <div className="mp-restaurant-details">
                    <div className="mp-restaurant-title">
                      <h3>{t(restaurant.name)}</h3>

                      <span className="mp-rating">
                        <i className="fa-solid fa-star"></i>
                        {restaurant.rating}
                      </span>
                    </div>

                    <p>{t(restaurant.description)}</p>

                    <div className="mp-restaurant-hours">
                      <i className="fa-regular fa-clock"></i>
                      {fmtHours(restaurant.hours)}
                    </div>

                    <div className="mp-restaurant-status">
                      <span
                        className={
                          isRestaurantOpen(restaurant)
                            ? 'mp-open'
                            : 'mp-closed'
                        }
                      >
                        {isRestaurantOpen(restaurant)
                          ? t('Open Now')
                          : t('Closed')}
                      </span>

                      <span>
                        <i className="fa-solid fa-motorcycle"></i>{' '}
                        {t('minutes', { range: restaurant.delivery })}
                      </span>
                    </div>

                    <button
                      className="mp-restaurant-button"
                      onClick={() => setSelectedRestaurant(restaurant)}
                    >
                      {t('View Restaurant')}
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* RESTAURANT MENU MODAL */}
          {selectedRestaurant && (
            <div
              className="mp-modal-overlay"
              onClick={() => setSelectedRestaurant(null)}
            >
              <section
                className="mp-restaurant-modal"
                role="dialog"
                aria-modal="true"
                aria-label={t(selectedRestaurant.name)}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  className="mp-modal-close"
                  onClick={() => setSelectedRestaurant(null)}
                  aria-label={t('Close')}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

                <img
                  className="mp-modal-image"
                  src={selectedRestaurant.image}
                  alt={t(selectedRestaurant.name)}
                />

                <div className="mp-modal-content">
                  <h2>{t(selectedRestaurant.name)}</h2>

                  <div className="mp-modal-rating">
                    <i className="fa-solid fa-star"></i>
                    {t('ratingText', { rating: selectedRestaurant.rating })}
                  </div>

                  <p>{t(selectedRestaurant.description)}</p>

                  <div className="mp-modal-hours">
                    <i className="fa-regular fa-clock"></i>

                    <div>
                      <b>{t('Opening Hours')}</b>
                      <span>{fmtHours(selectedRestaurant.hours)}</span>
                    </div>

                    <span
                      className={
                        isRestaurantOpen(selectedRestaurant)
                          ? 'mp-open'
                          : 'mp-closed'
                      }
                    >
                      {isRestaurantOpen(selectedRestaurant)
                        ? t('Open Now')
                        : t('Closed')}
                    </span>
                  </div>

                  <h3>{t('Restaurant Menu')}</h3>

                  <div className="mp-modal-menu">
                    {selectedFoods.map((food) => (
                      <div className="mp-menu-item" key={food.id}>
                        <img src={food.image} alt={t(food.name)} />

                        <div>
                          <b>{t(food.name)}</b>
                          <span>{t(food.category)}</span>
                        </div>

                        <strong dir="ltr">${food.price.toFixed(2)}</strong>

                        <button
                          onClick={() => addToCart(food)}
                          aria-label={t('addAria', { name: t(food.name) })}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    className="mp-restaurant-button"
                    onClick={() => setSelectedRestaurant(null)}
                  >
                    {t('Back to Marketplace')}
                  </button>
                </div>
              </section>
            </div>
          )}

          {notice && (
            <div className="mp-notice">
              <i className="fa-solid fa-circle-check"></i>
              {t('foodAddedToCart', { name: t(notice.name) })}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Marketplace