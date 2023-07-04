import React from "react";
import styled from "styled-components";

interface ThemeInfoCardProps {
  themeImgUrl: string;
  genre: string;
  themeName: string;
  companyName: string;
  themeScore: number;
  reviewCnt: number;
}

export default function ThemeInfoCard({
  themeImgUrl,
  genre,
  themeName,
  companyName,
  themeScore,
  reviewCnt,
}: ThemeInfoCardProps) {
  return (
    <ThemeInfoWrapper>
      <ThemePoster src={themeImgUrl} />
      <ThemeInfo>
        <Genre>{genre}</Genre>
        <ThemeName>{themeName}</ThemeName>
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
`;

const ThemePoster = styled.img`
  width: 4.5rem;
  height: 6.5rem;
  border-radius: 0.5rem;
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
