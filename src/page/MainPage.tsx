import BestTheme from "components/main/component/BestTheme/BestTheme";
import BestUser from "components/main/component/BestUser/BestUser";
import MainBanner from "components/main/component/MainBanner/MainBanner";
import RecommendedTheme from "components/main/component/RecommendedTheme/RecommendedTheme";

const MainPage = () => {
  return (
    <>
      <MainBanner />
      <BestTheme />
      <RecommendedTheme />
      <BestUser />
    </>
  );
};
export default MainPage;
