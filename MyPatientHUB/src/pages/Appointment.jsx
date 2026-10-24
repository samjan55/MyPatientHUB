import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import appointmentHero from '../assets/appoinment-hero.jpeg'
import './Appointment.css'


const doctors = [
  { id: 1, name: 'Dr. Mustafa', specialty: 'Cardiology', start: 9, end: 13 },
  { id: 2, name: 'Dr. Khirullah', specialty: 'General Consultation', start: 8, end: 12 },
  { id: 3, name: 'Dr. Bilal', specialty: 'Dental Care', start: 10, end: 14 },
  { id: 4, name: 'Dr. Madiha', specialty: 'Dermatology', start: 9, end: 15 },
  { id: 5, name: 'Dr. Shamsir', specialty: 'Eye Checkup', start: 8, end: 13 },
  { id: 6, name: 'Dr. Ali', specialty: 'General Consultation', start: 14, end: 18 }
]

const services = [
  'General Consultation',
  'Dental Care',
  'Cardiology',
  'Eye Checkup',
  'Dermatology',
  'Laboratory Test',
  'Follow-up Visit'
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const LOCALES = {
  en: 'en-US',
  fa: 'fa-AF-u-ca-gregory',
  ps: 'ps-AF-u-ca-gregory'
}

const STORAGE_KEY = 'mypatienthub_appointments'

function getSavedAppointments() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function getToday() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatDate(dateString, locale) {
  if (!dateString) return ''

  return new Date(`${dateString}T12:00:00`).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function formatTime(time, locale) {
  if (!time) return ''

  const [hours, minutes] = time.split(':').map(Number)
  const date = new Date()

  date.setHours(hours, minutes, 0, 0)

  return date.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit'
  })
}

