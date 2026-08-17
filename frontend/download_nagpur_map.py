import urllib.request
import json
import os

def download_nagpur_geojson():
    print("Connecting to OpenStreetMap Overpass API to fetch real Nagpur coordinates...")
    
    # Bounding box covering Nagpur Metropolitan Area (South, West, North, East)
    bbox = "21.05,79.00,21.22,79.18"
    
    # Overpass QL query to get primary/secondary highways, rivers, and waterbodies
    query = f"""
    [out:json][timeout:90];
    (
      way["highway"~"primary|secondary|motorway|trunk"]({bbox});
      way["natural"="water"]({bbox});
      way["waterway"~"river|canal"]({bbox});
    );
    out body;
    >;
    out skel qt;
    """
    
    url = "https://overpass-api.de/api/interpreter"
    data = urllib.parse.urlencode({'data': query}).encode('utf-8')
    
    try:
        req = urllib.request.Request(url, data=data, headers={'User-Agent': 'NagpurDigitalTwin/1.0'})
        with urllib.request.urlopen(req) as response:
            osm_data = json.loads(response.read().decode('utf-8'))
    except Exception as e:
        print(f"Error downloading map data: {e}")
        return

    print("Processing OpenStreetMap data into a clean, offline GeoJSON...")
    
    # Parse nodes to map their IDs to coordinates
    nodes = {}
    for element in osm_data.get('elements', []):
        if element['type'] == 'node':
            nodes[element['id']] = (element['lon'], element['lat'])
            
    # Compile ways into GeoJSON Features
    features = []
    for element in osm_data.get('elements', []):
        if element['type'] == 'way':
            node_ids = element.get('nodes', [])
            coords = [nodes[nid] for nid in node_ids if nid in nodes]
            
            if len(coords) < 2:
                continue
                
            tags = element.get('tags', {})
            feature_type = "highway"
            name = tags.get('name', 'Unnamed Road')
            
            if 'natural' in tags and tags['natural'] == 'water':
                feature_type = "waterbody"
                name = tags.get('name', 'Waterbody')
            elif 'waterway' in tags:
                feature_type = "waterway"
                name = tags.get('name', 'River/Drainage')

            # Build standard GeoJSON structure
            feature = {
                "type": "Feature",
                "properties": {
                    "name": name,
                    "type": feature_type
                },
                "geometry": {
                    "type": "Polygon" if feature_type == "waterbody" else "LineString",
                    "coordinates": [coords] if feature_type == "waterbody" else coords
                }
            }
            features.append(feature)

    geojson = {
        "type": "FeatureCollection",
        "features": features
    }

    # Ensure target output directory exists inside your frontend
    output_path = os.path.join("frontend", "public", "data", "nagpur_base.geojson")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(geojson, f, indent=2)
        
    print(f"Success! Real map of Nagpur saved to: {output_path}")
    print(f"Extracted {len(features)} real street and river features.")

if __name__ == "__main__":
    download_nagpur_geojson()