import React, { useState } from "react";
import styled from "styled-components";
import MenuButton from "../common/MenuButton";
import logo from "../../../asset/HeaderLogo.png";
import useRouteOnClick from "hooks/useRouteOnClick";
import { useNavigate } from "react-router-dom";
import { useLoginCheck } from "components/context/LoginCheckContext";
import LoginRegisterForm from "../../modal/LoginRegisterForm";
import Modal from "components/modal/Modal";
export default function BottomMenuBar() {
  const navigator = useNavigate();
  const { isLogin } = useLoginCheck();
  const [loginModal, setLoginModal] = useState(false);
  return (
    <Container>
      <MenuButton>
        <Img src={logo} alt="home" />
      </MenuButton>
      <MenuButton onClick={() => navigator("/company")}>업체별</MenuButton>
      <MenuButton onClick={() => navigator("/theme")}>테마별</MenuButton>
      {isLogin ? (
        <MenuButton onClick={() => navigator("/myaccount")}>
          마이페이지
        </MenuButton>
      ) : (
        <MenuButton onClick={() => setLoginModal(true)}>로그인</MenuButton>
      )}
      {loginModal ? (
        <Modal closeModal={() => setLoginModal(false)}>
          <LoginRegisterForm setLoginModal={setLoginModal} />
        </Modal>
      ) : null}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Img = styled.img`
  width: 50px;
`;
