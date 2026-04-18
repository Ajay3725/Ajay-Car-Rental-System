"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [mileage, setMileage] = useState("");
  const [seats, setSeats] = useState("");
  const [rating, setRating] = useState("");

  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data || []);
      })
      .catch(() => setCars([]));
  }, []);

  async function addCar() {
    await fetch("/cars/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price,
        image,
        mileage,
        seats,
        rating
      })
    });

    alert("Car added!");
    location.reload();
  }

  async function deleteCar(id: any) {
    await fetch("/cars/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    location.reload();
  }

  async function updateCar(car: any) {
    await fetch("/cars/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(car)
    });

    location.reload();
  }

  const handleCarChange = (index: number, field: string, value: string) => {
    const newCars = [...cars];
    newCars[index] = { ...newCars[index], [field]: value };
    setCars(newCars);
  };

  return (
    <div>

      <div className="oiiiii">
        <div className="adminBox">

          <h2>Admin Panel</h2>

          <input placeholder="Name" onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCar()} />
          <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCar()} />
          <input placeholder="Image URL" onChange={(e) => setImage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCar()} />
          <input placeholder="Mileage" onChange={(e) => setMileage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCar()} />
          <input placeholder="Seats" onChange={(e) => setSeats(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCar()} />
          <input placeholder="Rating" onChange={(e) => setRating(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCar()} />

          <button onClick={addCar}>Add Car</button>

        </div>
      </div>

      <h2>All Cars</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', padding: '10px' }}>
        {cars.map((car, index) => (
          <div key={car.id || index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#f9f9f9' }}>
            
            <img src={car.image} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} alt={car.name} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                style={{ padding: '5px' }}
                placeholder="Price"
                value={car.price || ""}
                onChange={(e) => handleCarChange(index, 'price', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && updateCar(car)}
              />
              <input
                style={{ padding: '5px' }}
                placeholder="Mileage"
                value={car.mileage || ""}
                onChange={(e) => handleCarChange(index, 'mileage', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && updateCar(car)}
              />
              <input
                style={{ padding: '5px' }}
                placeholder="Seats"
                value={car.seats || ""}
                onChange={(e) => handleCarChange(index, 'seats', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && updateCar(car)}
              />
              <input
                style={{ padding: '5px' }}
                placeholder="Rating"
                value={car.rating || ""}
                onChange={(e) => handleCarChange(index, 'rating', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && updateCar(car)}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button onClick={() => updateCar(car)} style={{ flex: 1, cursor: 'pointer' }}>Update</button>
              <button onClick={() => deleteCar(car.id)} style={{ flex: 1, cursor: 'pointer', color: 'red' }}>Delete</button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}