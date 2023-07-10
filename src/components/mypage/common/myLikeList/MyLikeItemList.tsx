import SectionTitle from "components/common/SectionTitle";
import SwiperCarousel from "components/main/common/SwiperCarousel";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SwiperSlide } from "swiper/react";

interface MyLikeListProps {
  children: React.ReactNode;
  length: number;
  url: string;
  sectionTitle: string;
}

export default function MyLikeList({
  children,
  sectionTitle,
  length,
  url,
}: MyLikeListProps) {
  const noData = sectionTitle + "가 없습니다.";

  const navigator = useNavigate();

  const onClickToPage = () => {
    navigator(url);
  };

  return (
    <Container>
      <TopWrapper>
        <SectionTitle>{sectionTitle}</SectionTitle>
        <MorePages onClick={onClickToPage}>more {">"}</MorePages>
      </TopWrapper>
      <SliderSection>
        {length === 0 ? (
          <NoDataText>{noData}</NoDataText>
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
            {children}
          </SwiperCarousel>
        )}
      </SliderSection>
    </Container>
  );
}
const Container = styled.section`
  margin-top: 1rem;
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

const NoDataText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemList = styled.div`
  display: flex;
`;

const SliderSection = styled.div`
  width: 100%;
  overflow: hidden;
`;