function getDoctorSlots(doctor, date, appointments, editingId) {
  if (!doctor || !date) return []

  const slots = []
  const today = getToday()
  const now = new Date()

  for (let hour = doctor.start; hour < doctor.end; hour++) {
    for (const minute of [0, 30]) {
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`

      const isPast =
        date < today ||
        (date === today &&
          (hour < now.getHours() ||
            (hour === now.getHours() && minute <= now.getMinutes())))

      const isBooked = appointments.some(
        appointment =>
          appointment.id !== editingId &&
          appointment.doctorId === doctor.id &&
          appointment.date === date &&
          appointment.time === time &&
          appointment.status !== 'cancelled'
      )

      slots.push({ time, available: !isPast && !isBooked })
    }
  }

  return slots
}

function Appointment() {
  const { t, i18n } = useTranslation()
  const locale = LOCALES[i18n.language] || 'en-US'

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [notification, setNotification] = useState('')
  const [appointments, setAppointments] = useState(getSavedAppointments)
  const [selectedDate, setSelectedDate] = useState(getToday())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const emptyForm = {
    doctorId: '',
    service: '',
    date: getToday(),
    time: '',
    notes: ''
  }

  const [form, setForm] = useState(emptyForm)

  const fmtDate = date => formatDate(date, locale)
  const fmtTime = time => formatTime(time, locale)

  // اولین حرف اسم داکتر برای دایره کوچک
  const initial = name => t(name).split(' ').pop().charAt(0)

  function updateAppointments(updated) {
    setAppointments(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  function showMessage(message) {
    setNotification(t(message))

    window.setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  function openBooking() {
    setEditingId(null)

    setForm({
      ...emptyForm,
      date: selectedDate >= getToday() ? selectedDate : getToday()
    })

    setShowModal(true)
  }

  function openEdit(appointment) {
    setEditingId(appointment.id)

    setForm({
      doctorId: String(appointment.doctorId),
      service: appointment.service,
      date: appointment.date,
      time: appointment.time,
      notes: appointment.notes || ''
    })

    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  function handleFormChange(event) {
    const { name, value } = event.target

    setForm(previous => ({
      ...previous,
      [name]: value,
      ...(name === 'doctorId' || name === 'date' ? { time: '' } : {})
    }))
  }

  function saveAppointment(event) {
    event.preventDefault()

    if (!form.doctorId || !form.service || !form.date || !form.time) {
      showMessage('Please complete all required fields.')
      return
    }

    const doctor = doctors.find(item => item.id === Number(form.doctorId))

    if (!doctor) {
      showMessage('Please select a valid doctor.')
      return
    }

    const currentAppointments = getSavedAppointments()

    const slots = getDoctorSlots(
      doctor,
      form.date,
      currentAppointments,
      editingId
    )

    const selectedSlot = slots.find(slot => slot.time === form.time)

    if (!selectedSlot || !selectedSlot.available) {
      showMessage('This time slot is no longer available.')
      setAppointments(currentAppointments)
      return
    }

    const appointment = {
      id: editingId || Date.now(),
      doctorId: doctor.id,
      doctor: doctor.name,
      specialty: doctor.specialty,
      service: form.service,
      date: form.date,
      time: form.time,
      notes: form.notes.trim(),
      status: 'upcoming'
    }

    let updated

    if (editingId) {
      updated = currentAppointments.map(item =>
        item.id === editingId ? appointment : item
      )
    } else {
      updated = [...currentAppointments, appointment]
    }

    updateAppointments(updated)
    setSelectedDate(form.date)
    closeModal()

    showMessage(
      editingId
        ? 'Appointment updated successfully!'
        : 'Appointment booked successfully!'
    )
  }

  function cancelAppointment(id) {
    const confirmed = window.confirm(
      t('Are you sure you want to cancel this appointment?')
    )

    if (!confirmed) return

    const updated = getSavedAppointments().map(appointment =>
      appointment.id === id
        ? { ...appointment, status: 'cancelled' }
        : appointment
    )

    updateAppointments(updated)
    showMessage('Appointment cancelled.')
  }

  function changeMonth(direction) {
    setCurrentMonth(previous => {
      const next = new Date(previous)
      next.setMonth(next.getMonth() + direction)
      return next
    })
  }

  const activeAppointments = appointments.filter(
    appointment => appointment.status !== 'cancelled'
  )

  const upcomingAppointments = activeAppointments
    .filter(appointment => appointment.date >= getToday())
    .sort((a, b) =>
      `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
    )

  const previousAppointments = activeAppointments
    .filter(appointment => appointment.date < getToday())
    .sort((a, b) =>
      `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`)
    )

  const filteredAppointments = upcomingAppointments.filter(appointment =>
    `${appointment.doctor} ${t(appointment.doctor)} ${appointment.service} ${t(appointment.service)} ${appointment.date}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const selectedDoctor = doctors.find(
    doctor => doctor.id === Number(form.doctorId)
  )

  const availableSlots = getDoctorSlots(
    selectedDoctor,
    form.date,
    appointments,
    editingId
  )

  const monthYear = currentMonth.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric'
  })

  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay()

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate()

  const calendarDays = Array.from(
    { length: firstDay + daysInMonth },
    (_, index) => (index < firstDay ? null : index - firstDay + 1)
  )

  const selectedDayAppointments = activeAppointments.filter(
    appointment => appointment.date === selectedDate
  )

  return (
    <div
      className={`appointment-layout ${sidebarOpen ? '' : 'sidebar-closed'}`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="appointment-main">
        <Header
          title="Appointments"
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onSearch={setSearch}
        />

        <div className="appointment-page">
          {notification && (
            <div className="appointment-notification" role="status">
              <span>✓</span>
              {notification}
              <button
                type="button"
                onClick={() => setNotification('')}
                aria-label={t('Close notification')}
              >
                ×
              </button>
            </div>
          )}

          <section className="appointment-hero">
            <div className="appointment-hero-content">
              <span className="appointment-eyebrow">
                {t('YOUR HEALTH, OUR PRIORITY')}
              </span>

              <h1>{t('Manage Your Appointments')}</h1>

              <p>
                {t(
                  'Book your visit, choose your preferred doctor, and keep track of your healthcare appointments in one place.'
                )}
              </p>

              <button
                type="button"
                className="appointment-primary-btn"
                onClick={openBooking}
              >
                + {t('Book an Appointment')}
              </button>

              <div className="appointment-hero-note">
                <span>✓</span> {t('Simple and convenient booking')}
              </div>
            </div>

            <div className="appointment-hero-visual">
              <img
                src={appointmentHero}
                alt={t('Manage Your Appointments')}
              />
            </div>
          </section>

          <section className="appointment-stats">
            <article className="appointment-stat-card">
              <div className="appointment-stat-icon blue">▣</div>
              <div>
                <span>{t('Total Appointments')}</span>
                <h2>{activeAppointments.length}</h2>
              </div>
            </article>

            <article className="appointment-stat-card">
              <div className="appointment-stat-icon green">✓</div>
              <div>
                <span>{t('Upcoming')}</span>
                <h2>{upcomingAppointments.length}</h2>
              </div>
            </article>

            <article className="appointment-stat-card">
              <div className="appointment-stat-icon purple">◷</div>
              <div>
                <span>{t('Previous Visits')}</span>
                <h2>{previousAppointments.length}</h2>
              </div>
            </article>

            <article className="appointment-stat-card">
              <div className="appointment-stat-icon orange">＋</div>
              <div>
                <span>{t('Available Doctors')}</span>
                <h2>{doctors.length}</h2>
              </div>
            </article>
          </section>

          <section className="appointment-content-grid">
            <article className="appointment-panel appointment-calendar-panel">
              <div className="appointment-panel-heading">
                <div>
                  <h2>{t('Appointment Calendar')}</h2>
                  <p>{t('Select a date to see your appointments.')}</p>
                </div>

                <div className="appointment-month-controls">
                  <button
                    type="button"
                    onClick={() => changeMonth(-1)}
                    aria-label={t('Previous month')}
                  >
                    ‹
                  </button>

                  <strong>{monthYear}</strong>

                  <button
                    type="button"
                    onClick={() => changeMonth(1)}
                    aria-label={t('Next month')}
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="appointment-calendar">
                {WEEKDAYS.map(day => (
                  <div className="appointment-weekday" key={day}>
                    {t(day)}
                  </div>
                ))}

                {calendarDays.map((day, index) => {
                  if (!day) {
                    return (
                      <div
                        className="appointment-calendar-empty"
                        key={`empty-${index}`}
                      />
                    )
                  }

                  const dateString = [
                    currentMonth.getFullYear(),
                    String(currentMonth.getMonth() + 1).padStart(2, '0'),
                    String(day).padStart(2, '0')
                  ].join('-')

                  const hasAppointment = activeAppointments.some(
                    appointment => appointment.date === dateString
                  )

                  return (
                    <button
                      type="button"
                      key={dateString}
                      className={[
                        'appointment-calendar-day',
                        selectedDate === dateString ? 'selected' : '',
                        getToday() === dateString ? 'today' : '',
                        hasAppointment ? 'has-appointment' : ''
                      ].join(' ')}
                      onClick={() => setSelectedDate(dateString)}
                    >
                      {day}
                      {hasAppointment && (
                        <span className="appointment-day-dot" />
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="appointment-selected-date">
                <h3>{fmtDate(selectedDate)}</h3>
                <span>
                  {selectedDayAppointments.length} {t('appointment(s)')}
                </span>
              </div>

              {selectedDayAppointments.length === 0 ? (
                <div className="appointment-empty-small">
                  <span>▦</span>
                  <p>{t('No appointments on this date.')}</p>
                </div>
              ) : (
                selectedDayAppointments.map(appointment => (
                  <div
                    className="appointment-day-item"
                    key={appointment.id}
                  >
                    <div className="appointment-day-time">
                      {fmtTime(appointment.time)}
                    </div>

                    <div className="appointment-day-info">
                      <strong>{t(appointment.doctor)}</strong>
                      <span>{t(appointment.service)}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => openEdit(appointment)}
                      aria-label={t('Edit appointment')}
                    >
                      ✎
                    </button>
                  </div>
                ))
              )}
            </article>

            <article className="appointment-panel appointment-doctors-panel">
              <div className="appointment-panel-heading">
                <div>
                  <h2>{t('Our Doctors')}</h2>
                  <p>{t('Choose a doctor for your next visit.')}</p>
                </div>
              </div>

              <div className="appointment-doctor-list">
                {doctors.slice(0, 4).map(doctor => (
                  <div className="appointment-doctor-card" key={doctor.id}>
                    <div className="appointment-doctor-avatar">
                      {initial(doctor.name)}
                    </div>

                    <div className="appointment-doctor-info">
                      <h3>{t(doctor.name)}</h3>
                      <p>{t(doctor.specialty)}</p>
                      <span>
                        {fmtTime(`${String(doctor.start).padStart(2, '0')}:00`)}
                        {' – '}
                        {fmtTime(`${String(doctor.end).padStart(2, '0')}:00`)}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="appointment-doctor-book"
                      onClick={() => {
                        setForm({
                          ...emptyForm,
                          doctorId: String(doctor.id),
                          service: doctor.specialty,
                          date:
                            selectedDate >= getToday()
                              ? selectedDate
                              : getToday()
                        })
                        setEditingId(null)
                        setShowModal(true)
                      }}
                    >
                      {t('Book')}
                    </button>
                  </div>
                ))}
              </div>

              <Link
                to="/finddoctor"
                className="appointment-view-doctors"
              >
                {t('Find More Doctors →')}
              </Link>
            </article>
          </section>

          <section className="appointment-panel appointment-list-panel">
            <div className="appointment-panel-heading appointment-list-heading">
              <div>
                <h2>{t('Upcoming Appointments')}</h2>
                <p>{t('Review and manage your scheduled visits.')}</p>
              </div>

              <button
                type="button"
                className="appointment-secondary-btn"
                onClick={openBooking}
              >
                + {t('New Appointment')}
              </button>
            </div>

            {filteredAppointments.length === 0 ? (
              <div className="appointment-empty-state">
                <div>▦</div>
                <h3>{t('No appointments found')}</h3>
                <p>{t('Your scheduled appointments will appear here.')}</p>
                <button
                  type="button"
                  className="appointment-primary-btn"
                  onClick={openBooking}
                >
                  {t('Book Your First Appointment')}
                </button>
              </div>
            ) : (
              <div className="appointment-table-wrapper">
                <table className="appointment-table">
                  <thead>
                    <tr>
                      <th>{t('Doctor')}</th>
                      <th>{t('Service')}</th>
                      <th>{t('Date')}</th>
                      <th>{t('Time')}</th>
                      <th>{t('Status')}</th>
                      <th>{t('Actions')}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredAppointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td>
                          <div className="appointment-table-doctor">
                            <div className="appointment-table-avatar">
                              {initial(appointment.doctor)}
                            </div>

                            <div>
                              <strong>{t(appointment.doctor)}</strong>
                              <span>{t(appointment.specialty)}</span>
                            </div>
                          </div>
                        </td>

                        <td>{t(appointment.service)}</td>
                        <td>{fmtDate(appointment.date)}</td>
                        <td>{fmtTime(appointment.time)}</td>

                        <td>
                          <span className="appointment-status upcoming">
                            {t('Upcoming')}
                          </span>
                        </td>

                        <td>
                          <div className="appointment-actions">
                            <button
                              type="button"
                              className="appointment-edit-btn"
                              onClick={() => openEdit(appointment)}
                            >
                              {t('Edit')}
                            </button>

                            <button
                              type="button"
                              className="appointment-cancel-btn"
                              onClick={() =>
                                cancelAppointment(appointment.id)
                              }
                            >
                              {t('Cancel')}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="appointment-panel appointment-previous-panel">
            <div className="appointment-panel-heading">
              <div>
                <h2>{t('Previous Appointments')}</h2>
                <p>{t('Your appointments scheduled for earlier dates.')}</p>
              </div>
            </div>

            {previousAppointments.length === 0 ? (
              <div className="appointment-empty-small">
                <span>◷</span>
                <p>{t('No previous appointments yet.')}</p>
              </div>
            ) : (
              <div className="appointment-previous-list">
                {previousAppointments.map(appointment => (
                  <article
                    className="appointment-previous-item"
                    key={appointment.id}
                  >
                    <div className="appointment-previous-icon">✓</div>

                    <div>
                      <h3>{t(appointment.doctor)}</h3>
                      <p>{t(appointment.service)}</p>
                      <span>
                        {fmtDate(appointment.date)} ·{' '}
                        {fmtTime(appointment.time)}
                      </span>
                    </div>

                    <span className="appointment-status previous">
                      {t('Previous')}
                    </span>
                  </article>
                ))}
              </div>
            )}
          </section>

          <footer className="appointment-footer">
            <p>{t('© 2026 MyPatientHUB. Your health matters.')}</p>
            <Link to="/finddoctor">{t('Find a Doctor')}</Link>
          </footer>
        </div>
      </main>

      {showModal && (
        <div
          className="appointment-modal-overlay"
          onMouseDown={event => {
            if (event.target === event.currentTarget) {
              closeModal()
            }
          }}
        >
          <section
            className="appointment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-modal-title"
          >
            <div className="appointment-modal-header">
              <div>
                <span className="appointment-eyebrow" translate="no">
                  MY PATIENTHUB
                </span>

                <h2 id="appointment-modal-title">
                  {editingId
                    ? t('Edit Appointment')
                    : t('Book an Appointment')}
                </h2>

                <p>{t('Fill in the details below to schedule your visit.')}</p>
              </div>

              <button
                type="button"
                className="appointment-modal-close"
                onClick={closeModal}
                aria-label={t('Close modal')}
              >
                ×
              </button>
            </div>

            <form onSubmit={saveAppointment}>
              <div className="appointment-form-group">
                <label htmlFor="doctorId">{t('Choose Doctor *')}</label>

                <select
                  id="doctorId"
                  name="doctorId"
                  value={form.doctorId}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">{t('Select a doctor')}</option>

                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {t(doctor.name)} — {t(doctor.specialty)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="appointment-form-group">
                <label htmlFor="service">{t('Medical Service *')}</label>

                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">{t('Select a service')}</option>

                  {services.map(service => (
                    <option value={service} key={service}>
                      {t(service)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="appointment-form-group">
                <label htmlFor="date">{t('Appointment Date *')}</label>

                <input
                  id="date"
                  type="date"
                  name="date"
                  min={getToday()}
                  value={form.date}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="appointment-form-group">
                <label>{t('Available Time Slots *')}</label>

                {!selectedDoctor ? (
                  <p className="appointment-slot-message">
                    {t('Select a doctor to view available times.')}
                  </p>
                ) : availableSlots.filter(slot => slot.available).length === 0 ? (
                  <p className="appointment-slot-message">
                    {t('No available slots on this date. Choose another date.')}
                  </p>
                ) : (
                  <div className="appointment-time-slots">
                    {availableSlots.map(slot => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        className={[
                          'appointment-time-slot',
                          form.time === slot.time ? 'selected' : '',
                          !slot.available ? 'unavailable' : ''
                        ].join(' ')}
                        onClick={() =>
                          setForm(previous => ({
                            ...previous,
                            time: slot.time
                          }))
                        }
                      >
                        {fmtTime(slot.time)}
                      </button>
                    ))}
                  </div>
                )}

                <input
                  type="text"
                  className="appointment-hidden-input"
                  value={form.time}
                  required
                  readOnly
                  aria-label={t('Selected appointment time')}
                  tabIndex={-1}
                />
              </div>

              <div className="appointment-form-group">
                <label htmlFor="notes">{t('Notes (Optional)')}</label>

                <textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleFormChange}
                  placeholder={t('Write any additional information...')}
                  rows="3"
                />
              </div>

              {selectedDoctor && form.date && form.time && (
                <div className="appointment-booking-summary">
                  <span>✓</span>

                  <div>
                    <strong>{t('Booking Summary')}</strong>
                    <p>{t(selectedDoctor.name)}</p>
                    <p>
                      {fmtDate(form.date)} · {fmtTime(form.time)}
                    </p>
                  </div>
                </div>
              )}

              <div className="appointment-modal-actions">
                <button
                  type="button"
                  className="appointment-modal-cancel"
                  onClick={closeModal}
                >
                  {t('Back')}
                </button>

                <button
                  type="submit"
                  className="appointment-primary-btn"
                >
                  {editingId
                    ? t('Save Changes')
                    : t('Confirm Appointment')}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

export default Appointment