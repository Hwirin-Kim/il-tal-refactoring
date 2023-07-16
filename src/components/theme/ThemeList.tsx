import styled from "styled-components";
import ThemePoster, { Theme } from "./ThemePoster";
import ThemeFilter from "./ThemeFilter";
import { useQuery } from "@tanstack/react-query";
import { getFilterCnt, getFilterTheme } from "../../api/ThemeApi";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  difficultyState,
  genreState,
  locationState,
  peopleState,
  scoreState,
  sortState,
  themePages,
} from "../../api/store";

import Pagination from "react-js-pagination";
import React, { useEffect } from "react";

import nextgray from "../../asset/next-gray.png";
import prevgray from "../../asset/prev-gray.png";
import nextgreen from "../../asset/next-green.png";
import prevgreen from "../../asset/prev-green.png";
import { Company, ThemeListType } from "components/types";
import { useLoginCheck } from "components/context/LoginCheckContext";
import { categoryIndex } from "./categoryIndex";
import { devices } from "styles/devices";

const ThemeList = () => {
  //페이지 전역상태
  const [themePagenation, setThemePage] = useRecoilState(themePages);

  //전역변수로 선언된 각 필터 스테이트를 값만 불러서 사용 (useRecoilValue사용)
  const genre = useRecoilValue(genreState);
  const location = useRecoilValue(locationState);
  const people = useRecoilValue(peopleState);
  const score = useRecoilValue(scoreState);
  const difficulty = useRecoilValue(difficultyState);

  //로그인 유무 판별
  const { isLogin } = useLoginCheck();
  //정렬 전역 스테이트
  const [sort, setSort] = useRecoilState(sortState);

  //페이징처리된 데이터 받아오기
  const { data, isError, error, isLoading, refetch } = useQuery(
    ["getThemes", themePagenation, isLogin],
    () =>
      getFilterTheme({
        genre,
        location,
        score,
        people,
        difficulty,
        themePagenation,
        sort,
      }),
    {
      onSuccess: () => {
        window.scrollTo(0, 0);
      },
    }
  );

  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSort(e.target.value);
  };

  //정렬 트리거 함수 (onChangeSort가 실행되어 sort가 변할때 마다 refetch시킴)
  useEffect(() => {
    refetch();
  }, [refetch, sort]);

  //페이지네이션이 눌릴때마다 themePage를 페이지에 맞게 설정
  const onPageHandler = (page: number) => {
    setThemePage(page - 1);
  };

  //필터링된 테마 개수 미리보기 API GET요청
  const { data: filterData, isLoading: filterIsLoading } = useQuery(
    ["getFilterCnt", genre, location, score, people, difficulty],
    () => getFilterCnt({ genre, location, score, people, difficulty })
  );

  // 로딩 및 에러 처리
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <Container>
      {/* <ThemeFilter
        refetch={refetch}
        filterData={filterData}
        filterIsLoading={filterIsLoading}
      /> */}
      <TopInfoWrapper>
        <SearchResult>검색결과 {data.data.totalElements}개</SearchResult>

        <CategoriesWrapper>
          {categoryIndex.map((category) => {
            const isChecked = category.value === sort;
            return (
              <CategoryWrapper key={category.value}>
                <CategoryInput
                  name="category"
                  type="radio"
                  id={category.value}
                  value={category.value}
                  checked={isChecked}
                  onChange={onChangeCategory}
                />
                <CategoryLabel htmlFor={category.value}>
                  {category.label}
                </CategoryLabel>
              </CategoryWrapper>
            );
          })}
        </CategoriesWrapper>
      </TopInfoWrapper>
      <BodyWrap>
        <ListWrapper>
          {data.data.content.map((theme: Theme) => {
            return (
              <div className="theme-wrap" key={`poster${theme.id}`}>
                <ThemePoster theme={theme} />
              </div>
            );
          })}
        </ListWrapper>

        <div className="pagenation">
          {data.data.totalPages > 1 ? (
            <Pagination
              activePage={themePagenation + 1}
              itemsCountPerPage={9}
              totalItemsCount={data.data.totalElements}
              pageRangeDisplayed={5}
              hideFirstLastPages={true}
              prevPageText={
                themePagenation === 0 ? (
                  <img src={prevgray} alt="next" />
                ) : (
                  <img src={prevgreen} alt="next" />
                )
              }
              nextPageText={
                themePagenation + 1 === data.data.totalPages ? (
                  <img src={nextgray} alt="next" />
                ) : (
                  <img src={nextgreen} alt="next" />
                )
              }
              onChange={onPageHandler}
            />
          ) : null}
        </div>
      </BodyWrap>
    </Container>
  );
};
export default ThemeList;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5rem;
  margin-bottom: 8rem;
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      font-size: 1.1rem;
      text-decoration: none;
      cursor: pointer;
      margin: 0 0.8rem;
      color: black;
      &:visited {
      }
    }
    img {
      width: 1.1rem;
      height: 1.1rem;
      @media ${devices.md} {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    .active {
      a {
        color: var(--color-main);
      }
    }
  }
`;

const TopInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchResult = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;

const CategoriesWrapper = styled.div`
  display: flex;
`;

const CategoryWrapper = styled.div`
  margin-right: 0.5rem;
`;
const CategoryInput = styled.input`
  display: none;
  &:checked + label {
    color: black;
  }
`;

const CategoryLabel = styled.label`
  font-weight: bold;
  font-size: 0.8rem;
  color: grey;
  cursor: pointer;
`;

const BodyWrap = styled.div`
  width: 100%;
`;

const ListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  @media ${devices.sm} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
