import { useRecoilState } from "recoil";
import styled from "styled-components";
import { searchState } from "../../api/store";
import { BsSearch } from "react-icons/bs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  //페이지 이동에 사용
  const navigate = useNavigate();

  //검색어 전역 스테이트
  const [search, setSearch] = useRecoilState(searchState);

  //검색어 스테이트
  const [onChange, setOnChange] = useState("");

  //검색어 이벤트값 스테이트에 담고 엔터키 누르면 onSubmitHander()실행
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
        placeholder="찾고 싶은 업체나 테마를 검색해 보세요"
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
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
const Input = styled.input`
  width: 550px;
  height: 40px;
  font-size: 21px;
  border: none;
  border-bottom: 1px solid var(--color-border);
  &:focus {
    outline: none;
  }
`;
