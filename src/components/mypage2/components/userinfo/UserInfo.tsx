import ProgressBar from "components/common/ProgressBar";
import BadgeIcon from "components/mypage2/common/BadgeIcon";
import React, { useState } from "react";
import styled from "styled-components";
import { devices } from "styles/devices";
import setting from "../../../../asset/img/settings.png";
import NicknameForm from "./NicknameForm";
import WebUserInfo from "./WebUserInfo";

interface IUserInfoProps {
  nickname: string;
  achieveBadgeCnt: number;
  mainBadgeName: string;
  mainBadgeImg: string;
}

export default function UserInfo({
  nickname,
  mainBadgeName,
  mainBadgeImg,
  achieveBadgeCnt,
}: IUserInfoProps) {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const totalBadgeCnt = 10;
  return (
    <Container>
      <MobileWrap>
        <BadgeIcon mainBadgeImg={mainBadgeImg} />
        <TextWrapper>
          <BadgeTitle>{mainBadgeName}</BadgeTitle>

          {isEditModeOn ? (
            <UserInfoTextWrapper>
              <NicknameForm
                nickname={nickname}
                setIsEditModeOn={setIsEditModeOn}
              />
            </UserInfoTextWrapper>
          ) : (
            <UserInfoTextWrapper>
              <Nickname>{nickname}</Nickname>
              <UserId>
                {" "}
                {sessionStorage.getItem("userinfo") === null
                  ? ""
                  : JSON.parse(sessionStorage.getItem("userinfo")!).username}
              </UserId>
            </UserInfoTextWrapper>
          )}
        </TextWrapper>
        <ProgressBar num={achieveBadgeCnt} maxNum={totalBadgeCnt}>
          {achieveBadgeCnt} / {totalBadgeCnt}
        </ProgressBar>
        <SettingButton
          src={setting}
          onClick={() => {
            setIsEditModeOn((prev) => !prev);
          }}
        />
      </MobileWrap>
      <WebWrap>
        <WebUserInfo
          achieveBadgeCnt={achieveBadgeCnt}
          nickname={nickname}
          mainBadgeImg={mainBadgeImg}
          mainBadgeName={mainBadgeName}
        />
      </WebWrap>
      {/* <WebWrap>
        <WebUserInfoWrap>
          <BadgeIcon mainBadgeImg={mainBadgeImg} />
          <WebNickNameWrap>
            {isEditModeOn ? (
              <UserInfoTextWrapper>
                <NicknameForm
                  nickname={nickname}
                  setIsEditModeOn={setIsEditModeOn}
                />
              </UserInfoTextWrapper>
            ) : (
              <UserInfoTextWrapper>
                <Nickname>{nickname}</Nickname>
              </UserInfoTextWrapper>
            )}{" "}
            <SettingButton
              src={setting}
              onClick={() => {
                setIsEditModeOn((prev) => !prev);
              }}
            />
          </WebNickNameWrap>
        </WebUserInfoWrap>
        <UserReport>
          <RowText>
            <ReportItem>ID : </ReportItem>
            <ReportItem>qwer1234</ReportItem>
          </RowText>
          <RowText>
            <ReportItem>대표뱃지 : </ReportItem>
            <ReportItem>무릎을 꿇지 않는자</ReportItem>
          </RowText>
          <RowText>
            <ReportItem>획득한 뱃지 : </ReportItem>
            <ReportItem>4개</ReportItem>
          </RowText>
          <RowText>
            <ReportItem>탈출성공률 : </ReportItem>
            <ReportItem>55% (55 / 100)</ReportItem>
          </RowText>
        </UserReport>
      </WebWrap> */}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 45px;
  @media ${devices.md} {
    width: 100%;
  }
  @media ${devices.lg} {
    width: 50%;
  }
`;

const MobileWrap = styled.div`
  box-sizing: border-box;
  padding: 0 0.5rem;
  width: 100%;
  height: 100px;
  border-radius: 0.5rem;
  position: relative;
  background: linear-gradient(
    252.9deg,
    #deff99 0%,
    #06c387 72.92%,
    #119b6f 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${devices.md} {
    display: none;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8rem;
  @media ${devices.md} {
    margin-left: 1rem;
    margin-top: auto;
    margin-bottom: 2rem;
  }
`;

const BadgeTitle = styled.span`
  width: fit-content;
  font-size: 0.8rem;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  padding: 3px 5px;
  margin-bottom: 0.5rem;
  @media ${devices.md} {
    font-size: 1.2rem;
    padding: 5px 15px;
    border-radius: 50px;
  }
`;

const UserInfoTextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const Nickname = styled.div`
  font-weight: bold;
  color: white;
  margin-right: 0.5rem;
  @media ${devices.md} {
    font-size: 1.5rem;
    color: black;
    display: inline-block;
  }
`;

const UserId = styled.div`
  font-size: 0.8rem;
  color: white;
  @media ${devices.md} {
    font-size: 1.2rem;
  }
`;

const SettingButton = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;
  @media ${devices.md} {
    position: static;
    display: inline-block;
  }
`;

const WebWrap = styled.div`
  display: none;
  @media ${devices.md} {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 2rem 1rem;
    border-radius: 1rem;
  }
`;

const WebUserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 0.8rem;
`;

const WebNickNameWrap = styled.div`
  margin-top: 0.5rem;
  display: flex;
`;

const UserReport = styled.div``;

const RowText = styled.p`
  margin-bottom: 0.5rem;
`;

const ReportItem = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;
