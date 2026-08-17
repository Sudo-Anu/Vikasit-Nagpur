import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers from the API modules
# Assuming these modules exist and expose an APIRouter instance named `router`
from app.api.dashboard import router as dashboard_router
from app.api.traffic import router as traffic_router
from app.api.environment import router as environment_router
from app.api.infrastructure import router as infrastructure_router
from app.api.simulation import router as simulation_router

# Initialize the FastAPI application
app = FastAPI(
    title="Nagpur Digital Twin Core API",
    description="Offline-first backend for the Nagpur Digital Twin",
    version="1.0.0"
)

# Configure CORS Middleware
# Allowing all origins, methods, and headers to support the local React/Vite frontend (port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register APIRouters under the '/api/v1' prefix
app.include_router(dashboard_router, prefix="/api/v1/dashboard", tags=["Dashboard"])
app.include_router(traffic_router, prefix="/api/v1/traffic", tags=["Traffic"])
app.include_router(environment_router, prefix="/api/v1/environment", tags=["Environment"])
app.include_router(infrastructure_router, prefix="/api/v1/infrastructure", tags=["Infrastructure"])
app.include_router(simulation_router, prefix="/api/v1/simulation", tags=["Simulation"])

# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    return {
        "status": "ONLINE",
        "system": "Nagpur Digital Twin Core",
        "environment": "LOCAL (100% OFFLINE)"
    }

if __name__ == "__main__":
    # Allow running the file directly with `python app/main.py`
    # Defaulting to port 8000 for FastAPI
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
