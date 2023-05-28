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
  width: 100px;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  @media ${devices.lg} {
    font-size: 20px;
  }
`;
