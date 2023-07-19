import styled from "styled-components";
import ThemePoster, { Theme } from "./ThemePoster";

import { useQuery } from "@tanstack/react-query";
import { getFilterTheme } from "../../api/ThemeApi";

import Pagination from "react-js-pagination";
import React, { useEffect, useState } from "react";

import nextgray from "../../asset/next-gray.png";
import prevgray from "../../asset/prev-gray.png";
import nextgreen from "../../asset/next-green.png";
import prevgreen from "../../asset/prev-green.png";
import { GiSettingsKnobs } from "react-icons/gi";

import { useLoginCheck } from "components/context/LoginCheckContext";
import { categoryIndex } from "./categoryIndex";
import { devices } from "styles/devices";
import { useSearchParams } from "react-router-dom";
import ThemeFilterBox from "./filter/ThemeFilterBox";
import useFirstScrollTop from "hooks/useFirstScrollTop";
import ThemeList from "./ThemeList";

const ThemePage = () => {
  useFirstScrollTop();
  const [searchParams, setSearchParams] = useSearchParams();

  const location = searchParams.get("location") ?? "";
  const genreFilter = searchParams.get("genreFilter") ?? "";
  const people = searchParams.get("people") ?? "";
  const themeScore = searchParams.get("themeScore") ?? "0,5";
  const difficulty = searchParams.get("difficulty") ?? "1,5";
  const sort = searchParams.get("sort") ?? "reviewCnt";
  const day = searchParams.get("day") ?? "";
  const time = searchParams.get("time") ?? "";
  const page = searchParams.get("page");
  const [onFilter, setOnFilter] = useState(false);
  const [searchResult, setSearchResult] = useState(0);

  //로그인 유무 판별
  const { isLogin } = useLoginCheck();

  const onPageHandler = (page: number) => {
    const pageIndex = page - 1;
    setSearchParams({
      page: String(pageIndex),
      location,
      genreFilter,
      people,
      themeScore,
      difficulty,
      sort,
      day,
      time,
    });
    window.scrollTo(0, 0);
  };

  const { data, isError, isLoading, refetch } = useQuery(
    [
      "getThemes",
      page,
      isLogin,
      location,
      genreFilter,
      people,
      themeScore,
      difficulty,
      sort,
      day,
      time,
    ],
    () =>
      getFilterTheme({
        genreFilter,
        location,
        themeScore,
        people,
        difficulty,
        page,
        sort,
        day,
        time,
      })
  );

  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      sort: e.target.value,
      location,
      themeScore,
      genreFilter,
      difficulty,
      people,
      day,
      time,
    });
  };

  //정렬 트리거 함수 (onChangeSort가 실행되어 sort가 변할때 마다 refetch시킴)
  // useEffect(() => {
  //   refetch();
  // }, [refetch, sort]);

  // 로딩 및 에러 처리
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error!</div>;

  return (
    <Container>
      <TopInfoWrapper>
        <FilterOnBtn
          onClick={() => setOnFilter((prev) => !prev)}
          bgColor={onFilter}
        >
          <GiSettingsKnobs />
        </FilterOnBtn>
        <SearchResult>검색결과 {searchResult}개</SearchResult>

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
        <FilterWrapper hide={onFilter}>
          <ThemeFilterBox setOnfilter={setOnFilter} />
        </FilterWrapper>
        <ThemeList setSearchResult={setSearchResult} />
        {/* <ListWrapper>
          {data.data.content.map((theme: Theme) => {
            return (
              <div className="theme-wrap" key={`poster${theme.id}`}>
                <ThemePoster
                  queryKey={[
                    "getThemes",
                    page,
                    isLogin,
                    location,
                    genreFilter,
                    people,
                    themeScore,
                    difficulty,
                    sort,
                  ]}
                  theme={theme}
                />
              </div>
            );
          })}
        </ListWrapper>

        <div className="pagenation">
          {data.data.totalPages > 1 ? (
            <Pagination
              activePage={Number(page) + 1}
              itemsCountPerPage={9}
              totalItemsCount={data.data.totalElements}
              pageRangeDisplayed={5}
              hideFirstLastPages={true}
              prevPageText={
                Number(page) === 0 ? (
                  <img src={prevgray} alt="next" />
                ) : (
                  <img src={prevgreen} alt="next" />
                )
              }
              nextPageText={
                Number(page) + 1 === data.data.totalPages ? (
                  <img src={nextgray} alt="next" />
                ) : (
                  <img src={nextgreen} alt="next" />
                )
              }
              onChange={onPageHandler}
            />
          ) : null}
        </div> */}
      </BodyWrap>
    </Container>
  );
};
export default ThemePage;

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
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  display: flex;

  align-items: center;
`;

const SearchResult = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

const CategoriesWrapper = styled.div`
  margin-left: auto;
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
  font-size: 0.7rem;
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
  margin-top: 1rem;
  @media ${devices.sm} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const FilterOnBtn = styled.div<{ bgColor: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  border: 1px solid var(--color-grey-btn);
  ${(props) => props.bgColor && "background-color:var(--color-main);"}
`;

const FilterWrapper = styled.div<{ hide: boolean }>`
  width: 100%;
  max-height: ${({ hide }) => (hide ? "660px" : "0")};
  overflow: hidden;
  transition: max-height 0.8s ease-in-out;
`;
