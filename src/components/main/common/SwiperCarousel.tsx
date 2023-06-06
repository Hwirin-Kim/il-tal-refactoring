import React from "react";
import styled from "styled-components";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper";

interface ISwiperCarouselProps {
  children: React.ReactNode;
  width: number;
}
export default function SwiperCarousel({
  children,
  width,
}: ISwiperCarouselProps) {
  return (
    <CustomSwiper width={width} slidesPerView={1} spaceBetween={20} loop={true}>
      {children}
    </CustomSwiper>
  );
}

const CustomSwiper = styled(Swiper)<{ width: number }>`
  width: ${(props) => `${props.width}px`};
  overflow: visible;
`;
