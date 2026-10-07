import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import sarah from "../assets/avatar 1.jpeg";
import ahmad from "../assets/avatar2.jpeg";
import maryam from "../assets/3.jpeg";
import fatima from "../assets/4.jpeg";
import omid from "../assets/avatar5.jpeg";
import mohammad from "../assets/avatar6.jpeg";

const menu = [
  { icon: "house", label: "Dashboard", to: "/dashboard" },
  { icon: "calendar", label: "Appointments" },
  { icon: "user-doctor", label: "Find Doctor", to: "/finddoctor" },
  { icon: "hospital", label: "Find Clinic", to: "/findclinic" },
  { icon: "message", label: "Chat" },
  { icon: "store", label: "Find MarketPlace", to: "/marketplace" },
  { icon: "pills", label: "Find Pharmacy" },
  { icon: "users", label: "My Dependents", to: "/mydependents", active: true },
  { icon: "user", label: "My Account" },
  { icon: "gear", label: "Settings" },
];

function MyDependents() {
  const navigate = useNavigate();

  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const dependents = [
  {
    name: "Sarah Kamrani",
    relation: "Daughter",
    age: 14,
    blood: "O+",
    visit: "Sep 28, 2026",
    status: "Good",
    color: "pink",
    image: sarah,
  },
  {
    name: "Ahmad Kamrani",
    relation: "Son",
    age: 10,
    blood: "A+",
    visit: "Sep 21, 2026",
    status: "Good",
    color: "blue",
    image: ahmad,
  },
  {
    name: "Maryam Kamrani",
    relation: "Mother",
    age: 42,
    blood: "B+",
    visit: "Oct 02, 2026",
    status: "Attention",
    color: "green",
    image: maryam,
  },
  {
    name: "Fatima Kamrani",
    relation: "Sister",
    age: 18,
    blood: "A+",
    visit: "Sep 15, 2026",
    status: "Good",
    color: "purple",
    image: fatima,
  },
  {
    name: "Omid Kamrani",
    relation: "Brother",
    age: 21,
    blood: "O+",
    visit: "Sep 10, 2026",
    status: "Good",
    color: "yellow",
    image: omid,
  },
  {
    name: "Mohammad Kamrani",
    relation: "Father",
    age: 48,
    blood: "B+",
    visit: "Aug 30, 2026",
    status: "Attention",
    color: "blue",
    image: mohammad,
  },
];

  const filteredDependents = dependents.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarHidden ? "hide" : ""}`}>

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
            );

            return item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className={item.active ? "active" : ""}
              >
                {inner}
              </Link>
            ) : (
              <a
                href="#"
                key={item.label}
                className={item.active ? "active" : ""}
              >
                {inner}
              </a>
            );
          })}
        </div>

        <div className="help">
          <i className="fa-solid fa-question"></i>
        </div>

      </aside>

      {/* MAIN */}
      <main className="main">

        {/* TOPBAR */}
        <header className="topbar">

          <div className="top-title">

            <div className="breadcrumb">

              <Link to="/dashboard" className="home-link">
                <i className="fa-solid fa-house"></i>
              </Link>

              <span>/</span>

              <span>My Dependents</span>

              <button
                className="menu-toggle"
                onClick={() => setSidebarHidden(!sidebarHidden)}
              >
                <i className="fa-solid fa-bars"></i>
              </button>

            </div>

            <h2>My Dependents</h2>

          </div>

          {/* SEARCH */}
          <div className="top-right">

            <div className="search-wrapper">

              <div className="search">

                <i className="fa-solid fa-magnifying-glass"></i>

                <input
                  type="text"
                  placeholder="Search family member..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {search && (
                  <button
                    className="clear-search"
                    onClick={() => setSearch("")}
                  >
                    ×
                  </button>
                )}

              </div>

              {search && (
                <div className="search-dropdown">

                  {filteredDependents.length > 0 ? (
                    filteredDependents.map((person, index) => (

                      <div className="search-item" key={index}>

                        <img
                          src={person.avatar}
                          alt={person.name}
                        />

                        <div>
                          <strong>{person.name}</strong>
                          <span>
                            {person.relation} · {person.age} years
                          </span>
                        </div>

                      </div>

                    ))
                  ) : (
                    <div className="no-search-result">
                      No family member found
                    </div>
                  )}

                </div>
              )}

            </div>

            <span
              className="logout"
              onClick={() => navigate("/")}
            >
              <i className="fa-solid fa-circle-user"></i>
              Log out
            </span>

            <i className="fa-solid fa-gear"></i>
            <i className="fa-solid fa-bell"></i>

          </div>

        </header>

        {/* CONTENT */}
        <section className="content dependents-content">

          {/* PAGE HEADING */}
          <div className="dependents-heading">

            <div>

              <p className="dependents-small">
                FAMILY HEALTH CENTER
              </p>

              <h1>My Dependents 👋</h1>

              <p>
                Manage your family members and keep their health
                information connected.
              </p>

            </div>

            <button
              className="add-button"
              onClick={() => setShowForm(true)}
            >
              <i className="fa-solid fa-plus"></i>
              Add Family Member
            </button>

          </div>

          {/* HEALTH BANNER */}
          <div className="health-banner">

            <div className="health-banner-text">

              <span className="health-label">
                <i className="fa-solid fa-heart-pulse"></i>
                FAMILY HEALTH
              </span>

              <h2>
                Everyone's health in one place
              </h2>

              <p>
                Keep track of your loved ones' health and appointments.
              </p>

            </div>

            <div className="stats">

              <div>
                <strong>06</strong>
                <span>Members</span>
              </div>

              <div>
                <strong>04</strong>
                <span>Healthy</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Attention</span>
              </div>

            </div>

          </div>

          {/* HEALTH PULSE */}
          <div className="pulse-card">

            <div className="pulse-left">

              <div className="heart-circle">
                <i className="fa-solid fa-heart-pulse"></i>
              </div>

              <div>
                <small>FAMILY HEALTH PULSE</small>

                <h3>
                  Everyone is doing great
                </h3>

                <p>
                  Your family health overview looks good today.
                </p>
              </div>

            </div>

            <div className="pulse-line">
              ︿﹀︿﹀︿﹀︿﹀︿﹀
            </div>

            <div className="good-badge">
              <span>●</span> Good
            </div>

          </div>

          {/* MEMBERS HEADER */}
          <div className="members-header">

            <div>
              <h2>Family Members</h2>
              <p>Your connected family members</p>
            </div>

            <button
              className="small-add"
              onClick={() => setShowForm(true)}
            >
              <i className="fa-solid fa-plus"></i>
              Add Member
            </button>

          </div>

          {/* FAMILY CARDS */}
          <div className="dependents-grid">

            {filteredDependents.map((person, index) => (

              <div
                className={`family-card ${person.color}`}
                key={index}
              >

                {/* THREE DOTS */}
                <button className="card-more">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>

                {/* CARD TOP */}
                <div className="family-card-top">

                  {/* AVATAR */}
                  <div className="family-avatar">

                    <div className="avatar-circle">
                      <img
                        src={person.image}
                        alt={person.name}
                      />
                    </div>

                  </div>

                  {/* INFO */}
                  <div className="family-info">

                    <h3>{person.name}</h3>

                    <span className="relation-badge">
                      {person.relation}
                    </span>

                    <div className="detail-row">
                      <i className="fa-solid fa-calendar"></i>
                      <span>
                        Age: {person.age} years
                      </span>
                    </div>

                    <div className="detail-row blood-row">
                      <i className="fa-solid fa-droplet"></i>
                      <span>
                        Blood: {person.blood}
                      </span>
                    </div>

                    <div className="detail-row">
                      <i className="fa-solid fa-heart-pulse"></i>
                      <span>
                        Health:
                        <b className={
                          person.status === "Good"
                            ? "good-text"
                            : "attention-text"
                        }>
                          {person.status}
                        </b>
                      </span>
                    </div>

                    <div className="detail-row">
                      <i className="fa-solid fa-calendar-check"></i>
                      <span>
                        Last Visit: {person.visit}
                      </span>
                    </div>

                  </div>

                </div>

                {/* CARD FOOTER */}
                <div className="family-card-footer">

                  <button className="profile-button">
                    View Details
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>

                  <button className="round-arrow">
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* FOOTER */}
        <footer className="dashboard-footer">

          <p>
            © 2026, made with ♥ by MyPatientHUB for a better web.
          </p>

          <div>
            <a href="#">MyPatientHUB</a>
            <a href="#">About Us</a>
            <a href="#">Blog</a>
          </div>

        </footer>

      </main>

      {/* ADD MEMBER MODAL */}
      {showForm && (

        <div className="overlay">

          <div className="modal">

            <button
              className="close"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <div className="modal-icon">
              <i className="fa-solid fa-user-plus"></i>
            </div>

            <h2 className="modal-title">
              Add Family Member
            </h2>

            <p className="modal-text">
              Create a health profile for your family member.
            </p>

            <div className="form-grid">

              <input
                className="input"
                placeholder="First Name"
              />

              <input
                className="input"
                placeholder="Last Name"
              />

              <input
                className="input"
                placeholder="Age"
                type="number"
              />

              <select className="input">
                <option>Gender</option>
                <option>Female</option>
                <option>Male</option>
              </select>

              <select className="input">
                <option>Relationship</option>
                <option>Mother</option>
                <option>Father</option>
                <option>Daughter</option>
                <option>Son</option>
                <option>Brother</option>
                <option>Sister</option>
              </select>

              <select className="input">
                <option>Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>

            </div>

            <div className="modal-buttons">

              <button
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                className="save-button"
                onClick={() => setShowForm(false)}
              >
                <i className="fa-solid fa-plus"></i>
                Add Member
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default MyDependents;