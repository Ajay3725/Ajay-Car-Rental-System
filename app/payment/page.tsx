"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "../globalss.css";

function PaymentContent() {
  const params = useSearchParams();
  const router = useRouter();

  const name = params.get("name");
  const total = params.get("total");

  const [method, setMethod] = useState("UPI");

  function confirmPayment() {
    alert("✅ Your order is booked");
    router.push("/login");
  }

  return (
    <div className="payment">
      <h1> Payment Page</h1>

      <div className="payment-box">
        <h2> {name}</h2>
        <h3>Total: ₹{total}</h3>

        {/* SHOW SELECTED OPTION */}
        <p>Selected Method: <b>{method}</b></p>

        <div className="payment-methods">
          <label className="method">
            <input
              type="radio"
              value="UPI"
              checked={method === "UPI"}
              onChange={(e) => setMethod(e.target.value)}
            />
             UPI
          </label>

          <label className="method">
            <input
              type="radio"
              value="Cash"
              checked={method === "Cash"}
              onChange={(e) => setMethod(e.target.value)}
            />
           Cash
          </label>

          <label className="method">
            <input
              type="radio"
              value="Card"
              checked={method === "Card"}
              onChange={(e) => setMethod(e.target.value)}
            />
             Credit Card
          </label>
        </div>

        <button className="pay-btn" onClick={confirmPayment}>
          Pay Now 
        </button>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}