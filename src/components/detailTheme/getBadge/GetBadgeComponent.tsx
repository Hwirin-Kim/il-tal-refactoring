import styled, { keyframes } from "styled-components";
import Badge from "./Badge";
import { useEffect, useState } from "react";

interface BadgeData {
  badgeExplain: string;
  badgeFailCnt: number;
  badgeImgUrl: string;
  badgeName: string;
  badgeSuccessCnt: number;
  id: number;
}
interface GetBadgeComponentProps {
  data: BadgeData;
}

export default function GetBadgeComponent() {
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
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <Container>
      {showTitle && <Title>뱃지 획득!</Title>}
      {showBadge && <Badge />}
      {showBadgeInfo && (
        <BadgeInfo>
          <BadgeName>열번 찍힌 나무</BadgeName>
          <BadgeExplain>이 정도로 넘어질 당신이 아닙니다.</BadgeExplain>
          <BadgeRequire>뱃지 조건 : 실패 10회</BadgeRequire>
          <BadgeExplain>
            획득한 뱃지는 마이페이지에서 확인 가능 합니다.
          </BadgeExplain>
        </BadgeInfo>
      )}
      <CloseBtn>확인</CloseBtn>
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
`;

const BadgeName = styled.span``;

const BadgeExplain = styled.p``;

const BadgeRequire = styled.p``;

const CloseBtn = styled.button``;
