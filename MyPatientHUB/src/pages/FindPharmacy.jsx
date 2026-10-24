import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./FindPharmacy.css";
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import pharmacy from '../assets/pharmacywlc.jpeg'

const menu = [
  { icon: "house", label: "Dashboard", to: "/dashboard" },
  { icon: "calendar", label: "Appointments", to: "/appointments" },
  { icon: "user-doctor", label: "Find Doctor", to: "/finddoctor" },
  { icon: "hospital", label: "Find Clinic", to: "/findclinic" },
  { icon: "message", label: "Chat", to: "/chat" },
  { icon: "store", label: "Find MarketPlace", to: "/marketplace" },
  { icon: "pills", label: "Find Pharmacy", to: "/findpharmacy", active: true },
  { icon: "users", label: "My Dependents", to: "/mydependents" },
  { icon: "user", label: "My Account", to: "/myaccount" },
  { icon: "gear", label: "Settings", to: "/settings" },
];

const PHARMACIES = [
  "Carry Medical",
  "Pool Medical",
  "OK Pharmacy",
  "Hamza Pharma",
  "Caring Pharmacy",
  "Hilton Medical",
];

const CATEGORIES = [
  {
    id: "antibiotic",
    title: "Antibiotics",
    icon: "fa-capsules",
    emoji: "💊",
    color: "#e8f2ff",
    medicines: [
      { name: "Amoxil 500", price: 12, image: "/Amoxil.jpeg", description: "Antibiotic medicine. Use only with a healthcare professional's advice." },
      { name: "Zithro 250", price: 18, image: "/Zithro.jpeg", description: "Antibiotic medicine. Use only as prescribed." },
      { name: "Cipro 500", price: 15, image: "/cipro.jpeg", description: "Prescription antibiotic medicine." },
      { name: "Augmentin 625", price: 22, image: "/augmentin.jpeg", description: "Antibiotic medicine. Follow your clinician's instructions." },
    ],
  },
  {
    id: "hypertension",
    title: "Hypertension",
    icon: "fa-heart-pulse",
    emoji: "❤️",
    color: "#ffe9ed",
    medicines: [
      { name: "Norvasc 5", price: 10, image: "/norvasc.jpeg", description: "Blood pressure medicine. Take only as prescribed." },
      { name: "Cozaar 50", price: 14, image: "/cozaar.jpeg", description: "Blood pressure medicine. Follow your doctor's instructions." },
      { name: "Tenormin 50", price: 11, image: "/tenormin.jpeg", description: "Blood pressure medicine." },
      { name: "Zestril 10", price: 13, image: "/ze.jpeg", description: "Blood pressure medicine. Use under medical supervision." },
    ],
  },
  {
    id: "hypotension",
    title: "Low Blood Pressure",
    icon: "fa-droplet",
    emoji: "🩸",
    color: "#e5f8f6",
    medicines: [
      { name: "Florinef 0.1", price: 20, image: "/f.jpeg", description: "Prescription medicine. Consult a healthcare professional." },
      { name: "ProAmatine 5", price: 18, image: "/proamatine.jpeg", description: "Prescription medicine for certain low blood pressure conditions." },
      { name: "Northera 100", price: 25, image: "/Northera.jpeg", description: "Prescription medicine. Use only under medical supervision." },
    ],
  },
  {
    id: "pain",
    title: "Pain Relief",
    icon: "fa-bandage",
    emoji: "🩹",
    color: "#fff1df",
    medicines: [
      { name: "Panadol 500", price: 5, image: "/Panado.jpeg", description: "Pain and fever relief. Follow the package instructions." },
      { name: "Brufen 400", price: 7, image: "/Brufen.jpeg", description: "Pain relief medicine. Ask a pharmacist if it is suitable for you." },
      { name: "Voltaren 50", price: 9, image: "/Voltaren.jpeg", description: "Pain and inflammation medicine." },
      { name: "Ponstan 500", price: 8, image: "/Ponstan.jpeg", description: "Pain relief medicine. Use according to professional advice." },
    ],
  },
  {
    id: "stomach",
    title: "Stomach Care",
    icon: "fa-utensils",
    emoji: "🍵",
    color: "#f0eaff",
    medicines: [
      { name: "Esso 40", price: 12, image: "/Esso.jpeg", description: "Medicine used for certain stomach acid conditions." },
      { name: "Losec 20", price: 10, image: "/Losec.jpeg", description: "Medicine used for stomach acid conditions." },
      { name: "Zantac 150", price: 8, image: "/Zantac.jpeg", description: "Check local availability and ask a pharmacist for advice." },
      { name: "Gaviscon", price: 6, image: "/Gaviscon.jpeg", description: "Product used for relief of heartburn and indigestion." },
    ],
  },
  {
    id: "women",
    title: "Women's Health",
    icon: "fa-venus",
    emoji: "👩",
    color: "#ffe8f5",
    medicines: [
      { name: "Folic Acid 5", price: 4, image: "/foli-Acid.jpeg", description: "Folic acid supplement. Ask a healthcare professional about the right dose." },
      { name: "Obimin", price: 12, image: "/Obimin.jpeg", description: "Multivitamin product. Check the package and ask a pharmacist." },
      { name: "Duphaston 10", price: 16, image: "/duphaston.jpeg", description: "Hormonal prescription medicine. Use only as prescribed." },
      { name: "Ferrous Fumarate", price: 7, image: "/ferrous-fumarate.jpeg", description: "Iron supplement. Use according to professional advice." },
    ],
  },
  {
    id: "children",
    title: "Children's Care",
    icon: "fa-baby",
    emoji: "👶",
    color: "#e8f8e9",
    medicines: [
      { name: "Calpol Syrup", price: 8, image: "/Calpol.jpeg", description: "Children's pain and fever relief. Dose depends on the child's age and weight." },
      { name: "Zyrtec Drops", price: 10, image: "/Zyrtec.jpeg", description: "Allergy medicine. Ask a healthcare professional about children's dosing." },
      { name: "ORS Sachet", price: 2, image: "/ORS.jpeg", description: "Oral rehydration salts. Mix exactly as directed on the packet." },
      { name: "Vitamin D Drops", price: 9, image: "/vatamin.jpeg", description: "Vitamin D supplement. Follow professional dosing advice." },
    ],
  },
];

