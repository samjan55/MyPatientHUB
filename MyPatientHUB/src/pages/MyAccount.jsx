 import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import './MyAccount.css'

const invoices = [
  { date: 'March 01, 2026', id: '#MS-415646', amount: '$180' },
  { date: 'February 10, 2026', id: '#RV-126749', amount: '$250' },
  { date: 'April 05, 2026', id: '#QW-103578', amount: '$120' },
  { date: 'June 25, 2025', id: '#MS-415647', amount: '$180' },
  { date: 'March 01, 2025', id: '#AR-803481', amount: '$300' },
]

const transactions = [
  { icon: '🥗', name: 'Food', date: '14 October, 12:30 PM', amount: '- $45.00', type: 'Expense' },
  { icon: '💊', name: 'Medicine', date: '14 October, 10:30 AM', amount: '- $30.00', type: 'Expense' },
  { icon: '🩺', name: 'Appointment', date: '13 October, 04:30 PM', amount: '+ $200.00', type: 'Income' },
  { icon: '🏥', name: 'Pharmacy', date: '13 October, 12:30 PM', amount: '- $25.00', type: 'Expense' },
  { icon: '📅', name: 'Clinic Booking', date: '12 October, 09:00 AM', amount: '- $50.00', type: 'Expense' },
  { icon: '🛍️', name: 'MarketPlace', date: '11 October, 02:00 PM', amount: '- $35.00', type: 'Expense' },
]

const billing = [
  { initials: 'OL', name: 'Oliver Liam', company: 'Viking Burrito', email: 'oliver@burrito.com' },
  { initials: 'LH', name: 'Lucas Harper', company: 'Stone Tech Zone', email: 'lucas@stone-tech.com' },
  { initials: 'EJ', name: 'Ethan James', company: 'Fiber Notion', email: 'ethan@fiber.com' },
]

const transactionKeys = {
  Food: 'food',
  Medicine: 'medicine',
  Appointment: 'appointment',
  Pharmacy: 'pharmacy',
  'Clinic Booking': 'clinicBooking',
  MarketPlace: 'marketplace',
}

