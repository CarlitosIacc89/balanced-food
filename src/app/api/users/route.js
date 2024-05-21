import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const _id = req.nextUrl.searchParams.get("id");

  try {
    const userDoc = await User.find();
    if (_id) {
      const user = await User.findOne({ _id }).lean();
      const userInfo = await UserInfo.findOne({ email: user.email }).lean();

      return NextResponse.json({ ...user, ...userInfo });
    }

    return NextResponse.json(userDoc);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const _id = await req.json();

  try {
    const userFound = await User.findOne({ _id });
    const userFoundInfo = await UserInfo.findOne({ email: userFound.email });

    if (userFound) {
      await User.deleteOne(userFound);
    }
    if (userFoundInfo) {
      await UserInfo.deleteOne(userFoundInfo);
    }
    return NextResponse.json(true);
  } catch (error) {
    return NextResponse.json("Error al eliminar usuario");
  }
}
