 import { useMemo, useState } from "react";
import "./Marketplace.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import  vegetablesoup from '../assets/Vegetable Soup.jpeg'
import  chickensoup from '../assets/Chicken Soup.jpeg'
import  LentilSoup from '../assets/Lentil Soup.jpeg'
import  PumpkinSoup from '../assets/Pumpkin Soup.jpeg'
import  Carrot from '../assets/Carrot.jpeg'
import  egg1 from '../assets/Egg1.jpeg'
import  egg2 from '../assets/Egg2.jpeg'
import  egg3 from '../assets/Egg3.jpeg'
import  milk from '../assets/Milk.jpeg'
import  yogurt from '../assets/yogurt.jpeg'
import  rice from '../assets/softrice.jpeg'
import  oat from '../assets/Oats.jpeg'
import  fish from '../assets/fish.jpeg'
import  orange from '../assets/orange2.jpeg'
import  fruits from '../assets/friuts.jpeg'
import  kiwi from '../assets/kiwi.jpeg'
import  mango from '../assets/mango.jpeg'
import  choclate from '../assets/Chaclet  milke.jpeg'
import  pasta from '../assets/pasta.jpeg'









/* ================= PRODUCTS ================= */

const products = [
  // SOUPS
  {
    id: 1,
    name: "Vegetable Soup",
    category: "Soups",
    price: 150,
    image: vegetablesoup,
    description: "A warm vegetable soup for a light meal.",
    ingredients: "Vegetables, water, and seasonings.",
    tags: ["Soups", "Soft Foods", "Healthy Eating"],
    type: "food",
  },
  {
    id: 2,
    name: "Chicken Soup",
    category: "Soups",
    price: 200,
    icon: "🍲",
    image: chickensoup,
    description: "Warm chicken soup with vegetables.",
    ingredients: "Chicken, carrots, water, and seasonings.",
    tags: ["Soups", "Protein Foods", "Soft Foods"],
    type: "food",
  },
  {
    id: 3,
    name: "Lentil Soup",
    category: "Soups",
    price: 170,
    icon: "🥣",
    image:LentilSoup,
    description: "A warm and filling lentil soup.",
    ingredients: "Lentils, water, and vegetables.",
    tags: ["Soups", "Healthy Eating"],
    type: "food",
  },
  {
    id: 4,
    name: "Pumpkin Soup",
    category: "Soups",
    price: 180,
    icon: "🍵",
    image: PumpkinSoup,
    description: "Smooth pumpkin soup with a mild flavor.",
    ingredients: "Pumpkin, water, and seasonings.",
    tags: ["Soups", "Soft Foods"],
    type: "food",
  },
 

  // FRUITS
  {
    id: 9,
    name: "Kiwi",
    category: "Fruits",
    price: 80,
    icon: "🥝",
    image: kiwi,
    description: "Fresh kiwi.",
    ingredients: "Fresh kiwis.",
    tags: ["Fruits", "Healthy Eating"],
    type: "food",
  },
  {
    id: 10,
    name: "Mango",
    category: "Fruits",
    price: 70,
    icon:"🥭",
    image: mango,
    description: "Fresh Mango.",
    ingredients: "Fresh mangos.",
    tags: ["Fruits", "Healthy Eating"],
    type: "food",
  },
  {
    id: 11,
    name: "Orange",
    category: "Fruits",
    price: 90,
    icon: "🍊",
    image: orange,
    description: "Fresh oranges.",
    ingredients: "Fresh oranges.",
    tags: ["Fruits", "Healthy Eating"],
    type: "food",
  },
  {
    id: 12,
    name: "fruits",
    category: "Fruits",
    price: 120,
    icon: "🍇",
    image: fruits,
    description: "Fresh fruits.",
    ingredients: "Fresh fruits.",
    tags: ["Fruits", "Healthy Eating"],
    type: "food",
  },

  // EGGS
  {
    id: 13,
    name: "Boiled Eggs",
    category: "Eggs",
    price: 60,
    icon: "🥚",
    image: egg3,
    description: "Fresh boiled eggs.",
    ingredients: "Eggs.",
    tags: ["Eggs", "Protein Foods"],
    type: "food",
  },
  {
    id: 14,
    name: "Scrambled Eggs",
    category: "Eggs",
    price: 100,
    icon: "🍳",
    image: egg2,
    description: "Soft scrambled eggs.",
    ingredients: "Eggs and a small amount of oil.",
    tags: ["Eggs", "Protein Foods"],
    type: "food",
  },
  {
    id: 15,
    name: "Omelette",
    category: "Eggs",
    price: 120,
    icon: "🍳",
    image: egg1,
    description: "Freshly prepared omelette.",
    ingredients: "Eggs, vegetables, and seasonings.",
    tags: ["Eggs", "Protein Foods"],
    type: "food",
  },

  // DAIRY
  {
    id: 16,
    name: "Milk",
    category: "Dairy Products",
    price: 90,
    icon: "🥛",
    image: milk,
    description: "Fresh milk.",
    ingredients: "Milk.",
    tags: ["Dairy Products"],
    type: "food",
  },
  {
    id: 17,
    name: "Yogurt",
    category: "Dairy Products",
    price: 80,
    icon: "🥣",
    image: yogurt,
    description: "Plain yogurt.",
    ingredients: "Milk and yogurt cultures.",
    tags: ["Dairy Products"],
    type: "food",
  },
  {
    id: 18,
    name: " Chocolate Milk",
    category: "Dairy Products",
    price: 90,
    icon: "🥛",
    image: choclate,
    description: "Fresh milk.",
    ingredients: "Milk.",
    tags: ["Dairy Products"],
    type: "food",
  },
  

  // PROTEIN
  {
    id: 19,
    name: "Pasta",
    category: "Protein Foods",
    price: 350,
    image: pasta,
    description: "Grilled chicken meal.",
    ingredients: "Chicken and seasonings.",
    tags: ["Protein Foods", "Healthy Eating"],
    type: "food",
  },
  {
    id: 20,
    name: "Grilled Fish",
    category: "Protein Foods",
    price: 400,
    icon: "🐟",
    image: fish,
    description: "Fresh grilled fish.",
    ingredients: "Fish and seasonings.",
    tags: ["Protein Foods"],
    type: "food",
  },

  // SOFT FOODS
  {
    id: 21,
    name: "Soft Rice Meal",
    category: "Soft Foods",
    price: 160,
    icon: "🍚",
    image: rice,
    description: "Soft-cooked rice.",
    ingredients: "Rice and water.",
    tags: ["Soft Foods"],
    type: "food",
  },
  {
    id: 22,
    name: "Oatmeal Bowl",
    category: "Soft Foods",
    price: 120,
    icon: "🥣",
    image: oat,
    description: "Warm oatmeal.",
    ingredients: "Oats, water, or milk.",
    tags: ["Soft Foods", "Healthy Eating"],
    type: "food",
  },

  // MEDICAL PRODUCTS
  {
    id: 23,
    name: "Blood Pressure Monitor",
    category: "Home Monitoring",
    price: 1800,
    icon: "🩺",
    description: "Measure blood pressure at home.",
    ingredients: "Check package specifications.",
    tags: ["Home Monitoring"],
    type: "medical",
  },
  {
    id: 24,
    name: "Blood Glucose Meter",
    category: "Home Monitoring",
    price: 1400,
    icon: "🩸",
    description: "Measure blood glucose.",
    ingredients: "Check package specifications.",
    tags: ["Home Monitoring"],
    type: "medical",
  },
  {
    id: 25,
    name: "Digital Thermometer",
    category: "Monitoring Devices",
    price: 450,
    icon: "🌡️",
    description: "Digital body temperature monitor.",
    ingredients: "Check package specifications.",
    tags: ["Monitoring Devices"],
    type: "medical",
  },
  {
    id: 26,
    name: "First Aid Kit",
    category: "First Aid",
    price: 650,
    icon: "🧰",
    description: "Basic first-aid supplies.",
    ingredients: "Contents depend on the selected kit.",
    tags: ["First Aid"],
    type: "medical",
  },
  {
    id: 27,
    name: "Walking Cane",
    category: "Mobility Support",
    price: 900,
    icon: "🦯",
    description: "Walking support aid.",
    ingredients: "Check product specifications.",
    tags: ["Mobility Support"],
    type: "medical",
  },
  {
    id: 28,
    name: "Personal Care Kit",
    category: "Personal Care",
    price: 500,
    icon: "🧴",
    description: "Everyday personal-care products.",
    ingredients: "Check individual product labels.",
    tags: ["Personal Care"],
    type: "medical",
  },
];

