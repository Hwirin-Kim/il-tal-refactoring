import styled from "styled-components";
import SelectBox from "../SelectBox";
import React, { Dispatch, SetStateAction, useState } from "react";
import SelectIndex from "../SelectIndex";
import { useMutation } from "@tanstack/react-query";
import { postBadgeCheck, postComment } from "../../../api/ThemeApi";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { CommentEditType } from "components/types";
import StarCount from "./StarCount";
interface CommentEditProps {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}
const CommentForm = ({ setIsEdit }: CommentEditProps) => {
  //오늘 날짜 (month는 0~11을 출력하므로 +1 필요)
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  //댓글 데이터 스테이트 초기값
  const initial = {
    score: "",
    success: "",
    difficulty: "",
    hint: "",
    playDate: "",
    comment: "",
  };

  const queryClient = useQueryClient();
  const { id } = useParams();
  let themeId: number;
  if (id) {
    themeId = parseInt(id, 10);
  }

  //댓글 작성시 사용할 데이터 스테이트
  const [cmt, setCmt] = useState(initial);

  //댓글 작성 이벤트 값 스테이트에 저장
  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCmt({ ...cmt, [name]: value });
  };

  const onSubmitHandler = () => {
    if (cmt.score === "") {
      Swal.fire({
        icon: "warning",
        title: "별점을 입력해 주세요",
        text: "얼마나 재미있었는지 별점으로 알려주세요!",
      });
    } else if (cmt.success === "") {
      Swal.fire({
        icon: "warning",
        title: "성공여부를 체크해 주세요",
        text: "해당 테마를 성공하셨는지 알려주시겠어요?😊",
      });
    } else if (cmt.difficulty === "") {
      Swal.fire({
        icon: "warning",
        title: "난이도를 입력해 주세요",
        text: "얼마나 어려웠는지 평가해주세요! 🙋‍♂️",
      });
    } else if (cmt.hint === "") {
      Swal.fire({
        icon: "warning",
        title: "힌트사용개수를 입력해 주세요",
        text: "힌트는 얼마나 사용하셨나요? 😎",
      });
    } else if (cmt.playDate === "") {
      Swal.fire({
        icon: "warning",
        title: "날짜를 입력해 주세요",
        text: "해당 테마를 플레이한 날짜가 언제인가요? 😊",
      });
    } else if (cmt.comment === "") {
      Swal.fire({
        icon: "warning",
        title: "내용을 입력해 주세요",
        text: "테마를 이용한 생생한 경험, 모두에게 들려주세요! 👍👍",
      });
    } else {
      writheComment.mutate({ id: themeId, data: cmt });
    }
  };

  const getBadgeMutation = useMutation(postBadgeCheck);

  //댓글 작성 mutation
  interface PayloadType {
    id: number;
    data: CommentEditType;
  }
  const writheComment = useMutation(
    (payload: PayloadType) => postComment(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getComments"]);
        queryClient.invalidateQueries(["getDetail"]);

        Swal.fire({
          icon: "success",
          title: "댓글 작성완료!",
          text: "소중한 의견 감사합니다!!😊",
        });
        setIsEdit(true);
        setCmt(initial);
        getBadgeMutation.mutate();
      },
      onError: () => {
        Swal.fire({
          icon: "warning",
          title: "댓글 작성실패!",
          text: "댓글 작성 실패!",
        });
        setCmt(initial);
      },
    }
  );

  return (
    <Container>
      <FormHeaderWrap>
        <SelectBox
          name="score"
          props={SelectIndex.optionStar}
          onChangeHandler={onChangeHandler}
          value={cmt.score}
        />
        <SelectBox
          name="success"
          props={SelectIndex.success}
          onChangeHandler={onChangeHandler}
          value={cmt.success}
        />
        <SelectBox
          name="difficulty"
          props={SelectIndex.optionLevel}
          onChangeHandler={onChangeHandler}
          value={cmt.difficulty}
        />
        <SelectBox
          name="hint"
          props={SelectIndex.optionHint}
          onChangeHandler={onChangeHandler}
          value={cmt.hint}
        />

        <DateInput
          name="playDate"
          type="date"
          onChange={onChangeHandler}
          value={cmt.playDate}
          max={date}
        />

        <Btn onClick={() => onSubmitHandler()}>작성완료</Btn>
      </FormHeaderWrap>
      <TextInput
        placeholder="후기를 공유해보세요! (150자 미만)"
        maxLength={150}
        name="comment"
        onChange={onChangeHandler}
        value={cmt.comment}
      />
    </Container>
  );
};

export default CommentForm;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid grey;
`;
const DateInput = styled.input`
  height: 26px;
  width: 100px;
  border-radius: 8px;
  border: 1px solid grey;
`;
const TextInput = styled.textarea`
  height: 150px;
  width: 1370px;
  margin: 10px 0;
  border: none;
  resize: none;
  padding: 5px;
  box-sizing: border-box;
  font-size: 15px;
  background-color: #efefef;
  border-radius: 8px;
`;
const FormHeaderWrap = styled.div`
  height: 50px;
  width: 95%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
  }
`;

const Btn = styled.div`
  height: 30px;
  width: 100px;
  border-radius: 8px;
  background-color: var(--color-main);
  color: white;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;
