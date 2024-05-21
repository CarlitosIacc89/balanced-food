"use client";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Modal from "./Modal";

const RelatedCarrousel = ({ relatedProducts, text }) => {
  const [slidesPerView, setSlidesPerView] = useState(calculateSlidesPerView());
  const [modal, setModal] = useState(false);

  useEffect(() => {
    function handleResize() {
      setSlidesPerView(calculateSlidesPerView());
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [modal]);

  function calculateSlidesPerView() {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 768) {
        return 1;
      } else if (window.innerWidth <= 1024) {
        return 2;
      } else {
        return 4;
      }
    }

    return 4;
  }
  return (
    <div className="bg-white mt-24 p-4 mb-14 rounded-lg">
      {modal && <Modal {...{ modal, setModal }} />}
      <h2 className="text-center text-xl md:text-3xl mb-8 font-bold text-gray-700">
        {text}
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={slidesPerView}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {relatedProducts &&
          relatedProducts?.map((pro) => (
            <SwiperSlide key={pro._id}>
              <div className="mb-12 mt-4">
                <ProductItem item={pro} {...{ modal, setModal }} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default RelatedCarrousel;
