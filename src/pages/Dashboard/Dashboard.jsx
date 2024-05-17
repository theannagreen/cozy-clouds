import { useEffect, useState } from "react";

export default function Dashboard() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCurrentLocationWeather = async () => {
            try {
                const response = await fetch('http://localhost:3001/api.weather/current');
                if (!response.ok) throw new Error('Error fetching data');
                const data = await response.json();
                setWeather(data);
                setError('');
            } catch (err) {
                setError('Error fetching data')
            }
        };

    fetchCurrentLocationWeather();
 }, []); 

    return (
        <div>
          <h2>Current Location Weather</h2>
          {error && <p>{error}</p>}
          {weather && (
            <div>
              <h3>Weather in {weather.name}</h3>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Condition: {weather.weather[0].description}</p>
            </div>
          )}
        </div>
      );
    }