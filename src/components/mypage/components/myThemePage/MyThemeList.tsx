import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyThemes } from "api/myAccount";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import { devices } from "styles/devices";
import MyThemeItem from "./MyThemeItem";

export interface ThemeDataType {
  companyName: string;
  id: number;
  reviewCnt: number;
  themeImgUrl: string;
  themeLikeCnt: number;
  themeName: string;
  themeScore: number;
  genre: string;
  price: string;
  difficulty: number;
  playTime: number;
  themeLikeCheck: boolean;
  reservationDay1: string[];
}

export default function MyThemeList() {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ["myThemes"],
    ({ pageParam = 0 }) => getMyThemes({ pageParam }),
    {
      getNextPageParam: (lastpage, allpages) => {
        if (allpages.length < lastpage.totalPages) {
          return allpages.length;
        } else {
          return undefined;
        }
      },
    }
  );

  if (isLoading === true || data === undefined || data.pages === undefined) {
    return null;
  }
  return (
    <Container>
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
        <ListWrapper>
          {data?.pages.map((page) => {
            return page.content.map((theme: ThemeDataType) => {
              return <MyThemeItem key={theme.id} data={theme} />;
            });
          })}
        </ListWrapper>
      </InfiniteScroll>
    </Container>
  );
}

const Container = styled.div``;

const ListWrapper = styled.div`
  @media ${devices.md} {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2.5rem;
  }
`;
