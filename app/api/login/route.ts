import { NextResponse } from "next/server";
import fs from "fs"; //read file
import path from "path";//read locationwhat is full form cwd


export async function GET() {

  const file = path.join(process.cwd(), "data/db.json");

  const data = JSON.parse(fs.readFileSync(file, "utf8"));

  return NextResponse.json(data);
}