"use client"

import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react'

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import ProductItem from './ProductItem';

const Carrousel = ({data}) => {

  return (
    <div className='my-10' >
    <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 1000,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        navigation
         pagination={{ clickable: true }}
        
        modules={[EffectCoverflow, Pagination, Navigation, Scrollbar]}
        className="mySwiper"
      >
        {data && data.map(product =>(
            <SwiperSlide key={product._id}>
                 <ProductItem item={product}/>
            </SwiperSlide>
        ))}
        
      </Swiper>
</div>
  )
}

export default Carrousel
