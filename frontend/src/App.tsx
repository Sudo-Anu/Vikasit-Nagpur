import React, { useState, useEffect } from 'react';
import { MapCanvas } from './components/MapCanvas';
import { ControlPanel } from './components/ControlPanel';
import { AnalysisSidebar } from './components/AnalysisSidebar';
import {
    fetchCityState,
    fetchTrafficSensors,
    fetchFloodSensors,
    fetchRecommendations,
    triggerFloodSimulation
} from './services/api';
import { CityState, TrafficSensor, FloodSensor, Recommendation } from './types';

export const App: React.FC = () => {
    const [showTraffic, setShowTraffic] = useState<boolean>(true);
    const [showFlood, setShowFlood] = useState<boolean>(true);
    const [floodIntensity, setFloodIntensity] = useState<number>(0);

    const [cityState, setCityState] = useState<CityState>({
        timestamp: new Date().toISOString(),
        overallStatus: 'NORMAL',
        metrics: { activeTrafficSensors: 0, activeFloodSensors: 0, averageTrafficSpeed: 0, criticalRiskZones: 0 }
    });
    const [trafficSensors, setTrafficSensors] = useState<TrafficSensor[]>([]);
    const [floodSensors, setFloodSensors] = useState<FloodSensor[]>([]);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    // Background Data Synchronizer
    useEffect(() => {
        async function loadData() {
            const [state, traffic, water, recs] = await Promise.all([
                fetchCityState(),
                fetchTrafficSensors(),
                fetchFloodSensors(),
                fetchRecommendations()
            ]);
            setCityState(state);
            setTrafficSensors(traffic);
            setFloodSensors(water);
            setRecommendations(recs);
        }
        loadData();
        const interval = setInterval(loadData, 10000); // Poll every 10 seconds
        return () => clearInterval(interval);
    }, []);

    // Update System State dynamically when Rainfall slider is used
    useEffect(() => {
        async function simulate() {
            const sim = await triggerFloodSimulation(floodIntensity);
            if (sim.isActive) {
                setCityState(prev => ({
                    ...prev,
                    overallStatus: floodIntensity >= 4 ? 'CRITICAL' : 'ALERT',
                    metrics: {
                        ...prev.metrics,
                        criticalRiskZones: sim.affectedWards.length
                    }
                }));
            } else {
                const normalState = await fetchCityState();
                setCityState(normalState);
            }
        }
        simulate();
    }, [floodIntensity]);

    return (
        <div className="w-full h-full relative flex overflow-hidden bg-slate-950 font-sans">

            {/* Immersive Map Background Layer */}
            <div className="w-full h-full absolute inset-0 z-0">
                <MapCanvas
                    trafficSensors={trafficSensors}
                    floodSensors={floodSensors}
                    showTraffic={showTraffic}
                    showFlood={showFlood}
                    sidebarOpen={sidebarOpen}
                />
            </div>

            {/* Floating Interactive Controls Layer */}
            <div className="absolute inset-0 flex justify-between p-4 pointer-events-none z-10">
                <ControlPanel
                    showTraffic={showTraffic}
                    setShowTraffic={setShowTraffic}
                    showFlood={showFlood}
                    setShowFlood={setShowFlood}
                    floodIntensity={floodIntensity}
                    setFloodIntensity={setFloodIntensity}
                />

                <AnalysisSidebar
                    cityState={cityState}
                    recommendations={recommendations}
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
            </div>

        </div>
    );
};