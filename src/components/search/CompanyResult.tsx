import { useQuery } from "@tanstack/react-query";
import { getSearchCompany } from "api/searchApi";

import styled from "styled-components";
import { devices } from "styles/devices";

import nextgray from "../../asset/next-gray.png";
import prevgray from "../../asset/prev-gray.png";
import nextgreen from "../../asset/next-green.png";
import prevgreen from "../../asset/prev-green.png";
import Pagination from "react-js-pagination";
import { useSearchParams } from "react-router-dom";
import CompanyCard from "components/company/CompanyCard";
import { CompanyType } from "components/company/CompanyList";

export default function CompanyResult() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterParam = searchParams.get("filter");
  const keywordParam = searchParams.get("keyword");
  const pageParam = searchParams.get("page");

  const companyList = useQuery(
    ["getCompanySearch", keywordParam, filterParam, pageParam],
    () =>
      getSearchCompany({ searchWord: keywordParam, searchComPage: pageParam })
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

  if (companyList.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <TotalElementsCnt>
        {keywordParam}의 검색결과 {companyList.data.data.totalElements}개
      </TotalElementsCnt>
      <ListWrap>
        {companyList.data.data.content.map((company: CompanyType) => {
          return (
            <CompanyCard
              key={company.id}
              company={company}
              queryKey={[
                "getCompanySearch",
                keywordParam,
                filterParam,
                pageParam,
              ]}
            />
          );
        })}
      </ListWrap>
      {companyList.data.data.totalPages > 1 ? (
        <Pagination
          activePage={Number(pageParam) + 1}
          itemsCountPerPage={12}
          totalItemsCount={companyList.data.data.totalElements}
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
            Number(pageParam) + 1 === companyList.data.data.totalPages ? (
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
