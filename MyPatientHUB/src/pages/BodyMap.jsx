 import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import HumanBody from '../components/HumanBody3D'
import doctor1 from '../assets/doctar 1.jpeg'
import doctor2 from '../assets/doctar2.jpeg'
import doctor3 from '../assets/doctar3.jpeg'
import doctor4 from '../assets/doctar4.jpeg'
import doctor5 from '../assets/finddoctar5.jpeg'
import avatar from '../assets/avatar 1.jpeg'
import './BodyMap.css'


// id ها باید با doctors در Appointment.jsx یکی باشند
const DOCTORS = {
  1: { id: 1, name: 'Dr. Mustafa', specialty: 'Cardiology', start: 9, end: 13, image: doctor1 },
  2: { id: 2, name: 'Dr. Khirullah', specialty: 'General Consultation', start: 8, end: 12, image: doctor2 },
  3: { id: 3, name: 'Dr. Bilal', specialty: 'Dental Care', start: 10, end: 14, image: doctor3 },
  4: { id: 4, name: 'Dr. Madiha', specialty: 'Dermatology', start: 9, end: 15, image: doctor5 },
  5: { id: 5, name: 'Dr. Shamsir', specialty: 'Eye Checkup', start: 8, end: 13, image: avatar },
  6: { id: 6, name: 'Dr. Ali', specialty: 'General Consultation', start: 14, end: 18, image: doctor4 },
}

const PARTS = [
  { key: 'head', label: 'Head', emoji: '🧠', color: '#e53935', doctors: [2, 6] },
  { key: 'eyes', label: 'Eyes', emoji: '👁️', color: '#1e88e5', doctors: [5] },
  { key: 'teeth', label: 'Teeth', emoji: '🦷', color: '#ffffff', ring: '#90a4ae', doctors: [3] },
  { key: 'chest', label: 'Chest', emoji: '❤️', color: '#d81b60', doctors: [1], urgent: true },
  { key: 'stomach', label: 'Stomach', emoji: '🤢', color: '#fb8c00', doctors: [2, 6] },
  { key: 'skin', label: 'Skin', emoji: '✋', color: '#ff8a65', doctors: [4] },
  { key: 'legs', label: 'Legs', emoji: '🦶', color: '#f48fb1', doctors: [6] },
]

function BodyMap() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const resultRef = useRef(null)

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selected, setSelected] = useState(null)

  const part = PARTS.find((item) => item.key === selected)

  // در موبایل، بعد از انتخاب، صفحه به داکترها برود
  useEffect(() => {
    if (!selected) return

    if (window.matchMedia('(max-width: 900px)').matches) {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [selected])

  return (
    <div className={`bm-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main bm-main">

        <Header
          title="Body Map"
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />

        <section className="content bm-content">

          <div className="bm-heading">
            <h2>{t('Where does it hurt?')}</h2>
            <p>{t('Tap the part of the body that hurts.')}</p>
          </div>

          <button
            type="button"
            className="bm-sos"
            onClick={() => navigate('/findclinic')}
          >
            <span>🚑</span>
            <strong>{t('Emergency')}</strong>
            <i className="fa-solid fa-arrow-right"></i>
          </button>

          <div className="bm-two-col">

            {/* طرف اول: عکس بزرگ + زوم زیرش */}

            <div className="bm-anatomy">
              <HumanBody selected={selected} onSelect={setSelected} />
            </div>

            {/* طرف دوم: دایره‌ها + داکترها */}

            <div className="bm-side">

              <div className="bm-parts">
                {PARTS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`bm-part ${selected === item.key ? 'on' : ''}`}
                    style={{
                      '--c': item.color,
                      '--ring': item.ring || item.color,
                    }}
                    onClick={() => setSelected(item.key)}
                    aria-label={t(item.label)}
                    aria-pressed={selected === item.key}
                  >
                    <span className="bm-part-circle">{item.emoji}</span>
                    <span className="bm-part-label">{t(item.label)}</span>
                  </button>
                ))}
              </div>

              <div className="bm-result" ref={resultRef}>

                {!part ? (
                  <p className="bm-hint">
                    {t('Tap a part of the body to begin 👆')}
                  </p>
                ) : (
                  <>
                    <div
                      className="bm-selected"
                      style={{ '--c': part.color, '--ring': part.ring || part.color }}
                    >
                      <span className="bm-selected-circle">{part.emoji}</span>
                      <h2>{t(part.label)}</h2>
                    </div>

                    {part.urgent && (
                      <div className="bm-urgent">
                        <span className="bm-urgent-icon">🚑</span>
                        {t('Emergency: if the pain is severe or you cannot breathe, go to the nearest hospital immediately.')}
                      </div>
                    )}

                    <div className="bm-doctors">
                      {part.doctors.map((id) => {
                        const doctor = DOCTORS[id]

                        return (
                          <article
                            className="bm-doctor"
                            key={doctor.id}
                            style={{ '--c': part.color, '--ring': part.ring || part.color }}
                          >
                            <div className="bm-photo">
                              <img src={doctor.image} alt={t(doctor.name)} />
                              <span className="bm-badge">{part.emoji}</span>
                            </div>

                            <h3>{t(doctor.name)}</h3>
                            <p>{t(doctor.specialty)}</p>

                            <span className="bm-hours" dir="ltr">
                              <i className="fa-regular fa-clock"></i>
                              {doctor.start}:00 – {doctor.end}:00
                            </span>

                            <button
                              type="button"
                              className="bm-book"
                              onClick={() =>
                                navigate('/appointments', {
                                  state: { doctorId: doctor.id },
                                })
                              }
                            >
                              <i className="fa-solid fa-calendar-check"></i>
                              {t('Book')}
                            </button>
                          </article>
                        )
                      })}
                    </div>

                    {part.urgent && (
                      <button
                        type="button"
                        className="bm-hospital"
                        onClick={() => navigate('/findclinic')}
                      >
                        <i className="fa-solid fa-hospital"></i>
                        {t('Find Clinic')}
                      </button>
                    )}
                  </>
                )}

                <p className="bm-disclaimer">
                  {t("This is only general guidance and does not replace a doctor's examination.")}
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  )
}

export default BodyMap