import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
interface LayoutProps {
  children: ReactNode;
}
function Layout({ children }: LayoutProps) {
  return <STLayout>{children}</STLayout>;
}
export default Layout;

const STLayout = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin: 0 auto;
`;
