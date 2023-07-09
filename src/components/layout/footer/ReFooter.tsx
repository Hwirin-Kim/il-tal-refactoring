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
  position: fixed;
  bottom: 0;
  background-color: white;
  z-index: 1;
  width: 100%;
  margin-top: 2rem;
  height: 55px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${devices.md} {
    height: 100px;
    position: static;
  }
`;
