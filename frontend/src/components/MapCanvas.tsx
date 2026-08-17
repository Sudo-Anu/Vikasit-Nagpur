import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { TrafficSensor, FloodSensor } from '../types';

interface MapCanvasProps {
    trafficSensors: TrafficSensor[];
    floodSensors: FloodSensor[];
    showTraffic: boolean;
    showFlood: boolean;
    sidebarOpen: boolean;
}

export const MapCanvas: React.FC<MapCanvasProps> = ({
    trafficSensors,
    floodSensors,
    showTraffic,
    showFlood,
    sidebarOpen
}) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<maplibregl.Marker[]>([]);

    useEffect(() => {
        if (!mapContainer.current || mapRef.current) return;

        const baseStyle: maplibregl.StyleSpecification = {
            version: 8,
            sources: {
                'openmaptiles': {
                    type: 'vector',
                    bounds: [78.90, 21.00, 79.30, 21.30],
                    tiles: []
                }
            },
            layers: [
                {
                    id: 'background',
                    type: 'background',
                    paint: { 'background-color': '#0F172A' } // Matches base secondary dark slate
                }
            ]
        };

        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: baseStyle,
            center: [79.0882, 21.1458], // Centered on Nagpur
            zoom: 12,
            minZoom: 10,
            maxZoom: 16,
            attributionControl: false
        });

        // Map controls positioned at bottom-right, adjusted dynamically via CSS based on sidebar state
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];

        if (showFlood) {
            floodSensors.forEach(sensor => {
                const el = document.createElement('div');
                el.className = `w-5 h-5 rounded-full border border-slate-950 flex items-center justify-center text-[10px] font-bold text-white shadow-lg ${sensor.status === 'CRITICAL' ? 'bg-red-600 animate-pulse' : sensor.status === 'WARNING' ? 'bg-amber-500' : 'bg-indigo-600'
                    }`;
                el.innerText = 'F';

                const marker = new maplibregl.Marker({ element: el })
                    .setLngLat([sensor.lng, sensor.lat])
                    .addTo(map);
                markersRef.current.push(marker);
            });
        }

        if (showTraffic) {
            trafficSensors.forEach(sensor => {
                const el = document.createElement('div');
                el.className = `w-5 h-5 rounded-full border border-slate-950 flex items-center justify-center text-[10px] font-bold text-white shadow-lg ${sensor.density === 'HIGH' ? 'bg-red-500' : sensor.density === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`;
                el.innerText = 'T';

                const marker = new maplibregl.Marker({ element: el })
                    .setLngLat([sensor.lng, sensor.lat])
                    .addTo(map);
                markersRef.current.push(marker);
            });
        }

    }, [trafficSensors, floodSensors, showTraffic, showFlood]);

    return <div ref={mapContainer} className={`w-full h-full absolute inset-0 z-0 ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} />;
};