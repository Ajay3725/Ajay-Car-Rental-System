import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const file = path.join(process.cwd(), "data/cardetails.json");

    const raw = fs.readFileSync(file, "utf8");
    const data = JSON.parse(raw);

    data.cars = data.cars.map((car: any) =>
      String(car.id) === String(body.id)
        ? { ...car, ...body }
        : car
    );

    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "edit failed" }, { status: 500 });
  }
}