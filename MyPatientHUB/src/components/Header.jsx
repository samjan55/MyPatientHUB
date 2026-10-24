import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import './Header.css'

function Header({
  title = 'Dashboard',
  onMenuClick,
  onSearch,
}) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)

    if (onSearch) {
      onSearch(value)
    }
  }

  const handleLogout = () => {
    const confirmed = window.confirm(t('logoutConfirm'))

    if (confirmed) {
      navigate('/')
    }
  }

  return (
    <header className="app-header">

      <div className="header-breadcrumb">

        <i className="fa-solid fa-house"></i>

        <span>/</span>

        <span>{t(title, { defaultValue: title })}</span>

        <span>/</span>

        <button
          type="button"
          className="header-menu-toggle"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

      </div>

      <div className="header-actions">

        <div className="header-search">

          <i className="fa-solid fa-magnifying-glass"></i>

          <input
            type="text"
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {searchTerm && (
            <button
              type="button"
              className="header-search-clear"
              onClick={() => handleSearch('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>

        <LanguageSwitcher />

        <button
          type="button"
          className="header-icon-button"
          onClick={() => navigate('/settings')}
          aria-label={t('settings')}
          title={t('settings')}
        >
          <i className="fa-solid fa-gear"></i>
        </button>

        <button
          type="button"
          className="header-icon-button"
          onClick={() => window.alert(t('noNotifications'))}
          aria-label={t('notifications')}
          title={t('notifications')}
        >
          <i className="fa-solid fa-bell"></i>
        </button>

        <button
          type="button"
          className="header-logout"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>{t('logout')}</span>
        </button>

      </div>

    </header>
  )
}

export default Header