"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const router = useRouter();

  useEffect(() => {
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

  function handleBook(car: Car) {
    const role = localStorage.getItem("role");

    if (role === "guest") {
      alert("Please login first to book the car");
      router.push("/");
      return;
    }

    router.push(
      `/booking?name=${car.name}&price=${car.price}&mileage=${car.mileage}&seats=${car.seats}&rating=${car.rating}&image=${car.image}`
    );
  }

  return (
    <div className="mudiyala">

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

    <div className="car-item">
      <h3>🚗 Hyundai i20 - Hatchback King</h3>
      <img src="/Hyundai i20.jpg" width="300" height="180" />
    </div>

  </div>

      <h1>Available Cars</h1>

      <div className=" ajay">
        <div className="cargrid">
          <div></div>

          {cars.map((car, i) => (
            <div key={i} className="carcard">

              <img
                src={car.image?.trim() ? car.image : "/default-car.png"}
                alt={car.name}
                className="car-image"
              />

              <h3>{car.name}</h3>

              <p>💰 ₹{car.price} / day</p>
              <p>⛽ Mileage: {car.mileage}</p>
              <p>👥 Seats: {car.seats}</p>
              <p>⭐ Rating: {car.rating}</p>

              <button onClick={() => handleBook(car)}>
                Book
              </button>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}