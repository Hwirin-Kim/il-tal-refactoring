import { useState } from "react";
import styled from "styled-components";
import { devices } from "styles/devices";

interface ThemeSynopsisProps {
  synopsis: string;
}

const ThemeSynopsis = ({ synopsis }: ThemeSynopsisProps) => {
  return (
    <Container>
      <Title>시놉시스</Title>
      <SynopTextWrapper>
        {synopsis.split("\\n").map((data, index) => {
          return <SynopText key={`sysnop${index}`}>{data}</SynopText>;
        })}
      </SynopTextWrapper>
    </Container>
  );
};

export default ThemeSynopsis;

const Container = styled.div`
  width: 100%;
  padding: 1rem 0;
  margin: 0.5rem 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  @media ${devices.lg} {
    margin-top: 2rem;
  }
`;
const Title = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  @media ${devices.md} {
    font-size: 1.1rem;
  }
  @media ${devices.lg} {
    margin-bottom: 0.8rem;
    font-size: 1.2rem;
  }
`;

const SynopText = styled.p`
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
  @media ${devices.md} {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  @media ${devices.lg} {
    font-size: 1.1rem;
  }
`;

const SynopTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
