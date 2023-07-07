import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyCompanies } from "api/myAccount";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import MyCompanyItem from "./MyCompanyItem";

export interface CompanyDataType {
  address: string;
  companyImgUrl: string;
  companyLikeCheck: true;
  companyName: string;
  companyScore: number;
  id: number;
  themeNames: string[];
  totalReviewCnt: number;
}

export default function MyCompanyList() {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ["myCompanies"],
    ({ pageParam = 0 }) => getMyCompanies(pageParam),
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

  if (isLoading) {
    return null;
  }

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
      {data?.pages.map((page) => {
        return page.content.map((company: CompanyDataType) => {
          return <MyCompanyItem key={company.id} data={company} />;
        });
      })}
    </InfiniteScroll>
  );
}
