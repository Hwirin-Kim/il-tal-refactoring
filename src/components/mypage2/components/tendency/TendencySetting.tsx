import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTendency, postTendency } from "api/myAccount";
import { stringParsing } from "components/mypage2/utils/stringParsing";
import CategoryBtn from "components/theme/CategoryBtn";
import React, { useState } from "react";
import styled from "styled-components";
import SetSlider from "./SetSlider";
import { sliderIndex } from "./sliderIndex";
import { ITendencyData } from "./Tendency";
import { tendencyIndex } from "./tendencyIndex";
interface ITendencySettingProps {
  data: ITendencyData;
  setIsSetting: () => void;
}

export default function TendencySetting({
  data,
  setIsSetting,
}: ITendencySettingProps) {
  const genrePreference = stringParsing(data.genrePreference);
  const stylePreference = stringParsing(data.stylePreference);
  const [genre, setGenre] = useState(genrePreference || []);
  const [quest, setQuest] = useState(stylePreference || []);
  const [scare, setScare] = useState(data.lessScare || 1);
  const [room, setRoom] = useState(data.roomSize || 1);
  const [lock, setLock] = useState(data.lockStyle || 1);
  const [device, setDevice] = useState(data.device || 1);
  const [interior, setInterior] = useState(data.interior || 1);
  const [activity, setActivity] = useState(data.excitePreference || 1);

  const handleSliderChange = (stateName: string, e: number): void => {
    switch (stateName) {
      case "scare":
        setScare(e);
        break;
      case "room":
        setRoom(e);
        break;
      case "lock":
        setLock(e);
        break;
      case "device":
        setDevice(e);
        break;
      case "interior":
        setInterior(e);
        break;
      case "activity":
        setActivity(e);
        break;
      default:
        break;
    }
  };

  const sliderValueChange = (stateName: string): number => {
    switch (stateName) {
      case "scare":
        return scare;
      case "room":
        return room;
      case "lock":
        return lock;
      case "device":
        return device;
      case "interior":
        return interior;
      case "activity":
        return activity;
      default:
        return 1;
    }
  };

  const queryClient = useQueryClient();

  const postTendencyMutation = useMutation(
    (tendency: ITendencyData) => postTendency(tendency),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getMyPage"]);
      },
    }
  );

  const putTendencyMutation = useMutation(
    (tendency: ITendencyData) => editTendency(tendency),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getMyPage"]);
      },
    }
  );

  const onClickMutation = () => {
    if (data.genrePreference === null && data.stylePreference === null) {
      postTendencyMutation.mutate(
        {
          genrePreference: genre.join(" "),
          stylePreference: quest.join(" "),
          lessScare: scare,
          roomSize: room,
          lockStyle: lock,
          device: device,
          interior: interior,
          excitePreference: activity,
        },
        {
          onSuccess: setIsSetting,
        }
      );
    } else {
      putTendencyMutation.mutate(
        {
          genrePreference: genre.join(" "),
          stylePreference: quest.join(" "),
          lessScare: scare,
          roomSize: room,
          lockStyle: lock,
          device: device,
          interior: interior,
          excitePreference: activity,
        },
        {
          onSettled: setIsSetting,
        }
      );
    }
  };

  return (
    <Container>
      <BtnWrapper>
        <CategoryBtn
          categoryIndex={tendencyIndex.GenreTend}
          state={genre}
          setState={setGenre}
        />
      </BtnWrapper>
      <BtnWrapper>
        <CategoryBtn
          categoryIndex={tendencyIndex.questTend}
          state={quest}
          setState={setQuest}
        />
      </BtnWrapper>
      <SetSliderWrapper>
        {sliderIndex.map((data) => {
          return (
            <SetSlider
              data={data}
              onChange={(e) => handleSliderChange(data.state, e)}
              value={sliderValueChange(data.state)}
            />
          );
        })}
      </SetSliderWrapper>
      <BtnWrapper center={true}>
        <Btn onClick={onClickMutation}>완료</Btn>
        <Btn onClick={setIsSetting}>취소</Btn>
      </BtnWrapper>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  background-color: #e5ffeccb;
  padding: 1rem 0;
  border-radius: 1rem;
`;

const SetSliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
`;

const BtnWrapper = styled.div<{ center?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  ${(props) => props.center && `justify-content:center;`}
`;

const Btn = styled.button`
  font-size: 1.2rem;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  padding: 0.2rem 1rem;
  border-radius: 0.5rem;
  margin: 3px;
  &:hover {
    background-color: var(--color-main);
    color: white;
  }
`;
