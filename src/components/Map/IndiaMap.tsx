'use client';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { WarehouseData } from '@/app/warehouses/page';

export default function IndiaMap({ 
  warehouses, 
  onWarehouseClick, 
  getUtilizationColor 
}: { 
  warehouses: WarehouseData[], 
  onWarehouseClick: (w: WarehouseData) => void,
  getUtilizationColor: (percent: number) => string
}) {
  return (
    <MapContainer 
      center={[20.5937, 78.9629]} 
      zoom={5} 
      style={{ height: '100%', width: '100%', borderRadius: '12px' }}
      minZoom={4}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {warehouses.map((w) => {
        const util = Math.round((w.currentStorage / w.capacityItems) * 100);
        return (
          <Marker 
            key={w.id} 
            position={[w.lat, w.lng]}
            eventHandlers={{
              click: () => onWarehouseClick(w),
            }}
          >
            <Tooltip direction="top" offset={[0, -20]} opacity={1}>
              <div style={{ textAlign: 'left', minWidth: '140px' }}>
                <div style={{ fontWeight: 'bold' }}>{w.name}</div>
                <div style={{ fontSize: '11px', color: '#666' }}>{w.city}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '4px' }}>
                  <span>Capacity:</span>
                  <span style={{ color: getUtilizationColor(util), fontWeight: 'bold' }}>{util}%</span>
                </div>
              </div>
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
