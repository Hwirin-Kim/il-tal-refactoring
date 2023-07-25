import styled from "styled-components";

const ThemePicComponent = ({
  pic,
  onClick,
}: {
  pic: string;
  onClick: () => void;
}) => {
  return (
    <Container>
      <img onClick={onClick} src={pic} alt="themepic" />
    </Container>
  );
};

export default ThemePicComponent;

const Container = styled.div`
  max-height: 500px;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: flex;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
