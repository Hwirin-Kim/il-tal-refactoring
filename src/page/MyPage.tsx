import { useQuery } from "@tanstack/react-query";
import { useLoginCheck } from "components/context/LoginCheckContext";
import * as api from "../api/myAccount";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserInfo from "../components/mypage/components/userinfo/UserInfo";
import styled from "styled-components";
import Tendency from "../components/mypage/components/tendency/Tendency";
import MyBadgeList from "../components/mypage/components/mybadge/MyBadgeList";
import MyReviewList from "../components/mypage/components/myReview/MyReviewList";
import MyLikeThemeList from "../components/mypage/common/myLikeList/MyLikeItemList";
import MyLikeItem from "../components/mypage/common/myLikeList/MyLikeItem";
import { devices } from "styles/devices";
import WebUserInfo from "../components/mypage/components/userinfo/WebUserInfo";
import { SwiperSlide } from "swiper/react";

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

export default function MyPage() {
  const userData = useQuery(["getMyPage"], api.getMyPage);
  const myLikeThemes = useQuery(["myLikeThemes"], () =>
    api.getMyThemes({ pageParam: 0 })
  );
  const myLikeCompanies = useQuery(["myLikeCompanies"], () =>
    api.getMyCompanies({ pageParam: 0 })
  );
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const navigator = useNavigate();
  const { isLogin } = useLoginCheck();

  useEffect(() => {
    if (isInitialLoading) {
      // isInitialLoading이 true일 때 첫 번째 호출을 무시
      setIsInitialLoading(false);
      return;
    }

    if (!isLogin) {
      navigator("/");
      Swal.fire({
        icon: "error",
        title: "로그인을 해주세요.",
        text: "로그인 한 사용자만 이용 가능합니다.",
      });
    }
  }, [isLogin, navigator, userData.isLoading]);

  const onClickToPage = (url: string, id: number) => {
    navigator(`/${url}/${id}`);
  };

  if (myLikeThemes.isLoading || myLikeCompanies.isLoading) {
    return null;
  }

  return (
    <Container>
      <UserInfoTendencyWrapper>
        <UserInfo />
        <Tendency />
      </UserInfoTendencyWrapper>
      <MyBadgeList />
      <MyReviewList />

      <MyLikeThemeList
        length={myLikeThemes.data.content.length}
        sectionTitle="내가 찜한 테마"
        url="/mypage/themes"
      >
        {myLikeThemes.data.content.map((data: ILikeThemeData) => {
          return (
            <SwiperSlide key={data.id}>
              <MyLikeItem
                onClick={() => onClickToPage("theme", data.id)}
                img={data.themeImgUrl}
                topText={data.themeName}
                bottomText={data.companyName}
              />
            </SwiperSlide>
          );
        })}
      </MyLikeThemeList>

      <MyLikeThemeList
        length={myLikeCompanies.data.content.length}
        sectionTitle="내가 찜한 업체"
        url="/mypage/companies"
      >
        {myLikeCompanies.data.content.map((data: ILikeCompanyData) => {
          return (
            <SwiperSlide key={data.id}>
              <MyLikeItem
                onClick={() => onClickToPage("company", data.id)}
                img={data.companyImgUrl}
                topText={data.companyName}
                bottomText={data.location}
              />
            </SwiperSlide>
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
  margin-bottom: 6rem;
`;

const UserInfoTendencyWrapper = styled.div`
  display: block;
  @media ${devices.lg} {
    display: flex;
  }
`;
