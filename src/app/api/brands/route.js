import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Brands } from "@/models/Brands";
import { Products } from "@/models/Products";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const data = await req.json();

    const brandDoc = await Brands.create(data);

    if (!brandDoc) {
      throw new Error("Hubo un error al crear el producto");
    }

    return NextResponse.json({
      data: { message: "¡Marca creada con exito!" },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message || "Error al crear la marca",
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const selectBrand = req.nextUrl.searchParams.get("brand");
    if (selectBrand) {
      // const singleBrands = await Brands.findOne({ selectBrand });
      const productsBrandsDoc = await Products.find({ selectBrand });
      return NextResponse.json(productsBrandsDoc);
    }

    const brands = await Brands.find();

    if (!brands) {
      throw new Error("Error al obtener las marcas");
    }
    return NextResponse.json({
      brands,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message || "Error al obtener las marcas",
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const _id = await req.json();

    const deleteBrandsDoc = await Brands.deleteOne({ _id });

    if (!deleteBrandsDoc) {
      throw new Error("Ups! Hubo un error al eliminar la marca");
    }

    return NextResponse.json({
      data: { message: "¡Marca eliminada!" },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const { _id, ...data } = await req.json();

    const updateBrands = await Brands.findOneAndUpdate({ _id }, data);

    if (!updateBrands) {
      throw new Error("Marca no encontrada para actualizar");
    }
    return NextResponse.json({
      data: { message: "Marca actualizada" },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
