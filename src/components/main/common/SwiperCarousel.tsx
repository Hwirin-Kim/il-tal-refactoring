import React from "react";
import styled from "styled-components";
import { Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

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
      slidesPerGroup={2}
      spaceBetween={10}
      pagination={true}
      loop={true}
      breakpoints={{ 650: { slidesPerView: 4 } }}
      modules={[Pagination]}
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
  width: calc(100% - 20px);
  /* width: ${(props) => (props.width ? `${props.width}px` : "100%")}; */
  overflow: visible;
  .swiper-pagination {
    bottom: -20px;
  }
`;
