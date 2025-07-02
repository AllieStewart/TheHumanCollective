// Start of JSX file
// Where Leaflet and OpenStreetMaps API are implemented.
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useMutation, useQuery } from '@apollo/client';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { ADD_LOG } from '../utils/mutations';
import { QUERY_LOGS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ onLocationSelect, selectedLocation }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect({
        latitude: lat,
        longitude: lng,
      });
    },
  });

  return selectedLocation ? (
    <Marker position={[selectedLocation.latitude, selectedLocation.longitude]}>
      <Popup>
        Selected Location<br />
        Lat: {selectedLocation.latitude.toFixed(4)}<br />
        Lng: {selectedLocation.longitude.toFixed(4)}
      </Popup>
    </Marker>
  ) : null;
}

const Geolocation = () => {
  const [logText, setLogText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const [addLog, { error }] = useMutation(ADD_LOG, {
    refetchQueries: [
      QUERY_LOGS,
      'getLogs',
      QUERY_ME,
      'me'
    ]
  });

  const { loading, data } = useQuery(QUERY_LOGS);
  const logs = data?.logs || [];

  const handleLocationSelect = async (location) => {
    setSelectedLocation(location);
    setIsLoadingLocation(true);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        const addressParts = data.display_name.split(', ');
        setLocationInfo({
          placeName: data.display_name,
          cityText: addressParts[0] || '',
          stateText: addressParts[addressParts.length - 2] || '',
          countryText: addressParts[addressParts.length - 1] || '',
        });
      }
    } catch (err) {
      console.error('Error getting location info:', err);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!logText.trim()) {
      alert('Please enter your travel log text!');
      return;
    }

    if (!selectedLocation) {
      alert('Please select a location on the map!');
      return;
    }

    try {
      const geolocationData = {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        ...locationInfo,
      };

      await addLog({
        variables: {
          logText: logText.trim(),
          geolocation: geolocationData,
        },
      });

      setLogText('');
      setSelectedLocation(null);
      setLocationInfo(null);
    } catch (err) {
      console.error('Error creating log:', err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'logText' && value.length <= 280) {
      setLogText(value);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          handleLocationSelect(location);
        },
        (error) => {
          console.error('Error getting current location:', error);
          alert('Unable to get your current location. Please select a location on the map.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  if (!Auth.loggedIn()) {
    return (
      <div className="geolocation-container">
        <h3>Please log in to create travel logs</h3>
      </div>
    );
  }

  return (
    <div className="geolocation-container">
      <h3>Create a Travel Log</h3>
      
      <div style={{ height: '400px', width: '100%', marginBottom: '20px' }}>
        <MapContainer
          center={[20, 0]} // Center on world view
          zoom={2}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <LocationMarker 
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
          />
          
          {logs.map((log) => {
            if (log.geolocation && log.geolocation.latitude && log.geolocation.longitude) {
              return (
                <Marker
                  key={log._id}
                  position={[log.geolocation.latitude, log.geolocation.longitude]}
                >
                  <Popup>
                    <strong>{log.logAuthor}</strong><br />
                    {log.logText}<br />
                    <em>{log.geolocation.placeName || `${log.geolocation.cityText}, ${log.geolocation.countryText}`}</em>
                  </Popup>
                </Marker>
              );
            }
            return null;
          })}
        </MapContainer>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          type="button" 
          onClick={getCurrentLocation}
          style={{ marginRight: '10px', padding: '8px 16px' }}
        >
          Use My Current Location
        </button>
        <span>or click on the map to select a location</span>
      </div>

      {selectedLocation && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
          <h4>Selected Location:</h4>
          {isLoadingLocation ? (
            <p>Loading location information...</p>
          ) : locationInfo ? (
            <div>
              <p><strong>Place:</strong> {locationInfo.placeName}</p>
              <p><strong>Coordinates:</strong> {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}</p>
            </div>
          ) : (
            <p><strong>Coordinates:</strong> {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}</p>
          )}
        </div>
      )}

      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <textarea
            name="logText"
            placeholder="Share your travel experience... (max 280 characters)"
            value={logText}
            onChange={handleChange}
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              resize: 'vertical'
            }}
          />
          <div style={{ textAlign: 'right', fontSize: '12px', color: '#666' }}>
            {logText.length}/280 characters
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={!logText.trim() || !selectedLocation}
            style={{
              padding: '10px 20px',
              backgroundColor: selectedLocation && logText.trim() ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: selectedLocation && logText.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Create Travel Log
          </button>
        </div>
      </form>

      {error && (
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '5px' }}>
          Something went wrong: {error.message}
        </div>
      )}
    </div>
  );
};

export default Geolocation;
// End of JSX file