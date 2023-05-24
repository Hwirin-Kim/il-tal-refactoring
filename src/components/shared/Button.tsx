import React from "react";
import styled from "styled-components";

/**
 * @onClick 버튼 이벤트 관련
 * @disabled on/off 효과 제어
 * @label 버튼 이름
 * @position absolute, relative, ..
 */
interface ButtonProps {
  width?: string;
  height?: string;
  position?: string;
  disabled?: boolean;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  label?: string;
  onClick?: (e: React.FormEvent) => void;
}

export const Button = (props: ButtonProps) => {
  return <ButtonStyle {...props}>{props.label}</ButtonStyle>;
};

const ButtonStyle = styled.button<ButtonProps>`
  position: ${(props) => props.position};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.backgroundColor || `#ffffff`};
`;
