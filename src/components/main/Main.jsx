import { useQuery } from "@tanstack/react-query";
import { SwiperSlide } from "swiper/react";
import { getAchieve, getBest, getHOf, getRandom } from "../../api/mainApi";
import { Carousel } from "../../utils/carousel";
import BestUser from "./component/BestUser";
import PopSkel from "./PopSkel";
import PopularTheme from "./component/PopularTheme";
import RecommandTheme from "./component/RecommandTheme";
import Notice from "../modal/Notice";
import { useRecoilValue } from "recoil";

import { useNavigate } from "react-router-dom";
import MainScreen from "./component/MainScreen";
import GuestScreen from "./component/GuestScreen";
import * as Styled from "./mainStyle";
import NoticeList from "../modal/NoticeList";
import { useLoginCheck } from "components/context/LoginCheckContext";

const Main = () => {
  //로그인 유무 판별
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useLoginCheck();
  const achieve = useQuery(["getAchieve", isLogin], getAchieve, {
    enabled: sessionStorage.userinfo ? true : false,
  });
  const best = useQuery(["getBest"], getBest, {
    staleTime: Infinity,
    onError: () => {
      navigate("/error");
    },
  });
  const random = useQuery(["getRandom"], getRandom, {
    staleTime: Infinity,
    onError: (err) => {
      navigate("/error");
    },
  });
  const hallOfFame = useQuery(["getHof"], getHOf, {
    onSuccess: () => {},
    onError: (err) => {
      navigate("/error");
    },
  });
  const totalAchievement = 10;
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM39h_MI29Vc0A10s9cr4McEqW8PGNRm4jCg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzTTH47nsUHWfmXiXYdKtUkXeiFFlI64pSaQ&usqp=CAU",
  ];
  return (
    <Styled.Container>
      {isLogin ? (
        achieve.isLoading ? (
          <MainScreen isLoading={achieve.isLoading} loginCheckState={isLogin} />
        ) : (
          <MainScreen
            loginCheckState={isLogin}
            isLoading={achieve.isLoading}
            nickname={achieve.data.nickname}
            mainBadgeName={achieve.data.mainBadgeName}
            badgeImgUrl={achieve.data.badgeImgUrl}
            mainBadgeImg={achieve.data.mainBadgeImg}
            bgcolor={achieve.data.bgcolor}
            achieveBadgeCnt={achieve.data.achieveBadgeCnt}
            totalAchievement={totalAchievement}
          />
        )
      ) : (
        <GuestScreen />
      )}
      <Styled.HeaderTitle>인기 테마</Styled.HeaderTitle>
      {best.isLoading ? (
        <Styled.PopularThemeWrap>
          <PopSkel />
          <PopSkel />
          <PopSkel />
        </Styled.PopularThemeWrap>
      ) : (
        <Styled.PopularThemeWrap>
          <PopularTheme
            rank={1}
            id={best.data[0].id}
            companyName={best.data[0].companyName}
            themeName={best.data[0].themeName}
            themeImgUrl={best.data[0].themeImgUrl}
          />
          <PopularTheme
            rank={2}
            id={best.data[1].id}
            companyName={best.data[1].companyName}
            themeName={best.data[1].themeName}
            themeImgUrl={best.data[1].themeImgUrl}
          />
          <PopularTheme
            rank={3}
            id={best.data[2].id}
            companyName={best.data[2].companyName}
            themeName={best.data[2].themeName}
            themeImgUrl={best.data[2].themeImgUrl}
          />
        </Styled.PopularThemeWrap>
      )}

      <Styled.HeaderTitle>이런 테마는 어떠세요?</Styled.HeaderTitle>
      <Styled.RecommandThemeWrap>
        {random.isLoading ? (
          <>
            <SwiperSlide>
              <RecommandTheme
                companyName={""}
                themeName={""}
                themeImgUrl={""}
              />
            </SwiperSlide>
          </>
        ) : (
          // <Carousel>
          //   {random.data.map((data, index) => (
          //     <SwiperSlide key={"Recommand" + index}>
          //       <RecommandTheme
          //         id={data.id}
          //         companyName={data.companyName}
          //         themeName={data.themeName}
          //         themeImgUrl={data.themeImgUrl}
          //       />
          //     </SwiperSlide>
          //   ))}
          // </Carousel>
          <Carousel>
            {images.map((data, index) => (
              <SwiperSlide key={"Recommand" + index}>
                <RecommandTheme
                  id="아이디"
                  companyName="회사"
                  themeName="이름"
                  themeImgUrl={data}
                />
              </SwiperSlide>
            ))}
          </Carousel>
        )}
      </Styled.RecommandThemeWrap>
      <Styled.HeaderTitle>명예의 전당</Styled.HeaderTitle>
      {hallOfFame.isLoading ? (
        <Styled.BestUserWrap>
          <BestUser />
        </Styled.BestUserWrap>
      ) : (
        <Styled.BestUserWrap>
          {hallOfFame.data.content.map((data, index) => (
            <BestUser
              key={"BestUser" + index}
              number={index + 1}
              imgUrl={data.mainBadgeImg}
              userName={data.nickname}
              completed={data.achieveBadgeCnt}
              badge={data.mainBadgeName}
              goal={totalAchievement}
              escape={data.totalAchieveCnt}
              bgcolor={"#123123"}
            />
          ))}
        </Styled.BestUserWrap>
      )}
      <div className="notice">
        <NoticeList />
      </div>
    </Styled.Container>
  );
};

export default Main;
