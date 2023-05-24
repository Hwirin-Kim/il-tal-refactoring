import { useQuery } from "@tanstack/react-query";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { getSearchCompany, getSearchTheme } from "../../api/searchApi";
import { searchComPages, searchState, searchThemePages } from "../../api/store";
import ThemeSearch from "./ThemeSearch";
import nextgray from "../../asset/next-gray.png";
import prevgray from "../../asset/prev-gray.png";
import nextgreen from "../../asset/next-green.png";
import prevgreen from "../../asset/prev-green.png";
import noDataImg from "../../asset/no-data-word.png";
import { Company, CompanyType, ThemeListType } from "components/types";

const SearchList = () => {
  //페이지 이동에 사용
  const navigate = useNavigate();

  //업체 검색 결과 페이지네이션 전역 스테이트
  const [searchComPage, setSearchComPage] = useRecoilState(searchComPages);

  //테마 검색 결과 페이지네이션 전역 스테이트
  const [searchThemePage, setSearchThemePage] =
    useRecoilState(searchThemePages);

  //검색어 전역 스테이트
  const searching = useRecoilValue(searchState);

  //테마검색 GET요청 쿼리
  const themeList = useQuery(
    ["getThemeSearch", searchThemePage, searching],
    () => getSearchTheme({ searchWord, searchThemePage })
  );

  //업체검색 GET요청 쿼리
  const companyList = useQuery(
    ["getCompanySearch", searchComPage, searching],
    () => getSearchCompany({ searchWord, searchComPage })
  );

  //테마페이지네이션 온체인지
  const onChangeThemeList = (page: number) => {
    setSearchThemePage(page - 1);
  };

  //업체페이지네이션 온체인지
  const onChangeComList = (page: number) => {
    setSearchComPage(page - 1);
  };

  //검색어 전역 스테이트
  const searchWord = useRecoilValue(searchState);

  return (
    <Container>
      <TitleListWrap>
        {companyList.isLoading ? (
          "Loading.."
        ) : (
          <>
            <Title>업체검색결과 {companyList.data.data.totalElements}개</Title>
            <ListWrap>
              {companyList.data.data.content.length ? (
                companyList.data.data.content.map(
                  (com: Company, index: number) => {
                    return (
                      <div
                        onClick={() => navigate(`/company/${com.id}`)}
                        key={`comsearch${index}`}
                      >
                        <ThemeSearch
                          img={com.companyImgUrl}
                          title={com.companyName}
                          topinfo={com.location}
                          botinfo={com.address}
                          score={com.companyScore}
                          reviewCnt={com.totalReviewCnt}
                        />
                      </div>
                    );
                  }
                )
              ) : (
                <img className="no-data" src={noDataImg} alt="no-data" />
              )}
            </ListWrap>
            {companyList.data.data.totalPages > 1 ? (
              <Pagination
                activePage={searchComPage + 1}
                itemsCountPerPage={companyList.data.data.size}
                totalItemsCount={companyList.data.data.totalElements}
                pageRangeDisplayed={5}
                hideFirstLastPages={true}
                prevPageText={
                  searchComPage === 0 ? (
                    <img src={prevgray} alt="next" />
                  ) : (
                    <img src={prevgreen} alt="next" />
                  )
                }
                nextPageText={
                  searchComPage + 1 === companyList.data.data.totalPages ? (
                    <img src={nextgray} alt="next" />
                  ) : (
                    <img src={nextgreen} alt="next" />
                  )
                }
                onChange={onChangeComList}
              />
            ) : null}
          </>
        )}
      </TitleListWrap>
      <TitleListWrap>
        {themeList.isLoading ? (
          "Loading..."
        ) : (
          <>
            <Title>테마검색결과 {themeList.data.data.totalElements}개</Title>
            <ListWrap>
              {themeList.data.data.content.length ? (
                themeList.data.data.content.map(
                  (theme: ThemeListType, index: number) => {
                    return (
                      <div
                        onClick={() => navigate(`/theme/${theme.id}`)}
                        key={`themesearch${index}`}
                      >
                        <ThemeSearch
                          img={theme.themeImgUrl}
                          title={theme.themeName}
                          topinfo={theme.companyName}
                          botinfo={theme.genre}
                          score={theme.themeScore}
                          reviewCnt={theme.reviewCnt}
                        />
                      </div>
                    );
                  }
                )
              ) : (
                <img className="no-data" src={noDataImg} alt="no-data" />
              )}
            </ListWrap>
            {themeList.data.data.totalPages > 1 ? (
              <Pagination
                activePage={searchThemePage + 1}
                itemsCountPerPage={themeList.data.data.size}
                totalItemsCount={themeList.data.data.totalElements}
                pageRangeDisplayed={5}
                hideFirstLastPages={true}
                prevPageText={
                  searchThemePage === 0 ? (
                    <img src={prevgray} alt="next" />
                  ) : (
                    <img src={prevgreen} alt="next" />
                  )
                }
                nextPageText={
                  searchThemePage + 1 === themeList.data.data.totalPages ? (
                    <img src={nextgray} alt="next" />
                  ) : (
                    <img src={nextgreen} alt="next" />
                  )
                }
                onChange={onChangeThemeList}
              />
            ) : null}
          </>
        )}
      </TitleListWrap>
    </Container>
  );
};

export default SearchList;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TitleListWrap = styled.div`
  width: 1440px;
  height: 610px;
  margin-bottom: 80px;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }

  ul.pagination li a {
    text-decoration: none;
    color: black;
    font-size: 22px;
  }

  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    border-radius: 50% 50%;
    background-color: var(--color-main);
  }

  ul.pagination li a:hover {
    color: black;
  }
  ul.pagination li a.active {
    color: blue;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  height: 70px;
  display: flex;
  align-items: center;
`;

const ListWrap = styled.div`
  width: 100%;
  height: 470px;
  display: flex;
  flex-wrap: wrap;
  .no-data {
    margin: 0 auto;
  }
`;
