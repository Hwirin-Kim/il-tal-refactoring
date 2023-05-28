import { useRecoilState } from "recoil";
import styled from "styled-components";
import { searchState } from "../../api/store";
import { BsSearch } from "react-icons/bs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { devices } from "styles/devices";

const SearchForm = () => {
  //페이지 이동에 사용
  const navigate = useNavigate();

  //검색어 전역 스테이트
  const [search, setSearch] = useRecoilState(searchState);

  //검색어 스테이트
  const [onChange, setOnChange] = useState("");

  //검색어 이벤트값 스테이트에 담고 엔터키 누르면 onSubmitHandler()실행
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnChange(e.target.value);
  };
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmitHandler();
    }
  };

  //검색요청 함수
  const onSubmitHandler = () => {
    setSearch(onChange);
    navigate("/search");
  };
  return (
    <Container>
      <Input
        onChange={onChangeSearch}
        placeholder="검색"
        onKeyPress={onKeyPressHandler}
      />
      <button onClick={onSubmitHandler}>
        <BsSearch size="21" />
      </button>
    </Container>
  );
};

export default SearchForm;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
  display: flex;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  @media ${devices.lg} {
    max-width: 700px;
  }
`;
const Input = styled.input`
  width: 100%;
  height: 1.4rem;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid var(--color-border);
  &:focus {
    outline: none;
  }
  @media ${devices.lg} {
    font-size: 1.5rem;
  }
`;
