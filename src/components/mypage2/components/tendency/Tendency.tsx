import SectionTitle from "components/common/SectionTitle";
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
  genrePreference: string | null;
  stylePreference: string | null;
}

export default function Tendency({ tendencyData }: ITendencyProps) {
  const [isSetting, setIsSetting] = useState(false);
  // const [preferenceData, setPreferenceData] = useState<string[] | string>([]);
  const tenData = [
    { name: "겁", value: tendencyData?.lessScare },
    { name: "방", value: tendencyData?.roomSize },
    { name: "자물쇠", value: tendencyData?.lockStyle },
    { name: "장치", value: tendencyData?.device },
    { name: "인테리어", value: tendencyData?.interior },
    { name: "활동성", value: tendencyData?.excitePreference },
  ];

  const parsing = (
    str1: string | null,
    str2: string | null
  ): string[] | never[] => {
    let newArr: string[] = [];
    let arr1 = stringParsing(str1);
    let arr2 = stringParsing(str2);
    return (newArr = [...newArr, ...arr1, ...arr2]);
  };

  const preferenceData = parsing(
    tendencyData.genrePreference,
    tendencyData.stylePreference
  );

  return (
    <Container>
      <TendencySetBtn
        src={setting}
        onClick={() => setIsSetting((prev) => !prev)}
      />
      <SectionTitle>나의 성향</SectionTitle>
      <PreferenceDataWrapper>
        {preferenceData.length === 0
          ? "나의 성향을 추가해보세요!"
          : preferenceData.map((data) => {
              return <PreferenceData key={data}>{data}</PreferenceData>;
            })}
      </PreferenceDataWrapper>
      <TendencySettingWrapper hide={isSetting}>
        <TendencySetting
          data={tendencyData}
          setIsSetting={() => setIsSetting(false)}
        />
      </TendencySettingWrapper>

      <TendencyWrapper>
        <TendencyRadar data={tenData} />
      </TendencyWrapper>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;

  position: relative;
`;

const TendencyWrapper = styled.div`
  width: 100%;
  height: 300px;
  font-size: 0.8rem;
`;

const TendencySetBtn = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0.3rem;
  top: 0rem;
`;

const PreferenceDataWrapper = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
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
`;
