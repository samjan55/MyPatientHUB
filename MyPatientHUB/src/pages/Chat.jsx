 import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Chat.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import callCenter from '../assets/call-center.jpeg'

function Chat() {
  const { t } = useTranslation()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [message, setMessage] = useState('')

  // پیام اول با key ذخیره می‌شود تا با تغییر زبان ترجمه شود
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'support',
      key: 'Hello! Welcome to MyPatientHUB. How can we help you today?',
    },
  ])

  const [callbackOpen, setCallbackOpen] = useState(false)
  const [callbackName, setCallbackName] = useState('')
  const [callbackPhone, setCallbackPhone] = useState('')
  const [notification, setNotification] = useState('')

  const sendMessage = (e) => {
    e.preventDefault()

    if (!message.trim()) return

    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: 'patient',
        text: message.trim(),
      },
    ])

    setMessage('')
  }

  const showNotification = (key, time = 4000) => {
    setNotification(key)
    setTimeout(() => setNotification(''), time)
  }

  const requestCallback = (e) => {
    e.preventDefault()

    if (!callbackName.trim() || !callbackPhone.trim()) return

    setCallbackOpen(false)
    setCallbackName('')
    setCallbackPhone('')

    showNotification('Callback request saved as a demo!')
  }

  return (
    <div className={`chat-page ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="chat-main">

        <Header
          title="Chat"
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />

        <section className="chat-content">

          {/* WELCOME */}

          <div className="chat-welcome">

            <div className="chat-welcome-content">

              <span className="chat-welcome-badge">
                <i className="fa-solid fa-headset"></i>
                {t('PATIENT SUPPORT')}
              </span>

              <h2>
                {t('How Can We Help')}
                <br />
                <span>{t('You Today?')}</span>
              </h2>

              <p>
                {t(
                  'Connect with our support team for appointments, clinic information, and healthcare assistance. We are here to make your healthcare journey easier.'
                )}
              </p>

              <div className="chat-welcome-features">
                <span>
                  <i className="fa-solid fa-comments"></i>
                  {t('Patient Support')}
                </span>

                <span>
                  <i className="fa-solid fa-phone-volume"></i>
                  {t('Call Center')}
                </span>
              </div>

            </div>

            <div className="chat-welcome-image">

              <img
                src={callCenter}
                alt={t('Call Center')}
              />

              <div className="chat-image-badge">
                <i className="fa-solid fa-headset"></i>

                <div>
                  <strong>{t("We're Here to Help")}</strong>
                  <span>{t('Patient Care & Support')}</span>
                </div>
              </div>

            </div>

          </div>

          {/* CHAT AND CALL CENTER */}

          <div className="chat-support-layout">

            {/* LIVE CHAT */}

            <div className="chat-box">

              <div className="chat-box-header">

                <div className="chat-support-avatar">
                  <i className="fa-solid fa-headset"></i>
                </div>

                <div>
                  <h3>{t('Patient Support')}</h3>
                  <p>{t('Demo Chat')}</p>
                </div>

                <span className="chat-demo-badge">
                  {t('Demo')}
                </span>

              </div>

              <div className="chat-messages">

                <div className="chat-date">
                  {t('Today')}
                </div>

                {messages.map((item) => (
                  <div
                    key={item.id}
                    className={`chat-message ${
                      item.sender === 'patient' ? 'patient' : 'support'
                    }`}
                  >
                    <div className="chat-message-bubble">
                      {item.key ? t(item.key) : item.text}
                    </div>
                  </div>
                ))}

              </div>

              <form
                className="chat-message-form"
                onSubmit={sendMessage}
              >

                <input
                  type="text"
                  placeholder={t('Type your message...')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <button
                  type="submit"
                  aria-label={t('Send message')}
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>

              </form>

              <p className="chat-demo-note">
                {t('Messages are displayed locally and are not sent to real support staff.')}
              </p>

            </div>

            {/* CALL CENTER */}

            <div className="chat-call-column">

              <div className="chat-call-card">

                <div className="chat-call-icon">
                  <i className="fa-solid fa-phone-volume"></i>
                </div>

                <h3>{t('Call Center')}</h3>

                <p>
                  {t('Need help with appointments or clinic services? Contact our support team.')}
                </p>

                <div className="chat-call-hours">
                  <i className="fa-regular fa-clock"></i>
                  {t('Support hours: To be announced')}
                </div>

                <button
                  type="button"
                  className="chat-call-button"
                  onClick={() =>
                    showNotification('Call Center phone number is not available yet.', 3000)
                  }
                >
                  <i className="fa-solid fa-phone"></i>
                  {t('Call Now')}
                </button>

                <button
                  type="button"
                  className="chat-callback-button"
                  onClick={() => setCallbackOpen(true)}
                >
                  <i className="fa-solid fa-phone-flip"></i>
                  {t('Request a Callback')}
                </button>

              </div>

              {/* QUICK HELP */}

              <div className="chat-quick-help">

                <h3>{t('Quick Help')}</h3>

                <Link to="/dashboard">
                  <i className="fa-solid fa-calendar-check"></i>
                  <span>{t('Dashboard')}</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>

                <Link to="/finddoctor">
                  <i className="fa-solid fa-user-doctor"></i>
                  <span>{t('Find Doctor')}</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>

                <Link to="/findclinic">
                  <i className="fa-solid fa-hospital"></i>
                  <span>{t('Find Clinic')}</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <footer className="chat-footer">
            <i className="fa-solid fa-heart-pulse"></i>
            <span translate="no">MyPatientHUB</span>

            <p>
              {t('Making healthcare easier and more accessible.')}
            </p>

            <span>
              © 2026 MyPatientHUB. {t('All rights reserved.')}
            </span>
          </footer>

        </section>

      </main>

      {/* CALLBACK MODAL */}

      {callbackOpen && (
        <div
          className="chat-modal-backdrop"
          onClick={() => setCallbackOpen(false)}
        >

          <div
            className="chat-callback-modal"
            role="dialog"
            aria-modal="true"
            aria-label={t('Request a Callback')}
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="chat-modal-close"
              onClick={() => setCallbackOpen(false)}
              aria-label={t('Close')}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="chat-modal-icon">
              <i className="fa-solid fa-phone-volume"></i>
            </div>

            <h2>{t('Request a Callback')}</h2>

            <p>
              {t('Enter your details to preview a callback request.')}
            </p>

            <form onSubmit={requestCallback}>

              <label>
                {t('Full Name')}
                <input
                  type="text"
                  placeholder={t('Enter your name')}
                  value={callbackName}
                  onChange={(e) => setCallbackName(e.target.value)}
                  required
                />
              </label>

              <label>
                {t('Phone Number')}
                <input
                  type="tel"
                  dir="ltr"
                  placeholder="+93 700 000 000"
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  required
                />
              </label>

              <button type="submit">
                <i className="fa-solid fa-check"></i>
                {t('Submit Request')}
              </button>

            </form>

            <small>
              {t('Demo only. No callback will be scheduled.')}
            </small>

          </div>

        </div>
      )}

      {/* NOTIFICATION */}

      {notification && (
        <div className="chat-notification" role="status">
          <i className="fa-solid fa-circle-info"></i>
          <span>{t(notification)}</span>

          <button
            type="button"
            onClick={() => setNotification('')}
            aria-label={t('Close notification')}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

    </div>
  )
}

export default Chat