function MedicineImage({ medicine }) {
  const { t } = useTranslation();
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="pp-image-fallback">
        <i className="fa-solid fa-pills" />
        <span>{medicine.name}</span>
      </div>
    );
  }

  return (
    <img
      className="pp-medicine-image"
      src={medicine.image}
      alt={medicine.name}
      onError={() => setFailed(true)}
    />
  );
}

function MedicineCard({ medicine, category, onDetails, onBuy }) {
  const { t } = useTranslation();

  return (
    <article className="pp-medicine-card">
      <div className="pp-product-image">
        <span className="pp-product-tag">{t("Medicine")}</span>
        <MedicineImage medicine={medicine} />
      </div>

      <div className="pp-card-body">
        <span className="pp-category-label">{category}</span>
        <h3>{medicine.name}</h3>
        <p className="pp-product-description">
          {t(medicine.description)}
        </p>

        <div className="pp-product-bottom">
          <div className="pp-price">
            <span>{t("Price")}</span>
            <strong>${medicine.price.toFixed(2)}</strong>
          </div>
          <button
            className="pp-details-button"
            onClick={() => onDetails(medicine, category)}
          >
            {t("Details")}
          </button>
        </div>

        <button className="pp-buy-button" onClick={() => onBuy(medicine)}>
          <i className="fa-solid fa-cart-shopping" />
          {t("Add to Cart")}
        </button>
      </div>
    </article>
  );
}

