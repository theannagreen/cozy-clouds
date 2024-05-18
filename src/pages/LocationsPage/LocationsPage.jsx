import { useEffect, useState } from "react";
import { getSavedLocations } from "../../utilities/users-service";

export default function LocationsPage() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchSavedLoctions = async () => {
            try {
                const savedLocations = await getSavedLocations();
                setLocations(savedLocations);
            } catch (err) {
                console.error("Error fetching saved locations", err);
            }
        };

        fetchSavedLoctions();
    }, []);

    return (
        <div>
            <h2>Saved Locations</h2>
            <ul>
                {locations.map((location, index) => (
                    <li key={index}>{location}</li>
                ))}
            </ul>
        </div>
    );
}