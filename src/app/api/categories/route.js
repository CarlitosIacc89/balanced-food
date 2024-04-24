import { Category } from "@/models/Category";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  const { name } = data;

  const categoryDoc = await Category.create({ name });

  return NextResponse.json(categoryDoc);
}

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const { _id, name } = await req.json();

  await Category.updateOne({ _id }, { name });

  return NextResponse.json("Actualizacion exitosa");
}

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);

  const categories = await Category.find();

  return NextResponse.json(categories);
}

export async function DELETE(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const _id = await req.json();

  await Category.deleteOne({ _id });

  return NextResponse.json(true);
}
