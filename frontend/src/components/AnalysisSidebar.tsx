import React from 'react';
import { CityState, Recommendation } from '../types';
import { Activity, ShieldCheck, ChevronRight, AlertOctagon } from 'lucide-react';

interface AnalysisSidebarProps {
    cityState: CityState;
    recommendations: Recommendation[];
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

export const AnalysisSidebar: React.FC<AnalysisSidebarProps> = ({
    cityState,
    recommendations,
    isOpen,
    setIsOpen
}) => {
    return (
        <div className={`h-full stitch-panel flex flex-col transition-all duration-300 z-10 pointer-events-auto relative ${isOpen ? 'w-96 p-5' : 'w-12 items-center py-4'}`}>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-1/2 -left-3 bg-slate-950 border border-slate-800 rounded-full p-1 shadow hover:bg-slate-800 transition z-20 pointer-events-auto"
            >
                <ChevronRight className={`w-3.5 h-3.5 text-slate-300 transform transition ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {!isOpen ? (
                <div className="flex flex-col gap-6 items-center">
                    <Activity className="w-4 h-4 text-brand-primary" />
                    <AlertOctagon className="w-4 h-4 text-brand-accent" />
                </div>
            ) : (
                <div className="flex flex-col gap-5 h-full overflow-y-auto pr-1">
                    {/* Health Stats */}
                    <div>
                        <h2 className="text-[10px] font-bold font-mono text-brand-neutral uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-brand-primary" /> City Health Monitor
                        </h2>
                        <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-lg flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-medium text-slate-400">Risk Assessment Index</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${cityState.overallStatus === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-800' :
                                    cityState.overallStatus === 'ALERT' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                                        'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                    }`}>
                                    {cityState.overallStatus}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-1">
                                <div className="bg-slate-950 p-2 border border-slate-800/80 rounded">
                                    <p className="text-[9px] font-mono text-brand-neutral uppercase">Avg Speeds</p>
                                    <p className="text-base font-bold text-slate-200 mt-0.5">{cityState.metrics.averageTrafficSpeed} <span className="text-[10px] font-normal text-slate-500">km/h</span></p>
                                </div>
                                <div className="bg-slate-950 p-2 border border-slate-800/80 rounded">
                                    <p className="text-[9px] font-mono text-brand-neutral uppercase">Risk Basins</p>
                                    <p className="text-base font-bold text-slate-200 mt-0.5">{cityState.metrics.criticalRiskZones}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Recommendations */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <h2 className="text-[10px] font-bold font-mono text-brand-neutral uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <AlertOctagon className="w-3.5 h-3.5 text-brand-accent" /> Mitigations Console
                        </h2>

                        <div className="flex-1 overflow-y-auto flex flex-col gap-3">
                            {recommendations.length === 0 ? (
                                <div className="text-center py-8 text-[11px] text-slate-500 bg-slate-950/30 rounded-lg border border-dashed border-slate-800">
                                    Municipal networks functioning normally.
                                </div>
                            ) : (
                                recommendations.map(rec => (
                                    <div key={rec.id} className="p-3 bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-lg transition flex flex-col gap-1.5">
                                        <div className="flex justify-between items-start gap-1">
                                            <span className="text-xs font-bold text-slate-200 leading-tight">{rec.title}</span>
                                            <span className={`text-[8px] font-bold font-mono px-1 py-0.5 rounded shrink-0 ${rec.priority === 'HIGH' ? 'bg-red-950 text-red-400' : 'bg-amber-950 text-amber-400'
                                                }`}>
                                                {rec.priority}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 leading-relaxed">{rec.description}</p>
                                        <div className="bg-slate-950 p-2.5 rounded border border-slate-900 flex items-start gap-1.5 mt-0.5">
                                            <ShieldCheck className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-[8px] font-bold font-mono text-brand-neutral uppercase tracking-wider">Remedial Order</p>
                                                <p className="text-[10px] text-slate-300 font-sans mt-0.5">{rec.actionableStep}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Core Status Block */}
                    <div className="text-center text-[9px] font-mono text-brand-neutral border-t border-slate-800 pt-3 flex justify-between">
                        <span>D.T. CORE ACTIVE</span>
                        <span>{new Date(cityState.timestamp).toLocaleTimeString()}</span>
                    </div>
                </div>
            )}
        </div>
    );
};