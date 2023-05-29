import { useQuery } from "@tanstack/react-query";
import { useLoginCheck } from "components/context/LoginCheckContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { kakaologin } from "../../api";

const KakaoLogin = () => {
  //redirect URI에서 인가코드 추출하여 KAKAO_CODE변수에 저장
  const location = useLocation();
  const KAKAO_CODE = location.search.split("=")[1];

  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useLoginCheck();

  //redirect URI에 인가코드가 오면 인가코드 추출한 걸로 카카오로그인 불러오고 토큰 저장하기
  const { data } = useQuery(["getakaotoken"], () => kakaologin(KAKAO_CODE), {
    onSuccess: (res) => {
      sessionStorage.setItem("access_token", res.headers.access_token);
      sessionStorage.setItem("refresh_token", res.headers.refresh_token);
      sessionStorage.setItem("userinfo", JSON.stringify(res.data));
      setIsLogin(true);
      navigate("/");
    },
    onError: (err) => {
      alert("로그인에 실패했습니다.");
    },
  });

  return <div>Login...</div>;
};

export default KakaoLogin;
