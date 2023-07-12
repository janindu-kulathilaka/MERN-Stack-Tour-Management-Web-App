import ProtoType from "prop-types";
import { useState } from "react";

export default function GalleryWidget({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

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
    <div className="flex relative max-w-4xl shadow shadow-black rounded-2xl">
      <div className="grid gap-1 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
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
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square object-cover"
              src={"http://localhost:4000/uploads/" + place.photos[1]}
              alt="photo1"
            />
          )}
          {place.photos?.[2] && (
            <div className="overflow-hidden">
              <img
                onClick={() => setShowAllPhotos(true)}
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
  );
}

GalleryWidget.propTypes = {
  place: ProtoType.object.isRequired,
  setShowAllPhotos: ProtoType.func.isRequired,
};
