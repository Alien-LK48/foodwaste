import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, Marker, TileLayer, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

const markerIcon = new L.Icon({
    iconUrl: "/marker.png",
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46]
});

export default function Leaflet() {
    const center = [23.8103, 90.4125];
    const zoom = 15;
    const mapRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(center);
    const [userPosition, setUserPosition] = useState(null);
    const [distance, setDistance] = useState(null);
    const [route, setRoute] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserPosition([latitude, longitude]);
            },
            (error) => console.error("Error fetching location: ", error),
            { enableHighAccuracy: true }
        );
    }, []);

    const goToMarker = () => {
        if (mapRef.current) {
            mapRef.current.setView(center, zoom);
        }
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.length > 2) {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=BD`);
            const data = await response.json();
            setSuggestions(data);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectLocation = async (lat, lon) => {
        setSelectedPosition([lat, lon]);
        if (mapRef.current) {
            mapRef.current.setView([lat, lon], zoom);
        }
        setSuggestions([]);
        setSearchQuery("");
        if (userPosition) {
            const response = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${userPosition[1]},${userPosition[0]};${lon},${lat}?overview=full&geometries=geojson`
            );
            const data = await response.json();
            if (data.routes.length > 0) {
                setRoute(data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]));
                setDistance((data.routes[0].distance / 1000).toFixed(2));
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen space-y-4 relative">
            <div className="relative w-[400px] z-50">
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg shadow-sm"
                    placeholder="Search location in Bangladesh..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {suggestions.length > 0 && (
                    <ul className="absolute bg-white border rounded-lg shadow-lg w-full max-h-60 overflow-y-auto z-50">
                        {suggestions.map((place, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleSelectLocation(place.lat, place.lon)}
                            >
                                {place.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="w-[1200px] h-[500px] relative z-0">
                <MapContainer
                    center={selectedPosition}
                    zoom={zoom}
                    className="w-full h-full rounded-lg shadow-lg"
                    ref={mapRef}
                >
                    <TileLayer
                        url={`https://tile.openstreetmap.org/{z}/{x}/{y}.png`}
                        attribution=""
                    />
                    {userPosition && (
                        <Marker position={userPosition} icon={markerIcon}>
                            <Popup>📍 You are here</Popup>
                        </Marker>
                    )}
                    <Marker position={selectedPosition} icon={markerIcon}>
                        <Popup>📍 Selected Location</Popup>
                    </Marker>
                    {route.length > 0 && (
                        <Polyline
                            positions={route}
                            color="blue"
                            weight={5}
                            opacity={0.8}
                        />
                    )}
                </MapContainer>
            </div>
            {distance && <p className="text-lg font-semibold text-blue-500">Distance: {distance} km</p>}
            <button
                onClick={goToMarker}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition mt-2"
            >
                Home
            </button>
        </div>
    );
}
