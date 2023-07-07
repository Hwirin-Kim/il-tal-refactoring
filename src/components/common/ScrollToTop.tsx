import React from "react";
import styled from "styled-components";
export default function ScrollToTop() {
  const onClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return <ScrollToTopBtn onClick={onClick}>TOP</ScrollToTopBtn>;
}
const ScrollToTopBtn = styled.div`
  background-color: var(--color-main);
  color: white;
  position: fixed;
  z-index: 999;
  font-size: 0.8rem;
  bottom: 60px;
  right: 20px;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;
