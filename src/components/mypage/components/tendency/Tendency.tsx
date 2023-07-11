import { useQuery } from "@tanstack/react-query";
import { getMyTendency } from "api/myAccount";
import SectionTitle from "components/common/SectionTitle";
import { stringParsing } from "components/mypage/utils/stringParsing";
import React, { useState } from "react";
import styled from "styled-components";
import { devices } from "styles/devices";
import TendencyRadar from "utils/TendencyRadar";
import setting from "../../../../asset/img/settings.png";
import TendencySetting from "./TendencySetting";

export interface ITendencyData {
  lessScare: number;
  roomSize: number;
  lockStyle: number;
  device: number;
  interior: number;
  excitePreference: number;
  genrePreference: string | null;
  stylePreference: string | null;
}

export default function Tendency() {
  const [isSetting, setIsSetting] = useState(false);
  const [tendencyData, setTendencyData] = useState([
    { name: "겁", value: 0 },
    { name: "방", value: 0 },
    { name: "자물쇠", value: 0 },
    { name: "장치", value: 0 },
    { name: "인테리어", value: 0 },
    { name: "활동성", value: 0 },
  ]);
  const [preferenceData, setPreferenceData] = useState([""]);

  const { data, isLoading } = useQuery(["getMyTendency"], getMyTendency, {
    onSuccess: (data) => {
      setTendencyData([
        { name: "겁", value: data.lessScare },
        { name: "방", value: data.roomSize },
        { name: "자물쇠", value: data.lockStyle },
        { name: "장치", value: data.device },
        { name: "인테리어", value: data.interior },
        { name: "활동성", value: data.excitePreference },
      ]);
      setPreferenceData(stringParsing(data.genrePreference));
    },
  });

  if (isLoading) {
    return null;
  }

  return (
    <Container>
      <TendencySetBtn
        src={setting}
        onClick={() => setIsSetting((prev) => !prev)}
      />
      <SectionTitle>나의 성향</SectionTitle>
      <TendencySettingWrapper hide={isSetting}>
        <TendencySetting data={data} setIsSetting={() => setIsSetting(false)} />
      </TendencySettingWrapper>
      <TendencyPreWrapper>
        <PreferenceDataWrapper>
          {preferenceData.length === 0
            ? "나의 성향을 추가해보세요!"
            : preferenceData.map((data) => {
                return <PreferenceData key={data}>{data}</PreferenceData>;
              })}
        </PreferenceDataWrapper>

        <TendencyWrapper>
          <TendencyRadar data={tendencyData} />
        </TendencyWrapper>
      </TendencyPreWrapper>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;

  position: relative;
  @media ${devices.md} {
    width: 100%;
  }
  @media ${devices.lg} {
    width: 50%;
  }
`;

const TendencyWrapper = styled.div`
  margin: 0 auto;
  width: 300px;
  height: 300px;
  font-size: 0.8rem;
  @media ${devices.md} {
    width: 400px;
    height: 400px;
  }
`;

const TendencySetBtn = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0.3rem;
  top: 0rem;
  @media ${devices.md} {
    top: 1.2rem;
    right: 0.5rem;
  }
`;

const PreferenceDataWrapper = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  @media ${devices.md} {
    /* width: 50%; */
  }
`;

const PreferenceData = styled.div`
  padding: 0.5rem;
  font-size: 0.8rem;
  display: inline-block;
  margin: 0.3rem;
  border: 1px solid #06c387;
  border-radius: 0.5rem;
`;

const TendencySettingWrapper = styled.div<{ hide: boolean }>`
  width: 100%;
  max-height: ${({ hide }) => (hide ? "900px" : "0")};
  overflow: hidden;
  transition: max-height 0.8s ease-in-out;
  @media ${devices.md} {
    position: absolute;
    width: 90%;
    max-height: auto;
    top: 3rem;
    right: 1rem;
    z-index: 999;
    overflow: visible;
    display: ${({ hide }) => (hide ? "block" : "none")};
  }
`;

const TendencyPreWrapper = styled.div`
  /* @media ${devices.md} {
    display: flex;
  } */
`;
