import React from "react";
import styled from "styled-components";

export default function BottomSheet() {
  return (
    <Container>
      <Test />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const Test = styled.div`
  width: 100%;
  height: 50vh;
  background-color: blue;
`;
