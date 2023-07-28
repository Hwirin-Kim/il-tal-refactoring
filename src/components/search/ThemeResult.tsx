import { useQuery } from "@tanstack/react-query";
import { getSearchTheme } from "api/searchApi";

import ThemePoster, { Theme } from "components/theme/ThemePoster";
import React from "react";

import styled from "styled-components";
import { devices } from "styles/devices";

import nextgray from "../../asset/next-gray.png";
import prevgray from "../../asset/prev-gray.png";
import nextgreen from "../../asset/next-green.png";
import prevgreen from "../../asset/prev-green.png";
import Pagination from "react-js-pagination";
import { useSearchParams } from "react-router-dom";

export default function ThemeResult() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterParam = searchParams.get("filter");
  const keywordParam = searchParams.get("keyword");
  const pageParam = searchParams.get("page");

  const themeList = useQuery(
    ["getThemeSearch", keywordParam, filterParam, pageParam],
    () =>
      getSearchTheme({ searchWord: keywordParam, searchThemePage: pageParam })
  );

  const onPageHandler = (page: number) => {
    const pageIndex = page - 1;
    setSearchParams({
      filter: filterParam!,
      keyword: keywordParam!,
      page: String(pageIndex),
    });
    window.scrollTo(0, 0);
  };

  if (themeList.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <TotalElementsCnt>
        {keywordParam}의 검색결과 {themeList.data.data.totalElements}개
      </TotalElementsCnt>
      <ListWrap>
        {themeList.data.data.content.map((theme: Theme) => {
          return (
            <ThemePoster
              key={theme.id}
              queryKey={[
                "getThemeSearch",
                keywordParam,
                filterParam,
                pageParam,
              ]}
              theme={theme}
            />
          );
        })}
      </ListWrap>
      {themeList.data.data.totalPages > 1 ? (
        <Pagination
          activePage={Number(pageParam) + 1}
          itemsCountPerPage={4}
          totalItemsCount={themeList.data.data.totalElements}
          pageRangeDisplayed={5}
          hideFirstLastPages={true}
          prevPageText={
            Number(pageParam) === 0 ? (
              <img src={prevgray} alt="next" />
            ) : (
              <img src={prevgreen} alt="next" />
            )
          }
          nextPageText={
            Number(pageParam) + 1 === themeList.data.data.totalPages ? (
              <img src={nextgray} alt="next" />
            ) : (
              <img src={nextgreen} alt="next" />
            )
          }
          onChange={onPageHandler}
        />
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  .pagination {
    margin-top: 1rem;
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

const ListWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  margin-top: 1rem;
  @media ${devices.sm} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media ${devices.lg} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const TotalElementsCnt = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  font-weight: bold;
`;
