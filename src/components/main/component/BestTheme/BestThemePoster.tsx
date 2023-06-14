import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";

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
  rank?: number;
}

export default function BestThemePoster({ data, rank }: IBestThemePosterProps) {
  return (
    <Container>
      {rank ? <Rank>{rank}</Rank> : null}
      <Img src={data.themeImgUrl} />
      <ThemeInfoWrapper>
        <CompanyName>{data.companyName}</CompanyName>
        <ThemeName>{data.themeName}</ThemeName>
      </ThemeInfoWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  @media (min-width: 650px) {
    width: 200px;
    height: 250px;
  }
  @media ${devices.md} {
    width: 240px;
    height: 280px;
  }
  @media ${devices.lg} {
    width: 300px;
    height: 340px;
  }
  @media ${devices.xlg} {
    width: 330px;
    height: 370px;
  }
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
  font-size: 1.2rem;
  width: 1.5rem;
  height: 2.5rem;
  left: 0.5rem;
  top: -0.8rem;
  border-radius: 0 0 0.3rem 0.3rem;
  position: absolute;
  background-color: var(--color-main);
  @media ${devices.lg} {
    width: 2.5rem;
    height: 3.5rem;
    font-size: 1.8rem;
  }
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
  font-size: 0.7rem;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media ${devices.sm} {
    font-size: 0.9rem;
  }
  @media ${devices.md} {
    font-size: 1rem;
  }
  @media ${devices.lg} {
    font-size: 1.2rem;
  }
`;
const ThemeName = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media ${devices.sm} {
    font-size: 1.1rem;
  }
  @media ${devices.md} {
    font-size: 1.2rem;
  }
  @media ${devices.lg} {
    font-size: 1.4rem;
  }
`;
