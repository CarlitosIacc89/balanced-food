import { Orders } from "@/models/Orders";
import { Products } from "@/models/Products";
import { User } from "@/models/User";
import moment from "moment";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const date = new Date();
    const hour = date
      .toLocaleTimeString("en-AR", { hour12: false })
      .slice(0, 5);

    const data = await req.json();
    const sales = data.sale;

    //Inicio calculo de la ganancia de ventas de cada orden entrante
    let totalRevenue = 0;
    sales.forEach((item) => {
      const revenue =
        item.publicPrice * item.cantidad - item.basePrice * item.cantidad;
      console.log(revenue);
      totalRevenue += revenue;
    });
    //Fin

    console.log("La suma de las diferencias es:", totalRevenue);

    const orderItems = []; //Creacion del array para las compras del usuario

    //Incio de actualizacion del stock de los productos con respectos a las ordenes recibidas
    for (let i = 0; i < sales.length; i++) {
      const product = await Products.findOneAndUpdate(
        { title: sales[i].title },
        { $inc: { quantity: -sales[i].cantidad, sales: sales[i].cantidad } },
        { new: true }
      );
      if (!product) {
        throw new Error(`No se encontro el producto ${sales[i].title}`);
      }

      //Para insertar en la raiz de cada usuario las compras que va realizando
      orderItems.push({
        title: product.title,
        price: product.offer
          ? parseInt(product.publicPrice) -
            (product.discount / 100) * parseInt(product.publicPrice)
          : product.publicPrice,
        quantity: sales[i].cantidad,
      });
    }

    const userClient = await User.findOne({ email: data.emailClient }).exec(); //Busqueda del usuario mediante el email

    //En la orden insertamos la orden entrante (...data) y le insertamos el nombre de usuario y el id que hizo la compra, junto con la fecha, y la hora y la ganancia neta
    const orderData = {
      ...data,
      userClient: {
        user: userClient.name,
        _id: userClient._id,
      },
      createdAt: moment().format("DD/MM/YYYY"),
      hour,
      revenueOrder: totalRevenue,
    };

    //Al usuario que realizo la compra le agregamos las compras realizadas, con la fecha, el total facturado y los productos comprados (items)
    userClient.purchasesMade.push({
      createdAt: orderData.createdAt,
      total: orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      items: orderItems,
    });

    await userClient.save(); //Guardamos esos cambios en el usuario

    const orderDoc = await Orders.create(orderData); //Creamos la orden

    if (!orderDoc) {
      throw new Error("No se pudo procesar la orden");
    }
    return NextResponse.json({ message: "Orden creada con exito!" });
  } catch (error) {
    console.log(`Error al procesar la venta: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const ordersDoc = await Orders.find();

  return NextResponse.json(ordersDoc);
}

export async function DELETE(req) {
  await mongoose.connect(process.env.MONGO_URL);

  try {
    const _id = req.nextUrl.searchParams.get("id");
    const deleteOrder = await Orders.deleteOne({ _id });

    if (!deleteOrder) {
      throw new Error("Hubo un error al eliminar la orden");
    }

    return NextResponse.json({
      data: { message: "Orden eliminada con exito" },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message || "Error al eliminar orden",
      status: 500,
    });
  }
}
