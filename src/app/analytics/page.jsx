
import GraphicBrands from '@/components/analitycs/GraphicBrands';
import GraphicUsers from '@/components/analitycs/GraphicUsers';
import Orders from '@/components/analitycs/Orders';
import RegisteredUsers from '@/components/analitycs/RegisteredUsers';
import Revenue from '@/components/analitycs/Revenue';
import Visits from '@/components/analitycs/Visits';
import UserAdmin from '@/components/layout/UserAdmin';
import React from 'react'

const getData = async () => {
  try {
    let productsApi = `http://localhost:3000/api/products`,
      usersApi = `http://localhost:3000/api/users`,
      visitsApi = `http://localhost:3000/api/visits`,
      ordersApi = `http://localhost:3000/api/orders`,
      productsFetch = fetch(productsApi, { cache: "no-store" }),
      usersFetch = fetch(usersApi, { cache: "no-store" }),
      visitsFetch = fetch(visitsApi, { cache: "no-store" }),
      ordersFetch = fetch(ordersApi, { cache: "no-store" }),
      [productsRes, usersRes, visitsRes, ordersRes] = await Promise.all([
        productsFetch,
        usersFetch,
        visitsFetch,
        ordersFetch
      ]);

    if (!productsRes.ok) {
      throw new Error("Hubo un error al obtener los productos");
    }
    if (!usersRes.ok) {
      throw new Error("Hubo un error al obtener los usuarios");
    }
    if (!visitsRes.ok) {
      throw new Error("Hubo un error al obtener las visitas");
    }
    if (!ordersRes.ok) {
      throw new Error("Hubo un error al obtener las ordenes");
    }
    

    const productsData = await productsRes.json();
    const usersData = await usersRes.json();
    const visitsData = await visitsRes.json();
    const ordersData = await ordersRes.json();


    return { productsData, usersData, visitsData, ordersData };
  } catch (error) {
    return { error: error.message || "Hubo un error al obtener los datos" };
  }
};

const AnalyticsPage = async () => {
    const data = await getData()

  return (
    <section className='mt-8'>
        <UserAdmin/>
        <div className=' flex flex-col gap-4 max-w-6xl mx-auto mt-14 bg-gradient-to-t from-gray-200 to-white p-4 rounded-lg'>
          <div className='flex flex-col sm:flex-row justify-evenly gap-4 mx-auto sm:mx-0'>
             <Revenue orders={data?.ordersData}/>
             <Visits visits={data?.visitsData}/>
             <Orders orders={data?.ordersData}/>
             <RegisteredUsers users={data?.usersData}/>
          </div>
          <div className='flex flex-col md:flex-row mt-14'>
            <GraphicBrands products={data?.productsData}/>
             <GraphicUsers users={data.usersData}/>
          </div>
        </div>
    </section>
  )
}

export default AnalyticsPage