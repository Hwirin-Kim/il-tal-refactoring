import styled from "styled-components";
import {
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineDelete,
  AiOutlineClose,
} from "react-icons/ai";
import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { delComment } from "../../../api/ThemeApi";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { CommentProps, UserInfoInSessionStorage } from "components/types";
import Modal from "components/modal/Modal";
import NewCommentForm, { CommentType } from "./NewCommentForm";

const Comment = ({
  id,
  nickname,
  playDate,
  score,
  success,
  difficulty,
  hint,
  comment,
}: CommentProps) => {
  const editInitial: CommentType = {
    comment: comment,
    difficulty: difficulty.toString(),
    hint: hint.toString(),
    success: success.toString(),
    playDate: playDate,
    score: score.toString(),
  };

  //유즈쿼리의 키값을 확인해서 refetch해주는 함수
  const queryClient = useQueryClient();

  //수정모드 토글 스테이트
  const [isEdit, setIsEdit] = useState(false);

  //본인 글 인지 판별하기 위한 유저정보
  const getUserInfo = (): UserInfoInSessionStorage | null => {
    const userinfo = sessionStorage.getItem("userinfo");
    if (userinfo) {
      return JSON.parse(userinfo);
    }
    return null;
  };
  const userinfo = getUserInfo();

  //댓글 삭제 mutation
  const deleteComment = useMutation((id: number) => delComment(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getComments"]);
      queryClient.invalidateQueries(["getDetail"]);
      Swal.fire({
        icon: "success",
        title: "댓글이 삭제되었습니다",
        text: "더 좋은 댓글 남겨주실거죠?😊",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "댓글삭제에 실패하였습니다",
        text: "페이지를 새로고침 후 다시 이용해보세요!",
      });
    },
  });

  //댓글 삭제 Swal
  const onDelete = () => {
    Swal.fire({
      title: "댓글을 삭제하시겠습니까?",
      text: "지워진 댓글은 되돌릴 수 없어요😢",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment.mutate(id);
      }
    });
  };

  return (
    <Container>
      <Header>
        <Title>{nickname}</Title>
        <PlayDate>플레이날짜 {playDate}</PlayDate>
      </Header>

      <ReviewInfoWrapper>
        <ReviewInfo>{success ? "성공" : "실패"}</ReviewInfo>
        <ReviewInfo>
          {difficulty === 3
            ? "어려웠어요"
            : difficulty === 2
            ? "보통이에요"
            : "쉬웠어요"}
        </ReviewInfo>
        <ReviewInfo>
          {hint === 5 ? "힌트 5회 이상" : `힌트 ${hint}회`}
        </ReviewInfo>
        <ReviewInfo mainColor={true}>{"★".repeat(score)}</ReviewInfo>
      </ReviewInfoWrapper>

      <CommentArea>{comment}</CommentArea>
      {isEdit && (
        <Modal closeModal={() => setIsEdit(false)}>
          <NewCommentForm
            setOpenComment={setIsEdit}
            isEdit={isEdit}
            editInitial={editInitial}
            commentId={id}
          />
        </Modal>
      )}
      {userinfo && userinfo.nickname === nickname && (
        <IconWrapper>
          <Icon onClick={() => setIsEdit(!isEdit)}>
            <AiOutlineEdit />
          </Icon>
          <Icon onClick={() => onDelete()}>
            <AiOutlineDelete />
          </Icon>
        </IconWrapper>
      )}
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  width: 100%;
  border: 1px solid var(--color-border);
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 0.5rem;
  padding: 0.5rem;
  align-items: center;
  position: relative;
`;
const IconWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  margin-left: auto;
`;
const Icon = styled.div`
  font-size: 1.3rem;
  margin: 0 0.5rem;
  cursor: pointer;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Title = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;
const PlayDate = styled.span`
  font-size: 0.9rem;
`;

const ReviewInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const ReviewInfo = styled.span<{ mainColor?: boolean }>`
  margin-right: 0.5rem;
  font-size: 0.8rem;
  ${(props) => props.mainColor && "color:var(--color-main)"}
`;

const CommentArea = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  line-height: 1.1rem;
  font-size: 0.9rem;
`;
