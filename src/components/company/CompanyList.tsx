import styled from "styled-components";
import { companyList } from "../../api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Locations from "./Locations";
import { useRecoilState } from "recoil";
import { companyLocation, companyPages } from "../../api/store";
import Pagination from "react-js-pagination";
import Narrow from "../../asset/gray_narrow.png";
import nextgray from "../../asset/next-gray.png";
import prevgray from "../../asset/prev-gray.png";
import nextgreen from "../../asset/next-green.png";
import prevgreen from "../../asset/prev-green.png";
import React from "react";
import CompanyCard from "./CompanyCard";
import { devices } from "styles/devices";
import InfiniteScroll from "react-infinite-scroller";

export interface CompanyType {
  id: number;
  companyName: string;
  companyImgUrl: string;
  location: string;
  companyScore: number;
  companyUrl: string;
  companyLikeCnt: number;
  address: string;
  phoneNumber: string;
  workHour: string;
  companyLikeCheck: boolean;
  totalReviewCnt: number;
  themeList: [];
}

const CompanyList = () => {
  const [comLocation, setComLocation] = useRecoilState(companyLocation);
  const [comPageIndex, setCompanyPageIndex] = useRecoilState(companyPages);

  // const { data, isLoading, isError, error, refetch } = useQuery(
  //   ["getCompanyList", comLocation, comPageIndex],
  //   () => companyList({ pageParam: comPageIndex, comLocation }),
  //   {
  //     onSuccess: () => {},
  //   }
  // );
  const infiniteData = useInfiniteQuery(
    ["companyListData", comPageIndex],
    ({ pageParam = 0 }) => companyList({ pageParam, comLocation: "" }),
    {
      getNextPageParam: (lastpage, allpages) => {
        if (allpages.length < lastpage.data.totalPages) {
          return allpages.length;
        } else {
          return undefined;
        }
      },
      onSuccess: (res) => console.log(res),
    }
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setComLocation(e.target.value);
  };

  const onPageHandler = (page: number) => {
    const pageIndex = page - 1;
    setCompanyPageIndex(pageIndex);

    infiniteData.fetchNextPage({ pageParam: pageIndex });
  };

  if (infiniteData.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Container>
      <Category>
        {/* <SearchResult>검색결과 {data.data.totalElements}개</SearchResult> */}
        <div>
          <select
            className="filter"
            onChange={onChangeHandler}
            value={comLocation}
          >
            {Locations.location.map((arg) => {
              return (
                <option key={arg.value} value={arg.value}>
                  {arg.name}
                </option>
              );
            })}
          </select>
        </div>
      </Category>
      <PaginationWrapper>
        <CompanyWrap>
          {infiniteData.data?.pages[comPageIndex]?.data.content.map(
            (company: CompanyType, index: number) => {
              return <CompanyCard key={company.id} company={company} />;
            }
          )}
        </CompanyWrap>
        <div className="pagenation">
          <Pagination
            activePage={comPageIndex + 1}
            itemsCountPerPage={9}
            totalItemsCount={200}
            pageRangeDisplayed={5}
            hideFirstLastPages={true}
            // prevPageText={
            //   comPageIndex === 0 ? (
            //     <img src={prevgray} alt="next" />
            //   ) : (
            //     <img src={prevgreen} alt="next" />
            //   )
            // }
            // nextPageText={
            //   comPageIndex + 1 ===
            //   infiniteData.data?.pages[comPageIndex].data.totalPages ? (
            //     <img src={nextgray} alt="next" />
            //   ) : (
            //     <img src={nextgreen} alt="next" />
            //   )
            // }
            onChange={onPageHandler}
          />
        </div>
      </PaginationWrapper>
      <InfiniteScrollWrapper>
        <InfiniteScroll
          hasMore={infiniteData.hasNextPage}
          loadMore={() => infiniteData.fetchNextPage()}
        >
          {infiniteData.data?.pages.map((page) => {
            return page.data.content.map((company: CompanyType) => {
              return <CompanyCard key={company.id} company={company} />;
            });
          })}
        </InfiniteScroll>
      </InfiniteScrollWrapper>
    </Container>
  );
};
export default CompanyList;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.6rem;
  @media ${devices.md} {
  }
`;
const PaginationWrapper = styled.div`
  display: none;
  @media ${devices.md} {
    display: block;
  }
`;

const InfiniteScrollWrapper = styled.div`
  @media ${devices.md} {
    display: none;
  }
`;

const Category = styled.div`
  width: 100%;
  height: 104px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .filter {
    height: 48px;
    width: 127px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #8a8a8a;
    border-radius: 8px;
    text-align: left;
    padding-left: 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url(${Narrow}) no-repeat 95% 50%;
    ::-ms-expand {
      display: none;
    }
    cursor: pointer;
  }
`;

const SearchResult = styled.div`
  font-size: 21px;
  font-weight: bold;
`;

const StarFilter = styled.button`
  /* margin-right: 10px; */
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 17px;
`;

const CompanyWrap = styled.div`
  width: 100%;
  margin-bottom: 70px;
`;
