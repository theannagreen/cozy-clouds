import { useState } from 'react';
import { saveLocation } from '../../utilities/users-service'

export default function WeatherPage() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/weather?city=${city}');
            if (!response.ok) throw new Error('Error fetching data');
            const data = await response.json();
            setWeather(data);
            setError('');
        } catch (err) {
            setError('Error fetching data');
        }
    };

    const handleSaveLocation = async () => {
        try {
            await saveLocation(city);
            alert('Location saved');
        } catch (err) {
            alert('Error saving');
        }
    }

    return (
        <div>
            <h2>Search Weather by Location</h2>
            <input 
                type="text"
                placeholder='Enter city'
                value={city}
                onChange={(e) => setCity(e.target.value)} 
            />
            <button onClick={fetchWeather}>Get Weather</button>
            {error && <p>{error}</p>}
            {weather && (
                <div>
                    <h3>Weather in {weather.name}</h3>
                    <p>Temperature: {weather.main.temp}°F</p>
                    <p>Condition: {weather.weather[0].description}</p>
                    <button onClick={handleSaveLocation}>Save Location</button>
                </div>
            )}
        </div>
    );
}