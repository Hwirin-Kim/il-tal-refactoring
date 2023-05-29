import { useLoginCheck } from "components/context/LoginCheckContext";
import useRouteOnClick from "hooks/useRouteOnClick";
import styled from "styled-components";
import { devices } from "styles/devices";
import logo from "../../../asset/HeaderLogo.png";
import BottomMenuBar from "../mobileMenu/BottomMenuBar";
import FooterCredits from "./FooterCredits";

const ReFooter = () => {
  return (
    <Container>
      <FooterCredits />
      <BottomMenuBar />
    </Container>
  );
};

export default ReFooter;

const Container = styled.footer`
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 1;
  width: 100%;
  margin-top: 2rem;
  height: 50px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: center;
  align-items: center;

  .layout {
    height: 92%;
    width: 1440px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Logo = styled.div`
  display: flex;
  /* margin: 0 30px; */
  align-items: center;
  font-size: 48px;
`;
