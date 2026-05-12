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
    const dataDir = path.join(process.cwd(), "data");
    const file = path.join(dataDir, "booking.json");

    // Ensure the data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let data: { booking: any[] } = { booking: [] };

    // check file exists
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf8");

      if (raw && raw.trim()) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.booking)) {
          data = parsed;
        }
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
    console.error(error);

    return {
      success: false,
      message: "Booking failed"
    };
  }
}