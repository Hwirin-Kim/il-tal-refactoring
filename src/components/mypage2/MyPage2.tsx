import { useQuery } from "@tanstack/react-query";
import { useLoginCheck } from "components/context/LoginCheckContext";
import * as api from "../../api/myAccount";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserInfo from "./components/userinfo/UserInfo";
import styled from "styled-components";
import Tendency from "./components/tendency/Tendency";
import MyBadgeList from "./components/mybadge/MyBadgeList";
import SectionTitle from "components/common/SectionTitle";
import MyReview from "./components/myReview/MyReviewList";

export default function MyPage2() {
  const userData = useQuery(["getMyPage"], api.getMyPage);

  console.log(userData.data);
  const navigator = useNavigate();
  const { isLogin } = useLoginCheck();
  useEffect(() => {
    if (!isLogin && !userData.isLoading) {
      navigator("/");
      Swal.fire({
        icon: "error",
        title: "로그인을 해주세요.",
        text: "로그인 한 사용자만 이용 가능합니다.",
      });
    }
  }, [isLogin, navigator, userData.isLoading]);

  if (userData.isLoading) {
    return null;
  }

  return (
    <Container>
      <UserInfo
        nickname={userData.data.nickname}
        mainBadgeImg={userData.data.mainBadgeImg}
        mainBadgeName={userData.data.mainBadgeName}
      />
      <Tendency
        tendencyData={{
          lessScare: userData.data.lessScare,
          roomSize: userData.data.roomSize,
          lockStyle: userData.data.lockStyle,
          device: userData.data.device,
          interior: userData.data.interior,
          excitePreference: userData.data.excitePreference,
          stylePreference: userData.data.stylePreference,
          genrePreference: userData.data.genrePreference,
        }}
      />
      <MyBadgeList />
      <MyReview />
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.8rem;
  margin-bottom: 100px;
`;
