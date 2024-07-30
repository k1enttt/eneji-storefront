"use client"
import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import "./my-hero.css"

// import required modules
import { Keyboard, Pagination, Navigation } from "swiper/modules"

const Hero = () => {
  return (
    <div className="h-[60vh] w-full border-b border-ui-border-base relative bg-[#1875F0] rounded-b-3xl">
      <div className="content-container absolute inset-0 text-center">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Keyboard, Pagination, Navigation]}
          className="mySwiper rounded-xl text-white w-[77.5rem] h-[37.5rem] top-10"
        >
          <SwiperSlide className="bg-[#002496] shadow-xl">Slide 1</SwiperSlide>
          <SwiperSlide className="bg-[#002496] shadow-xl">Slide 2</SwiperSlide>
          <SwiperSlide className="bg-[#002496] shadow-xl">Slide 3</SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Hero
