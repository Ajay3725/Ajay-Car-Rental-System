import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const file = path.join(process.cwd(), "data/cardetails.json");

  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw);

  data.cars = data.cars.filter(
    (car: any) => String(car.id) !== String(id)
  );

  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true });
}