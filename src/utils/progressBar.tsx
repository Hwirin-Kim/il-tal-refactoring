import styled from "styled-components";

/**
 *  @param { Colors } bgcolor 색깔
 *  @param { Integer } completed 달성치
 *  @param { Integer } goal 목표치
 *  @param { Integer } height 높이 `1.2rem`
 */
interface ProgressBarType {
  bgcolor: string;
  completed: number;
  goal: number;
  height: string;
  width: string;
  shadow: string;
}
const ProgressBar = (props: ProgressBarType) => {
  const { bgcolor, completed, goal, height, width, shadow } = props;
  return (
    <Container height={height} width={width}>
      <FillerStyles
        color={bgcolor}
        completed={(completed / goal) * 100}
        shadow={shadow}
      >
        <LabelStyles>
          {completed === 0
            ? "아직 달성한 뱃지가 없습니다"
            : `${completed}/${goal}`}
        </LabelStyles>
      </FillerStyles>
    </Container>
  );
};

const Container = styled.div<{
  height?: string;
  width?: string;
  shadow?: string;
  completed?: number;
  goal?: number;
}>`
  height: ${(props) => props.height};
  width: ${(props) => props.width || `calc(100% - 5rem)`};
  background-color: #cccccc;
  border-radius: 1.25rem;
  margin-right: 20px;
  margin-left: 20px;
  box-shadow: ${(props) => props.shadow};
  display: flex;
  align-items: center;
  position: relative;
`;

const FillerStyles = styled.div<{ completed: number; shadow: string }>`
  height: 90%;
  margin: 2px;
  width: ${(props) => props.completed || 100}%;
  background-color: ${(props) => props.color || `#ffffff`};
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) => props.shadow};
`;

const LabelStyles = styled.span`
  color: #000000;
  font-weight: bold;
  position: absolute;
  padding: 10px;
  display: flex;
  flex-direction: row;
  right: 0;
`;

export default ProgressBar;
