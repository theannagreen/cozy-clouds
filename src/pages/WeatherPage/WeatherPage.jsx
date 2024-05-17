import { useState } from 'react';

export default function WeatherPage() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/weather?city=${city}');
            if (!response.ok) throw new Error('Error fetching data');
            const data = await response.json();
            setWeather(data);
            setError('');
        } catch (err) {
            setError('Error fetching data');
        }
    };

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
                </div>
            )}
        </div>
    );
}