/* ================= CATEGORIES ================= */

const foodCategories = [
  { name: "All Categories", icon: "🍴" },
  { name: "Soups", icon: "🍲" },
  { name: "Fruits", icon: "🍎" },
  { name: "Eggs", icon: "🥚" },
  { name: "Dairy Products", icon: "🥛" },
  { name: "Protein Foods", icon: "🍗" },
  { name: "Soft Foods", icon: "🍚" },
];

const medicalCategories = [
  { name: "Home Monitoring", icon: "🩺" },
  { name: "Monitoring Devices", icon: "🌡️" },
  { name: "First Aid", icon: "🧰" },
  { name: "Mobility Support", icon: "🦯" },
  { name: "Personal Care", icon: "🧴" },
];

/* ================= MARKETPLACE ================= */

function Marketplace() {
  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("All Healthy Food");
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [message, setMessage] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* ================= FILTER PRODUCTS ================= */

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) => {
      if (page === "food" && product.type !== "food") return false;
      if (page === "medical" && product.type !== "medical") return false;

      const text =
        `${product.name} ${product.category} ${product.description}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      const matchesCategory =
        category === "All Healthy Food" ||
        category === "All Supplies" ||
        product.category === category ||
        product.tags.includes(category);

      const matchesItem =
        !selectedItem || product.name === selectedItem;

      return matchesSearch && matchesCategory && matchesItem;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [page, category, selectedItem, search, sort]);

  /* ================= CART ================= */

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function openPage(nextPage) {
    setPage(nextPage);

    setCategory(
      nextPage === "medical"
        ? "All Supplies"
        : "All Healthy Food"
    );

    setOpenCategory(null);
    setSelectedItem(null);
    setSearch("");
    setSort("featured");
    setShowCart(false);
    setSelectedProduct(null);
    setMessage("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setMessage(`${product.name} added to your cart.`);
    setSelectedProduct(null);
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  }

  const categories =
    page === "medical"
      ? medicalCategories
      : foodCategories;

  function selectCategory(name) {
    setOpenCategory((current) =>
      current === name ? null : name
    );

    setCategory(name);
    setSelectedItem(null);
    setSearch("");
  }

  function selectProduct(name) {
    setSelectedItem(name);
    setSearch("");
  }

  /* ================= JSX ================= */

  return (
    <div
      className={`marketplace ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="mph-main">
        <Header
          title="Marketplace"
          onMenuClick={() =>
            setSidebarOpen((prev) => !prev)
          }
          onSearch={setSearch}
        />

        <main className="mph-content">

          {/* ================= HOME ================= */}

          {page === "home" ? (
            <>
              <section className="mph-welcome">
                <div className="mph-welcome-content">
                  <span className="mph-eyebrow">
                    YOUR WELLNESS, YOUR WAY
                  </span>

                  <h1>
                    Welcome to Your Care Marketplace
                  </h1>

                  <p>
                    Explore healthy food and everyday care
                    essentials in one simple place.
                  </p>

                  <button
                    className="mph-primary-button"
                    onClick={() => openPage("food")}
                    type="button"
                  >
                    Explore Healthy Food →
                  </button>
                </div>

                <div
                  className="mph-welcome-art"
                  aria-hidden="true"
                >
                  <span>🥗</span>
                  <span>💙</span>
                  <span>🩺</span>
                </div>
              </section>

              <section className="mph-section">
                <div className="mph-section-heading">
                  <div>
                    <span className="mph-eyebrow">
                      SHOP YOUR NEEDS
                    </span>

                    <h2>
                      What are you looking for?
                    </h2>

                    <p>
                      Choose a section to explore products.
                    </p>
                  </div>
                </div>

                <div className="mph-main-categories">
                  <button
                    className="mph-main-category mph-food-category"
                    onClick={() => openPage("food")}
                    type="button"
                  >
                    <div className="mph-main-art">
                      🥗
                    </div>

                    <div className="mph-main-text">
                      <span className="mph-category-label">
                        HEALTHY LIVING
                      </span>

                      <h3>Health Food</h3>

                      <p>
                        Explore soups, vegetables, fruits,
                        eggs, dairy and healthy meals.
                      </p>

                      <span className="mph-explore-link">
                        Explore Healthy Food →
                      </span>
                    </div>
                  </button>

                  <button
                    className="mph-main-category mph-medical-category"
                    onClick={() => openPage("medical")}
                    type="button"
                  >
                    <div className="mph-main-art">
                      🩺
                    </div>

                    <div className="mph-main-text">
                      <span className="mph-category-label">
                        DAILY CARE
                      </span>

                      <h3>Patient Essentials</h3>

                      <p>
                        Find monitoring devices, first-aid
                        supplies and personal-care products.
                      </p>

                      <span className="mph-explore-link">
                        Explore Patient Essentials →
                      </span>
                    </div>
                  </button>
                </div>
              </section>

              <section className="mph-section">
                <div className="mph-section-heading">
                  <div>
                    <span className="mph-eyebrow">
                      PRODUCT COLLECTION
                    </span>

                    <h2>Explore Products</h2>
                  </div>
                </div>

                <div className="mph-preview-grid">
                  {products.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      favorites={favorites}
                      onFavorite={toggleFavorite}
                      onDetails={setSelectedProduct}
                      onAdd={addToCart}
                    />
                  ))}
                </div>
              </section>
            </>
          ) : (
            <>

              {/* ================= BACK BUTTON ================= */}

              <button
                className="mph-back-button"
                onClick={() => openPage("home")}
                type="button"
              >
                ← Back to Marketplace
              </button>

              {/* ================= BANNER ================= */}

              <section
                className={`mph-subpage-banner ${
                  page === "food"
                    ? "mph-food-banner"
                    : "mph-medical-banner"
                }`}
              >
                <div>
                  <span className="mph-eyebrow">
                    {page === "food"
                      ? "HEALTHY LIVING"
                      : "PATIENT CARE"}
                  </span>

                  <h1>
                    {page === "food"
                      ? "Health Food"
                      : "Patient Essentials"}
                  </h1>

                  <p>
                    {page === "food"
                      ? "Explore healthy food categories and choose your favorite products."
                      : "Explore medical equipment and patient-care supplies."}
                  </p>
                </div>

                <span className="mph-subpage-icon">
                  {page === "food" ? "🥗" : "🩺"}
                </span>
              </section>

              {/* ================= DROPDOWN CATEGORIES ================= */}

              <section className="mph-section">
                <div className="mph-section-heading">
                  <div>
                    <h2>
                      {page === "food"
                        ? "Food Categories"
                        : "Care Categories"}
                    </h2>

                    <p>
                      Click a category to explore its products.
                    </p>
                  </div>
                </div>

                <div className="mph-food-dropdowns">
                  {categories.map((item) => {
                    const categoryProducts = products.filter(
                      (product) =>
                        product.type === page &&
                        product.category === item.name
                    );

                    // Food products use type "food".
                    // Medical products use type "medical".
                    const items = products.filter(
                      (product) =>
                        product.type === page &&
                        product.category === item.name
                    );

                    return (
                      <div
                        className="mph-dropdown"
                        key={item.name}
                      >
                        <button
                          className="mph-dropdown-btn"
                          type="button"
                          onClick={() =>
                            selectCategory(item.name)
                          }
                        >
                          <span>
                            {item.icon} {item.name}
                          </span>

                          <span>
                            {openCategory === item.name
                              ? "▲"
                              : "▼"}
                          </span>
                        </button>

                        {openCategory === item.name && (
                          <div className="mph-dropdown-content">

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedItem(null);
                                setSearch("");
                              }}
                            >
                              View All {item.name}
                            </button>

                            {items.map((product) => (
                              <button
                                key={product.id}
                                type="button"
                                onClick={() =>
                                  selectProduct(product.name)
                                }
                              >
                                {product.icon} {product.name}
                              </button>
                            ))}

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ================= PRODUCTS ================= */}

              <section className="mph-section">
                <div className="mph-toolbar">
                  <div>
                    <h2>
                      {selectedItem ||
                        (category === "All Healthy Food" ||
                        category === "All Supplies"
                          ? "Available Products"
                          : category)}
                    </h2>

                    <p>
                      {visibleProducts.length} products found
                    </p>
                  </div>

                  <div className="mph-filters">
                    <input
                      type="search"
                      placeholder="Search products..."
                      value={search}
                      onChange={(event) =>
                        setSearch(event.target.value)
                      }
                      aria-label="Search products"
                    />

                    <select
                      value={sort}
                      onChange={(event) =>
                        setSort(event.target.value)
                      }
                      aria-label="Sort products"
                    >
                      <option value="featured">
                        Featured
                      </option>

                      <option value="low">
                        Price: Low to High
                      </option>

                      <option value="high">
                        Price: High to Low
                      </option>

                      <option value="name">
                        Name: A to Z
                      </option>
                    </select>
                  </div>
                </div>

                {selectedItem && (
                  <button
                    className="mph-back-button"
                    type="button"
                    onClick={() => setSelectedItem(null)}
                  >
                    ← View All {category}
                  </button>
                )}

                {visibleProducts.length > 0 ? (
                  <div className="mph-product-grid">
                    {visibleProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        favorites={favorites}
                        onFavorite={toggleFavorite}
                        onDetails={setSelectedProduct}
                        onAdd={addToCart}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mph-empty-state">
                    <span>🔎</span>

                    <h3>No products found</h3>

                    <p>
                      Try another search or select another
                      category.
                    </p>

                    <button
                      className="mph-primary-button"
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setSelectedItem(null);
                        setCategory(
                          page === "food"
                            ? "All Healthy Food"
                            : "All Supplies"
                        );
                        setOpenCategory(null);
                      }}
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </section>
            </>
          )}

          {/* ================= CART BUTTON ================= */}

          <button
            className="mph-primary-button"
            type="button"
            onClick={() => setShowCart(true)}
          >
            🛒 Shopping Cart ({cartCount})
          </button>

          {/* ================= MESSAGE ================= */}

          {message && (
            <div className="mph-toast" role="status">
              ✓ {message}

              <button
                onClick={() => setMessage("")}
                aria-label="Dismiss message"
                type="button"
              >
                ×
              </button>
            </div>
          )}

          {/* ================= FOOTER ================= */}

          <footer className="mph-footer">
            <span>✚ MyPatientHUB</span>

            <p>
              Product information is for general guidance.
              Check labels and consult your healthcare
              professional about individual dietary needs.
            </p>
          </footer>
        </main>
      </div>

      {/* ================= PRODUCT DETAILS ================= */}

      {selectedProduct && (
        <div
          className="mph-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProduct(null);
            }
          }}
        >
          <section
            className="mph-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mph-product-title"
          >
            <button
              className="mph-close-button"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close details"
              type="button"
            >
              ×
            </button>

            <div className="mph-modal-art">
              {selectedProduct.icon}
            </div>

            <span className="mph-eyebrow">
              {selectedProduct.category}
            </span>

            <h2 id="mph-product-title">
              {selectedProduct.name}
            </h2>

            <div className="mph-modal-price">
              {selectedProduct.price.toLocaleString()} AFN
            </div>

            <p>{selectedProduct.description}</p>

            <div className="mph-detail-box">
              <strong>
                Ingredients / Product Information
              </strong>

              <p>{selectedProduct.ingredients}</p>
            </div>

            {selectedProduct.type === "food" && (
              <div className="mph-detail-box">
                <strong>Nutrition Information</strong>

                <p>
                  Verified nutrition values are not available
                  in this demo. Check the product label or
                  ask the seller for confirmed information.
                </p>
              </div>
            )}

            <div className="mph-detail-box">
              <strong>
                Dietary and Safety Information
              </strong>

              <p>
                Allergens and suitability have not been
                independently verified. Check labels and
                ingredients before use.
              </p>
            </div>

            <button
              className="mph-primary-button mph-full-button"
              onClick={() => addToCart(selectedProduct)}
              type="button"
            >
              Add to Cart ·{" "}
              {selectedProduct.price.toLocaleString()} AFN
            </button>
          </section>
        </div>
      )}

      {/* ================= SHOPPING CART ================= */}

      {showCart && (
        <div
          className="mph-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowCart(false);
            }
          }}
        >
          <section
            className="mph-cart-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mph-cart-title"
          >
            <div className="mph-cart-heading">
              <div>
                <span className="mph-eyebrow">
                  YOUR SELECTIONS
                </span>

                <h2 id="mph-cart-title">
                  Shopping Cart
                </h2>
              </div>

              <button
                className="mph-close-button"
                onClick={() => setShowCart(false)}
                aria-label="Close cart"
                type="button"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="mph-empty-state">
                <span>🛒</span>

                <h3>Your cart is empty</h3>

                <p>
                  Explore products and add what you need.
                </p>

                <button
                  className="mph-primary-button"
                  onClick={() => setShowCart(false)}
                  type="button"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="mph-cart-items">
                  {cart.map((item) => (
                    <div
                      className="mph-cart-item"
                      key={item.id}
                    >
                      <div className="mph-cart-item-icon">
                        {item.icon}
                      </div>

                      <div className="mph-cart-item-info">
                        <strong>{item.name}</strong>

                        <span>
                          {item.price.toLocaleString()} AFN each
                        </span>

                        <div className="mph-quantity">
                          <button
                            onClick={() =>
                              changeQuantity(item.id, -1)
                            }
                            aria-label={`Decrease ${item.name}`}
                            type="button"
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              changeQuantity(item.id, 1)
                            }
                            aria-label={`Increase ${item.name}`}
                            type="button"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <strong>
                        {(
                          item.price * item.quantity
                        ).toLocaleString()} AFN
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="mph-cart-total">
                  <span>Subtotal</span>

                  <strong>
                    {cartTotal.toLocaleString()} AFN
                  </strong>
                </div>

                <p className="mph-demo-note">
                  Demo only. Delivery, payment and real
                  orders are not implemented.
                </p>

                <button
                  className="mph-primary-button mph-full-button"
                  onClick={() =>
                    setMessage(
                      "Demo only. No order or payment has been processed."
                    )
                  }
                  type="button"
                >
                  Review Demo Cart
                </button>

                <button
                  className="mph-clear-cart"
                  onClick={() => setCart([])}
                  type="button"
                >
                  Clear Cart
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

/* ================= PRODUCT CARD ================= */

function ProductCard({
  product,
  favorites,
  onFavorite,
  onDetails,
  onAdd,
}) {
  const isFavorite = favorites.includes(product.id);

  return (
    <article className="mph-product-card">
      <div
        className={`mph-product-art ${
          product.type === "food"
            ? "food-art"
            : "medical-art"
        }`}
      >
      {product.image ? (
  <img
    src={product.image}
    alt={product.name}
    className="mph-product-image"
  />
) : (
  <span>{product.icon}</span>
)}
        <button
          className={`mph-favorite-button ${
            isFavorite ? "favorited" : ""
          }`}
          onClick={() => onFavorite(product.id)}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          type="button"
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="mph-product-info">
        <span className="mph-product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="mph-product-bottom">
          <strong>
            {product.price.toLocaleString()} AFN
          </strong>

          <button
            className="mph-add-button"
            onClick={() => onAdd(product)}
            aria-label={`Add ${product.name} to cart`}
            type="button"
          >
            +
          </button>
        </div>

        <button
          className="mph-details-link"
          onClick={() => onDetails(product)}
          type="button"
        >
          View Details →
        </button>
      </div>
    </article>
  );
}

export default Marketplace;