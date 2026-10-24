import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'


L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

function MapView({
  id,
  className,
  markers = [],
  selectedPosition,
  mapStyle = 'map',
}) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markersLayer = useRef(null)
  const tileLayer = useRef(null)

  // Create map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    const map = L.map(mapRef.current).setView(
      [34.5553, 69.2075],
      12
    )

    mapInstance.current = map

    markersLayer.current = L.layerGroup().addTo(map)

    return () => {
      map.remove()

      mapInstance.current = null
      markersLayer.current = null
      tileLayer.current = null
    }
  }, [])

  // Map and satellite layers
  useEffect(() => {
    const map = mapInstance.current

    if (!map) return

    if (tileLayer.current) {
      map.removeLayer(tileLayer.current)
    }

    const tileUrl =
      mapStyle === 'satellite'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    const attribution =
      mapStyle === 'satellite'
        ? 'Tiles &copy; Esri'
        : '&copy; OpenStreetMap contributors'

    tileLayer.current = L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution,
    }).addTo(map)
  }, [mapStyle])

  // Custom hospital marker
  useEffect(() => {
    const map = mapInstance.current
    const layer = markersLayer.current

    if (!map || !layer) return

    layer.clearLayers()

    markers.forEach((clinic) => {
      if (
        !Array.isArray(clinic.pos) ||
        clinic.pos.length !== 2
      ) {
        return
      }

      const icon = L.divIcon({
        className: 'clinic-map-marker-wrapper',
        html: `
          <div class="clinic-map-marker">
            <div class="clinic-map-marker-icon">
              <span>+</span>
            </div>
            <span class="clinic-map-marker-dot"></span>
          </div>
        `,
        iconSize: [50, 60],
        iconAnchor: [25, 55],
        popupAnchor: [0, -55],
      })

      const marker = L.marker(clinic.pos, { icon }).addTo(layer)

      const popup = document.createElement('div')
      popup.className = 'clinic-map-popup'

      const title = document.createElement('h3')
      title.textContent =
        clinic.name || clinic.text || 'Medical Center'

      popup.appendChild(title)

      if (clinic.address) {
        const address = document.createElement('p')
        address.textContent = clinic.address
        popup.appendChild(address)
      }

      marker.bindPopup(popup)

      if (
        selectedPosition &&
        clinic.pos[0] === selectedPosition[0] &&
        clinic.pos[1] === selectedPosition[1]
      ) {
        marker.openPopup()
      }
    })
  }, [markers, selectedPosition])

  // Zoom to selected clinic
  useEffect(() => {
    const map = mapInstance.current

    if (!map || !selectedPosition) return

    map.flyTo(selectedPosition, 15, {
      duration: 1.2,
    })
  }, [selectedPosition])

  return (
    <div
      id={id}
      className={className}
      ref={mapRef}
    />
  )
}

export default MapView