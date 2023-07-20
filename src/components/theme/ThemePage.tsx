import styled from "styled-components";
import React, { useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { categoryIndex } from "./categoryIndex";
import { devices } from "styles/devices";
import { useSearchParams } from "react-router-dom";
import ThemeFilterBox from "./filter/ThemeFilterBox";
import useFirstScrollTop from "hooks/useFirstScrollTop";
import ThemeList from "./ThemeList";

const ThemePage = () => {
  useFirstScrollTop();
  const [searchParams, setSearchParams] = useSearchParams();

  const location = searchParams.get("location") ?? "";
  const genreFilter = searchParams.get("genreFilter") ?? "";
  const people = searchParams.get("people") ?? "";
  const themeScore = searchParams.get("themeScore") ?? "0,5";
  const difficulty = searchParams.get("difficulty") ?? "1,5";
  const sort = searchParams.get("sort") ?? "reviewCnt";
  const day = searchParams.get("day") ?? "";
  const time = searchParams.get("time") ?? "";

  const [onFilter, setOnFilter] = useState(false);
  const [searchResult, setSearchResult] = useState(0);

  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      sort: e.target.value,
      location,
      themeScore,
      genreFilter,
      difficulty,
      people,
      day,
      time,
    });
  };

  return (
    <Container>
      <TopInfoWrapper>
        <FilterOnBtn
          onClick={() => setOnFilter((prev) => !prev)}
          bgColor={onFilter}
        >
          <GiSettingsKnobs />
        </FilterOnBtn>
        <SearchResult>검색결과 {searchResult}개</SearchResult>

        <CategoriesWrapper>
          {categoryIndex.map((category) => {
            const isChecked = category.value === sort;
            return (
              <CategoryWrapper key={category.value}>
                <CategoryInput
                  name="category"
                  type="radio"
                  id={category.value}
                  value={category.value}
                  checked={isChecked}
                  onChange={onChangeCategory}
                />
                <CategoryLabel htmlFor={category.value}>
                  {category.label}
                </CategoryLabel>
              </CategoryWrapper>
            );
          })}
        </CategoriesWrapper>
      </TopInfoWrapper>

      <BodyWrap>
        <FilterWrapper hide={onFilter}>
          <ThemeFilterBox setOnfilter={setOnFilter} />
        </FilterWrapper>
        <ThemeList setSearchResult={setSearchResult} />
      </BodyWrap>
    </Container>
  );
};
export default ThemePage;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5rem;
  margin-bottom: 8rem;
`;

const TopInfoWrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  @media ${devices.lg} {
    margin-top: 1rem;
  }
`;

const SearchResult = styled.span`
  font-size: 1rem;
  font-weight: bold;
  @media ${devices.lg} {
    font-size: 1.3rem;
  }
`;

const CategoriesWrapper = styled.div`
  margin-left: auto;
  display: flex;
`;

const CategoryWrapper = styled.div`
  margin-right: 0.5rem;
`;
const CategoryInput = styled.input`
  display: none;
  &:checked + label {
    color: black;
  }
`;

const CategoryLabel = styled.label`
  font-weight: bold;
  font-size: 0.7rem;
  color: grey;
  cursor: pointer;
  @media ${devices.lg} {
    font-size: 1rem;
  }
`;

const BodyWrap = styled.div`
  width: 100%;
  @media ${devices.lg} {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-column-gap: 1rem;
  }
`;

const FilterOnBtn = styled.div<{ bgColor: boolean }>`
  margin-right: 0.3rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  border: 1px solid var(--color-grey-btn);
  ${(props) => props.bgColor && "background-color:var(--color-main);"}
  @media ${devices.lg} {
    display: none;
  }
`;

const FilterWrapper = styled.div<{ hide: boolean }>`
  width: 100%;
  max-height: ${({ hide }) => (hide ? "700px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  @media ${devices.lg} {
    margin-top: 1rem;
    max-height: 750px;
  }
`;
