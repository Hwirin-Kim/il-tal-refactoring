import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../page/MainPage";
import ThemePage from "../page/ThemePage";
import DetailTheme from "../page/DetailThemePage";
import DetailCompanyPage from "../page/DetailCompanyPage";
import MyPage from "../page/MyPage";
import ErrorPage from "../page/ErrorPage";
import CompanyPage from "../page/CompanyPage";
import MainLayout from "../page/MainLayout";
import MyPageLayout from "../page/MyPageLayout";
import KakaoLogin from "../components/modal/KakaoLogin";
import SearchPage from "../page/SearchPage";
import ScrollOnTop from "../utils/ScrollOnTop";

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollOnTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/kakao/callback" element={<KakaoLogin />} />
          <Route path="/theme" element={<ThemePage />} />
          <Route path="/theme/:id" element={<DetailTheme />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/company/:id" element={<DetailCompanyPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
        <Route element={<MyPageLayout />}>
          <Route path="/myaccount" element={<MyPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
