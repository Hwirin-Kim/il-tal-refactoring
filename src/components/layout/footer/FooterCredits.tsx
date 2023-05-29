import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";
import logo from "../../../asset/HeaderLogo.png";

export default function FooterCredits() {
  const clorose = "https://github.com/clorose";
  const hwirin_Kim = "https://github.com/Hwirin-Kim";
  const hyemin0901 = "https://github.com/hyemin0901";
  const liam_Geni = "https://github.com/liam-Geni";
  const ggggraceful = "https://github.com/ggggraceful";
  const soojin_dev = "https://github.com/soojin-dev";
  return (
    <Layout>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>
      <STFooter>
        <span>Copyright &copy; 2022</span>
        <DevPart>UI/UX</DevPart>
        <DevInfo>전현주</DevInfo>
        <DevPart>FE</DevPart>
        <DevInfo onClick={() => window.open(clorose)}>정영훈</DevInfo>
        <DevInfo onClick={() => window.open(hwirin_Kim)}>김휘린</DevInfo>
        <DevInfo onClick={() => window.open(hyemin0901)}>박혜민</DevInfo>
        <DevPart>BE</DevPart>
        <DevInfo onClick={() => window.open(liam_Geni)}>이기재</DevInfo>
        <DevInfo onClick={() => window.open(ggggraceful)}>남궁은</DevInfo>
        <DevInfo onClick={() => window.open(soojin_dev)}>한수진</DevInfo>
      </STFooter>
    </Layout>
  );
}
const Layout = styled.footer`
  display: none;
  @media ${devices.md} {
    height: 92%;
    width: 1440px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const STFooter = styled.div`
  display: flex;
  align-items: center;
  color: grey;
`;
const DevPart = styled.span`
  margin: 3px;
  font-size: 1.25rem;
`;

const DevInfo = styled.span`
  margin: 5px;
`;

const Logo = styled.div`
  display: flex;
  /* margin: 0 30px; */
  align-items: center;
  font-size: 48px;
`;
