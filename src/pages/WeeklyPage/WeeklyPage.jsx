import { useState, useCallback } from "react";
import { get5DayForecast } from "../../utilities/weather-api";

export default function WeeklyPage() {
    const [location, setlocation] = useState('');
    const [submittedLocation, setSubmittedLocation] = useState('');
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState('');

    const fetchForecast = useCallback(async () => {
        try {
            const forecastData = await get5DayForecast(location);
            setForecast(forecastData);
            setSubmittedLocation(location);
            setError('');
        } catch (err) {
            setError('Error fetching forecast');
        }
    }, [location]);

    return (
        <div>
            <h2>5-Day Weather Forecast</h2>
            <input 
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
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