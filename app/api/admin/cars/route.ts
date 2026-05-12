import { NextResponse } from "next/server";
import fs from "fs"; //read file
import path from "path"; //file location find

export async function GET() {
  try {
    const file = path.join(process.cwd(), "data/cardetails.json");

    const raw = fs.readFileSync(file, "utf8");
    const data = JSON.parse(raw);

    const cars = data.cars.map((car: any, index: number) => ({
      id: car.id ?? Date.now() + index,
      ...car,
    }));

    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.json([]);
  }
}