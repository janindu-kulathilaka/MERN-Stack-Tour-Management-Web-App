import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import AddressLink from "../components/AddressLink";
import GalleryWidget from "../components/GalleryWidget";
import BookingDates from "../components/BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div>
      <AccountNav />
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink place={booking.place} className={"my-2 block"} />
      <div className="flex bg-gray-200 p-6 my-4 rounded-2xl justify-between items-center">
        <div>
          <h2 className="text-2xl pb-2 mb-1 font-semibold">
            Your booking information:
          </h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary py-4 px-6 text-white rounded-2xl">
          <div className="text-xl font-semibold">Total price</div>
          <div className="text-2xl font-semibold">${booking.price}</div>
        </div>
      </div>
      <GalleryWidget place={booking.place} />
    </div>
  );
}
