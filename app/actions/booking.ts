"use server";

import fs from "fs";
import path from "path";

export async function addBooking(carDetails: {
  name: string;
  price: number;
  mileage: string;
  seats: string;
  rating: string;
  image: string;
}) {
  try {

    const file = path.join(process.cwd(), "data/booking.json");

    let data = { booking: [] };

    // check file exists
    if (fs.existsSync(file)) {

      const raw = fs.readFileSync(file, "utf8");

      if (raw && raw.trim()) {
        data = JSON.parse(raw);
      }
    }

  
    data.booking.push({
      id: Date.now(),
      name: carDetails.name,
      price: carDetails.price,
      mileage: carDetails.mileage,
      seats: carDetails.seats,
      rating: carDetails.rating,
      image: carDetails.image,
      bookedAt: new Date().toISOString()
    });

  
    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    return {
      success: true,
      message: "Booking stored successfully"
    };

  } catch (error) {

    console.log(error);

    return {
      success: false,
      message: "Booking failed"
    };
  }
}