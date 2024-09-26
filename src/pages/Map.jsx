import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXZpc2hlazEyNjkiLCJhIjoiY2xtbnZrbTB0MTF4MjJxcnhibmJqNHQybCJ9.eOAtr-xB5nAQfsD8Op1Gpw';

const Map = ({ onLocationSelect }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.006, 40.7128],
        zoom: 12,
      });

      mapInstance.addControl(new mapboxgl.NavigationControl());

      const marker = new mapboxgl.Marker({
        color: 'red',
      });

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          marker.setLngLat([longitude, latitude]).addTo(mapInstance);
          mapInstance.flyTo({
            center: [longitude, latitude],
            zoom: 15,
          });

          

          try {
            // Use Nominatim API for reverse geocoding
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );

            if (response.data && response.data.display_name) {
              setCurrentAddress(response.data.display_name);
            }
          } catch (error) {
            console.error('Error fetching address:', error);
          }
          
           onLocationSelect({ lat: latitude, lng: longitude  });
        },
        (error) => {
          console.error(error);
          alert('Error getting your current location.');
        }
      
      );

      setMap(mapInstance);
    };
    
    if (!map) {
      initializeMap();
    }
    localStorage.setItem('address' , currentAddress) ;
  }, [map, onLocationSelect]);

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
      {currentAddress && (
        <div className="address">
          <strong>Current Address:</strong> {currentAddress}
        </div>
      )}
    </div>
  );
};

export default Map;
