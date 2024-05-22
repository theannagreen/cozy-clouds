import { useState, useEffect, useCallback } from "react";
import { get5DayForecast } from "../../utilities/weather-api";

export default function WeeklyPage() {
    const [city, setCity] = useState('');
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState('');

    const fetchForecast = useCallback(async () => {
        try {
            const forecastData = await get5DayForecast(city);
            setForecast(forecastData);
            setError('');
        } catch (err) {
            setError('Error fetching forecast');
        }
    }, [city]);

    useEffect(() => {
        if (city) {
            fetchForecast();
        }
    }, [city, fetchForecast]);

    return (
        <div>
            <h2>5-Day Weather Forecast</h2>
            <input 
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchForecast}>Get Forecast</button>
            {error && <p>{error}</p>}
            {forecast && (
                <div>
                    <h3>5-Day Weather Forecast for {city}</h3>
                    {forecast.list.map((day, index) => (
                    <div key={index}>
                        <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                        <p>Temperature: {day.main.temp}°F</p>
                        <p>Condition: {day.weather[0].description}</p>
                    </div>
                 ))}
              </div>
            )}
        </div>
    );
}