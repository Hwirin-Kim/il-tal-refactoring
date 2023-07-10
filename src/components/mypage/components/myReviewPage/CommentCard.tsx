import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineDelete,
  AiOutlineClose,
} from "react-icons/ai";
import SelectBoxBtn from "./SelectBoxBtn";

import selectIndex from "components/mypage/components/myReviewPage/selectIndex";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delComment, putComment } from "api/ThemeApi";
import { getTodayDate } from "components/mypage/utils/getTodayDate";
import Swal from "sweetalert2";
import { getDifficultyName } from "components/mypage/utils/getDifficultyName";
import { showWarning } from "components/mypage/utils/showWarning";
import { messages } from "./warningMessages";
import { devices } from "styles/devices";

export interface CommentCardProps {
  success: string;
  hint: number;
  playDate: string;
  difficulty: number;
  score: number;
  comment: string;
  id: number;
}
export interface EditValueType {
  [key: string]: string | number;
  success: string;
  hint: number;
  playDate: string;
  difficulty: number;
  score: number;
  comment: string;
}
interface CommentMutation {
  id: number;
  data: EditValueType;
}

export default function CommentCard({
  id,
  success,
  hint,
  playDate,
  difficulty,
  score,
  comment,
}: CommentCardProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState<EditValueType>({
    comment: comment,
    difficulty: difficulty,
    hint: hint,
    success: success,
    playDate: playDate,
    score: score,
  });
  const today = getTodayDate();
  const queryClient = useQueryClient();

  const ref = useRef<HTMLTextAreaElement>(null);
  const adjustTextareaHeight = () => {
    if (ref.current) {
      const textarea = ref.current;
      textarea.style.height = "auto"; // 임시로 높이를 auto로 설정하여 내용에 맞게 자동 조정되도록 합니다.
      textarea.style.height = `${textarea.scrollHeight}px`; // 실제 스크롤 높이에 맞게 높이를 설정합니다.
    }
  };

  const onChangeEdit = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setEditValue({ ...editValue, [name]: value });
    adjustTextareaHeight();
  };
  useEffect(() => {
    adjustTextareaHeight(); // textarea의 높이 조정
  }, [isEdit]);

  const editCommentMutation = useMutation(
    (payload: CommentMutation) => putComment(payload),
    {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "댓글이 수정되었습니다",
          text: "다른 유저분들이 더욱 자세한 사항을 알게되었네요!👍",
        });
        setIsEdit(false);
        queryClient.invalidateQueries(["myReviewPage"]);
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "댓글수정을 실패하였습니다",
          text: "페이지를 새로고침 후 다시 이용해보세요!",
        });
      },
    }
  );

  const deleteCommentMutation = useMutation((id: number) => delComment(id), {
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "댓글이 삭제되었습니다",
        text: "더 좋은 댓글 남겨주실거죠?😊",
      });
      queryClient.invalidateQueries(["myReviewPage"]);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "댓글삭제에 실패하였습니다",
        text: "페이지를 새로고침 후 다시 이용해보세요!",
      });
    },
  });

  const onSubmitHandler = () => {
    for (const property in editValue) {
      if (editValue[property] === "") {
        showWarning(messages[property].title, messages[property].text);
        return;
      }
    }
    editCommentMutation.mutate({ id: id, data: editValue });
  };

  return (
    <Container>
      <TopWrapper>
        <MyRecordWrapper>
          {isEdit ? (
            <>
              <SelectBoxBtn
                name="success"
                defaultValue={editValue.success}
                onChangeHandler={onChangeEdit}
                index={selectIndex.success}
              />
              <SelectBoxBtn
                name="difficulty"
                defaultValue={editValue.difficulty}
                onChangeHandler={onChangeEdit}
                index={selectIndex.difficulty}
              />
              <SelectBoxBtn
                name="hint"
                defaultValue={editValue.hint}
                onChangeHandler={onChangeEdit}
                index={selectIndex.hint}
              />
              <SelectBoxBtn
                name="score"
                defaultValue={editValue.score}
                onChangeHandler={onChangeEdit}
                index={selectIndex.star}
                color="var(--color-main)"
              />
            </>
          ) : (
            <>
              <MyRecord>{success === "true" ? "성공" : "실패"}</MyRecord>
              <MyRecord>
                {getDifficultyName(difficulty, selectIndex.difficulty)}
              </MyRecord>
              <MyRecord>힌트 {hint}회</MyRecord>
              <MyRecord mycolor={true}>{"★".repeat(score)}</MyRecord>
            </>
          )}
        </MyRecordWrapper>
        {isEdit ? (
          <DateInput
            type="date"
            name="playDate"
            onChange={onChangeEdit}
            defaultValue={editValue.playDate}
            max={today}
          />
        ) : (
          <PlayTime>플레이 날짜 {playDate}</PlayTime>
        )}
      </TopWrapper>
      <CommentWrapper>
        {isEdit ? (
          <MyCommentEdit
            ref={ref}
            name="comment"
            maxLength={150}
            defaultValue={editValue.comment}
            onChange={onChangeEdit}
          />
        ) : (
          <MyComment>{comment}</MyComment>
        )}
        <BtnWrapper>
          {isEdit ? (
            <>
              <AiOutlineSave onClick={() => onSubmitHandler()} />
              <AiOutlineClose onClick={() => setIsEdit(false)} />
            </>
          ) : (
            <AiOutlineEdit onClick={() => setIsEdit(true)} />
          )}
          <AiOutlineDelete onClick={() => deleteCommentMutation.mutate(id)} />
        </BtnWrapper>
      </CommentWrapper>
    </Container>
  );
}

const Container = styled.div`
  @media ${devices.md} {
    flex: 1;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MyRecordWrapper = styled.div``;

const MyRecord = styled.span<{ mycolor?: boolean }>`
  font-size: 0.75rem;
  margin-right: 0.3rem;
  background-color: #f3f3f3;
  border-radius: 8px;
  padding: 2px 5px;
  color: ${(props) => (props.mycolor ? "var(--color-main)" : "black")};
`;

const PlayTime = styled.span`
  font-size: 0.75rem;
`;

const CommentWrapper = styled.div`
  margin-top: 1rem;
  position: relative;
`;

const MyComment = styled.div`
  width: 85%;
  /* font-weight: 300; */
  font-size: 0.9rem;
  margin-top: 0.5rem;
  line-height: 1.25rem;
  word-wrap: break-word;
`;

const BtnWrapper = styled.div`
  position: absolute;
  font-size: 1.2rem;
  right: 0;
  bottom: 0rem;
  svg {
    margin-left: 0.6rem;
  }
`;

const MyCommentEdit = styled.textarea`
  width: 73%;
  height: auto;
  resize: none;
  border: none;
  padding: 0.5rem;
  background-color: #f3f3f3;
  border-radius: 0.5rem;
`;

const DateInput = styled.input`
  font-size: 0.5rem;
`;
