import React, { useState } from "react";
import styled from "styled-components";

import logo from "../../../asset/HeaderLogo.png";
import { useNavigate } from "react-router-dom";
import { useLoginCheck } from "components/context/LoginCheckContext";
import LoginRegisterForm from "../../modal/LoginRegisterForm";
import Modal from "components/modal/Modal";
import { devices } from "styles/devices";
import companyImg from "../../../asset/mobile/mobile-menu-company.png";
import themeImg from "../../../asset/mobile/mobile-menu-theme.png";
import mapImg from "../../../asset/mobile/mobile-menu-map.png";
import mypageImg from "../../../asset/mobile/mobile-menu-mypage.png";
import Swal from "sweetalert2";

export default function BottomMenuBar() {
  const navigator = useNavigate();
  const { isLogin } = useLoginCheck();
  const [loginModal, setLoginModal] = useState(false);

  const warningMessage = () => {
    Swal.fire({
      title: "공사중...",
      text: "개발중 입니다! 😢",
      icon: "warning",
    });
  };

  return (
    <Container>
      <Btn onClick={() => navigator("/company")}>
        {" "}
        <Img size={27} src={companyImg} />
        업체별
      </Btn>
      <Btn onClick={() => navigator("/theme")}>
        {" "}
        <Img size={27} src={themeImg} />
        테마별
      </Btn>
      <MainBtn onClick={() => navigator("/")}>
        <Img size={70} src={logo} alt="home" />
      </MainBtn>
      <Btn onClick={warningMessage}>
        {" "}
        <Img size={27} src={mapImg} />
        내주변 방탈출
      </Btn>
      {isLogin ? (
        <Btn onClick={() => navigator("/mypage")}>
          {" "}
          <Img size={27} src={mypageImg} />
          마이페이지
        </Btn>
      ) : (
        <Btn onClick={() => setLoginModal(true)}>로그인</Btn>
      )}
      {loginModal ? (
        <Modal closeModal={() => setLoginModal(false)}>
          <LoginRegisterForm setLoginModal={setLoginModal} />
        </Modal>
      ) : null}
    </Container>
  );
}
const Container = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  position: relative;
  @media ${devices.md} {
    display: none;
  }
`;

const Btn = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  line-height: 1.2rem;
  cursor: pointer;
`;
const Img = styled.img<{ size: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  object-fit: cover;
`;

const MainBtn = styled.div`
  z-index: 999;
  background-color: white;
  width: 70px;
  height: 70px;
  border-radius: 50px;
  border: 1px solid var(--color-grey-btn);
  margin-top: -30px;
  cursor: pointer;
`;
