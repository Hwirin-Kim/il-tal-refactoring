import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editNickName } from "api/myAccount";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { devices } from "styles/devices";
import Swal from "sweetalert2";

interface INicknameForm {
  nickname: string;
  setIsEditModeOn: (param: boolean) => void;
}

export default function NicknameForm({
  nickname,
  setIsEditModeOn,
}: INicknameForm) {
  const [nameInput, setNameInput] = useState("");
  const queryClient = useQueryClient();
  const onChangeNicknameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const nicknameMutation = useMutation(
    (nickname: string) => editNickName({ nickname: nickname }),
    {
      onSuccess: () => {
        setIsEditModeOn(false);
        queryClient.invalidateQueries(["getMyPage"]);
      },
      // onError: (error)=>{
      //     if (error.response.status === 409) {
      //         Swal.fire({
      //           icon: "error",
      //           title: "닉네임이 중복됩니다.",
      //           text: "다른 닉네임을 입력해주세요.",
      //         })
      // }
    }
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (nameInput === "" || nameInput === undefined || nameInput === null) {
      Swal.fire({
        icon: "error",
        title: "닉네임을 입력해주세요.",
        text: "닉네임칸은 비워둘수 없습니다.",
      });
    } else if (nameInput.length > 8 || nameInput.length < 2) {
      Swal.fire({
        icon: "error",
        title: "닉네임은 2~8자리로 입력해주세요.",
        text: "변경할 닉네임을 다시 입력해주세요.",
      });
    } else if (nameInput === nickname) {
      Swal.fire({
        icon: "error",
        title: "닉네임이 같습니다.",
        text: "변경할 닉네임을 다시 입력해주세요.",
      });
    } else {
      nicknameMutation.mutate(nameInput);
    }
  };

  console.log(nameInput);
  return (
    <Container onSubmit={onSubmit}>
      <InputForm placeholder="변경할 닉네임" onChange={onChangeNicknameInput} />
      <Button type="submit">완료</Button>
      {/* <Button type="button" onClick={() => setIsEditModeOn(false)}>
        취소
      </Button> */}
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputForm = styled.input`
  border: none;
  background-color: transparent;
  /* border-bottom: 1px solid var(--color-border); */
  width: 90px;
  outline: none;
  color: white;
  &::placeholder {
    color: rgba(255, 255, 255, 0.9);
  }
  @media ${devices.md} {
    width: 130px;
    color: black;
    font-size: 1.2rem;
    &::placeholder {
      color: grey;
    }
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 0.5rem;
  background-color: var(--color-grey-btn);
  font-size: 0.8rem;
  padding: 2px 0.5rem;
  margin: 0 0.5rem;
  &:hover {
    background-color: var(--color-main);
    color: white;
  }
  @media ${devices.md} {
    color: black;
    font-size: 1rem;
    padding: 0.2rem 0.5rem;
  }
  @media ${devices.lg} {
    font-size: 1rem;
    padding: 0.2rem 0.5rem;
  }
`;
