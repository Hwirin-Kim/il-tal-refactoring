import BadgeImg from "components/main/common/BadgeImg";
import { badgeTitle } from "components/main/common/badgeTitle";
import ProgressBar from "components/common/ProgressBar";
import styled from "styled-components";
import { devices } from "styles/devices";

interface IUserDataType {
  mainBadgeImg: string;
  achieveBadgeCnt: number;
  nickname: string;
  totalAchieveCnt: number;
  badgeImgUrl: string[];
  mainBadgeName: string;
}
interface IMainUserInfoProps {
  data: IUserDataType;
  blur: boolean;
  isLoading?: boolean;
}

export default function MainUserInfo({
  data,
  blur,
  isLoading,
}: IMainUserInfoProps) {
  const badgeScale = -20;

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      {blur && <LoginText>로그인 후 업적을 확인하세요!</LoginText>}
      <Wrapper blur={blur}>
        {data.mainBadgeImg === "none" ? (
          <NoneBadgeImg />
        ) : (
          <BadgeImg url={data.mainBadgeImg} scale={0} />
        )}

        <TextProgressWrapper>
          <BannerText>
            <span>{data.nickname ? `${data.nickname}님 ` : "Guest님 "}</span>
            탈출할 준비되셨나요?
          </BannerText>
          <ProgressText>{data.mainBadgeName}</ProgressText>
          <ProgressBar num={data.totalAchieveCnt} maxNum={10}>
            {data.totalAchieveCnt}/10
          </ProgressBar>
        </TextProgressWrapper>

        <BadgeList>
          <BadgeImg url={data.badgeImgUrl[0]} scale={badgeScale} />
          <BadgeImg url={data.badgeImgUrl[1]} scale={badgeScale} />
          <BadgeImg url={data.badgeImgUrl[2]} scale={badgeScale} />
        </BadgeList>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  width: calc(100% - 20px);
  height: 6rem;
  background-color: white;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50;
  bottom: -3rem;
  border-radius: 0.5rem;
  box-shadow: 5px 5px 8px rgba(41, 39, 39, 0.087);
  @media ${devices.md} {
    height: 6.5rem;
  }
  @media ${devices.lg} {
    height: 7rem;
  }
  @media ${devices.xlg} {
    height: 9rem;
    padding: 0 2rem;
  }
`;
const Wrapper = styled.div<{ blur: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  ${(props) => props.blur && "filter:blur(1rem)"}
`;

const NoneBadgeImg = styled.div`
  width: 75px;
  height: 75px;
  margin-left: 10px;

  border-radius: 50%;
  background-color: grey;
`;

const TextProgressWrapper = styled.div`
  box-sizing: border-box;
  padding: 0 1rem;
  width: 250px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BannerText = styled.div`
  margin: 10px 0;
  span {
    font-weight: bold;
  }
  @media ${devices.md} {
    display: none;
  }
`;

const LoginText = styled.div`
  z-index: 10;
  position: absolute;
  display: flex;
  text-align: center;

  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: black;
  @media ${devices.md} {
    font-size: 1.3rem;
  }
`;

const BadgeList = styled.div`
  display: none;

  @media ${devices.md} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 250px;
  }
  @media ${devices.xlg} {
    width: 350px;
  }
`;

const ProgressText = styled.div`
  display: none;
  @media${devices.md} {
    display: flex;
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`;
