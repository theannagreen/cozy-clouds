import { useState } from 'react';
import { saveLocation } from '../../utilities/users-service'

export default function WeatherPage() {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const fetchWeather = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/weather/${location}`);
            if (!response.ok) throw new Error('Error fetching data');
            const data = await response.json();
            setWeather(data);
            setError('');
            setMessage('');
        } catch (err) {
            setError('Error fetching data');
        }
    };

    const handleSaveLocation = async () => {
        try {
            await saveLocation(location);
            setMessage('Location saved successfully!');
            setError('');
        } catch (err) {
            setError('Error saving location');
            setMessage('');
        }
    }

    return (
        <div>
            <h2>Search Weather by Location</h2>
            <input 
                type="text"
                placeholder='Enter location'
                value={location}
                onChange={(e) => setLocation(e.target.value)} 
            />
            <button onClick={fetchWeather}>Get Weather</button>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
            {weather && (
                <div>
                    <h3>Weather in {weather.name}</h3>
                    <p>Temperature: {weather.temperature}°F</p>
                    <p>Condition: {weather.description}</p>
                    <button onClick={handleSaveLocation}>Save Location</button>
                </div>
            )}
        </div>
    );
}