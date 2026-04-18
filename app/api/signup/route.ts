import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {

  const body = await req.json();

  const file = path.join(process.cwd(), "data/db.json");

  const data = JSON.parse(fs.readFileSync(file, "utf8"));

  data.user.push({
    id: Date.now(),
    username: body.username,
    password: body.password,
    role: "user"
  });

  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true });
}