import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      <div className="absolute inset-0 bg-black min-h-screen">
        <div className="bg-black p-8 grid gap-2">
          <div>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
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
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8 grid grid-cols-1 2xl:grid-cols-2">
      <h1 className="text-3xl ">{place.title}</h1>
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
      <div className="flex relative max-w-4xl">
        <div className="grid gap-1 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  className="aspect-square object-cover"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt="photo1"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt="photo1"
              />
            )}
            {place.photos?.[2] && (
              <div className="overflow-hidden">
                <img
                  className="aspect-square object-cover relative top-2"
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                  alt="photo1"
                />
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-medium shadow-gray-500"
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
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            Show All Photos
          </button>
        </div>
      </div>
      <div>
        <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
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
            <div className="bg-white shadow p-4 rounded-2xl">
              <div className="text-center">
                <span className="text-2xl font-bold">
                  Price: ${place.price}.00
                </span>{" "}
                / per night
              </div>
              <div className="border-2 rounded-2xl mt-4">
                <div className="flex">
                  <div className="py-3 px-4">
                    <label>CHECK-IN </label>
                    <input type="date" />
                  </div>
                  <div className="border-l-2 py-3 px-4">
                    <label>CHECKOUT </label>
                    <input type="date" />
                  </div>
                </div>
                <div className="border-t-2 py-3 px-4">
                  <label>GUESTS</label>
                  <br />
                  <input
                    type="number"
                    value={1}
                    className="border rounded-2xl pl-2 py-2 w-full"
                  />
                </div>
              </div>

              <button className="primary mt-2">Book this place</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
