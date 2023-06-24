import BadgeIcon from "components/mypage2/common/BadgeIcon";
import React from "react";
import styled from "styled-components";

export default function UserInfo() {
  return (
    <Container>
      <Wrapper>
        <BadgeIcon />
        <TextWrapper>
          <BadgeTitle>위대한 첫걸음</BadgeTitle>
          <UserInfoTextWrapper>
            <Nickname>휘리리린</Nickname>
            <UserId>kimhuirin</UserId>
          </UserInfoTextWrapper>
        </TextWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  background-color: var(--color-main);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div``;

const BadgeTitle = styled.div`
  font-size: 1.1rem;
  border: 1px solid white;
  border-radius: 1rem;
  padding: 5px 8px;
`;

const UserInfoTextWrapper = styled.div``;

const Nickname = styled.div``;

const UserId = styled.div``;
