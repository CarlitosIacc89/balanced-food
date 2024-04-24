import { Visits } from "@/models/Visits";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const ipAddress = req.headers.get("x-forwarded-for");

    let visit = await Visits.findOne({ title: "Home" });

    if (!visit) {
      visit = await Visits.create({
        title: "Home",
        visits: 0,
        uniqueVisitors: [],
      });
    } else {
      // Si la página existe, verifico si uniqueVisitors está definido
      if (!visit.uniqueVisitors) {
        visit.uniqueVisitors = []; // Inicializo uniqueVisitors si no está definido
      }
    }

    // Verifico si la dirección IP ya está en la lista de visitantes únicos
    if (!visit.uniqueVisitors.includes(ipAddress)) {
      // Incremento el contador de visitas para la página de inicio
      visit.visits += 1;
      // Agrego la IP del cliente a la lista de visitantes únicos
      visit.uniqueVisitors.push(ipAddress);
      await visit.save();
    }

    return NextResponse.json({ visits: visit.visits });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export const matcher = {
  matcher: ["/"],
};
