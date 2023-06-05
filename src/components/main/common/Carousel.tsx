import React, { useState } from "react";
import styled, { isStyledComponent } from "styled-components";
import { useCarousel } from "./useCarousel";

const imageList: string[] = [
  "https://img.hankyung.com/photo/202001/BF.21370791.1-1200x.jpg",
  "https://www.tvj.co.kr/news/photo/202304/81650_215833_2435.jpg",
  "https://t1.daumcdn.net/news/202208/27/sportskhan/20220827000205739fmfv.jpg",
  "https://file.mk.co.kr/meet/neds/2022/08/image_readtop_2022_748495_16613176675146369.jpg",
  "https://isplus.com/data/isp/image/2022/09/05/isp13f45de7-88ea-4fbb-9ed6-195e2d71404a.jpg",
  "https://www.issuemaker.kr/news/photo/201908/27244_18582_1051.jpg",
];

export default function Carousel() {
  const [transX, currentIndex, onHandler] = useCarousel(imageList);
  const [isClick, setIsClick] = useState(false);
  const width = 300;
  const height = 300;

  return (
    <>
      <Viewer width={width} height={height}>
        <Slider
          {...onHandler}
          transform={`translateX(${-currentIndex * width + transX}px)`}
          isTransX={transX}
        >
          {imageList.map((image, index) => {
            return (
              <Slide key={index}>
                <Img src={image} alt="img" />
              </Slide>
            );
          })}
        </Slider>
      </Viewer>
    </>
  );
}

const Viewer = styled.div<{ width: number; height: number }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border: 2px solid red;
`;

const Slider = styled.div<{ transform: string; isTransX: number }>`
  border: 2px solid blue;
  display: flex;
  transform: ${(props) => props.transform};
  transition: ${(props) =>
    props.isTransX
      ? `transform 0ms ease-in-out`
      : `transform 400ms ease-in-out`};
`;

const Slide = styled.div`
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img<{ src: string }>`
  width: 200px;
  height: 200px;
  margin: 50px;
  object-fit: cover;
`;
