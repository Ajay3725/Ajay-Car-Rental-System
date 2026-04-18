"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import "../globalss.css"
export default function BookingPage() {
  const params = useSearchParams();
  const router = useRouter();

  const name = params.get("name");
  const pricePerDay = Number(params.get("price"));

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);

  function calculatePrice() {
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
    router.push(`/payment?name=${name}&total=${totalPrice}`);
  }

  return (
    <div className=" marii">
      <h1>Booking Page</h1>

      <h2>{name}</h2>
      <p>Price per day: ₹{pricePerDay}</p>

      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />

      <button onClick={calculatePrice}>Calculate Price</button>

      <h3>Total: ₹{totalPrice}</h3>

      <button onClick={goToPayment}>
        Continue to Payment
      </button>
    </div>
  );
}