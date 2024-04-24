import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/helpers/validations";

export async function POST(req) {
  const { email, password, name, lastName } = await req.json();

  const passwordValidation = validatePassword(password);
  const nameValidation = validateName(name);
  const lastNameValidation = validateName(lastName, "apellido");
  const emailValidation = validateEmail(email);

  if (passwordValidation) {
    return NextResponse.json(passwordValidation, {
      status: passwordValidation.status,
    });
  }
  if (nameValidation) {
    return NextResponse.json(nameValidation, {
      status: nameValidation.status,
    });
  }
  if (lastNameValidation) {
    return NextResponse.json(lastNameValidation, {
      status: lastNameValidation.status,
    });
  }
  if (emailValidation) {
    return NextResponse.json(emailValidation, {
      status: emailValidation.status,
    });
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);

    const userFound = await User.findOne({ email });
    if (userFound) {
      return NextResponse.json(
        {
          message: "El correo ya existe",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
      name,
      lastName,
      email,
      password: hashedPassword,
    };
    const createdUser = await User.create(user);
    return NextResponse.json(createdUser);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
  }
}
