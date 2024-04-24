import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Provider from "@/components/Provider";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Domestic Pet",
  description: "Alimentos balanceados",
  author: "Carlos Soria",
  keywords:
    "alimentos para mascotas, alimento balanceado, comida para mascotas",
  openGraph: {
    title: "Alimentos balanceados",
    description: "Encuentra el alimento que necesitas al mejor precio",
    images: [
      {
        url: "http://localhost:3000/DomesticPet.jpg",
        width: 600,
        height: 400,
      },
    ],
    site_name: "Domestic Pet",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="http://localhost:3000/DomesticPet.jpg"
          type="image/x-icon"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className={roboto.className}>
        <Provider>
          <Header />
          <main className="mx-auto p-4 ">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
