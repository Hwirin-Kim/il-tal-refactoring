import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyThemes } from "api/myAccount";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
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
}

export default function MyThemeList() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfiniteQuery(
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

  console.log(data?.pages);
  if (isLoading === true || data === undefined || data.pages === undefined) {
    return null;
  }
  return (
    <div>
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
        {data?.pages.map((page) => {
          return page.content.map((theme: ThemeDataType) => {
            return <MyThemeItem key={theme.id} data={theme} />;
          });
        })}
      </InfiniteScroll>
    </div>
  );
}
