import styled from "styled-components";
import { companyList } from "../../api";
import { useQuery } from "@tanstack/react-query";
import Locations from "./Locations";
import Pagination from "react-js-pagination";
import nextgray from "../../asset/next-gray.png";
import prevgray from "../../asset/prev-gray.png";
import nextgreen from "../../asset/next-green.png";
import prevgreen from "../../asset/prev-green.png";
import React from "react";
import CompanyCard from "./CompanyCard";
import { devices } from "styles/devices";
import SectionTitle from "components/common/SectionTitle";
import { useSearchParams } from "react-router-dom";
import ThemeFilterBox from "components/theme/filter/ThemeFilterBox";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const location = searchParams.get("location");
  const pageNumber = searchParams.get("page");

  const { data, isLoading } = useQuery(
    ["getCompanyList", location, pageNumber],
    () => companyList({ pageParam: pageNumber, location })
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ location: e.target.value, page: "0" });
  };

  const onPageHandler = (page: number) => {
    const pageIndex = page - 1;
    setSearchParams({
      page: String(pageIndex),
      location: location ? location : "",
    });

    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Container>
      <SelectSearchResultWrapper>
        <SectionTitle>검색결과 {data.data.totalElements}개</SectionTitle>

        <LocationSelect
          onChange={onChangeHandler}
          value={location ? location : undefined}
        >
          {Locations.location.map((arg) => {
            return (
              <option key={arg.value} value={arg.value}>
                {arg.name}
              </option>
            );
          })}
        </LocationSelect>
      </SelectSearchResultWrapper>
      <ListWrapper>
        {data.data.content.map((company: CompanyType, index: number) => {
          return (
            <CompanyCard
              key={company.id}
              company={company}
              location={location}
              pageNumber={pageNumber}
            />
          );
        })}
      </ListWrapper>

      <Pagination
        activePage={Number(pageNumber) + 1}
        itemsCountPerPage={data.data.size}
        totalItemsCount={data.data.totalElements}
        pageRangeDisplayed={5}
        hideFirstLastPages={true}
        prevPageText={
          Number(pageNumber) === 0 ? (
            <img src={prevgray} alt="next" />
          ) : (
            <img src={prevgreen} alt="next" />
          )
        }
        nextPageText={
          Number(pageNumber) + 1 === data.data.totalPages ? (
            <img src={nextgray} alt="next" />
          ) : (
            <img src={nextgreen} alt="next" />
          )
        }
        onChange={onPageHandler}
      />
    </Container>
  );
};
export default CompanyList;

const Container = styled.div`
  box-sizing: border-box;

  width: 100%;
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

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  grid-column-gap: 0.5rem;
  @media ${devices.sm} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 1rem;
  }
  @media ${devices.lg} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const SelectSearchResultWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LocationSelect = styled.select`
  height: 1.4rem;
  font-size: 0.8rem;
  border: 1px solid #8a8a8a;
  border-radius: 0.8rem;
  text-align: center;

  cursor: pointer;
`;
