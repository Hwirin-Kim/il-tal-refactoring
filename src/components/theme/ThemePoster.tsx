import styled from "styled-components";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { wishTheme } from "../../api/ThemeApi";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { useInView } from "react-intersection-observer";
import { useLoginCheck } from "components/context/LoginCheckContext";

const ThemePoster = ({ theme }) => {
  //페이지 이동에 사용
  const navigate = useNavigate();

  //쿼리 클라이언트 선언
  const queryClient = useQueryClient();

  //좋아요 기능 mutation
  const themeLike = useMutation((themeId) => wishTheme(themeId), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(["getThemeList"]);
      setLikeState(res.data.themeLikeCheck);
    },
  });

  //로그인 유무 판별
  const { isLogin, setIsLogin } = useLoginCheck();
  //좋아요 회원만 가능하도록 알람띄우기
  const likeOnlyMemeber = () => {
    if (isLogin) {
      themeLike.mutate({ themeId: theme.id });
    } else {
      Swal.fire({
        title: "로그인 후 이용하세요!",
        text: "비회원은 좋아요를 보낼수 없어요 😢",
        icon: "warning",
      });
    }
  };

  //좋아요 스테이트 (theme에서 체크여부를 바로 받으면 너무 느리게 바뀌므로 wishTheme요청값을 이용하기위해 사용)
  const [likeState, setLikeState] = useState(theme.themeLikeCheck);
  useEffect(() => {
    if (likeState) {
      return setLikeState(theme.themeLikeCheck);
    } else {
      return setLikeState(theme.themeLikeCheck);
    }
  }, [theme]);

  //화면에 보일때 보여줄 토글state
  const [showList, setShowList] = useState(false);

  //옵저버 스테이트
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  //옵저버에 감지되면 showList true로 상태변경 (이미지 Lazy loading)
  useEffect(() => {
    if (inView && !showList) {
      setShowList(true);
    }
  }, [inView, showList]);

  return (
    <Container>
      <ThemePic ref={ref} onClick={() => navigate(`/theme/${theme.id}`)}>
        {showList ? <img src={theme.themeImgUrl} alt="themePoster" /> : null}
      </ThemePic>
      <ThemeTextWrap>
        <ThemeTextHeader>{theme.companyName}</ThemeTextHeader>
        <ThemeTextTitle onClick={() => navigate(`/theme/${theme.id}`)}>
          {theme.themeName}
        </ThemeTextTitle>
        <ThemeTextGenre>{theme.genre}</ThemeTextGenre>
        <ThemeTextBottom>
          <div>
            <span className="star">★</span> {theme.themeScore}{" "}
            <span>({theme.reviewCnt})</span>
          </div>
          <div className="like" onClick={() => likeOnlyMemeber()}>
            {likeState ? (
              <BsSuitHeartFill color={"var(--color-main)"} />
            ) : (
              <BsSuitHeart />
            )}
          </div>
        </ThemeTextBottom>
      </ThemeTextWrap>
    </Container>
  );
};

export default ThemePoster;

const Container = styled.div`
  height: 440px;
  width: 340px;
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 18px 27px 0;
  box-sizing: border-box;
  scale: 1;

  &:hover {
    box-shadow: 0 4px 15px 1px rgba(6, 195, 135, 0.25);
    border: 1px solid var(--color-main);
  }
`;

const ThemePic = styled.div`
  height: 216px;
  width: 100%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  img {
    display: flex;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const ThemeTextWrap = styled.div`
  width: 340px;
  height: 224px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 5px;
`;
const ThemeTextHeader = styled.div`
  width: 310px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  color: grey;
  font-size: 20px;
`;
const ThemeTextTitle = styled.div`
  width: 310px;
  height: 80px;
  font-size: 23px;
  font-weight: bold;
  margin: 5px 0;
  display: flex;
  cursor: pointer;
`;
const ThemeTextGenre = styled.div`
  width: 310px;
  height: 35px;
  font-size: 16px;
  color: grey;
`;
const ThemeTextBottom = styled.div`
  width: 310px;
  height: 35px;
  font-size: 20px;

  display: flex;
  justify-content: space-between;
  .like {
    cursor: pointer;
    font-size: 25px;
  }
  span {
    color: gray;
  }
  .star {
    color: var(--color-main);
    font-size: 25px;
    font-weight: bold;
  }
`;
