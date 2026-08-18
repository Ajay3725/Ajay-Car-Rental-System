"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import "../globalss.css"

function BookingContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);

  const name = params.get("name") || "Car";
  const pricePerDay = Number(params.get("price")) || 0;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsGuest(role === "guest");
  }, []);

  function calculatePrice() {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end.getTime() - start.getTime();
    const days = diffTime / (1000 * 60 * 60 * 24);

    if (days > 0) {
      setTotalPrice(days * pricePerDay);
    } else {
      setTotalPrice(0);
    }
  }

  function goToPayment() {
    if (totalPrice <= 0) {
      alert("Please calculate a valid price before continuing.");
      return;
    }
    router.push(`/payment?name=${name}&total=${totalPrice}`);
  }

  return (
    <div className="booking-page">
      <div className="booking-card">
        <div className="booking-header">
          <span className="booking-badge">Book Your Ride</span>
          <h1>Plan your trip</h1>
        </div>

        <img
          className="booking-hero-image"
          src="/Toyota.webp"
          alt="Car rental"
        />

        <div className="booking-car-box">
          <div>
            <p className="booking-label">Selected Car</p>
            <h2>{name}</h2>
          </div>
          <div className="booking-price-box">
            <p>₹{pricePerDay}</p>
            <span>per day</span>
          </div>
        </div>

        <div className="booking-summary">
          <div>
            <span>Price per day</span>
            <strong>₹{pricePerDay}</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>₹{totalPrice || 0}</strong>
          </div>
        </div>

        <div className="booking-date-row">
          <label>
            <span>Pickup Date</span>
            <input type="date" onChange={(e) => setStartDate(e.target.value)} />
          </label>

          <label>
            <span>Return Date</span>
            <input type="date" onChange={(e) => setEndDate(e.target.value)} />
          </label>
        </div>

        <div className="booking-actions">
          <button className="secondary-btn" onClick={calculatePrice}>Calculate Total</button>
          <button className="primary-btn" onClick={goToPayment}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}