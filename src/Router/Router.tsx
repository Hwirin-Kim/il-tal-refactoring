import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../page/MainPage";
import ThemePage from "../page/ThemePage";
import DetailTheme from "../page/DetailThemePage";
import DetailCompanyPage from "../page/DetailCompanyPage";
import MyPage from "../page/MyPage";
import ErrorPage from "../page/ErrorPage";
import CompanyPage from "../page/CompanyPage";
import MainLayout from "../page/MainLayout";
import KakaoLogin from "../components/modal/KakaoLogin";
import SearchPage from "../page/SearchPage";
import ScrollOnTop from "../utils/ScrollOnTop";
import BestTheme from "components/main/component/BestTheme/BestTheme";
import MyPage2 from "components/mypage2/MyPage2";
import MyReviewPage from "components/mypage2/MyReviewPage";
import MyThemePage from "components/mypage2/MyThemePage";
import MyCompanyPage from "components/mypage2/MyCompanyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollOnTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage2 />} />
          <Route path="/mypage/reviews/:page" element={<MyReviewPage />} />
          <Route path="/mypage/themes" element={<MyThemePage />} />
          <Route path="/mypage/companies" element={<MyCompanyPage />} />
          <Route path="/kakao/callback" element={<KakaoLogin />} />
          <Route path="/theme" element={<ThemePage />} />
          <Route path="/theme/:id" element={<DetailTheme />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/company/:id" element={<DetailCompanyPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/myaccount" element={<MyPage />} />
          <Route path="/test" element={<BestTheme />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
