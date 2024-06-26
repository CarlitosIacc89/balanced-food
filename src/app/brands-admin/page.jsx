"use client";
import Right from "@/components/icons/Right";
import UserAdmin from "@/components/layout/UserAdmin";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Confirm from "@/components/layout/Confirm";
import { useRouter } from "next/navigation";
import moment from "moment";

const PageBrandsAdmin = () => {
  const [brands, setBrands] = useState([]);
  const [deleteBrands, setDeleteBrands] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getBrands();
  }, []);

  function getBrands() {
    fetch("/api/brands")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Hubo un error al obtener las marcas");
        }
        res.json().then((data) => setBrands(data.brands));
      })
      .catch((error) => console.log(error));
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/brands`, {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Ups! Hubo un error al intentar eliminar la marca");
      }
      const data = await res.json();
      setDeleteConfirm(false);
      setDeleteBrands(null);
      getBrands();
    } catch (error) {
      return { error: error.message };
    }
  };

  return (
    <section className="mt-8  max-w-4xl mx-auto">
      <UserAdmin />
      {deleteConfirm && (
        <Confirm
          {...{
            deleteBrands,
            setDeleteBrands,
            setDeleteConfirm,
            deleteConfirm,
            handleDelete,
          }}
        />
      )}
      <div className="my-8 flex hover:bg-gray-200">
        <Link className="new-product" href={"/brands-admin/new"}>
          Crear nueva marca
          <Right />
        </Link>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Titulo
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Fecha de creacion
              </th>
              <th className="px-4 py-2">Accion</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {brands &&
              brands.map((brand) => (
                <tr key={brand._id} className="text-center">
                  <td className="whitespace-nowrap flex gap-4 items-center min-w-72 px-4 py-2 font-medium text-gray-900">
                    <div className=" flex w-[45px] h-[45px]">
                      <Image
                        className="object-contain"
                        src={brand.image}
                        width={45}
                        height={45}
                        alt="imagen"
                      />
                    </div>
                    {brand.title}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(brand.createdAd).format("DD/MM/YY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 space-x-1">
                    <Link
                      href={`/brands-admin/edit/${brand._id}`}
                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="inline-block rounded bg-red-400 px-4 py-2 text-xs font-medium text-white hover:bg-red-500"
                      onClick={() => {
                        setDeleteBrands(brand);
                        setDeleteConfirm(true);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PageBrandsAdmin;
