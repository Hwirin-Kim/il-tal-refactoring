import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getDetailTheme, wishTheme } from "../../api/ThemeApi";
import Modal from "../modal/Modal";
import ThemeReview from "./Review/ThemeReview";
import ThemeSynopsis from "./ThemeSynopsis";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { useRecoilValue } from "recoil";
// import { loginCheck } from "../../api/store";
import Swal from "sweetalert2";
import ThemePicComponent from "./ThemePicComponent";
import { useLoginCheck } from "components/context/LoginCheckContext";
import { devices } from "styles/devices";
import { addComma } from "utils/addComma";
import NewCommentForm from "./Review/NewCommentForm";
const DetailTheme = () => {
  //상세페이지 조회용 id
  const { id } = useParams();
  let themeId: number;
  if (id) {
    themeId = parseInt(id, 10);
  }

  //로그인 유무 판별
  const { isLogin, setIsLogin } = useLoginCheck();

  //포스터 사진 모달창
  const [isPic, setIsPic] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  //navigate
  const navigate = useNavigate();

  //테마 상세정보 조회 GET 요청 useQuery
  const { data, isLoading } = useQuery(["getDetail", isLogin], () =>
    getDetailTheme(id)
  );

  //데이터 refetch를 위한 쿼리클라이언트
  const queryClient = useQueryClient();

  //좋아요 회원만 가능하도록 알람띄우기
  const likeOnlyMember = () => {
    if (isLogin) {
      themeLike.mutate(themeId);
    } else {
      Swal.fire({
        title: "로그인 후 이용하세요!",
        text: "비회원은 좋아요를 보낼수 없어요 😢",
        icon: "warning",
      });
    }
  };

  //좋아요기능 mutation
  const themeLike = useMutation(
    (themeId: number) => wishTheme({ themeId: themeId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getDetail"]);
      },
    }
  );

  const difficult = (difficulty: number): string | undefined => {
    if (difficulty > 4) {
      return "매우어려움";
    } else if (difficulty > 3) {
      return "어려움";
    } else if (difficulty > 2) {
      return "보통";
    } else if (difficulty > 1) {
      return "쉬움";
    } else if (difficulty > 0) {
      return "매우쉬움";
    }
  };

  //로딩처리
  if (isLoading) {
    return <div>로딩중..</div>;
  }
  return (
    <Container>
      <ThemeInfoWrap>
        <ThemePic
          onClick={() => setIsPic(true)}
          src={data.data.themeImgUrl}
          alt="themePic"
        />
        <ThemeTextWrap>
          <LikeButtonWrapper textColor={data.data.themeLikeCheck}>
            {data.data.themeLikeCheck ? <BsSuitHeartFill /> : <BsSuitHeart />}
          </LikeButtonWrapper>
          <ThemeCompany>{data.data.companyName}</ThemeCompany>
          <ThemeTitle>{data.data.themeName}</ThemeTitle>
          <ThemeInfoWrapper>
            <Type>장르</Type>
            <ThemeInformation>{data.data.genre}</ThemeInformation>
            <Type>난이도</Type>
            <ThemeInformation>
              {difficult(data.data.difficulty)}
            </ThemeInformation>
            <Type>인원</Type>
            <ThemeInformation>
              {data.data.minPeople}인~{data.data.maxPeople}인
            </ThemeInformation>
            <Type>제한시간</Type>
            <ThemeInformation>{data.data.playTime}분</ThemeInformation>
            <Type>가격</Type>
            <ThemeInformation>{addComma(data.data.price)}원</ThemeInformation>
          </ThemeInfoWrapper>
          <ThemeBtnWrap>
            <BottomLikeButtonWrapper textColor={data.data.themeLikeCheck}>
              {data.data.themeLikeCheck ? <BsSuitHeartFill /> : <BsSuitHeart />}
            </BottomLikeButtonWrapper>
            <Btn onClick={() => navigate(`/company/${data.data.companyId}`)}>
              업체보기
            </Btn>
            <Btn bgColor={true} onClick={() => window.open(data.data.themeUrl)}>
              예약하기
            </Btn>
          </ThemeBtnWrap>
        </ThemeTextWrap>
      </ThemeInfoWrap>
      <ThemeSynopsis synopsis={data.data.synopsis} />
      {/* <NewCommentForm /> */}
      <ThemeReview props={data.data} />
      {isPic ? (
        <Modal closeModal={() => setIsPic(false)}>
          <ThemePicComponent
            pic={data.data.themeImgUrl}
            onClick={() => setIsPic(false)}
          />
        </Modal>
      ) : null}
    </Container>
  );
};
export default DetailTheme;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ThemeInfoWrap = styled.div`
  width: 100%;
  display: flex;
  margin-top: 0.5rem;
  box-sizing: border-box;
`;

