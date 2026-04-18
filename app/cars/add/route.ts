import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const file = path.join(process.cwd(), "data/cardetails.json");

    let data = { cars: [] };

    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf8");
      if (raw && raw.trim()) {
        data = JSON.parse(raw);
      }
    }

    if (!data || !Array.isArray(data.cars)) {
      data.cars = [];
    }

    data.cars.push({
      id: Date.now(),
      name: body.name || "Unknown Car",
      price: Number(body.price) || 0,
      image: body.image || "/placeholder.jpg",
      mileage: body.mileage,
      seats: body.seats,
      rating: body.rating,
    });

    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}