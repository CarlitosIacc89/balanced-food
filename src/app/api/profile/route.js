import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const data = await req.json();

  const { _id, name, lastName, image, ...otherUserInfo } = data;

  const session = await getServerSession(authOption);
  const email = session?.user.email;

  let filter = {};

  if (_id) {
    filter = { _id };
  } else {
    filter = { email };
  }

  const user = await User.findOne(filter);
  await User.updateOne(filter, { name, lastName, image });
  await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, {
    upsert: true,
  });

  return NextResponse.json(true);
}

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOption);
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json(null);
  }

  const user = await User.findOne({ email }).lean();
  if (!user) {
    return NextResponse.json({ message: "Usuario no encontrado" });
  }

  const userInfo = await UserInfo.findOne({ email: user.email }).lean();

  return NextResponse.json({ ...user, ...userInfo });
}
