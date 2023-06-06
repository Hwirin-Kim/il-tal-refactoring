import React from "react";
import styled from "styled-components";

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
interface IBestThemePosterProps {
  data: IBestThemeData;
  rank: number;
}

export default function BestThemePoster({ data, rank }: IBestThemePosterProps) {
  return (
    <Container>
      <Rank>{rank}</Rank>
      <Img src={data.themeImgUrl} />
      <ThemeInfoWrapper>
        <CompanyName>{data.companyName}</CompanyName>
        <ThemeName>{data.themeName}</ThemeName>
      </ThemeInfoWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 250px;
  height: 150px;
  position: relative;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
  position: absolute;
  border-radius: 0.5rem;
`;
const Rank = styled.div`
  z-index: 1;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  width: 1.5rem;
  height: 2.5rem;
  left: 0.5rem;
  top: -0.5rem;
  border-radius: 0 0 0.3rem 0.3rem;
  position: absolute;
  background-color: var(--color-main);
`;

const ThemeInfoWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  text-align: left;
  padding: 0 1rem;
  bottom: 0.5rem;
`;

const CompanyName = styled.p`
  font-size: 0.8rem;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ThemeName = styled.p`
  margin-top: 0.5rem;
  font-size: 1.3rem;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
