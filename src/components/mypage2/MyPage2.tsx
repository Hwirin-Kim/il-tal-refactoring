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
import MyReviewList from "./components/myReview/MyReviewList";
import MyLikeThemeList from "./common/myLikeList/MyLikeItemList";
import MyLikeItem from "./common/myLikeList/MyLikeItem";

export interface ILikeThemeData {
  companyName: string;
  id: number;
  reviewCnt: number;
  themeImgUrl: string;
  themeLikeCnt: number;
  themeName: string;
  themeScore: number;
}
export interface ILikeCompanyData {
  id: number;
  companyName: string;
  companyImgUrl: string;
  companyScore: number;
  companyUrl: string;
  location: string;
  address: string;
  phoneNumber: string;
  workHour: string;
  totalReviewCnt: number;
  totalLikeCnt: number;
}

export default function MyPage2() {
  const userData = useQuery(["getMyPage"], api.getMyPage);
  const myLikeThemes = useQuery(["myLikeThemes"], api.getMyTheme);
  const myLikeCompanies = useQuery(["myLikeCompanies"], api.getMyCompany);

  const navigator = useNavigate();
  const { isLogin } = useLoginCheck();
  console.log(userData.data);
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

  if (
    userData.isLoading ||
    myLikeThemes.isLoading ||
    myLikeCompanies.isLoading
  ) {
    return null;
  }

  return (
    <Container>
      <UserInfo
        achieveBadgeCnt={userData.data.achieveBadgeCnt}
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
      <MyReviewList />

      <MyLikeThemeList
        length={myLikeThemes.data.length}
        sectionTitle="내가 찜한 테마"
        url="/mypage/mythemes"
      >
        {myLikeThemes.data.slice(0, 3).map((data: ILikeThemeData) => {
          return (
            <MyLikeItem
              key={data.id}
              img={data.themeImgUrl}
              topText={data.themeName}
              bottomText={data.companyName}
            />
          );
        })}
      </MyLikeThemeList>
      <MyLikeThemeList
        length={myLikeCompanies.data.length}
        sectionTitle="내가 찜한 업체"
        url="/mypage/mycompanies"
      >
        {myLikeCompanies.data.slice(0, 3).map((data: ILikeCompanyData) => {
          return (
            <MyLikeItem
              key={data.id}
              img={data.companyImgUrl}
              topText={data.companyName}
              bottomText={data.location}
            />
          );
        })}
      </MyLikeThemeList>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.8rem;
  margin-bottom: 100px;
`;
