import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./MyDependents.css";

import sarah from "../assets/avatar 1.jpeg";
import ahmad from "../assets/avatar2.jpeg";
import maryam from "../assets/3.jpeg";
import fatima from "../assets/4.jpeg";
import omid from "../assets/avatar5.jpeg";
import mohammad from "../assets/avatar6.jpeg";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import dependentwlc from "../assets/depentswlc.jpeg";

const STORAGE_KEY = "mypatienthub_dependents";

const LOCALES = {
  en: "en-US",
  fa: "fa-AF-u-ca-gregory",
  ps: "ps-AF-u-ca-gregory",
};

const defaultDependents = [
  { id: 1, name: "Sarah Kamrani", relation: "Daughter", age: 14, gender: "Female", blood: "O+", visit: "Sep 28, 2026", status: "Good", color: "pink", image: sarah },
  { id: 2, name: "Ahmad Kamrani", relation: "Son", age: 10, gender: "Male", blood: "A+", visit: "Sep 21, 2026", status: "Good", color: "blue", image: ahmad },
  { id: 3, name: "Maryam Kamrani", relation: "Mother", age: 42, gender: "Female", blood: "B+", visit: "Oct 02, 2026", status: "Attention", color: "green", image: maryam },
  { id: 4, name: "Fatima Kamrani", relation: "Sister", age: 18, gender: "Female", blood: "A+", visit: "Sep 15, 2026", status: "Good", color: "purple", image: fatima },
  { id: 5, name: "Omid Kamrani", relation: "Brother", age: 21, gender: "Male", blood: "O+", visit: "Sep 10, 2026", status: "Good", color: "yellow", image: omid },
  { id: 6, name: "Mohammad Kamrani", relation: "Father", age: 48, gender: "Male", blood: "B+", visit: "Aug 30, 2026", status: "Attention", color: "blue", image: mohammad },
];

const avatarImages = [sarah, ahmad, maryam, fatima, omid, mohammad];
const cardColors = ["pink", "blue", "green", "purple", "yellow"];

const GENDERS = ["Female", "Male", "Other"];
const RELATIONS = ["Mother", "Father", "Daughter", "Son", "Brother", "Sister", "Spouse", "Other"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const emptyForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  relation: "",
  blood: "",
};

function loadDependents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Could not load family members:", error);
  }

  return defaultDependents;
}

