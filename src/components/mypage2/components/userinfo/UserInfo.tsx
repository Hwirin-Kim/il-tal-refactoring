import ProgressBar from "components/common/ProgressBar";
import BadgeIcon from "components/mypage2/common/BadgeIcon";
import React, { useState } from "react";
import styled from "styled-components";
import setting from "../../../../asset/img/settings.png";
import NicknameForm from "./NicknameForm";

interface IUserInfoProps {
  nickname: string;
  mainBadgeName: string;
  mainBadgeImg: string;
}

export default function UserInfo({
  nickname,
  mainBadgeName,
  mainBadgeImg,
}: IUserInfoProps) {
  const [isEditModeOn, setIsEditModeOn] = useState(false);

  return (
    <Container>
      <Wrapper>
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
              <UserId>kimhuirin</UserId>
            </UserInfoTextWrapper>
          )}
        </TextWrapper>
        <ProgressBar num={7} maxNum={10}>
          7 / 10
        </ProgressBar>
        <SettingButton
          src={setting}
          onClick={() => {
            setIsEditModeOn((prev) => !prev);
          }}
        />
      </Wrapper>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 60px;
`;

const Wrapper = styled.div`
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
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8rem;
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
`;

const UserId = styled.div`
  font-size: 0.8rem;
  color: white;
`;

const SettingButton = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;
`;
