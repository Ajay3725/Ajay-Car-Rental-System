"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addBooking } from "../actions/booking"; // Import from the new actions directory
import "../globalss.css"

interface Car {
  id: number;
  name: string;
  price: number;
  image: string;
  mileage: string;
  seats: string;
  rating: string;
}

function getDiscountInfo(price: number) {
  if (price >= 20000) {
    return { percent: 20, label: "20% OFF" };
  }
  if (price >= 4000) {
    return { percent: 10, label: "10% OFF" };
  }
  if (price >= 2000) {
    return { percent: 5, label: "5% OFF" };
  }
  return { percent: 0, label: "" };
}

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [pageTitle, setPageTitle] = useState("Customer Page");
  const [isGuest, setIsGuest] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const guestMode = role === "guest";
    setIsGuest(guestMode);
    setPageTitle(guestMode ? "Guest Page" : "Customer Page");
    fetch("/api/admin/cars")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCars(data);
        } else {
          setCars([]);
        }
      })
      .catch(() => setCars([]));
  }, []);

  async function handleBook(car: Car) { // Make this function async
    const role = localStorage.getItem("role");

    if (role === "guest") {
      alert("Please login first to book the car");
      router.push("/");
      return;
    }

    const originalPrice = Number(car.price) || 0;
    const discountInfo = getDiscountInfo(originalPrice);
    const discountedPrice = Math.round(originalPrice * (1 - discountInfo.percent / 100));

    // Store booking in database via Server Action
    const result = await addBooking({
      name: car.name,
      price: discountedPrice,
      mileage: car.mileage,
      seats: car.seats,
      rating: car.rating,
      image: car.image,
    });

    if (result.success) {
      // Proceed to the booking flow if DB storage was successful
      router.push(
        `/booking?name=${car.name}&price=${discountedPrice}&mileage=${car.mileage}&seats=${car.seats}&rating=${car.rating}&image=${car.image}`
      );
    } else {
      alert("Booking failed: " + result.message);
    }
  }

  return (
    <div className={`mudiyala ${isGuest ? "guest-mode" : "customer-mode"}`}>
      <h1 className="page-heading">{pageTitle}</h1>

  <div className="sir">

    <div className="car-item">
      <h3>🚗 Toyota - Reliable & Comfortable</h3>
      <img src="/Toyota.webp" width="300" height="180" />
    </div>

    <div className="car-item">
      <h3>🚗 Hyundai - Best Mileage Car</h3>
      <img src="/hyundai.avif" width="300" height="180" />
    </div>

    <div className="car-item">
      <h3>🚗 Kia - Stylish SUV</h3>
      <img src="/Kia.avif" width="300" height="180" />
    </div>

    <div className="car-item">
      <h3>🚗 Honda - Smooth Driving</h3>
      <img src="/Honda.jpg" width="300" height="180" />
    </div>

    <div className="car-item">
      <h3>🚗 Tata Nexon - Strong Build</h3>
      <img src="/Tata Nexon.jpg" width="300" height="180" />
    </div>

    

  </div>

      <h1>Available Cars</h1>

      <div className=" ajay">
        <div className="cargrid">
          <div></div>

          {cars.map((car, i) => {
            const originalPrice = Number(car.price) || 0;
            const discountInfo = getDiscountInfo(originalPrice);
            const discountedPrice = Math.round(originalPrice * (1 - discountInfo.percent / 100));

            return (
              <div key={i} className="carcard">

                <img
                  src={car.image?.trim() ? car.image : "/abcdef.jpg"}
                  alt={car.name}
                  className="car-image"
                  onError={(e) => {
                    e.currentTarget.src = "/abcdef.jpg";
                  }}
                />

                <h3>{car.name}</h3>

                <div className="price-tag">
                  <span className="old-price">₹{originalPrice}</span>
                  <span className="discount-badge">{discountInfo.label}</span>
                </div>
                <p className="new-price">₹{discountedPrice} / day</p>
                <p>⛽ Mileage: {car.mileage}</p>
                <p>👥 Seats: {car.seats}</p>
                {!isGuest && <p>⭐ Rating: {car.rating}</p>}

                <button onClick={() => handleBook(car)}>
                  Book
                </button>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}