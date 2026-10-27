import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import  humanbody from '../assets/human-anatomy.jpeg'

// x و y مرکز نقطه، همه به درصد عکس
const BODY_PARTS = [
  { id: 'head', key: 'head', label: 'Head', x: 50, y: 9, width: 28, height: 13 },
  { id: 'eyes', key: 'eyes', label: 'Eyes', x: 50, y: 13, width: 18, height: 5 },
  { id: 'teeth', key: 'teeth', label: 'Teeth', x: 50, y: 17, width: 15, height: 5 },
  { id: 'chest', key: 'chest', label: 'Chest', x: 50, y: 32, width: 42, height: 17 },
  { id: 'stomach', key: 'stomach', label: 'Stomach', x: 50, y: 49, width: 36, height: 16 },
  { id: 'skin-left', key: 'skin', label: 'Skin', x: 23, y: 48, width: 17, height: 24 },
  { id: 'skin-right', key: 'skin', label: 'Skin', x: 77, y: 48, width: 17, height: 24 },
  { id: 'legs', key: 'legs', label: 'Legs', x: 50, y: 79, width: 42, height: 34 },
]

// z = چند برابر بزرگ شود
const ZOOM = {
  head: { x: 50, y: 9, z: 3 },
  eyes: { x: 50, y: 13, z: 5 },
  teeth: { x: 50, y: 17, z: 5 },
  chest: { x: 50, y: 32, z: 2.6 },
  stomach: { x: 50, y: 49, z: 2.8 },
  skin: { x: 23, y: 48, z: 2.8 },
  legs: { x: 50, y: 79, z: 2 },
}


const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

// ratio = ارتفاع عکس ÷ عرض عکس ؛ پنجره زوم مربع است
function zoomTransform({ x, y, z }, ratio) {
  const tx = clamp((0.5 - (x / 100) * z) * 100, (1 - z) * 100, 0)
  const ty = clamp(
    (1 / (2 * ratio) - (y / 100) * z) * 100,
    Math.min(1 / ratio - z, 0) * 100,
    0
  )

  return `translate(${tx}%, ${ty}%) scale(${z})`
}

export default function HumanBody3D({ selected, onSelect }) {
  const { t } = useTranslation()
  const [ratio, setRatio] = useState(2)

  const part = BODY_PARTS.find((item) => item.key === selected)

  return (
    <div className="bm-anatomy-viewer">

      {/* عکس اصلی: همیشه کامل */}

      <div className="bm-anatomy-card">
        <div className="bm-anatomy-image">
          <img
            src={humanbody}
            alt={t('Body Map')}
            onLoad={(event) =>
              setRatio(event.target.naturalHeight / event.target.naturalWidth)
            }
          />

          {BODY_PARTS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`bm-body-hotspot ${
                selected === item.key ? 'active' : ''
              }`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: `${item.width}%`,
                height: `${item.height}%`,
              }}
              onClick={() => onSelect(item.key)}
              aria-label={t(item.label)}
              aria-pressed={selected === item.key}
              title={t(item.label)}
            >
              <span className="bm-pin"></span>
            </button>
          ))}
        </div>

        <div className="bm-anatomy-footer">
          <span>
            {part
              ? `${t('Selected')}: ${t(part.label)}`
              : t('Click a body part')}
          </span>

          {selected && (
            <button type="button" onClick={() => onSelect(null)}>
              {t('Reset')}
            </button>
          )}
        </div>
      </div>

      {/* پنجره زوم: زیر عکس */}

      <div className="bm-zoom-card">
        {part ? (
          <>
            <div className="bm-zoom-heading">
              <span>⌕</span>
              <strong>{t(part.label)} — {t('Zoomed')}</strong>
            </div>

            <div className="bm-zoom-window">
              <div
                className="bm-zoom-stage"
                style={{ transform: zoomTransform(ZOOM[selected], ratio) }}
              >
                <img src={humanbody} alt={t(part.label)} />
              </div>
            </div>
          </>
        ) : (
          <div className="bm-zoom-empty">
            <span>🔎</span>
            <h3>{t('Explore the human body')}</h3>
            <p>{t('Select a body part to view it here.')}</p>
          </div>
        )}
      </div>

    </div>
  )
}