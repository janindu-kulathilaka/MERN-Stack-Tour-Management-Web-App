import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div key={booking}>
              {booking.checkIn} - {booking.checkOut}
            </div>
          ))}
      </div>
    </div>
  );
}
