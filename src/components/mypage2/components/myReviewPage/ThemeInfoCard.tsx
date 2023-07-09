import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { devices } from "styles/devices";

interface ThemeInfoCardProps {
  themeImgUrl: string;
  genre: string;
  themeName: string;
  companyName: string;
  themeScore: number;
  reviewCnt: number;
  themeId: number;
}

export default function ThemeInfoCard({
  themeImgUrl,
  genre,
  themeName,
  companyName,
  themeScore,
  reviewCnt,
  themeId,
}: ThemeInfoCardProps) {
  const navigator = useNavigate();
  const onClickToTheme = () => {
    navigator(`/theme/${themeId}`);
  };

  return (
    <ThemeInfoWrapper>
      <ThemePoster src={themeImgUrl} onClick={onClickToTheme} />
      <ThemeInfo>
        <Genre>{genre}</Genre>
        <ThemeName onClick={onClickToTheme}>{themeName}</ThemeName>
        <CompanyName>{companyName}</CompanyName>
        <Score>
          <Star>★</Star>
          {themeScore}({reviewCnt})
        </Score>
      </ThemeInfo>
    </ThemeInfoWrapper>
  );
}

const ThemeInfoWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  @media ${devices.md} {
    display: flex;
    width: 15rem;
    margin-bottom: 0;
    margin-right: 2rem;
  }
`;

const ThemePoster = styled.img`
  width: 4.5rem;
  height: 6.5rem;
  border-radius: 0.5rem;
  object-fit: cover;
  margin: auto 0;
  cursor: pointer;
  @media ${devices.md} {
    width: 5.5rem;
    height: 7rem;
  }
`;

const ThemeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.6rem;
`;

const Genre = styled.p`
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const ThemeName = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  cursor: pointer;
`;

const CompanyName = styled.p`
  font-size: 0.9rem;
  color: grey;
  margin-bottom: 0.5rem;
`;

const Score = styled.p`
  font-size: 0.9rem;
`;

const Star = styled.span`
  color: var(--color-main);
`;