function MyDependents() {
  const { t, i18n } = useTranslation();
  const locale = LOCALES[i18n.language] || "en-US";

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [dependents, setDependents] = useState(loadDependents);
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  // Save members in the browser
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dependents));
    } catch (error) {
      console.error("Could not save family members:", error);
    }
  }, [dependents]);

  // تاریخ آخرین مراجعه به زبان انتخاب‌شده (متن غیر تاریخ ترجمه می‌شود)
  const fmtVisit = (visit) => {
    const date = new Date(visit);

    if (Number.isNaN(date.getTime())) return t(visit);

    return date.toLocaleDateString(locale, {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Search members by name (انگلیسی و زبان انتخاب‌شده)
  const filteredDependents = dependents.filter((person) =>
    `${person.name} ${t(person.name)}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  const healthyCount = dependents.filter(
    (person) => person.status === "Good"
  ).length;

  const attentionCount = dependents.filter(
    (person) => person.status === "Attention"
  ).length;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  };

  const handleAddMember = (event) => {
    event.preventDefault();

    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const age = Number(formData.age);

    if (
      !firstName ||
      !lastName ||
      !formData.age ||
      !formData.gender ||
      !formData.relation ||
      !formData.blood
    ) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (!Number.isFinite(age) || age < 0 || age > 120) {
      setFormError("Please enter an age between 0 and 120.");
      return;
    }

    const newMember = {
      id: Date.now(),
      name: `${firstName} ${lastName}`,
      relation: formData.relation,
      age,
      gender: formData.gender,
      blood: formData.blood,
      visit: "Not visited yet",
      status: "Good",
      color: cardColors[dependents.length % cardColors.length],
      image: avatarImages[dependents.length % avatarImages.length],
    };

    setDependents((previous) => [...previous, newMember]);

    setFormData(emptyForm);
    setFormError("");
    setShowForm(false);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData(emptyForm);
    setFormError("");
  };

  const showDetails = (person) => {
    window.alert(
      `${t(person.name)}\n` +
        `${t("Relationship:")} ${t(person.relation)}\n` +
        `${t("Age:")} ${person.age}\n` +
        `${t("Gender:")} ${person.gender ? t(person.gender) : t("Not provided")}\n` +
        `${t("Blood group:")} ${person.blood}\n` +
        `${t("Health:")} ${t(person.status)}\n` +
        `${t("Last visit:")} ${fmtVisit(person.visit)}`
    );
  };

  return (
    <div
      className={`dashboard-layout ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main">
        <Header
          title="My Dependents"
          onMenuClick={() => setSidebarOpen((previous) => !previous)}
        />

        <section className="content dependents-content">
          {/* WELCOME CARD */}
          <section className="dependents-welcome">
            <div className="dependents-welcome-content">
              <span className="dependents-welcome-tag">
                <i className="fa-solid fa-heart-pulse"></i>
                {t("MYPATIENTHUB FAMILY CARE")}
              </span>

              <h1>
                {t("Your Family,")}
                <br />
                <span>{t("Our Priority.")}</span>
              </h1>

              <p>
                {t(
                  "Take care of the people you love. Manage your family members and keep their health information organized in one place."
                )}
              </p>

              <button
                className="dependents-welcome-btn"
                onClick={() => setShowForm(true)}
              >
                <i className="fa-solid fa-user-plus"></i>
                {t("Add Family Member")}
                <i className="fa-solid fa-arrow-right"></i>
              </button>

              <div className="dependents-welcome-features">
                <span>
                  <i className="fa-solid fa-shield-heart"></i>
                  {t("Family Care")}
                </span>

                <span>
                  <i className="fa-solid fa-heart-pulse"></i>
                  {t("Health Together")}
                </span>
              </div>
            </div>

            <div className="dependents-welcome-image">
              <img src={dependentwlc} alt={t("Family healthcare")} />

              <div className="dependents-welcome-floating">
                <div className="dependents-floating-icon">
                  <i className="fa-solid fa-heart-pulse"></i>
                </div>

                <div>
                  <strong>{t("Family Comes First")}</strong>
                  <p>{t("Care for every loved one")}</p>
                </div>
              </div>
            </div>

            <div className="dependents-welcome-decoration"></div>
          </section>

          {/* PAGE HEADING */}
          <div className="dependents-heading">
            <div>
              <p className="dependents-small">
                {t("FAMILY HEALTH CENTER")}
              </p>

              <h1>{t("My Dependents 👋")}</h1>

              <p>
                {t(
                  "Manage your family members and keep their health information connected."
                )}
              </p>
            </div>

            <button
              className="add-button"
              onClick={() => setShowForm(true)}
            >
              <i className="fa-solid fa-plus"></i>
              {t("Add Family Member")}
            </button>
          </div>

          {/* HEALTH STATISTICS */}
          <div className="health-banner">
            <div className="health-banner-text">
              <span className="health-label">
                <i className="fa-solid fa-heart-pulse"></i>
                {t("FAMILY HEALTH")}
              </span>

              <h2>{t("Everyone's health in one place")}</h2>

              <p>
                {t("Keep track of your loved ones' health and appointments.")}
              </p>
            </div>

            <div className="stats">
              <div>
                <strong>{String(dependents.length).padStart(2, "0")}</strong>
                <span>{t("Members")}</span>
              </div>

              <div>
                <strong>{String(healthyCount).padStart(2, "0")}</strong>
                <span>{t("Healthy")}</span>
              </div>

              <div>
                <strong>{String(attentionCount).padStart(2, "0")}</strong>
                <span>{t("Attention")}</span>
              </div>
            </div>
          </div>

          {/* FAMILY HEALTH PULSE */}
          <div className="pulse-card">
            <div className="pulse-left">
              <div className="heart-circle">
                <i className="fa-solid fa-heart-pulse"></i>
              </div>

              <div>
                <small>{t("FAMILY HEALTH PULSE")}</small>

                <h3>
                  {attentionCount === 0
                    ? t("Everyone is doing great")
                    : t(
                        attentionCount === 1
                          ? "oneNeedsAttention"
                          : "manyNeedAttention",
                        { n: attentionCount }
                      )}
                </h3>

                <p>
                  {t(
                    "Your family health overview is based on the statuses in your saved profiles."
                  )}
                </p>
              </div>
            </div>

            <div className="pulse-line">︿﹀︿﹀︿﹀︿﹀︿﹀</div>

            <div className="good-badge">
              <span>●</span>
              {attentionCount === 0 ? t("Good") : t("Check")}
            </div>
          </div>

          {/* FAMILY MEMBERS */}
          <div className="members-header">
            <div>
              <h2>{t("Family Members")}</h2>
              <p>{t("Your connected family members")}</p>
            </div>

            <button
              className="small-add"
              onClick={() => setShowForm(true)}
            >
              <i className="fa-solid fa-plus"></i>
              {t("Add Member")}
            </button>
          </div>

          {/* SEARCH BAR */}
          <div className="dependents-search">
            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("Search family members by name...")}
              aria-label={t("Search family members by name")}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label={t("Clear search")}
              >
                {t("Clear")}
              </button>
            )}
          </div>

          {/* FAMILY CARDS */}
          <div className="dependents-grid">
            {filteredDependents.map((person) => (
              <div
                className={`family-card ${person.color}`}
                key={person.id}
              >
                <button
                  className="card-more"
                  type="button"
                  aria-label={t("More options")}
                >
                  <i className="fa-solid fa-ellipsis"></i>
                </button>

                <div className="family-card-top">
                  <div className="family-avatar">
                    <div className="avatar-circle">
                      <img src={person.image} alt={t(person.name)} />
                    </div>
                  </div>

                  <div className="family-info">
                    <h3>{t(person.name)}</h3>

                    <span className="relation-badge">
                      {t(person.relation)}
                    </span>

                    <div className="detail-row">
                      <i className="fa-solid fa-calendar"></i>
                      <span>{t("ageYears", { age: person.age })}</span>
                    </div>

                    <div className="detail-row blood-row">
                      <i className="fa-solid fa-droplet"></i>
                      <span>{t("bloodLabel", { blood: person.blood })}</span>
                    </div>

                    <div className="detail-row">
                      <i className="fa-solid fa-heart-pulse"></i>
                      <span>
                        {t("Health:")}{" "}
                        <b
                          className={
                            person.status === "Good"
                              ? "good-text"
                              : "attention-text"
                          }
                        >
                          {t(person.status)}
                        </b>
                      </span>
                    </div>

                    <div className="detail-row">
                      <i className="fa-solid fa-calendar-check"></i>
                      <span>
                        {t("Last Visit:")} {fmtVisit(person.visit)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="family-card-footer">
                  <button
                    className="profile-button"
                    type="button"
                    onClick={() => showDetails(person)}
                  >
                    {t("View Details")}
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>

                  <button
                    className="round-arrow"
                    type="button"
                    aria-label={`${t("View Details")}: ${t(person.name)}`}
                    onClick={() => showDetails(person)}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            ))}

            {filteredDependents.length === 0 && (
              <div className="dependents-empty">
                <i className="fa-solid fa-users"></i>

                <h3>{t("No family members found")}</h3>

                <p>
                  {search
                    ? t("Try another name or clear your search.")
                    : t("Add your first family member to get started.")}
                </p>

                {search ? (
                  <button type="button" onClick={() => setSearch("")}>
                    {t("Clear Search")}
                  </button>
                ) : (
                  <button type="button" onClick={() => setShowForm(true)}>
                    {t("Add Family Member")}
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* FOOTER (متن‌ها از فایل dashboard.js) */}
        <footer className="dashboard-footer">
          <p>{t("footerText")}</p>

          <div>
            <a href="#mypatienthub" translate="no">MyPatientHUB</a>
            <a href="#about-us">{t("About Us")}</a>
            <a href="#blog">{t("Blog")}</a>
          </div>
        </footer>
      </main>

      {/* ADD MEMBER MODAL */}
      {showForm && (
        <div
          className="overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeForm();
            }
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-member-title"
          >
            <button
              className="close"
              type="button"
              onClick={closeForm}
              aria-label={t("Close form")}
            >
              ×
            </button>

            <div className="modal-icon">
              <i className="fa-solid fa-user-plus"></i>
            </div>

            <h2 className="modal-title" id="add-member-title">
              {t("Add Family Member")}
            </h2>

            <p className="modal-text">
              {t("Create a health profile for your family member.")}
            </p>

            <form onSubmit={handleAddMember}>
              <div className="form-grid">
                <input
                  className="input"
                  name="firstName"
                  placeholder={t("First Name")}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  autoComplete="given-name"
                />

                <input
                  className="input"
                  name="lastName"
                  placeholder={t("Last Name")}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                />

                <input
                  className="input"
                  name="age"
                  placeholder={t("Age")}
                  type="number"
                  min="0"
                  max="120"
                  value={formData.age}
                  onChange={handleInputChange}
                />

                <select
                  className="input"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">{t("Gender")}</option>
                  {GENDERS.map((item) => (
                    <option key={item} value={item}>
                      {t(item)}
                    </option>
                  ))}
                </select>

                <select
                  className="input"
                  name="relation"
                  value={formData.relation}
                  onChange={handleInputChange}
                >
                  <option value="">{t("Relationship")}</option>
                  {RELATIONS.map((item) => (
                    <option key={item} value={item}>
                      {t(item)}
                    </option>
                  ))}
                </select>

                <select
                  className="input"
                  name="blood"
                  value={formData.blood}
                  onChange={handleInputChange}
                >
                  <option value="">{t("Blood Group")}</option>
                  {BLOOD_GROUPS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {formError && (
                <p className="dependents-form-error" role="alert">
                  {t(formError)}
                </p>
              )}

              <div className="modal-buttons">
                <button
                  className="cancel-button"
                  type="button"
                  onClick={closeForm}
                >
                  {t("Cancel")}
                </button>

                <button className="save-button" type="submit">
                  <i className="fa-solid fa-plus"></i>
                  {t("Add Member")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyDependents;