import { useQuery } from "@tanstack/react-query";
import { getBest } from "api/mainApi";
import SectionTitle from "components/common/SectionTitle";
import SwiperCarousel from "components/main/common/SwiperCarousel";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SwiperSlide } from "swiper/react";
import BestThemePoster from "./BestThemePoster";

interface IBestThemeData {
  id: number;
  themeImgUrl: string;
  themeName: string;
  companyName: string;
  genre: string;
  themeScore: number;
  totalLikeCnt: number;
  reviewCnt: number;
  themeLikeCheck: boolean;
}

export default function BestTheme() {
  const navigator = useNavigate();

  const best = useQuery(["getBest"], getBest, {
    staleTime: Infinity,
    onError: () => {
      navigator("/error");
    },
  });

  if (best.isLoading) {
    return null;
  }

  return (
    <Container>
      <SectionTitle marginLeft={8}>인기 테마</SectionTitle>
      <BestThemeCarouselSection>
        <SwiperCarousel
          slidePerView={2}
          loop={false}
          pagination={true}
          slidesPerGroup={2}
          spaceBetween={10}
          breakpoints={{ 650: { slidesPerView: 3 }, 768: { slidesPerView: 4 } }}
        >
          {best.data.map((item: IBestThemeData, index: number) => {
            return (
              <SwiperSlide>
                <BestThemePoster key={item.id} data={item} rank={index + 1} />
              </SwiperSlide>
            );
          })}
        </SwiperCarousel>
      </BestThemeCarouselSection>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  margin-top: 100px;
  overflow: hidden;
  box-sizing: border-box;
  padding-bottom: 2rem;
`;

const BestThemeCarouselSection = styled.div`
  width: 100%;

  /* @media (min-width: 650px) {
    display: none;
  } */
`;
