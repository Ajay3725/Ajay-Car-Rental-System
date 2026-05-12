import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const file = path.join(process.cwd(), "data/booking.json");

    let data = { booking: [] };

    if (fs.existsSync(file)) {

      const raw = fs.readFileSync(file, "utf8");

      if (raw && raw.trim()) {
        data = JSON.parse(raw);
      }
    }

    data.booking.push({
      id: Date.now(),
      name: body.name,
      total: body.total,
      payment: body.payment
    });

    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false
    });

  }

}