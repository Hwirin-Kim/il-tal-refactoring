import { useQuery } from "@tanstack/react-query";
import { getFilterTheme } from "api/ThemeApi";
import { useLoginCheck } from "components/context/LoginCheckContext";
import React, { Dispatch, SetStateAction } from "react";
import Pagination from "react-js-pagination";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { devices } from "styles/devices";
import nextgray from "../../asset/next-gray.png";
import prevgray from "../../asset/prev-gray.png";
import nextgreen from "../../asset/next-green.png";
import prevgreen from "../../asset/prev-green.png";
import ThemePoster, { Theme } from "./ThemePoster";

interface ThemeListProps {
  setSearchResult: Dispatch<SetStateAction<number>>;
}

export default function ThemeList({ setSearchResult }: ThemeListProps) {
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

  const { data, isError, isLoading } = useQuery(
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
      }),
    {
      onSuccess: (res) => {
        setSearchResult(res.data.totalElements);
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  return (
    <Container>
      <ListWrapper>
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
                  day,
                  time,
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
      </div>
    </Container>
  );
}

const Container = styled.div`
  .pagination {
    margin-top: 3rem;
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
  @media ${devices.xlg} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
