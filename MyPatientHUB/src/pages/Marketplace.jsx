 import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Marketplace.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import vegetablesoup from "../assets/Vegetable Soup.jpeg";
import chickensoup from "../assets/Chicken Soup.jpeg";
import LentilSoup from "../assets/Lentil Soup.jpeg";
import PumpkinSoup from "../assets/Pumpkin Soup.jpeg";
import Carrot from "../assets/Carrot.jpeg";
import egg1 from "../assets/Egg1.jpeg";
import egg2 from "../assets/Egg2.jpeg";
import egg3 from "../assets/Egg3.jpeg";
import milk from "../assets/Milk.jpeg";
import yogurt from "../assets/yogurt.jpeg";
import rice from "../assets/softrice.jpeg";
import oat from "../assets/Oats.jpeg";
import fish from "../assets/fish.jpeg";
import orange from "../assets/orange2.jpeg";
import fruits from "../assets/friuts.jpeg";
import kiwi from "../assets/kiwi.jpeg";
import mango from "../assets/mango.jpeg";
import choclate from "../assets/Chaclet  milke.jpeg";
import pasta from "../assets/pasta.jpeg";

/* ================= PRODUCTS ================= */

const products = [
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
    image: LentilSoup,
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
    icon: "🥭",
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
  { name: "All Categories", icon: "🍴", key: "allCategories" },
  { name: "Soups", icon: "🍲", key: "soups" },
  { name: "Fruits", icon: "🍎", key: "fruits" },
  { name: "Eggs", icon: "🥚", key: "eggs" },
  { name: "Dairy Products", icon: "🥛", key: "dairy" },
  { name: "Protein Foods", icon: "🍗", key: "protein" },
  { name: "Soft Foods", icon: "🍚", key: "softFoods" },
];

const medicalCategories = [
  { name: "Home Monitoring", icon: "🩺", key: "homeMonitoring" },
  { name: "Monitoring Devices", icon: "🌡️", key: "monitoringDevices" },
  { name: "First Aid", icon: "🧰", key: "firstAid" },
  { name: "Mobility Support", icon: "🦯", key: "mobility" },
  { name: "Personal Care", icon: "🧴", key: "personalCare" },
];

const categoryKeys = {
  "All Categories": "allCategories",
  "All Healthy Food": "allHealthyFood",
  "All Supplies": "allSupplies",
  Soups: "soups",
  Fruits: "fruits",
  Eggs: "eggs",
  "Dairy Products": "dairy",
  "Protein Foods": "protein",
  "Soft Foods": "softFoods",
  "Home Monitoring": "homeMonitoring",
  "Monitoring Devices": "monitoringDevices",
  "First Aid": "firstAid",
  "Mobility Support": "mobility",
  "Personal Care": "personalCare",
};

/* ================= MARKETPLACE ================= */

