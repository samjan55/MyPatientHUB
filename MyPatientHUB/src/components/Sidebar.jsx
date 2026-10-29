import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaHeartbeat,
  FaChild,
  FaTimes,
  FaThLarge,
  FaCalendarCheck,
  FaUserMd,
  FaHospital,
  FaComments,
  FaShoppingCart,
  FaPrescriptionBottleAlt,
  FaUsers,
  FaUser,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ isOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const menuItems = [
    { title: 'Dashboard', icon: <FaThLarge />, path: '/dashboard' },
    { title: 'BodyMap', icon: <FaChild />, path: '/bodymap' },
    { title: 'Appointments', icon: <FaCalendarCheck />, path: '/appointments' },
    { title: 'Find Doctor', icon: <FaUserMd />, path: '/finddoctor' },
    { title: 'Find Clinic', icon: <FaHospital />, path: '/findclinic' },
    { title: 'Chat', icon: <FaComments />, path: '/chat' },
    { title: 'Find MarketPlace', icon: <FaShoppingCart />, path: '/marketplace' },
    { title: 'Find Pharmacy', icon: <FaPrescriptionBottleAlt />, path: '/findpharmacy' },
    { title: 'My Dependents', icon: <FaUsers />, path: '/mydependents' },
    { title: 'My Account', icon: <FaUser />, path: '/myaccount' },
    { title: 'Settings', icon: <FaCog />, path: '/settings' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('userName');
    onClose();
    navigate('/login');
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>

        <div className="sidebar-header">
          <NavLink
            to="/dashboard"
            className="sidebar-logo"
            onClick={onClose}
          >
            <span className="sidebar-logo-icon">
              <FaHeartbeat />
            </span>

            <span className="sidebar-logo-text" translate="no">
              MyPatient<span>HUB</span>
            </span>
          </NavLink>

          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-section-title">
          {t('mainMenu')}
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="sidebar-link-icon">
                {item.icon}
              </span>

              <span className="sidebar-link-text">
                {t(item.title)}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <div className="sidebar-help-icon">
              <FaHeartbeat />
            </div>

            <div className="sidebar-help-text">
              <strong>{t('needHelp')}</strong>
              <span>{t('weAreHere')}</span>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>{t('logOut')}</span>
          </button>
        </div>

      </aside>
    </>
  );
}

export default Sidebar;