import styled from "styled-components";
import { motion } from "framer-motion";

export default function BottomSheet() {
  return (
    <Container
      drag="y"
      dragConstraints={{ top: 0, bottom: 100 }}
      dragElastic={0.2}
    >
      <SheetHeader />
    </Container>
  );
}

const Container = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 300px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding-bottom: 75px;
  background-color: white;
`;

const SheetHeader = styled.div`
  width: 100%;
  height: 50px;
  background-color: blue;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;
