import Slider from "rc-slider";
import React from "react";
import styled from "styled-components";
import { ISliderData } from "./sliderIndex";

interface ISetSliderProps {
  data: ISliderData;
  onChange: (e: any) => void;
  value: number;
}

export default function SetSlider({ data, onChange, value }: ISetSliderProps) {
  return (
    <Container>
      <Title>{data.label}</Title>
      <Slider
        min={1}
        max={5}
        marks={data.marks}
        step={1}
        value={value}
        allowCross={false}
        defaultValue={1}
        pushable
        draggableTrack
        onChange={onChange}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 50px;
  width: 100%;
  margin-bottom: 3rem;
  .rc-slider {
    width: 80%;
    margin: 0 auto;
  }
  .rc-slider-mark {
    margin-top: 10px;
  }
  .rc-slider-step {
    height: 11px;
  }
  .rc-slider-dot {
    width: 1rem;
    height: 1rem;
  }

  .rc-slider-mark-text {
    width: 30px;
    font-size: 0.8rem;
  }
`;

const Title = styled.div`
  margin-bottom: 1rem;
  margin-left: 1rem;
  font-weight: bold;
`;
