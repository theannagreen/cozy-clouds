import { useEffect, useState } from "react";
import { getSavedLocations, deleteLocation } from "../../utilities/users-service";

export default function LocationsPage() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchSavedLocations = async () => {
            try {
                const savedLocations = await getSavedLocations();
                setLocations(savedLocations);
            } catch (err) {
                console.error("Error fetching saved locations", err);
            }
        };

        fetchSavedLocations();
    }, []);

    const handleDeleteLocation = async (location) => {
        try {
          const updatedLocations = await deleteLocation(location);
          setLocations(updatedLocations);
        } catch (err) {
          console.error('Error deleting location', err);
        }
      };

    return (
        <div>
            <h2>Saved Locations</h2>
            <ul>
                {locations.map((location, index) => (
                    <li key={index}>
                        {location}
                        <button onClick={() => handleDeleteLocation(location)}>Delete</button>
                        </li>
                ))}
            </ul>
        </div>
    );
}