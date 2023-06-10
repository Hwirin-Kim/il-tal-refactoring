import { useQuery } from "@tanstack/react-query";
import { getBest } from "api/mainApi";
import SectionTitle from "components/main/common/SectionTitle";
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
      <SectionTitle>인기 테마</SectionTitle>
      <BestThemeCarouselSection>
        <SwiperCarousel width={200}>
          {best.data.map((item: IBestThemeData, index: number) => {
            return (
              <SwiperSlide>
                <BestThemePoster key={item.id} data={item} rank={index + 1} />
              </SwiperSlide>
            );
          })}
        </SwiperCarousel>
      </BestThemeCarouselSection>
      <BestThemeListSection>
        {best.data.map((item: IBestThemeData, index: number) => {
          return <BestThemePoster key={item.id} data={item} rank={index + 1} />;
        })}
      </BestThemeListSection>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  margin-top: 50px;
`;

const BestThemeCarouselSection = styled.div`
  width: 100%;
  @media (min-width: 650px) {
    display: none;
  }
`;

const BestThemeListSection = styled.div`
  display: none;
  @media (min-width: 650px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
  }
`;