function Marketplace() {
  const { t, i18n } = useTranslation();

  const tr = (key) => t(`marketplace.${key}`);

  const productName = (product) =>
    t(`marketplace.product.${product.id}.name`, {
      defaultValue: product.name.trim(),
    });

  const productDescription = (product) =>
    t(`marketplace.product.${product.id}.description`, {
      defaultValue: product.description,
    });

  const productIngredients = (product) =>
    t(`marketplace.product.${product.id}.ingredients`, {
      defaultValue: product.ingredients,
    });

  const categoryName = (name) =>
    categoryKeys[name] ? tr(categoryKeys[name]) : name;

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

      const translatedText = [
        productName(product),
        categoryName(product.category),
        productDescription(product),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = translatedText.includes(
        search.toLowerCase()
      );

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
      result.sort((a, b) =>
        productName(a).localeCompare(productName(b))
      );
    }

    return result;
  }, [page, category, selectedItem, search, sort, i18n.language]);

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

    setMessage(`${productName(product)} — ${tr("addedToCart")}`);
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
    page === "medical" ? medicalCategories : foodCategories;

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
          title={tr("title")}
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
          onSearch={setSearch}
        />

        <main className="mph-content">
          {/* ================= HOME ================= */}

          {page === "home" ? (
            <>
              <section className="mph-welcome">
                <div className="mph-welcome-content">
                  <span className="mph-eyebrow">
                    {tr("eyebrowCare")}
                  </span>

                  <h1>{tr("welcome")}</h1>

                  <p>{tr("intro")}</p>

                  <button
                    className="mph-primary-button"
                    onClick={() => openPage("food")}
                    type="button"
                  >
                    {tr("exploreFood")} →
                  </button>
                </div>

                <div className="mph-welcome-art" aria-hidden="true">
                  <span>🥗</span>
                  <span>💙</span>
                  <span>🩺</span>
                </div>
              </section>

              <section className="mph-section">
                <div className="mph-section-heading">
                  <div>
                    <span className="mph-eyebrow">
                      {tr("shopNeeds")}
                    </span>

                    <h2>{tr("lookingFor")}</h2>

                    <p>{tr("chooseSection")}</p>
                  </div>
                </div>

                <div className="mph-main-categories">
                  <button
                    className="mph-main-category mph-food-category"
                    onClick={() => openPage("food")}
                    type="button"
                  >
                    <div className="mph-main-art">🥗</div>

                    <div className="mph-main-text">
                      <span className="mph-category-label">
                        {tr("healthyLiving")}
                      </span>

                      <h3>{tr("healthFood")}</h3>

                      <p>{tr("foodDescription")}</p>

                      <span className="mph-explore-link">
                        {tr("exploreFood")} →
                      </span>
                    </div>
                  </button>

                  <button
                    className="mph-main-category mph-medical-category"
                    onClick={() => openPage("medical")}
                    type="button"
                  >
                    <div className="mph-main-art">🩺</div>

                    <div className="mph-main-text">
                      <span className="mph-category-label">
                        {tr("dailyCare")}
                      </span>

                      <h3>{tr("patientEssentials")}</h3>

                      <p>{tr("careDescription")}</p>

                      <span className="mph-explore-link">
                        {tr("exploreEssentials")} →
                      </span>
                    </div>
                  </button>
                </div>
              </section>

              <section className="mph-section">
                <div className="mph-section-heading">
                  <div>
                    <span className="mph-eyebrow">
                      {tr("productCollection")}
                    </span>

                    <h2>{tr("exploreProducts")}</h2>
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
                      t={t}
                      categoryName={categoryName}
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
                ← {tr("back")}
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
                      ? tr("healthyLiving")
                      : tr("patientCare")}
                  </span>

                  <h1>
                    {page === "food"
                      ? tr("healthFood")
                      : tr("patientEssentials")}
                  </h1>

                  <p>
                    {page === "food"
                      ? tr("foodDescription")
                      : tr("careDescription")}
                  </p>
                </div>

                <span className="mph-subpage-icon">
                  {page === "food" ? "🥗" : "🩺"}
                </span>
              </section>

              {/* ================= CATEGORIES ================= */}

              <section className="mph-section">
                <div className="mph-section-heading">
                  <div>
                    <h2>
                      {page === "food"
                        ? tr("foodCategories")
                        : tr("careCategories")}
                    </h2>

                    <p>{tr("categoryHint")}</p>
                  </div>
                </div>

                <div className="mph-food-dropdowns">
                  {categories.map((item) => {
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
                          onClick={() => selectCategory(item.name)}
                        >
                          <span>
                            {item.icon}{" "}
                            {item.key === "allCategories"
                              ? tr(item.key)
                              : categoryName(item.name)}
                          </span>

                          <span>
                            {openCategory === item.name ? "▲" : "▼"}
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
                              {tr("viewAll")}{" "}
                              {categoryName(item.name)}
                            </button>

                            {items.map((product) => (
                              <button
                                key={product.id}
                                type="button"
                                onClick={() =>
                                  selectProduct(product.name)
                                }
                              >
                                {product.icon} {productName(product)}
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
                      {selectedItem
                        ? productName(
                            products.find(
                              (product) =>
                                product.name === selectedItem
                            ) || { id: 0, name: selectedItem }
                          )
                        : category === "All Healthy Food" ||
                            category === "All Supplies"
                          ? tr("availableProducts")
                          : categoryName(category)}
                    </h2>

                    <p>
                      {visibleProducts.length} {tr("productsFound")}
                    </p>
                  </div>

                  <div className="mph-filters">
                    <input
                      type="search"
                      placeholder={tr("search")}
                      value={search}
                      onChange={(event) =>
                        setSearch(event.target.value)
                      }
                      aria-label={tr("search")}
                    />

                    <select
                      value={sort}
                      onChange={(event) =>
                        setSort(event.target.value)
                      }
                      aria-label={tr("nameSort")}
                    >
                      <option value="featured">
                        {tr("featured")}
                      </option>

                      <option value="low">
                        {tr("priceLow")}
                      </option>

                      <option value="high">
                        {tr("priceHigh")}
                      </option>

                      <option value="name">
                        {tr("nameSort")}
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
                    ← {tr("viewAll")} {categoryName(category)}
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
                        t={t}
                        categoryName={categoryName}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mph-empty-state">
                    <span>🔎</span>

                    <h3>{tr("noProducts")}</h3>

                    <p>{tr("tryAgain")}</p>

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
                      {tr("clearFilters")}
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
            🛒 {tr("cart")} ({cartCount})
          </button>

          {/* ================= MESSAGE ================= */}

          {message && (
            <div className="mph-toast" role="status">
              ✓ {message}

              <button
                onClick={() => setMessage("")}
                aria-label={tr("dismissMessage")}
                type="button"
              >
                ×
              </button>
            </div>
          )}

          {/* ================= FOOTER ================= */}

          <footer className="mph-footer">
            <span>✚ MyPatientHUB</span>

            <p>{tr("footer")}</p>
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
              aria-label={tr("closeDetails")}
              type="button"
            >
              ×
            </button>

            <div className="mph-modal-art">
              {selectedProduct.icon}
            </div>

            <span className="mph-eyebrow">
              {categoryName(selectedProduct.category)}
            </span>

            <h2 id="mph-product-title">
              {productName(selectedProduct)}
            </h2>

            <div className="mph-modal-price">
              {selectedProduct.price.toLocaleString()} AFN
            </div>

            <p>{productDescription(selectedProduct)}</p>

            <div className="mph-detail-box">
              <strong>{tr("ingredients")}</strong>
              <p>{productIngredients(selectedProduct)}</p>
            </div>

            {selectedProduct.type === "food" && (
              <div className="mph-detail-box">
                <strong>{tr("nutrition")}</strong>
                <p>{tr("nutritionUnavailable")}</p>
              </div>
            )}

            <div className="mph-detail-box">
              <strong>{tr("safety")}</strong>
              <p>{tr("safetyUnavailable")}</p>
            </div>

            <button
              className="mph-primary-button mph-full-button"
              onClick={() => addToCart(selectedProduct)}
              type="button"
            >
              {tr("addToCart")} ·{" "}
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
                  {tr("cartSelections")}
                </span>

                <h2 id="mph-cart-title">{tr("cart")}</h2>
              </div>

              <button
                className="mph-close-button"
                onClick={() => setShowCart(false)}
                aria-label={tr("cart")}
                type="button"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="mph-empty-state">
                <span>🛒</span>

                <h3>{tr("emptyCart")}</h3>

                <p>{tr("chooseSection")}</p>

                <button
                  className="mph-primary-button"
                  onClick={() => setShowCart(false)}
                  type="button"
                >
                  {tr("continueShopping")}
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
                        <strong>{productName(item)}</strong>

                        <span>
                          {item.price.toLocaleString()} AFN{" "}
                          {tr("each")}
                        </span>

                        <div className="mph-quantity">
                          <button
                            onClick={() =>
                              changeQuantity(item.id, -1)
                            }
                            aria-label={`${tr("decrease")} ${productName(item)}`}
                            type="button"
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              changeQuantity(item.id, 1)
                            }
                            aria-label={`${tr("increase")} ${productName(item)}`}
                            type="button"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <strong>
                        {(
                          item.price * item.quantity
                        ).toLocaleString()}{" "}
                        AFN
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="mph-cart-total">
                  <span>{tr("subtotal")}</span>

                  <strong>
                    {cartTotal.toLocaleString()} AFN
                  </strong>
                </div>

                <p className="mph-demo-note">
                  {tr("demoNote")}
                </p>

                <button
                  className="mph-primary-button mph-full-button"
                  onClick={() =>
                    setMessage(tr("demoMessage"))
                  }
                  type="button"
                >
                  {tr("reviewCart")}
                </button>

                <button
                  className="mph-clear-cart"
                  onClick={() => setCart([])}
                  type="button"
                >
                  {tr("clearCart")}
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
  t,
  categoryName,
}) {
  const isFavorite = favorites.includes(product.id);

  const name = t(`marketplace.product.${product.id}.name`, {
    defaultValue: product.name.trim(),
  });

  const description = t(
    `marketplace.product.${product.id}.description`,
    {
      defaultValue: product.description,
    }
  );

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
            alt={name}
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
            isFavorite ? "Remove from favorites" : "Add to favorites"
          }
          type="button"
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="mph-product-info">
        <span className="mph-product-category">
          {categoryName(product.category)}
        </span>

        <h3>{name}</h3>

        <p>{description}</p>

        <div className="mph-product-bottom">
          <strong>
            {product.price.toLocaleString()} AFN
          </strong>

          <button
            className="mph-add-button"
            onClick={() => onAdd(product)}
            aria-label={`${t("marketplace.addToCart")} ${name}`}
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
          {t("marketplace.viewDetails")} →
        </button>
      </div>
    </article>
  );
}

export default Marketplace;