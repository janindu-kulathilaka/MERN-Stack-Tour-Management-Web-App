import { useEffect, useState } from "react";
import axios from "axios";

export default function IndexPages() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <div key={place}>
            <div className="bg-gray-500 rounded-2xl flex">
              {place.photos.length > 0 && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt="photo"
                />
              )}
            </div>

            <h2>{place.title}</h2>
          </div>
        ))}
    </div>
  );
}
