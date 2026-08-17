import React from 'react';
import { Layers, HelpCircle, Sliders } from 'lucide-react';

interface ControlPanelProps {
    showTraffic: boolean;
    setShowTraffic: (val: boolean) => void;
    showFlood: boolean;
    setShowFlood: (val: boolean) => void;
    floodIntensity: number;
    setFloodIntensity: (val: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
    showTraffic,
    setShowTraffic,
    showFlood,
    setShowFlood,
    floodIntensity,
    setFloodIntensity
}) => {
    return (
        <div className="w-80 stitch-panel p-5 flex flex-col gap-5 z-10 pointer-events-auto">
            <div>
                <h1 className="text-base font-bold text-slate-100 font-sans tracking-tight flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-accent block"></span>
                    Nagpur Digital Twin
                </h1>
                <p className="text-[10px] font-mono text-brand-neutral uppercase mt-0.5 tracking-wider">GIS Operations Dashboard</p>
            </div>

            <hr className="border-slate-800" />

            {/* Layer Selectors */}
            <div className="flex flex-col gap-2.5">
                <h2 className="text-[10px] font-bold font-mono text-brand-neutral uppercase tracking-widest flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-brand-primary" /> Map Toggles
                </h2>

                <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-800/40 transition">
                    <span className="text-xs font-medium text-slate-300">Traffic Stream Layers</span>
                    <input
                        type="checkbox"
                        checked={showTraffic}
                        onChange={(e) => setShowTraffic(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-brand-primary focus:ring-brand-primary h-4 w-4"
                    />
                </label>

                <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-800/40 transition">
                    <span className="text-xs font-medium text-slate-300">Hydrological Risk Overlays</span>
                    <input
                        type="checkbox"
                        checked={showFlood}
                        onChange={(e) => setShowFlood(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-brand-primary focus:ring-brand-primary h-4 w-4"
                    />
                </label>
            </div>

            <hr className="border-slate-800" />

            {/* Simulation Controllers */}
            <div className="flex flex-col gap-2.5">
                <h2 className="text-[10px] font-bold font-mono text-brand-neutral uppercase tracking-widest flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-brand-accent" /> Environmental Driver
                </h2>
                <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                    <div className="flex justify-between text-[11px] mb-1.5">
                        <span className="text-slate-400">Rainfall Load</span>
                        <span className="font-bold text-brand-accent">{floodIntensity * 20} mm/h</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        value={floodIntensity}
                        onChange={(e) => setFloodIntensity(parseInt(e.target.value))}
                        className="w-full accent-brand-accent h-1 bg-slate-800 rounded-lg cursor-pointer"
                    />
                </div>
            </div>

            <hr className="border-slate-800" />

            {/* Legend Block */}
            <div className="flex flex-col gap-2">
                <h2 className="text-[10px] font-bold font-mono text-brand-neutral uppercase tracking-widest flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" /> Status Keys
                </h2>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 p-1">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-600 block"></span>
                        <span>Critical Water</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500 block"></span>
                        <span>Warning State</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500 block"></span>
                        <span>Heavy Congestion</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 block"></span>
                        <span>Smooth Flow</span>
                    </div>
                </div>
            </div>
        </div>
    );
};