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
import Image from "next/image"
import heroPhoto from "../../../../../public/images/hero-photo.png"

const Hero = () => {
  return (
    <div className="h-[30vh] md:h-[50vh] lg:h-[70vh] w-full border-b border-ui-border-base relative bg-[#1875F0] rounded-b-3xl">
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
          className="mySwiper text-white top-10"
        >
          <SwiperSlide className="bg-[#002496] shadow-xl rounded-xl">
            <Image
              src={heroPhoto}
              width={1491}
              height={713}
              alt="hero-photo-1"
              className="rounded-xl"
            />
          </SwiperSlide>
          <SwiperSlide className="bg-[#002496] shadow-xl rounded-xl">
            <Image
              src={heroPhoto}
              width={1240}
              height={600}
              alt="hero-photo-2"
              className="rounded-xl"
            />
          </SwiperSlide>
          <SwiperSlide className="bg-[#002496] shadow-xl rounded-xl">
            <Image
              src={heroPhoto}
              width={1240}
              height={600}
              alt="hero-photo-3"
              className="rounded-xl"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Hero
