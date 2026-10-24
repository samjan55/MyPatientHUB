import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <select
      value={i18n.language}
      onChange={e => i18n.changeLanguage(e.target.value)}
      style={{
        padding: '8px 10px',
        border: '1px solid #dceaf5',
        borderRadius: '8px',
        background: '#fff',
        color: '#07528a',
        cursor: 'pointer',
      }}
    >
      <option value="en">English</option>
      <option value="fa">دری</option>
      <option value="ps">پښتو</option>
    </select>
  )
}