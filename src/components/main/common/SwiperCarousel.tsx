import React from "react";
import styled from "styled-components";
import { Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination, SwiperOptions } from "swiper";

type BreakPointType = {
  [width: number]: SwiperOptions;
};

interface ISwiperCarouselProps {
  children: React.ReactNode;
  width?: number;
  slidePerView: number;
  loop: boolean;
  pagination: boolean;
  spaceBetween: number;
  slidesPerGroup: number;
  breakpoints: BreakPointType;
}
/**
 *
 * @children으로 들어오는 아이템들 "SwiperSlide"로 감싸주기
 * @width 아이템 하나의 너비
 * @slidePerView 화면에 보일 아이템 개수
 * @loop true인 경우 무한 캐러셀
 * @pagination true인경우 페이지네이션 보임
 * @spaceBetween 아이템 사이 간격
 * @slidesPerGroup 한번에 넘길 아이템 수
 * @breakpoints {화면크기 : {slidersPerView: 보여줄갯수}}
 */
export default function SwiperCarousel({
  children,
  width,
  slidePerView,
  loop,
  pagination,
  spaceBetween,
  slidesPerGroup,
  breakpoints,
}: ISwiperCarouselProps) {
  return (
    <CustomSwiper
      width={width}
      slidesPerView={slidePerView}
      slidesPerGroup={slidesPerGroup}
      spaceBetween={spaceBetween}
      pagination={pagination}
      loop={loop}
      breakpoints={breakpoints}
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
