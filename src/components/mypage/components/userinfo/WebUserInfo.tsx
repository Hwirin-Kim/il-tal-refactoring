import BadgeIcon from "components/mypage/common/BadgeIcon";
import React, { useState } from "react";
import styled from "styled-components";
import { devices } from "styles/devices";
import confidential from "../../../../asset/confidential.png";
import NicknameForm from "./NicknameForm";
import setting from "../../../../asset/img/settings.png";
interface WebUserInfoProps {
  nickname: string;
  achieveBadgeCnt: number;
  mainBadgeName: string;
  mainBadgeImg: string;
}

export default function WebUserInfo({
  nickname,
  mainBadgeName,
  mainBadgeImg,
  achieveBadgeCnt,
}: WebUserInfoProps) {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  return (
    <Container>
      <TopSecretWaterMark src={confidential} />
      <TopSecretText>SECRET AGENT</TopSecretText>
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
      <UserReport>
        <RowText>
          <ReportItem>ID : </ReportItem>
          <ReportItem>
            {" "}
            {sessionStorage.getItem("userinfo") === null
              ? ""
              : JSON.parse(sessionStorage.getItem("userinfo")!).username}
          </ReportItem>
        </RowText>
        <RowText>
          <ReportItem>대표뱃지 : </ReportItem>
          <ReportItem>{mainBadgeName}</ReportItem>
        </RowText>
        <RowText>
          <ReportItem>획득한 뱃지 : </ReportItem>
          <ReportItem>{achieveBadgeCnt}개</ReportItem>
        </RowText>
        <RowText>
          <ReportItem>탈출성공률 : </ReportItem>
          <ReportItem>55% (55 / 100)</ReportItem>
        </RowText>
      </UserReport>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 400px;
  border: 1px solid var(--color-main);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
`;

const TopSecretWaterMark = styled.img`
  position: absolute;
  object-fit: cover;
  opacity: 0.15;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const TopSecretText = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const UserReport = styled.div``;

const RowText = styled.p`
  margin-bottom: 0.8rem;
`;

const ReportItem = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;

const WebNickNameWrap = styled.div`
  margin-top: 1rem;

  display: flex;
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

const Nickname = styled.div`
  font-weight: bold;
  color: white;
  margin-right: 0.5rem;
  @media ${devices.md} {
    font-size: 1.5rem;
    color: black;
    display: inline-block;
    margin-bottom: 1rem;
  }
`;

const UserInfoTextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;
