import ScrollToTop from "components/common/ScrollToTop";
import React from "react";
import styled from "styled-components";
import MyThemeList from "./components/myThemePage/MyThemeList";

export default function MyThemePage() {
  return (
    <Container>
      <PageTitle>내가 찜한 테마</PageTitle>
      <MyThemeList />
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
`;
