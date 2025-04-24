import React, { useEffect, useState } from "react";

const Leaflet = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchedPlace, setSearchedPlace] = useState(null);
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [currentPlaceAddress, setCurrentPlaceAddress] = useState("");
  const [searchedPlaceAddress, setSearchedPlaceAddress] = useState("");
  const [distance, setDistance] = useState("");
  let directionsService;
  let directionsRenderer;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    if (window.google) {
      const newMap = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.748817, lng: -73.985428 },
        zoom: 13,
      });
      setMap(newMap);
      const geocoderInstance = new window.google.maps.Geocoder();
      setGeocoder(geocoderInstance);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userLocation = { lat: latitude, lng: longitude };
            setCurrentLocation(userLocation);
            newMap.setCenter(userLocation);
            new window.google.maps.Marker({
              position: userLocation,
              map: newMap,
              title: "You are here!",
            });
            geocoderInstance.geocode({ location: userLocation }, (results, status) => {
              if (status === "OK" && results[0]) {
                setCurrentPlaceAddress(results[0].formatted_address);
              }
            });
          },
          () => {
            alert("Geolocation not supported!");
          }
        );
      }

      const input = document.getElementById("place-search");
      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        fields: ["place_id", "geometry", "name", "formatted_address"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const placeLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setSearchedPlace(placeLocation);
          setSearchedPlaceAddress(place.formatted_address || "Unknown Address");
          newMap.panTo(placeLocation);
          new window.google.maps.Marker({
            position: placeLocation,
            map: newMap,
            title: place.name,
          });

          if (currentLocation) {
            drawPath(currentLocation, placeLocation, newMap);
            calculateDistance(currentLocation, placeLocation);
          }
        }
      });

      directionsService = new window.google.maps.DirectionsService();
      directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(newMap);
    }
  };

  const drawPath = (origin, destination, map) => {
    if (!directionsService || !directionsRenderer) {
      directionsService = new window.google.maps.DirectionsService();
      directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
    }
    const request = {
      origin,
      destination,
      travelMode: "DRIVING",
    };
    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
      } else {
        alert("Failed to load directions: " + status);
      }
    });
  };

  const calculateDistance = (origin, destination) => {
    if (!origin || !destination) return;
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK") {
          const distanceText = response.rows[0].elements[0].distance.text;
          setDistance(distanceText);
        } else {
          alert("Distance calculation failed: " + status);
        }
      }
    );
  };

  return (
    <div>
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
        <input
          id="place-search"
          type="text"
          placeholder="Search for a place"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 10,
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "500px",
          }}
        />
      </div>

      <div style={{ padding: "10px", marginTop: "20px" }}>
        <h3>Current Location:</h3>
        <p>{currentPlaceAddress || "Loading..."}</p>

        <h3>Searched Place:</h3>
        <p>{searchedPlaceAddress || "No place selected"}</p>

        {distance && (
          <>
            <h3>Distance:</h3>
            <p>{distance}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaflet;
