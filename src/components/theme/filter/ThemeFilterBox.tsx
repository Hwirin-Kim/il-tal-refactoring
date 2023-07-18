import React, { useEffect } from "react";
import CategoryFilter from "./CategoryFilter";
import category from "./category";
import {
  dayState,
  difficultyState,
  genreState,
  locationState,
  peopleState,
  scoreState,
  timeState,
} from "../../../api/store";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Slider from "rc-slider";
import "../../../styles/index.css";
import { useQuery } from "@tanstack/react-query";
import { getFilterCnt } from "api/ThemeApi";
import { useSearchParams } from "react-router-dom";
import lock from "../../../asset/lock.png";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import CategoryTitle from "./common/CategoryTitle";

export default function ThemeFilterBox() {
  const [genre, setGenre] = useRecoilState(genreState);
  const [location, setLocation] = useRecoilState(locationState);
  const [people, setPeople] = useRecoilState(peopleState);
  const [themeScore, setScore] = useRecoilState(scoreState);
  const [difficulty, setDifficulty] = useRecoilState(difficultyState);
  const [time, setTime] = useRecoilState(timeState);
  const [day, setDay] = useRecoilState(dayState);

  const onSliderChange = (e: number | number[], setState: Function): void => {
    setState(e);
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const locationParam = searchParams.get("location") ?? "전체";
  const genreFilterParam = searchParams.get("genreFilter") ?? "전체";
  const peopleParam = searchParams.get("people") ?? "전체";
  const themeScoreParam = searchParams.get("themeScore") ?? "0,5";
  const difficultyParam = searchParams.get("difficulty") ?? "1,5";
  const timeParam = searchParams.get("time") ?? "8,24";
  const dayParam = searchParams.get("day") ?? "";
  /**
   * @param str 숫자 배열로 변환 할 문자
   * @returns 숫자 배열
   */
  const convertToNumberArray = (str: string) => {
    const numbers = str.split(",").map(Number);
    return numbers;
  };
  console.log(time);
  //queryString 값으로 전역변수 초기화
  useEffect(() => {
    setGenre(genreFilterParam.split(","));
    setLocation(locationParam.split(","));
    setPeople(peopleParam.split(","));
    setScore(convertToNumberArray(themeScoreParam));
    setDifficulty(convertToNumberArray(difficultyParam));
    setTime(convertToNumberArray(timeParam));
    setDay(dayParam);
  }, []);

  //필터링된 테마 개수 미리보기 API GET요청
  const { data: filterData, isLoading: filterIsLoading } = useQuery(
    [
      "getFilterCnt",
      genre,
      location,
      themeScore,
      people,
      difficulty,
      day,
      time,
    ],
    () =>
      getFilterCnt({
        genre,
        location,
        themeScore,
        people,
        difficulty,
        day,
        time,
      })
  );

  const onClickSearchTheme = () => {
    setSearchParams({
      location: location.join(","),
      themeScore: themeScore.join(","),
      genreFilter: genre.join(","),
      difficulty: difficulty.join(","),
      people: people.join(","),
      time: time.join(","),
      day: day,
    });
  };

  //초기화 버튼 onClick
  const categoryReset = () => {
    setGenre(["전체"]);
    setLocation(["전체"]);
    setPeople(["전체"]);
    setScore([0, 5]);
    setDifficulty([1, 5]);
    setTime([0, 24]);
    setDay("");
  };

  return (
    <Container>
      <DateInput />
      <TimeInput />

      <CategoryTitle>장르</CategoryTitle>
      <CategoryFilter
        category={category.GenreCategory}
        state={genre}
        setState={setGenre}
      />
      <CategoryTitle>지역</CategoryTitle>
      <CategoryFilter
        category={category.LocationCategory}
        state={location}
        setState={setLocation}
      />
      <CategoryTitle>인원</CategoryTitle>
      <CategoryFilter
        category={category.PeopleCategory}
        state={people}
        setState={setPeople}
      />
      <SliderWrapper>
        <CategoryTitle>별점</CategoryTitle>
        <SliderText>
          {themeScore[0] === 0 ? "평가 없음" : "★".repeat(themeScore[0])} -
          {"★".repeat(themeScore[1])}
        </SliderText>
        <Slider
          range
          min={0}
          max={5}
          // marks={starFilter}
          step={1}
          defaultValue={[0, 5]}
          allowCross={false}
          pushable
          draggableTrack
          value={themeScore}
          onChange={(e) => onSliderChange(e, setScore)}
        />
      </SliderWrapper>
      <SliderWrapper>
        <CategoryTitle>난이도</CategoryTitle>
        <SliderText>
          {[...Array(difficulty[0])].map((_, index) => {
            return <img src={lock} alt="lock" key={`key${index}`} />;
          })}
          -
          {[...Array(difficulty[1])].map((_, index) => {
            return <img src={lock} alt="lock" key={`key${index}`} />;
          })}
        </SliderText>
        <Slider
          range
          min={1}
          max={5}
          //   marks={levelFilter}
          step={1}
          defaultValue={[1, 5]}
          value={difficulty}
          allowCross={false}
          pushable
          draggableTrack
          onChange={(e) => onSliderChange(e, setDifficulty)}
        />
      </SliderWrapper>
      <SearchBtn onClick={categoryReset}>초기화</SearchBtn>
      <SearchBtn mainColor={true} onClick={onClickSearchTheme}>
        {filterIsLoading ? "Loading.." : `총 ${filterData.data}개 결과`}
      </SearchBtn>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  box-sizing: border-box;
  padding: 0.5rem;
  border: 1px solid #e6e6e6;
`;

const SliderWrapper = styled.div`
  width: 100%;
  height: 4rem;
`;

const SearchBtn = styled.button<{ mainColor?: boolean }>`
  height: 3rem;
  width: 8rem;
  background-color: ${(props) =>
    props.mainColor ? "var(--color-main)" : "white"};
  color: ${(props) => (props.mainColor ? "white" : "black")};
  cursor: pointer;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  outline: none;
`;

const SliderText = styled.div``;
