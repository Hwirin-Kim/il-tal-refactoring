import { useQuery } from "@tanstack/react-query";
import Pagination from "react-js-pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { getSearchCompany, getSearchTheme } from "../../api/searchApi";
import { searchComPages, searchState, searchThemePages } from "../../api/store";

import nextgray from "../../asset/next-gray.png";
import prevgray from "../../asset/prev-gray.png";
import nextgreen from "../../asset/next-green.png";
import prevgreen from "../../asset/prev-green.png";
import noDataImg from "../../asset/no-data-word.png";

import React, { useState } from "react";
import { searchCategoryIndex } from "./searchCategoryIndex";
import ThemeResult from "./ThemeResult";
import CompanyResult from "./CompanyResult";

const SearchList = () => {
  const [checkedRadioBtn, setCheckedRadioBtn] = useState("theme");
  const isChecked = (currentState: string, thisName: string): boolean => {
    return currentState === thisName ? true : false;
  };
  const onChangeRadioChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      filter: e.target.value,
      keyword: keywordParam!,
      page: pageParam,
    });
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get("filter") ?? "theme";
  const keywordParam = searchParams.get("keyword");

  const pageParam = searchParams.get("page") ?? "0";

  return (
    <Container>
      <CurrentViewBtnWrapper>
        {searchCategoryIndex.map((category) => {
          return (
            <React.Fragment key={category.value}>
              <CurrentViewRadioBtn
                name="category"
                type="radio"
                id={category.value}
                value={category.value}
                checked={isChecked(filterParam, category.value)}
                onChange={onChangeRadioChecked}
              />
              <CurrentViewRadioLabel htmlFor={category.value}>
                {category.label}
              </CurrentViewRadioLabel>
            </React.Fragment>
          );
        })}
      </CurrentViewBtnWrapper>
      {filterParam === "theme" && <ThemeResult />}
      {filterParam === "company" && <CompanyResult />}
    </Container>
  );
};

export default SearchList;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 8rem;
`;

const CurrentViewBtnWrapper = styled.div`
  margin-top: 1rem;
`;

const CurrentViewRadioBtn = styled.input`
  display: none;
  &:checked + label {
    color: white;
    background-color: var(--color-main);
  }
`;

const CurrentViewRadioLabel = styled.label`
  box-sizing: border-box;
  padding: 0.3rem 1rem;
  background-color: var(--color-grey-btn);
  color: black;
  border-radius: 0.5rem;
  margin-right: 1rem;
  font-size: 0.9rem;
`;
