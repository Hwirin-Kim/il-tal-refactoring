import React from "react";
import styled from "styled-components";
import { Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

interface ISwiperCarouselProps {
  children: React.ReactNode;
  width?: number;
  slidePerView: number;
}
export default function SwiperCarousel({
  children,
  width,
  slidePerView,
}: ISwiperCarouselProps) {
  return (
    <CustomSwiper
      width={width}
      slidesPerView={slidePerView}
      spaceBetween={10}
      loop={true}
      breakpoints={{ 650: { slidesPerView: 4 } }}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      // loopFillGroupWithBlank={true}
      // modules={[Autoplay]}
      // observer={true}
      // observeParents={true}
    >
      {children}
    </CustomSwiper>
  );
}

const CustomSwiper = styled(Swiper)<{ width?: number }>`
  width: ${(props) => (props.width ? `${props.width}px` : "110%")};
  overflow: visible;
`;