const ThemePic = styled.img`
  height: 12rem;
  width: 9rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  object-fit: cover;
  cursor: pointer;
  @media ${devices.md} {
    height: 18rem;
    width: 16rem;
  }
  @media ${devices.lg} {
    height: 23rem;
    width: 21rem;
  }
`;
const ThemeTextWrap = styled.div`
  width: 100%;
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;

  position: relative;
  @media ${devices.md} {
    margin-left: 1rem;
  }
  @media ${devices.lg} {
    margin-left: 2rem;
  }
`;

const ThemeInfoWrapper = styled.div`
  width: 100%;
  margin: 10px 0px;
  display: grid;
  grid-template-columns: 5rem 1fr;
  grid-row-gap: 0.5rem;
  @media ${devices.md} {
    margin-top: 2rem;
    grid-row-gap: 1rem;
  }
  @media ${devices.lg} {
    grid-template-columns: 7rem 1fr;
    grid-row-gap: 1.5rem;
  }
`;

const Type = styled.span`
  font-size: 0.8rem;
  color: grey;
  @media ${devices.md} {
    font-size: 1rem;
  }
  @media ${devices.lg} {
    font-size: 1.3rem;
  }
`;
const ThemeInformation = styled.span`
  font-size: 0.8rem;
  @media ${devices.md} {
    font-size: 1rem;
  }
  @media ${devices.lg} {
    font-size: 1.3rem;
  }
`;

const ThemeCompany = styled.span`
  font-size: 0.65rem;
  color: grey;
  @media ${devices.md} {
    font-size: 0.9rem;
  }
`;
const ThemeTitle = styled.h1`
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  @media ${devices.md} {
    font-size: 1.5rem;
  }
  @media ${devices.lg} {
    font-size: 2rem;
    margin-top: 1rem;
  }
`;
const ThemeBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  @media ${devices.sm} {
    width: 23rem;
  }
  @media ${devices.lg} {
    width: 28rem;
  }
`;

const Btn = styled.div<{ bgColor?: boolean }>`
  height: 1.5rem;
  width: 5.5rem;
  cursor: pointer;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.bgColor && "background-color:var(--color-main)"};
  ${(props) => props.bgColor && "border:1px solid var(--color-main)"};
  ${(props) => props.bgColor && "color:white"};
  @media ${devices.sm} {
    width: 7rem;
    height: 2rem;
  }
  @media ${devices.lg} {
    width: 8rem;
    height: 2.3rem;
    font-size: 1rem;
  }
`;

const LikeButtonWrapper = styled.div<{ textColor: boolean }>`
  position: absolute;
  cursor: pointer;

  top: 0.5rem;
  right: 0;
  color: ${(props) => (props.textColor ? "var(--color-main)" : "black")};
  @media ${devices.sm} {
    display: none;
  }
`;

const BottomLikeButtonWrapper = styled.div<{ textColor: boolean }>`
  height: 1.5rem;
  width: 5.5rem;
  cursor: pointer;

  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 0.8rem;
  text-align: center;
  display: none;
  color: ${(props) => (props.textColor ? "var(--color-main)" : "black")};
  @media ${devices.sm} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7rem;
    height: 2rem;
  }

  @media ${devices.lg} {
    width: 8rem;
    height: 2.3rem;
    font-size: 1rem;
  }
`;
