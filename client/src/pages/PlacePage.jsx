import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import GalleryWidget from "../components/GalleryWidget";

export default function IndexPage() {
  const { id } = useParams();
  const [place, setPlace] = useState([]);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/places/" + id).then((response) => {
        setPlace(response.data);
      });
    }
  }, [id]);
  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-2">
          <div>
            <h2 className="text-3xl font-semibold text-center mb-5">
              {place.title}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed top-5 right-12 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <img
                key={photo}
                src={"http://localhost:4000/uploads/" + photo}
                alt="photo"
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8 grid grid-cols-1 2xl:grid-cols-2">
      <h1 className="text-3xl font-semibold">{place.title}</h1>
      <a
        className="flex gap-1 my-3 block font-semibold underline"
        href={"https://maps.google.com/?q=" + place.address}
        target="_blank"
        rel="noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {place.address}
      </a>
      <div className="flex relative max-w-4xl shadow shadow-black rounded-2xl">
        <GalleryWidget place={place} setShowAllPhotos={setShowAllPhotos} />
      </div>
      <div>
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl mb-2">Description</h2>
              {place.description}
            </div>
            <span className="font-semibold">check-in: </span>
            {place.checkIn}
            <br />
            <span className="font-semibold">check-out: </span>
            {place.checkOut}
            <br />
            <span className="font-semibold">Max number of guests: </span>
            {place.maxGuests}
            <br />
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
          <h2 className="font-semibold text-2xl mb-1">Extra info</h2>
          <span className="mt-8 text-sm text-gray-700 leading-4 ">
            {place.extraInfo}
          </span>
        </div>
      </div>
    </div>
  );
}
