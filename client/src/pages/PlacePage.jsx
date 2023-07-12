import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import GalleryWidget from "../components/GalleryWidget";
import AddressLink from "../components/AddressLink";

export default function IndexPage() {
  const { id } = useParams();
  const [place, setPlace] = useState([]);

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

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8 grid grid-cols-1 2xl:grid-cols-2">
      <h1 className="text-3xl font-semibold">{place.title}</h1>
      <AddressLink place={place} />
      <div>
        <GalleryWidget place={place} />
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
