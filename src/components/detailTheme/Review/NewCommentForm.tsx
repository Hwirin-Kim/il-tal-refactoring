import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import StarCount from "./StarCount";
import { difficultyIndex, hintIndex, successIndex } from "./optionindex";
import CategoryComponent from "./CategoryComponent";
import DayInput from "./DayInput";
import CommentInput from "./CommentInput";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBadgeCheck, postComment } from "api/ThemeApi";
import { useParams } from "react-router-dom";

export interface CommentType {
  [key: string]: string;
  score: string;
  success: string;
  difficulty: string;
  hint: string;
  playDate: string;
  comment: string;
}

export type onChangeHandler = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => void;

interface CommentFormProps {
  setOpenComment: Dispatch<SetStateAction<boolean>>;
}

export default function NewCommentForm({ setOpenComment }: CommentFormProps) {
  const initial = {
    score: "",
    success: "",
    difficulty: "",
    hint: "",
    playDate: "",
    comment: "",
  };

  const { id } = useParams();

  const [cmt, setCmt] = useState<CommentType>(initial);
  const queryClient = useQueryClient();

  const getBadgeMutation = useMutation(postBadgeCheck);

  const writheCommentMutation = useMutation(
    (payload: { id: string; data: CommentType }) => postComment(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getComments"]);
        queryClient.invalidateQueries(["getDetail"]);

        Swal.fire({
          icon: "success",
          title: "댓글 작성완료!",
          text: "소중한 의견 감사합니다!!😊",
        });

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

  const onChangeHandler: onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCmt({ ...cmt, [name]: value });
  };

  interface FieldType {
    title: string;
    text: string;
  }

  interface FieldWarningsType {
    [key: string]: FieldType;
  }

  const fieldWarnings: FieldWarningsType = {
    score: {
      title: "별점을 입력해 주세요",
      text: "얼마나 재미있었는지 별점으로 알려주세요!",
    },
    success: {
      title: "성공여부를 체크해 주세요",
      text: "해당 테마를 성공하셨는지 알려주시겠어요?😊",
    },
    difficulty: {
      title: "난이도를 입력해 주세요",
      text: "얼마나 어려웠는지 평가해주세요! 🙋‍♂️",
    },
    hint: {
      title: "힌트사용개수를 입력해 주세요",
      text: "힌트는 얼마나 사용하셨나요? 😎",
    },
    playDate: {
      title: "날짜를 입력해 주세요",
      text: "해당 테마를 플레이한 날짜가 언제인가요? 😊",
    },
    comment: {
      title: "내용을 입력해 주세요",
      text: "테마를 이용한 생생한 경험, 모두에게 들려주세요! 👍👍",
    },
  };

  const onSubmitHandler = () => {
    for (const field in fieldWarnings) {
      if (cmt[field] === "") {
        const { title, text } = fieldWarnings[field];
        Swal.fire({
          icon: "warning",
          title,
          text,
        });
        return;
      }
    }
    if (id !== undefined) {
      writheCommentMutation.mutate({ id, data: cmt });
    }
  };

  return (
    <Container>
      <StarCount cmt={cmt} setCmt={setCmt} title="별점" />
      <CategoryComponent
        title="성공여부"
        name="success"
        index={successIndex}
        cmt={cmt}
        onChangeHandler={onChangeHandler}
      />

      <CategoryComponent
        title="난이도"
        name="difficulty"
        index={difficultyIndex}
        cmt={cmt}
        onChangeHandler={onChangeHandler}
      />

      <CategoryComponent
        title="힌트 사용 횟수"
        name="hint"
        index={hintIndex}
        cmt={cmt}
        onChangeHandler={onChangeHandler}
      />
      <DayInput
        onChangeHandler={onChangeHandler}
        title="플레이 날짜"
        value={cmt.playDate}
      />
      <CommentInput onChangeHandler={onChangeHandler} value={cmt.comment} />
      <SubmitBtn onClick={onSubmitHandler} bgColor={true}>
        작성완료
      </SubmitBtn>
      <SubmitBtn mgLeft={true} onClick={() => setOpenComment(false)}>
        작성취소
      </SubmitBtn>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: white;
`;

const SubmitBtn = styled.button<{ bgColor?: boolean; mgLeft?: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.bgColor ? "white;" : "black;")};
  background-color: ${(props) =>
    props.bgColor ? "var(--color-main);" : "white;"};
  border: ${(props) =>
    props.bgColor
      ? "1px solid var(--color-main);"
      : "1px solid var(--color-border);"};
  padding: 0.2rem 1rem;
  border-radius: 0.3rem;
  ${(props) => props.mgLeft && "margin-left: 1rem;"}
`;
