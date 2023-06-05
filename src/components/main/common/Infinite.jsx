import React, { useState } from "react";
import styled from "styled-components";
import "./infinite.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Carousel } from "utils/carousel";
const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM39h_MI29Vc0A10s9cr4McEqW8PGNRm4jCg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzTTH47nsUHWfmXiXYdKtUkXeiFFlI64pSaQ&usqp=CAU",
];

export default function InfiniteCarousel() {
  return (
    <div style={{ width: "400px" }}>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide key={i}>
              <div style={{ width: "300px", overflow: "hidden" }}>
                <img src={image} style={{ width: "500px" }} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
