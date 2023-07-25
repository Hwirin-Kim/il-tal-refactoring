import styled, { keyframes } from "styled-components";
import Badge from "./Badge";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { badgeRequired } from "components/mypage/components/mybadge/badgeRequierd";
import { BadgeData } from "../Review/ThemeReview";

interface GetBadgeComponentProps {
  badgeData: BadgeData;
  setIsGetBadge: Dispatch<SetStateAction<boolean>>;
}

export default function GetBadgeComponent({
  setIsGetBadge,
  badgeData,
}: GetBadgeComponentProps) {
  const [showTitle, setShowTitle] = useState(true);
  const [showBadge, setShowBadge] = useState(false);
  const [showBadgeInfo, setShowBadgeInfo] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowTitle(false);
      setShowBadge(true);
    }, 1800);

    const timer2 = setTimeout(() => {
      setShowBadgeInfo(true);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <Container>
      {showTitle && <Title>뱃지 획득!</Title>}
      {showBadge && <Badge badgeImgUrl={badgeData.badgeImgUrl} />}
      {showBadgeInfo && (
        <BadgeInfo>
          <BadgeName>{badgeData.badgeName}</BadgeName>
          <BadgeExplain>{badgeData.badgeExplain}</BadgeExplain>
          <BadgeRequire>
            뱃지 조건 :{" "}
            {badgeRequired(badgeData.badgeSuccessCnt, badgeData.badgeFailCnt)}
          </BadgeRequire>
          <NoticeText>
            획득한 뱃지는 마이페이지에서 확인 가능 합니다.
          </NoticeText>
          <CloseBtn onClick={() => setIsGetBadge(false)}>확인</CloseBtn>
        </BadgeInfo>
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 250px;
  height: 300px;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;

const fadeInAndEnlargeAnimation = keyframes`
  0% {
    opacity: 0;
    font-size: 2rem;
  }
  20% {
    opacity: 1;
    font-size: 2.5rem;
  }
  100% {
    opacity: 0;
    font-size:2.5rem;
  }
`;

const slideInFromBottom = keyframes`
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity:1
  }
`;

const Title = styled.h1`
  animation: ${fadeInAndEnlargeAnimation} 2s linear;
`;

const BadgeInfo = styled.div`
  animation: 2s ease-in-out 1 forwards ${slideInFromBottom};
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const BadgeName = styled.p`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const BadgeExplain = styled.p`
  font-style: italic;
  text-align: center;
  margin-top: 0.5rem;
`;

const BadgeRequire = styled.p`
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const NoticeText = styled.p`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  text-align: center;
  color: grey;
`;

const CloseBtn = styled.button`
  margin: 1rem auto 0 auto;
  background-color: var(--color-main);
  border: 1px solid var(--color-main);
  color: white;
  padding: 0.2rem 1rem;
  border-radius: 0.5rem;
`;
