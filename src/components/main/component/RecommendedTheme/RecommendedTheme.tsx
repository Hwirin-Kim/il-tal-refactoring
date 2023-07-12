import { useQuery } from "@tanstack/react-query";
import { getRecommended } from "api/mainApi";
import SectionTitle from "components/common/SectionTitle";
import SwiperCarousel from "components/main/common/SwiperCarousel";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SwiperSlide } from "swiper/react";
import BestThemePoster from "../BestTheme/BestThemePoster";

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
        <SwiperCarousel
          slidePerView={2}
          loop={true}
          pagination={true}
          slidesPerGroup={2}
          spaceBetween={10}
          breakpoints={{ 650: { slidesPerView: 3 }, 768: { slidesPerView: 4 } }}
        >
          {recommended.data.map((item: IRecommendedThemeData) => {
            return (
              <SwiperSlide key={item.id}>
                <BestThemePoster data={item} />
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
  padding-bottom: 30px;
  overflow: hidden;
`;

const RecommendedThemeCarouselSection = styled.div`
  display: flex;

  width: 100%;
`;
