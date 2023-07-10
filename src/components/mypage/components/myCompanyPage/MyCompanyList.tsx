import { useInfiniteQuery } from "@tanstack/react-query";

import { getMyCompanies } from "api/myAccount";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import { devices } from "styles/devices";
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
  location: string;
}

export default function MyCompanyList() {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ["myCompanies"],
    ({ pageParam = 0 }) => getMyCompanies({ pageParam }),
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

  if (isLoading) {
    return null;
  }

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
      <ListWrapper>
        {" "}
        {data?.pages.map((page) => {
          return page.content.map((company: CompanyDataType) => {
            return <MyCompanyItem key={company.id} data={company} />;
          });
        })}
      </ListWrapper>
    </InfiniteScroll>
  );
}

const ListWrapper = styled.div`
  @media ${devices.md} {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2.5rem;
  }
`;
