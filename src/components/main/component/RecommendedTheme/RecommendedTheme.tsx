import { useQuery } from "@tanstack/react-query";
import { getRecommended } from "api/mainApi";
import SectionTitle from "components/main/common/SectionTitle";
import SwiperCarousel from "components/main/common/SwiperCarousel";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Autoplay } from "swiper";
import { SwiperSlide } from "swiper/react";
import BestThemePoster from "../BestTheme/BestThemePoster";
import RecommendedThemePoster from "./RecommendedThemePoster";
interface IRecommendedThemeData {
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

export default function RecommendedTheme() {
  const navigator = useNavigate();

  const recommended = useQuery(["getRecommended"], getRecommended, {
    staleTime: Infinity,
    onError: () => navigator("/error"),
  });

  if (recommended.isLoading) {
    return null;
  }

  return (
    <Container>
      <SectionTitle>이런 테마는 어떠세요?</SectionTitle>
      <RecommendedThemeCarouselSection>
        <SwiperCarousel slidePerView={3}>
          {recommended.data.map((item: IRecommendedThemeData) => {
            return (
              <SwiperSlide key={item.id}>
                <RecommendedThemePoster data={item} />
              </SwiperSlide>
            );
          })}
        </SwiperCarousel>
      </RecommendedThemeCarouselSection>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  margin-top: 20px;
`;

const RecommendedThemeCarouselSection = styled.div`
  display: flex;
  padding: 0 10px;
  width: 100%;
  overflow: hidden;
`;