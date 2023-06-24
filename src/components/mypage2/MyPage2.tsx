import { useQuery } from "@tanstack/react-query";
import { useLoginCheck } from "components/context/LoginCheckContext";
import * as api from "../../api/myAccount";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserInfo from "./components/userinfo/UserInfo";
import styled from "styled-components";

export default function MyPage2() {
  const User = useQuery(["getMyPage"], api.getMyPage);

  const navigator = useNavigate();
  const { isLogin } = useLoginCheck();
  useEffect(() => {
    if (!isLogin && !User.isLoading) {
      navigator("/");
      Swal.fire({
        icon: "error",
        title: "로그인을 해주세요.",
        text: "로그인 한 사용자만 이용 가능합니다.",
      });
    }
  }, [isLogin, navigator, User.isLoading]);

  return (
    <Container>
      <UserInfo />
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.8rem;
`;
