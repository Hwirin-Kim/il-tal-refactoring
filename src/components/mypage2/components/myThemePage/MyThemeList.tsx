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
}

export default function MyThemeList() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfiniteQuery(["myThemes"], () => getMyThemes(0));

  console.log(data?.pages);
  if (isLoading) {
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
