import { useEffect, useState } from "react";
import { getSavedLocations, deleteLocation } from "../../utilities/users-service";
import { set } from "mongoose";

export default function LocationsPage() {
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSavedLocations = async () => {
            try {
                const savedLocations = await getSavedLocations();
                setLocations(savedLocations);
                setError('');
            } catch (err) {
                console.error("Error fetching saved locations", err);
                setError('Error fetching saved locations');
            }
        };

        fetchSavedLocations();
    }, []);

    const handleDeleteLocation = async (location) => {
        try {
            await deleteLocation(location);
            setLocations(locations.filter(loc => loc !== location)); // Update state after deletion
            setError('');
        } catch (err) {
            setError('Error deleting location', err);
        }
    };
    

    return (
        <div>
            <h2>Saved Locations</h2>
            {error && <p>{error}</p>}
            {locations.length === 0 ? (
                <p>There are no saved locations.</p>
            ) : (
            <ul>
                {locations.map((location, index) => (
                    <li key={index}>
                        {location}
                        <button onClick={() => handleDeleteLocation(location)}>Delete</button>
                        </li>
                ))}
            </ul>
            )}
        </div>
    );
}