function MyAccount() {
  const { t } = useTranslation()

  const [filter, setFilter] = useState('All')
  const [showBalance, setShowBalance] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const filteredTransactions = transactions.filter((item) => {
    return filter === 'All' || item.type === filter
  })

  return (
    <div
      className={`medical-account ${
        sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="medical-content">
        <Header
          title="Medical-account"
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Welcome */}
        <section className="medical-welcome">
          <div className="medical-welcome-text">
            <span className="medical-eyebrow">
              {t('personalDashboard')}
            </span>

            <h1>
              {t('accountTitle')} <span>✦</span>
            </h1>

            <p>{t('accountDescription')}</p>

            <div className="medical-welcome-badges">
              <span>🛡️ {t('secureAccount')}</span>
              <span>💙 {t('healthcareServices')}</span>
            </div>
          </div>

          <div className="medical-heart">
            <span>♥</span>
            <div className="medical-heart-line">⌁⌁⌁</div>
            <small>{t('yourHealthMatters')}</small>
          </div>
        </section>

        {/* Summary */}
        <section className="medical-summary">
          <div className="medical-bank-card">
            <div className="medical-bank-top">
              <span>✚ MyPatientHUB</span>
              <strong>VISA</strong>
            </div>

            <div className="medical-chip">▦</div>

            <div className="medical-card-number">
              4562&nbsp; 1122&nbsp; 4594&nbsp; 7852
            </div>

            <div className="medical-card-bottom">
              <div>
                <small>{t('cardHolder')}</small>
                <strong>Jack Peterson</strong>
              </div>

              <div>
                <small>{t('expires')}</small>
                <strong>11/28</strong>
              </div>
            </div>

            <div className="medical-card-decoration"></div>
          </div>

          <div className="medical-balance">
            <div className="medical-card-heading">
              <div className="medical-icon-box">💳</div>

              <div>
                <span>{t('accountBalance')}</span>

                <h2>
                  {showBalance ? '$2,000.00' : '••••••••'}
                </h2>
              </div>

              <button
                type="button"
                className="medical-eye-button"
                onClick={() => setShowBalance((prev) => !prev)}
                aria-label="Toggle balance visibility"
              >
                {showBalance ? '◉' : '◎'}
              </button>
            </div>

            <div className="medical-growth">
              <span>↗ + $200.00</span>
              <small>{t('recentPayment')}</small>
            </div>

            <div className="medical-balance-bottom">
              <div>
                <small>{t('totalPayments')}</small>
                <strong>$455.00</strong>
              </div>

              <div className="medical-mini-chart">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
          </div>

          <div className="medical-quick-card">
            <div className="medical-quick-icon">🩺</div>

            <h3>{t('healthcareServices')}</h3>

            <p>{t('manageHealthcare')}</p>

            <div className="medical-quick-links">
              <span>📅 {t('appointments')}</span>
              <span>💊 {t('pharmacy')}</span>
              <span>🏥 {t('clinics')}</span>
            </div>
          </div>
        </section>

        {/* Payment and Invoices */}
        <section className="medical-two-columns">
          <div className="medical-panel">
            <div className="medical-panel-heading">
              <div>
                <h2>{t('paymentMethods')}</h2>
                <p>{t('savedPaymentMethods')}</p>
              </div>

              <button
                type="button"
                className="medical-primary-button"
                onClick={() =>
                  alert(t('addPaymentMessage'))
                }
              >
                + {t('addNew')}
              </button>
            </div>

            <div className="medical-payment-row">
              <div className="medical-payment-logo visa-logo">
                VISA
              </div>

              <div className="medical-payment-details">
                <strong>Visa ending in 7852</strong>
                <small>•••• •••• •••• 7852</small>
              </div>

              <span className="medical-default">
                {t('default')}
              </span>
            </div>

            <div className="medical-payment-row">
              <div className="medical-payment-logo master-logo">
                ●●
              </div>

              <div className="medical-payment-details">
                <strong>Mastercard ending in 5248</strong>
                <small>•••• •••• •••• 5248</small>
              </div>

              <span className="medical-more">⋮</span>
            </div>
          </div>

          <div className="medical-panel">
            <div className="medical-panel-heading">
              <div>
                <h2>{t('recentInvoices')}</h2>
                <p>{t('paymentHistory')}</p>
              </div>

              <span className="medical-count">
                {invoices.length} {t('invoices')}
              </span>
            </div>

            {invoices.map((invoice) => (
              <div className="medical-invoice-row" key={invoice.id}>
                <div className="medical-invoice-icon">▤</div>

                <div className="medical-invoice-details">
                  <strong>{invoice.id}</strong>
                  <small>{invoice.date}</small>
                </div>

                <strong className="medical-invoice-price">
                  {invoice.amount}
                </strong>

                <button
                  type="button"
                  className="medical-pdf-button"
                  onClick={() => window.print()}
                >
                  {t('pdf')}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Billing Information */}
        <section className="medical-panel medical-billing-panel">
          <div className="medical-panel-heading">
            <div>
              <h2>{t('billingInformation')}</h2>
              <p>{t('manageBillingProfiles')}</p>
            </div>

            <button
              type="button"
              className="medical-outline-button"
              onClick={() =>
                alert(t('addBillingMessage'))
              }
            >
              + {t('addBilling')}
            </button>
          </div>

          <div className="medical-billing-grid">
            {billing.map((person, index) => (
              <article
                className="medical-billing-card"
                key={person.email}
              >
                <div className={`medical-billing-avatar avatar-${index}`}>
                  {person.initials}
                </div>

                <h3>{person.name}</h3>

                <div className="medical-billing-detail">
                  <span>{t('company')}</span>
                  <strong>{person.company}</strong>
                </div>

                <div className="medical-billing-detail">
                  <span>{t('email')}</span>
                  <strong>{person.email}</strong>
                </div>

                <div className="medical-billing-detail">
                  <span>{t('vatNumber')}</span>
                  <strong>FRB1235476</strong>
                </div>

                <button
                  type="button"
                  className="medical-edit-button"
                  onClick={() =>
                    alert(
                      `${t('editBillingMessage')} ${person.name}`
                    )
                  }
                >
                  ✎ {t('editInformation')}
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Transactions */}
        <section className="medical-panel medical-transactions-panel">
          <div className="medical-panel-heading">
            <div>
              <h2>{t('yourTransactions')}</h2>
              <p>{t('reviewActivity')}</p>
            </div>

            <select
              className="medical-filter"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label={t('allTransactions')}
            >
              <option value="All">{t('allTransactions')}</option>
              <option value="Income">{t('income')}</option>
              <option value="Expense">{t('expenses')}</option>
            </select>
          </div>

          <div className="medical-transaction-layout">
            <div className="medical-transaction-list">
              <h4>{t('recentActivity')}</h4>

              {filteredTransactions.map((item) => (
                <div
                  className="medical-transaction-row"
                  key={item.name}
                >
                  <div className="medical-transaction-icon">
                    {item.icon}
                  </div>

                  <div className="medical-transaction-info">
                    <strong>
                      {t(transactionKeys[item.name] || item.name)}
                    </strong>

                    <small>{item.date}</small>
                  </div>

                  <strong
                    className={
                      item.type === 'Income'
                        ? 'medical-income'
                        : 'medical-expense'
                    }
                  >
                    {item.amount}
                  </strong>
                </div>
              ))}
            </div>

            <div className="medical-security-card">
              <div className="medical-security-icon">🛡️</div>

              <h3>{t('securityTitle')}</h3>

              <p>{t('securityDescription')}</p>

              <div className="medical-security-status">
                <span>●</span> {t('securityReminder')}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="medical-footer">
        <strong>✚ MyPatientHUB</strong>

        <span>
          © 2026 MyPatientHUB. {t('footerText')}
        </span>

        <div>
          <a href="#about">{t('aboutUs')}</a>
          <a href="#support">{t('support')}</a>
          <a href="#privacy">{t('privacy')}</a>
        </div>
      </footer>
    </div>
  )
}

export default MyAccount