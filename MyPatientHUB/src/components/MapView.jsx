import { useEffect, useRef } from 'react'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

function MapView({ id, className, markers }) {
  const mapRef = useRef(null)

  useEffect(() => {
    const map = L.map(mapRef.current).setView([34.5553, 69.2075], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    markers.forEach((m) => L.marker(m.pos).addTo(map).bindPopup(m.text))

    const timer = setTimeout(() => map.invalidateSize(), 500)

    return () => {
      clearTimeout(timer)
      map.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div id={id} className={className} ref={mapRef}></div>
}

export default MapView