export interface CityState {
    timestamp: string;
    overallStatus: 'NORMAL' | 'ALERT' | 'CRITICAL';
    metrics: {
        activeTrafficSensors: number;
        activeFloodSensors: number;
        averageTrafficSpeed: number;
        criticalRiskZones: number;
    };
}

export interface TrafficSensor {
    id: string;
    name: string;
    lat: number;
    lng: number;
    speed: number;
    density: 'LOW' | 'MEDIUM' | 'HIGH';
    status: 'ACTIVE' | 'INACTIVE';
}

export interface FloodSensor {
    id: string;
    name: string;
    lat: number;
    lng: number;
    waterLevel: number;
    threshold: number;
    status: 'NORMAL' | 'WARNING' | 'CRITICAL';
}

export interface Recommendation {
    id: string;
    category: 'TRAFFIC' | 'FLOOD' | 'INFRASTRUCTURE';
    title: string;
    description: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    actionableStep: string;
}

export interface SimulationState {
    isActive: boolean;
    intensity: number;
    affectedWards: string[];
}