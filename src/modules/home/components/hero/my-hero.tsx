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
    <>
      <div className="relative">
        <div className="-z-50 h-[9em] md:h-[23em] lg:h-[36em] absolute w-full border-b border-ui-border-base bg-[#1875F0] rounded-b-3xl"></div>
        <SwiperComponent />
      </div>
    </>
  )
}

export default Hero

const SwiperComponent = () => {
  return (
    <div className="pt-2 md:pt-8 hero-container">
      <Swiper
        slidesPerView={1.2} // for mobile view
        spaceBetween={16} // for mobile view
        centeredSlides={true}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className="mySwiper text-white top-4"
        breakpoints={{
          425: {
            slidesPerView: 1,
            spaceBetween: 20,
          }
        }}
      >
        <SwiperSlide className="bg-[#002496] shadow-xl rounded-xl">
          <Image
            src={heroPhoto}
            width={1491}
            height={713}
            alt="hero-photo-1"
            className="rounded-xl"
            priority
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
  )
}
