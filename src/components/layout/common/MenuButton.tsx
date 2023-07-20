import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";

interface IButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const MenuButton: React.FC<IButtonProps> = ({ onClick, children }) => {
  return <Container onClick={onClick}>{children}</Container>;
};
export default MenuButton;

const Container = styled.button`
  height: 100%;
  min-width: 100px;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  @media ${devices.xlg} {
    font-size: 1.15rem;
  }
`;
