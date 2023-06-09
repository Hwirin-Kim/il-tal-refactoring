import { useQuery } from "@tanstack/react-query";
import { getMyReview } from "api/myAccount";
import SectionTitle from "components/common/SectionTitle";
import SwiperCarousel from "components/main/common/SwiperCarousel";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { devices } from "styles/devices";
import Swiper from "swiper";
import { SwiperSlide } from "swiper/react";
import MyReview from "./MyReview";

export interface IMyReviewData {
  comment: string;
  difficulty: number;
  id: number;
  playDate: string;
  playTime: number;
  score: number;
  success: boolean;
  themeImgUrl: string;
  themeName: string;
}

export default function MyReviewList() {
  const myReviews = useQuery(["myReviews"], getMyReview);
  const noReview = "남긴 리뷰가 없습니다. 리뷰를 남겨보세요!";

  const navigator = useNavigate();

  const onClickToReview = () => {
    navigator("/mypage/reviews/1");
  };

  if (myReviews.isLoading) {
    return null;
  }

  return (
    <Container>
      <TopWrapper>
        <SectionTitle>내가 남긴 리뷰</SectionTitle>
        <MorePages onClick={onClickToReview}>more {">"}</MorePages>
      </TopWrapper>
      <SliderSection>
        {myReviews.data.length === 0 ? (
          <NoReview>{noReview}</NoReview>
        ) : (
          <SwiperCarousel
            slidePerView={3}
            loop={false}
            pagination={false}
            slidesPerGroup={1}
            spaceBetween={5}
            breakpoints={{
              650: { slidesPerView: 4 },
            }}
          >
            {myReviews.data.map((data: IMyReviewData, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <MyReview data={data} />
                </SwiperSlide>
              );
            })}
          </SwiperCarousel>
        )}
      </SliderSection>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  margin-top: 2rem;
  @media ${devices.md} {
    margin-top: 2.5rem;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MorePages = styled.div`
  font-weight: bold;
  cursor: pointer;
`;

const NoReview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderSection = styled.div`
  width: 100%;
  overflow: hidden;
`;
