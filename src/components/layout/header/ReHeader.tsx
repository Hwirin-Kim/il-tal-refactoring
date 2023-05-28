import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginRegisterForm from "../../modal/LoginRegisterForm";
import Modal from "../../modal/Modal";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { headerClicked, loginCheck } from "../../../api/store";
import SearchForm from "../../search/SearchForm";
import logo from "../../../asset/HeaderLogo.png";
import Swal from "sweetalert2";
import { UserInfoInSessionStorage } from "components/types";
import MenuButton from "../common/MenuButton";
import { devices } from "styles/devices";

const ReHeader = (props: { color?: string }) => {
  //페이지 이동에 사용
  const navigator = useNavigate();

  //로그인 모달창 토글 스테이트
  const [isLogin, setIsLogin] = useState(true);

  //로그인 체크 전역 스테이트
  const [loginState, setLoginState] = useRecoilState(loginCheck);
  //로그아웃
  //로그아웃
  const onLogout = () => {
    Swal.fire({
      title: "로그아웃 하시겠습니까?",
      text: "로그아웃을 하면 후기를 작성할 수 없어요! 😢",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("userinfo");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        setLoginState(false);
      }
    });
  };

  //로그인 체크 후 스테이트값 변경
  const getUserInfo = (): UserInfoInSessionStorage | null => {
    const userinfo = sessionStorage.getItem("userinfo");
    if (userinfo) {
      return JSON.parse(userinfo);
    }
    return null;
  };

  useEffect(() => {
    const userinformation = getUserInfo();
    if (userinformation) {
      setLoginState(true);
    }
  }, [setLoginState]);

  //로고 클릭시 홈이동
  const onClickLogo = () => {
    navigator("/");
  };

  //업체 클릭시 업체페이지 이동
  const onClickCompany = () => {
    navigator("/company");
  };

  //테마 클릭시 테마페이지 이동
  const onClickGenre = () => {
    navigator("/theme");
  };

  return (
    <Container>
      <Layout>
        <LeftButtonWrapper>
          <MenuButton onClick={onClickLogo}>
            <img src={logo} alt="logo" />
          </MenuButton>
          <MenuButton onClick={onClickCompany}>업체별</MenuButton>
          <MenuButton onClick={onClickGenre}>테마별</MenuButton>
        </LeftButtonWrapper>

        <SearchForm />

        <RightButtonWrapper>
          {loginState ? (
            <>
              <MenuButton onClick={() => navigator("/myaccount")}>
                마이페이지
              </MenuButton>
              <FiLogOut
                size="30"
                onClick={() => {
                  onLogout();
                }}
              />
            </>
          ) : (
            <MenuButton onClick={() => setIsLogin(false)}>로그인</MenuButton>
          )}
        </RightButtonWrapper>
      </Layout>
      {isLogin ? null : (
        <Modal closeModal={() => setIsLogin(true)}>
          <LoginRegisterForm setIsLogin={setIsLogin} />
        </Modal>
      )}
    </Container>
  );
};
export default ReHeader;

const Container = styled.header`
  height: 4rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  background-color: white;
  @media ${devices.md} {
    position: sticky;
    top: 0;
    z-index: 10;
  }
  @media ${devices.lg} {
    height: 97px;
  }
`;
const Layout = styled.div`
  height: 92%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  @media ${devices.md} {
    justify-content: space-between;
    max-width: 1280px;
  }
`;

const LeftButtonWrapper = styled.div`
  display: none;
  @media ${devices.md} {
    height: 100%;
    max-width: 400px;
    display: flex;
    justify-content: space-between;
  }
`;
const RightButtonWrapper = styled.div`
  display: none;
  @media ${devices.md} {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
