import ScrollToTop from "components/common/ScrollToTop";
import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";
import MyCompanyList from "./components/myCompanyPage/MyCompanyList";

export default function MyCompanyPage() {
  return (
    <Container>
      <PageTitle>내가 찜한 업체</PageTitle>
      <MyCompanyList />
      <ScrollToTop />
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0.8rem;
  margin-bottom: 3rem;
`;

const PageTitle = styled.div`
  margin-top: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 2rem;

  @media ${devices.md} {
    font-size: 1.5rem;
  }
`;