function MedicineDetails({ medicine, category, onClose, onBuy }) {
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="pp-modal-overlay" onClick={onClose}>
      <section
        className="pp-modal"
        role="dialog"
        aria-modal="true"
        aria-label={t("medicineDetails", { name: medicine.name })}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="pp-modal-close"
          onClick={onClose}
          aria-label={t("Close details")}
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="pp-modal-image">
          <MedicineImage medicine={medicine} />
        </div>

        <span className="pp-category-label">{category}</span>
        <h2>{medicine.name}</h2>
        <p>{t(medicine.description)}</p>

        <div className="pp-modal-price">
          <span>{t("Price")}</span>
          <strong>${medicine.price.toFixed(2)}</strong>
        </div>

        <p className="pp-safety-note">
          {t("Please consult a qualified healthcare professional before using medicine. Prescription medicines require a valid prescription.")}
        </p>

        <button
          className="pp-buy-button"
          onClick={() => {
            onBuy(medicine);
            onClose();
          }}
        >
          <i className="fa-solid fa-cart-shopping" />
          {t("Add to Cart")}
        </button>
      </section>
    </div>
  );
}

export default function FindPharmacy() {
  const { t } = useTranslation();

  const [sidebarHidden, setSidebarHidden] = useState(
    () => window.innerWidth <= 768
  );
  const [search, setSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const allMedicines = useMemo(
    () =>
      CATEGORIES.flatMap((category) =>
        category.medicines.map((medicine) => ({
          ...medicine,
          category: category.title,
          categoryId: category.id,
        }))
      ),
    []
  );

  const visibleCategories = useMemo(() => {
    const globalQuery = search.trim().toLowerCase();

    return CATEGORIES.filter(
      (category) => activeCategory === "all" || category.id === activeCategory
    )
      .map((category) => {
        const localQuery = (categorySearch[category.id] || "")
          .trim()
          .toLowerCase();

        const medicines = category.medicines.filter((medicine) => {
          const matchesGlobal =
            !globalQuery ||
            medicine.name.toLowerCase().includes(globalQuery) ||
            medicine.description.toLowerCase().includes(globalQuery) ||
            category.title.toLowerCase().includes(globalQuery);

          const matchesLocal =
            !localQuery || medicine.name.toLowerCase().includes(localQuery);

          return matchesGlobal && matchesLocal;
        });

        return { ...category, medicines };
      })
      .filter((category) => category.medicines.length > 0);
  }, [search, categorySearch, activeCategory]);

  const resultCount = visibleCategories.reduce(
    (total, category) => total + category.medicines.length,
    0
  );

  const buy = (medicine) => {
    setToast(t("addedToCart", { name: medicine.name }));
  };

  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Mobile = sidebar closed, desktop = sidebar open
  useEffect(() => {
    const handleResize = () => setSidebarHidden(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openDetails = (medicine, category) => {
    setSelectedMedicine({ medicine, category });
  };

  const closeDetails = () => setSelectedMedicine(null);

  const closeOnMobile = () => {
    if (window.innerWidth <= 768) setSidebarHidden(true);
  };

  return (
    <div className={`find-doctor-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main find-pharmacy">

        <Header
          title={t("Find Pharmacy")}
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />

        <div className="pp-content">

          {/* Welcome Card */}
          <section className="pp-welcome">
            <div className="pp-welcome-content">
              <span className="pp-welcome-tag">
                <i className="fas fa-heartbeat"></i>
                {t("MyPatientHUB Pharmacy")}
              </span>

              <h1>
                {t("Your Health,")}
                <br />
                <span>{t("Our Priority.")}</span>
              </h1>

              <p>
                {t("Find your medicines easily and explore our pharmacy collection to support your health and well-being.")}
              </p>

              <button
                className="pp-welcome-btn"
                onClick={() => {
                  document
                    .querySelector(".pp-content")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <i className="fas fa-pills"></i>
                {t("Explore Medicines")}
                <i className="fas fa-arrow-right"></i>
              </button>

              <div className="pp-welcome-features">
                <span>
                  <i className="fas fa-check-circle"></i>
                  {t("Easy Search")}
                </span>

                <span>
                  <i className="fas fa-heart"></i>
                  {t("Health First")}
                </span>
              </div>
            </div>

            <div className="pp-welcome-image">
              <img
                src={pharmacy}
                alt="Pharmacy and healthcare"
              />

              <div className="pp-welcome-floating">
                <div className="pp-floating-icon">
                  <i className="fas fa-shield-heart"></i>
                </div>

                <div>
                  <strong>{t("Your Health Matters")}</strong>
                  <p>{t("Care starts here")}</p>
                </div>
              </div>
            </div>

            <div className="pp-welcome-decoration"></div>
          </section>

          <section className="pp-categories-section">
            <div className="pp-section-heading">
              <div>
                <span className="pp-section-kicker">
                  {t("EXPLORE")}
                </span>
                <h2>{t("Medicine Categories")}</h2>
                <p>
                  {t("Choose a category to browse its listings.")}
                </p>
              </div>
            </div>

            <div className="pp-category-chips">
              <button
                className={activeCategory === "all" ? "active" : ""}
                onClick={() => setActiveCategory("all")}
              >
                <span className="pp-chip-emoji">
                  <i className="fa-solid fa-border-all" />
                </span>
                {t("All Medicines")}
              </button>

              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  className={activeCategory === category.id ? "active" : ""}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === category.id ? "all" : category.id
                    )
                  }
                >
                  <span className="pp-chip-emoji">{category.emoji}</span>
                  {t(category.title)}
                </button>
              ))}
            </div>
          </section>

          <section className="pp-listing-section">
            <div className="pp-listing-heading">
              <div>
                <span className="pp-section-kicker">
                  {t("PHARMACY CATALOG")}
                </span>
                <h2>{t("Available Medicines")}</h2>
              </div>
              <span className="pp-results-count">
                {t("resultsCount", { n: resultCount })}
              </span>
            </div>

            {visibleCategories.length === 0 ? (
              <div className="pp-empty-state">
                <div className="pp-empty-icon">
                  <i className="fa-solid fa-magnifying-glass" />
                </div>
                <h3>{t("No medicines found")}</h3>
                <p>
                  {t("Try another name or clear your search filters.")}
                </p>
                <button
                  className="pp-primary-button"
                  onClick={() => {
                    setSearch("");
                    setCategorySearch({});
                    setActiveCategory("all");
                  }}
                >
                  {t("Clear Filters")}
                </button>
              </div>
            ) : (
              visibleCategories.map((category) => (
                <section className="pp-medicine-section" key={category.id}>
                  <div className="pp-medicine-section-heading">
                    <div
                      className="pp-category-icon"
                      style={{ background: category.color }}
                    >
                      <span>{category.emoji}</span>
                    </div>
                    <div className="pp-category-title">
                      <h3>{t(category.title)}</h3>
                      <span>
                        {t("productsCount", {
                          n: category.medicines.length
                        })}
                      </span>
                    </div>

                    <div className="pp-local-search">
                      <i className="fa-solid fa-magnifying-glass" />
                      <input
                        type="search"
                        value={categorySearch[category.id] || ""}
                        onChange={(event) =>
                          setCategorySearch((previous) => ({
                            ...previous,
                            [category.id]: event.target.value,
                          }))
                        }
                        placeholder={t("searchIn", {
                          name: t(category.title)
                        })}
                        aria-label={t("searchIn", {
                          name: t(category.title)
                        })}
                      />
                    </div>
                  </div>

                  <div className="pp-medicine-grid">
                    {category.medicines.map((medicine) => (
                      <MedicineCard
                        key={medicine.name}
                        medicine={medicine}
                        category={t(category.title)}
                        onDetails={openDetails}
                        onBuy={buy}
                      />
                    ))}
                  </div>
                </section>
              ))
            )}
          </section>

          <footer className="pp-footer">
            <div>
              <strong>MyPatientHUB</strong>
              <p>{t("Your health and wellbeing matter.")}</p>
            </div>
            <span>© {new Date().getFullYear()} MyPatientHUB</span>
          </footer>
        </div>
      </main>

      {selectedMedicine && (
        <MedicineDetails
          medicine={selectedMedicine.medicine}
          category={selectedMedicine.category}
          onClose={closeDetails}
          onBuy={buy}
        />
      )}

      {toast && (
        <div className="pp-toast" role="status">
          <i className="fa-solid fa-circle-check" />
          {toast}
        </div>
      )}
    </div>
  );
}