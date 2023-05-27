import Footer from "../components/shared/Footer";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Layout from "../components/shared/Layout";
import styled from "styled-components";

const MainLayout: React.FC = (props) => {
  return (
    <LayoutBody>
      <Header />
      <Layout>
        <Outlet />
      </Layout>
      <Footer />
    </LayoutBody>
  );
};

export default MainLayout;

const LayoutBody = styled.div``;
