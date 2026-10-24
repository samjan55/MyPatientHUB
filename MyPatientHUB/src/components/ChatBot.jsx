import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './ChatBot.css'

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! 👋 Welcome to MyPatientHUB. I'm your virtual health assistant. How can I help you today?",
    },
  ])

  const navigate = useNavigate()
  const messagesEndRef = useRef(null)

  const quickActions = [
    {
      icon: 'fa-user-doctor',
      text: 'Find a Doctor',
      path: '/finddoctor',
    },
    {
      icon: 'fa-hospital',
      text: 'Find a Clinic',
      path: '/findclinic',
    },
    {
      icon: 'fa-prescription-bottle-medical',
      text: 'Find a Pharmacy',
      path: '/findpharmacy',
    },
    {
      icon: 'fa-calendar-check',
      text: 'My Appointments',
      path: '/appointments',
    },
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  const handleNavigation = (path) => {
    setIsOpen(false)
    navigate(path)
  }

  const getBotReply = (question) => {
    const text = question.toLowerCase().trim()

    if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(text)) {
      return "Hello! 👋 Welcome to MyPatientHUB. How can I assist you today?"
    }

    if (/\b(thank you|thanks|thank)\b/.test(text)) {
      return "You're welcome! 💙 I'm always happy to help."
    }

    if (/\b(doctor|doctors|physician|specialist)\b/.test(text)) {
      return 'You can find doctors on our Find Doctor page. Explore available doctors and choose the specialty you need.'
    }

    if (/\b(clinic|clinics|hospital|hospitals)\b/.test(text)) {
      return 'Visit the Find Clinic page to explore clinics, check their information, and view available locations.'
    }

    if (/\b(pharmacy|pharmacies|medicine|medication)\b/.test(text)) {
      return 'Open the Find Pharmacy page to explore pharmacy information. For advice about medicines, consult a qualified healthcare professional.'
    }

    if (/\b(appointment|appointments|booking|book a visit)\b/.test(text)) {
      return 'You can visit the Appointments page to access appointment features. Follow the available steps to manage your appointments.'
    }

    if (/\b(location|nearby|nearest|near me|directions|address)\b/.test(text)) {
      return 'Open the Find Clinic page to explore clinic locations on the map. Location features may require permission from your browser.'
    }

    if (/\b(account|profile|settings|password|login|sign in|register|sign up)\b/.test(text)) {
      return 'You can use the account and settings options in MyPatientHUB to access the available profile features.'
    }

    if (/\b(chat|support|help|assistant)\b/.test(text)) {
      return 'I can help you explore doctors, clinics, pharmacies, and appointment features. Type your question or choose one of the service buttons below.'
    }

    if (/\b(emergency|urgent|chest pain|difficulty breathing|cannot breathe)\b/.test(text)) {
      return 'If you may be experiencing a medical emergency, contact your local emergency services or go to the nearest emergency department immediately.'
    }

    if (/\b(pain|fever|headache|symptom|sick|illness|disease|diagnosis)\b/.test(text)) {
      return 'I can provide general health information, but I cannot diagnose medical conditions. Please consult a qualified healthcare professional for personal medical advice. If symptoms are severe or sudden, seek urgent medical care.'
    }

    if (/\b(what can you do|your features|services|what do you do)\b/.test(text)) {
      return 'I can help you explore doctors, clinics, pharmacies, appointment features, and general health information. What would you like to know?'
    }

    return "I'm sorry, I don't have a specific answer to that question yet. I can help you find doctors, clinics, pharmacies, and appointment information. Please try asking about one of these services."
  }

  const handleSendMessage = (event) => {
    event.preventDefault()

    const question = input.trim()

    if (!question) return

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: question,
    }

    const botMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      text: getBotReply(question),
    }

    setMessages((previous) => [
      ...previous,
      userMessage,
      botMessage,
    ])

    setInput('')
  }

  return (
    <div className="ai-assistant-container">
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-header-profile">
              <div className="ai-avatar">
                <i className="fa-solid fa-robot"></i>
                <span className="ai-online-dot"></span>
              </div>

              <div>
                <h3>MyPatientHUB AI</h3>
                <p>
                  <span className="ai-status-dot"></span>
                  Virtual Health Assistant
                </p>
              </div>
            </div>

            <button
              type="button"
              className="ai-close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="ai-chat-body">
            <div className="ai-date-label">
              AI HEALTH ASSISTANT
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`ai-message-row ${
                  message.sender === 'user' ? 'ai-user-row' : ''
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="ai-small-avatar">
                    <i className="fa-solid fa-robot"></i>
                  </div>
                )}

                <div
                  className={`ai-message ${
                    message.sender === 'user' ? 'ai-user-message' : ''
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />

            <p className="ai-quick-title">
              Explore Our Services
            </p>

            <div className="ai-quick-actions">
              {quickActions.map((action) => (
                <button
                  type="button"
                  key={action.text}
                  className="ai-quick-action"
                  onClick={() => handleNavigation(action.path)}
                >
                  <span className="ai-action-icon">
                    <i className={`fa-solid ${action.icon}`}></i>
                  </span>

                  <span>{action.text}</span>

                  <i className="fa-solid fa-chevron-right ai-action-arrow"></i>
                </button>
              ))}
            </div>

            <div className="ai-disclaimer">
              <i className="fa-solid fa-shield-heart"></i>

              <span>
                This assistant provides general information and does not replace professional medical advice.
              </span>
            </div>
          </div>

          <div className="ai-chat-footer">
            <form
              className="ai-input-form"
              onSubmit={handleSendMessage}
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your question..."
                aria-label="Type your message"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>

            <div className="ai-footer-message">
              <i className="fa-solid fa-sparkles"></i>
              <span>Your health journey starts here.</span>
            </div>

            <button
              type="button"
              className="ai-open-chat-page"
              onClick={() => handleNavigation('/chat')}
            >
              Open Full Chat
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        className={`ai-floating-button ${
          isOpen ? 'ai-button-active' : ''
        }`}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={isOpen}
      >
        <span className="ai-button-glow"></span>

        <i
          className={`fa-solid ${
            isOpen ? 'fa-xmark' : 'fa-robot'
          }`}
        ></i>

        {!isOpen && <span className="ai-button-badge"></span>}
      </button>

      {!isOpen && (
        <div className="ai-floating-tooltip">
          <span>AI Assistant</span>
          <i className="fa-solid fa-sparkles"></i>
        </div>
      )}
    </div>
  )
}

export default ChatBot