import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import { Outlet } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import ReHeader from "components/layout/header/ReHeader";
import ReFooter from "components/layout/footer/ReFooter";
import BottomMenuBar from "components/layout/mobileMenu/BottomMenuBar";

const MainLayout: React.FC = (props) => {
  return (
    <LayoutBody>
      <ReHeader />
      <Layout>
        <Outlet />
      </Layout>
      <ReFooter />
    </LayoutBody>
  );
};

export default MainLayout;

const LayoutBody = styled.div`
  width: 100vw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;
