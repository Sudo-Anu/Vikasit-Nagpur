Vikasit Nagpur/                      
│
├── .vscode/
│   └── settings.json
│
├── frontend/                      
│   ├── public/
│   │   └── data/
│   │       └── nagpur_base.geojson  
│   │
│   ├── src/
│   │   ├── main.tsx                 
│   │   ├── App.tsx                  
│   │   ├── index.css               
│   │   │
│   │   ├── types/
│   │   │   └── index.ts            
│   │   │
│   │   ├── services/
│   │   │   └── api.ts             
│   │   │
│   │   └── components/
│   │       ├── MapCanvas.tsx        
│   │       ├── ControlPanel.tsx     
│   │       └── AnalysisSidebar.tsx 
│   │
│   ├── download_nagpur_map.py
│   ├── index.html                   
│   ├── package.json               
│   ├── tailwind.config.js           
│   ├── postcss.config.js         
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
└── backend/                        
    ├── requirements.txt           
    │
    └── app/
        ├── main.py                  
        │
        ├── api/                     
        │   ├── dashboard.py       
        │   ├── traffic.py          
        │   ├── environment.py      
        │   ├── infrastructure.py   
        │   └── simulation.py       
        │
        ├── core/                   
        │   ├── digital_twin.py     
        │   ├── simulation.py       
        │   └── recommendations.py   
        │
        ├── models/                
        ├── schemas/                 
        │   ├── telemetry.py         
        │   └── simulation.py      
        │
        ├── services/               
        │   ├── traffic_service.py  
        │   ├── environment_service.py 
        │   ├── flood_service.py    
        │   └── data_service.py     
        │
        ├── database/                
        └── data/                    