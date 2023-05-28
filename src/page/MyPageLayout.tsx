import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import { Outlet } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";

const MyPageLayout: React.FC = (props) => {
  return (
    <LayoutBody>
      <Header color={`#f2fcf9`} />
      <Layout>
        <Outlet />
      </Layout>
      <Footer />
    </LayoutBody>
  );
};

export default MyPageLayout;

const LayoutBody = styled.div`
  background-color: rgba(6, 195, 135, 0.05);
`;
