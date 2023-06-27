import SectionTitle from "components/common/SectionTitle";
import Modal from "components/modal/Modal";
import { stringParsing } from "components/mypage2/utils/stringParsing";
import React, { useState } from "react";
import styled from "styled-components";
import TendencyRadar from "utils/TendencyRadar";
import setting from "../../../../asset/img/settings.png";
import TendencySetting from "./TendencySetting";

interface ITendencyProps {
  tendencyData: ITendencyData;
}

export interface ITendencyData {
  lessScare: number;
  roomSize: number;
  lockStyle: number;
  device: number;
  interior: number;
  excitePreference: number;
  genrePreference: string;
  stylePreference: string;
}

export default function Tendency({ tendencyData }: ITendencyProps) {
  const [isSetting, setIsSetting] = useState(false);

  const tenData = [
    { name: "겁", value: tendencyData?.lessScare },
    { name: "방", value: tendencyData?.roomSize },
    { name: "자물쇠", value: tendencyData?.lockStyle },
    { name: "장치", value: tendencyData?.device },
    { name: "인테리어", value: tendencyData?.interior },
    { name: "활동성", value: tendencyData?.excitePreference },
  ];

  const preferenceData = stringParsing([
    tendencyData.genrePreference ?? "",
    tendencyData.stylePreference ?? "",
  ]);

  return (
    <Container>
      <TendencySetBtn
        src={setting}
        onClick={() => setIsSetting((prev) => !prev)}
      />
      <SectionTitle>나의 성향</SectionTitle>
      <TendencySettingWrapper hide={isSetting}>
        <TendencySetting
          data={tendencyData}
          setIsSetting={() => setIsSetting(false)}
        />
      </TendencySettingWrapper>

      <TendencyWrapper>
        <TendencyRadar data={tenData} />
      </TendencyWrapper>
      <SectionTitle>선호 유형</SectionTitle>
      <PreferenceDataWrapper>
        {preferenceData.map((data) => {
          return <PreferenceData key={data}>{data}</PreferenceData>;
        })}
      </PreferenceDataWrapper>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;

  position: relative;
`;

const TendencyWrapper = styled.div`
  width: 100%;
  height: 320px;
`;

const TendencySetBtn = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;
`;

const PreferenceDataWrapper = styled.div``;

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
  max-height: ${({ hide }) => (hide ? "850px" : "0")};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
`;
