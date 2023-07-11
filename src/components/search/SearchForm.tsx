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

      <SearchBtn>
        <BsSearch onClick={onSubmitHandler} />
      </SearchBtn>
    </Container>
  );
};

export default SearchForm;

const Container = styled.div`
  width: 100%;
  margin-left: 1rem;

  font-size: 0.8rem;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  display: flex;
  background-color: white;
  overflow: hidden;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
const Input = styled.input`
  width: 90%;
  height: 1.4rem;
  font-size: 0.8rem;
  border: none;
  &:focus {
    outline: none;
  }
  @media ${devices.md} {
    border-bottom: 1px solid var(--color-border);
  }
  @media ${devices.lg} {
    font-size: 1.2rem;
  }
`;

const SearchBtn = styled.span`
  font-size: 1.1rem;
  margin-right: 0.4rem;
`;
