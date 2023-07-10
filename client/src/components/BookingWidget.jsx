import PropTypes from "prop-types";
import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [redirect, setRedirect] = useState("");
  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function BookThisPlace() {
    const response = await axios.post("/booking", {
      placeId: place._id,
      checkIn,
      checkOut,
      guests,
      name,
      phoneNumber,

      price: place.price * numberOfNights,
    });

    const bookingId = response.data._id;

    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow shadow-gray-400">
      {numberOfNights == 1 && (
        <div className="text-center">
          <span className="text-2xl font-bold">Price: ${place.price}.00</span> /
          per night
        </div>
      )}

      {numberOfNights > 1 && (
        <div className="text-center">
          <span className="text-2xl font-bold">
            Price: ${place.price * numberOfNights}.00
          </span>{" "}
          / {numberOfNights} nights
        </div>
      )}

      <div className="border-2 rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>CHECK-IN </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="border-l-2 py-3 px-4">
            <label>CHECKOUT </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="border-t-2 py-3 px-4">
          <label>GUESTS</label>
          <br />
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="1"
            className="border rounded-2xl pl-3 py-2 w-full"
          />
        </div>
        {numberOfNights > 0 && (
          <div className="border-t-2 py-3 px-4">
            <label>Full Name:</label>
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="enter your full name"
              className="border rounded-2xl pl-3 py-2 w-full"
            />
            <label>Phone Number:</label>
            <br />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="phone number"
              className="border rounded-2xl pl-3 py-2 w-full"
            />
          </div>
        )}
      </div>

      <button onClick={BookThisPlace} className="primary mt-2">
        Book this place
        {numberOfNights > 0 && <span> for {numberOfNights} nights</span>}
      </button>
    </div>
  );
}

BookingWidget.propTypes = {
  place: PropTypes.array.isRequired,
};
