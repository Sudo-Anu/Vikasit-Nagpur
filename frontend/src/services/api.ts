import { CityState, TrafficSensor, FloodSensor, Recommendation, SimulationState } from '../types';

const BASE_URL = 'http://localhost:8000/api/v1';

const MOCK_CITY_STATE: CityState = {
    timestamp: new Date().toISOString(),
    overallStatus: 'NORMAL',
    metrics: {
        activeTrafficSensors: 42,
        activeFloodSensors: 18,
        averageTrafficSpeed: 34,
        criticalRiskZones: 0,
    }
};

const MOCK_TRAFFIC: TrafficSensor[] = [
    { id: 't1', name: 'Sitabuldi Interchange', lat: 21.1458, lng: 79.0882, speed: 12, density: 'HIGH', status: 'ACTIVE' },
    { id: 't2', name: 'Wardha Road - Airport', lat: 21.0922, lng: 79.0625, speed: 45, density: 'LOW', status: 'ACTIVE' },
    { id: 't3', name: 'Hingna Road T-Point', lat: 21.1255, lng: 79.0220, speed: 28, density: 'MEDIUM', status: 'ACTIVE' },
];

const MOCK_FLOOD: FloodSensor[] = [
    { id: 'f1', name: 'Pili River Outlet', lat: 21.1850, lng: 79.1250, waterLevel: 1.2, threshold: 3.5, status: 'NORMAL' },
    { id: 'f2', name: 'Ambazari Lake Overflow', lat: 21.1300, lng: 79.0400, waterLevel: 0.8, threshold: 2.0, status: 'NORMAL' },
];

const MOCK_RECOMMENDATIONS: Recommendation[] = [
    {
        id: 'r1',
        category: 'TRAFFIC',
        title: 'Congestion at Sitabuldi',
        description: 'Heavy traffic buildup detected at central interchange.',
        priority: 'MEDIUM',
        actionableStep: 'Reroute incoming vehicles from Wardha Road through alternative surface arterials.'
    }
];

export async function fetchCityState(): Promise<CityState> {
    try {
        const res = await fetch(`${BASE_URL}/city-state`);
        if (!res.ok) throw new Error();
        return await res.json();
    } catch {
        return MOCK_CITY_STATE;
    }
}

export async function fetchTrafficSensors(): Promise<TrafficSensor[]> {
    try {
        const res = await fetch(`${BASE_URL}/traffic`);
        if (!res.ok) throw new Error();
        return await res.json();
    } catch {
        return MOCK_TRAFFIC;
    }
}

export async function fetchFloodSensors(): Promise<FloodSensor[]> {
    try {
        const res = await fetch(`${BASE_URL}/flood`);
        if (!res.ok) throw new Error();
        return await res.json();
    } catch {
        return MOCK_FLOOD;
    }
}

export async function fetchRecommendations(): Promise<Recommendation[]> {
    try {
        const res = await fetch(`${BASE_URL}/recommendations`);
        if (!res.ok) throw new Error();
        return await res.json();
    } catch {
        return MOCK_RECOMMENDATIONS;
    }
}

export async function triggerFloodSimulation(intensity: number): Promise<SimulationState> {
    try {
        const res = await fetch(`${BASE_URL}/simulation/flood`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ intensity })
        });
        if (!res.ok) throw new Error();
        return await res.json();
    } catch {
        return {
            isActive: intensity > 0,
            intensity,
            affectedWards: intensity >= 4 ? ['Ward 12', 'Ward 14'] : intensity >= 2 ? ['Ward 12'] : []
        };
    }
}