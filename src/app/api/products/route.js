import { Products } from "@/models/Products";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const data = await req.json();
    console.log(data);

    const productDoc = await Products.create(data);

    if (!productDoc) {
      throw new Error("No se pudo crear el producto");
    }

    return NextResponse.json({
      data: { message: "Producto creado exitosamente!!" },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message || "Error al crear el producto",
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { _id, ...data } = await req.json();

    const updateProduct = await Products.findOneAndUpdate({ _id }, data);

    if (!updateProduct) {
      throw new Error("Producto no encontrado para actualizar");
    }

    return NextResponse.json({
      data: { message: "Datos actualizados" },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message || "Error al actualizar producto",
      status: 500,
    });
  }
}

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const _id = req.nextUrl.searchParams.get("id");
  const stage = req.nextUrl.searchParams.get("stage");
  const specie = req.nextUrl.searchParams.get("specie");
  const kgGift = req.nextUrl.searchParams.get("kg-gifts");
  const sale = req.nextUrl.searchParams.get("offer");
  const specific = req.nextUrl.searchParams.get("specific");

  if (_id) {
    const singleProduct = await Products.findOne({ _id });
    return NextResponse.json(singleProduct);
  }

  if (kgGift) {
    const kilogramOfGift = kgGift === "true";
    const kgGiftsProductsDoc = await Products.find({ kilogramOfGift });
    return NextResponse.json(kgGiftsProductsDoc);
  }

  if (sale) {
    const offer = sale === "true";
    const offerProductsDoc = await Products.find({ offer });
    return NextResponse.json(offerProductsDoc);
  }

  if (stage && specie) {
    const productsDoc = await Products.find({ stage, specie });
    return NextResponse.json(productsDoc);
  }

  if (specie && specific) {
    const specificProductsDoc = await Products.find({ specie, specific });
    return NextResponse.json(specificProductsDoc);
  }

  return NextResponse.json(await Products.find());
}

export async function DELETE(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const _id = req.nextUrl.searchParams.get("id");

    const deleteProduct = await Products.deleteOne({ _id });

    if (!deleteProduct) {
      throw new Error("Error al eliminar producto");
    }

    return NextResponse.json({
      data: { message: "Producto eliminado" },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message || "Error al eliminar producto",
      status: 500,
    });
  }
}
