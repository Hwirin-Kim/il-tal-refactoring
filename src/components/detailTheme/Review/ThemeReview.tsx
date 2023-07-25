import styled from "styled-components";
import Comment from "./Comment";

import { useState } from "react";
import { getComment } from "../../../api/ThemeApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { commnetPages } from "../../../api/store";
import { useRecoilState } from "recoil";
import nextgray from "../../../asset/next-gray.png";
import prevgray from "../../../asset/prev-gray.png";
import nextgreen from "../../../asset/next-green.png";
import prevgreen from "../../../asset/prev-green.png";
import { useLoginCheck } from "components/context/LoginCheckContext";
import { Theme } from "components/theme/ThemePoster";

import Modal from "components/modal/Modal";
import { devices } from "styles/devices";
import CommentForm from "./CommentForm";
import GetBadgeComponent from "../getBadge/GetBadgeComponent";

interface ThemeReviewProps {
  props: Theme;
}

interface CommentFromServerData {
  id: number;
  nickname: string;
  playDate: string;
  score: number;
  success: boolean;
  difficulty: number;
  hint: number;
  comment: string;
}

export interface BadgeData {
  badgeExplain: string;
  badgeFailCnt: number;
  badgeImgUrl: string;
  badgeName: string;
  badgeSuccessCnt: number;
  id: number;
}

const ThemeReview = ({ props }: ThemeReviewProps) => {
  const badgeInitial: BadgeData = {
    badgeExplain: "이 정도로 넘어질 당신이 아닙니다",
    badgeFailCnt: 10,
    badgeImgUrl:
      "https://myxzbucket.s3.ap-northeast-2.amazonaws.com/iltal/badge/%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B2%E1%84%8B%E1%85%B5%E1%86%AB.jpg",
    badgeName: "열번 찍힌 나무",
    badgeSuccessCnt: 0,
    id: 7,
  };
  const { id } = useParams();

  const { isLogin } = useLoginCheck();

  const [openComment, setOpenComment] = useState(false);
  const [isGetBadge, setIsGetBadge] = useState(false);
  const [badgeData, setBadgeData] = useState(badgeInitial);

  const [commentPage, setCommentPage] = useRecoilState(commnetPages);

  const { data, isLoading } = useQuery(["getComments", commentPage], () =>
    getComment({ id, commentPage })
  );

  const onCommentPage = (page: number) => {
    setCommentPage(page - 1);
  };

  if (isLoading) {
    return <div>댓글을 불러오는 중입니다...!</div>;
  }

  return (
    <Container>
      <ReviewHeader>
        <ReviewHeaderLeftWrapper>
          <ReviewCnt>리뷰({props.reviewCnt})</ReviewCnt>
          <Score>
            총 평점 : <Star>{"★".repeat(props.themeScore)}</Star> (
            {props.themeScore})
          </Score>
        </ReviewHeaderLeftWrapper>

        {isLogin ? (
          <WriteReviewBtn onClick={() => setOpenComment(!openComment)}>
            리뷰작성
          </WriteReviewBtn>
        ) : null}
      </ReviewHeader>
      <CommentList>
        {isLoading
          ? "loading..."
          : data.data.content.map((comment: CommentFromServerData) => {
              return (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  nickname={comment.nickname}
                  playDate={comment.playDate}
                  score={comment.score}
                  success={comment.success}
                  difficulty={comment.difficulty}
                  hint={comment.hint}
                  comment={comment.comment}
                />
              );
            })}
      </CommentList>
      <div className="pagenation">
        {data.data.totalPages > 1 ? (
          <Pagination
            activePage={commentPage + 1}
            itemsCountPerPage={6}
            totalItemsCount={data.data.totalElements}
            pageRangeDisplayed={5}
            hideFirstLastPages={true}
            prevPageText={
              commentPage === 0 ? (
                <img src={prevgray} alt="next" />
              ) : (
                <img src={prevgreen} alt="next" />
              )
            }
            nextPageText={
              commentPage + 1 === data.data.totalPages ? (
                <img src={nextgray} alt="next" />
              ) : (
                <img src={nextgreen} alt="next" />
              )
            }
            onChange={onCommentPage}
          />
        ) : null}
      </div>
      {openComment ? (
        <Modal closeModal={() => setOpenComment(false)}>
          <CommentForm
            setOpenComment={setOpenComment}
            setBadgeData={setBadgeData}
            setIsGetBadge={setIsGetBadge}
          />
        </Modal>
      ) : null}
      {isGetBadge && (
        <Modal closeModal={() => setIsGetBadge(true)}>
          <GetBadgeComponent
            setIsGetBadge={setIsGetBadge}
            badgeData={badgeData}
          />
        </Modal>
      )}
    </Container>
  );
};

export default ThemeReview;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 7rem;
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      font-size: 1.1rem;
      text-decoration: none;
      cursor: pointer;
      margin: 0 0.8rem;
      color: black;
      &:visited {
      }
    }
    img {
      width: 1.1rem;
      height: 1.1rem;
      @media ${devices.md} {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    .active {
      a {
        color: var(--color-main);
      }
    }
  }
`;

const CommentList = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  @media ${devices.lg} {
    display: grid;
    grid-template-columns: calc(50% - 0.5rem) calc(50% - 0.5rem);
    grid-column-gap: 1rem;
  }
`;
const ReviewHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  align-items: center;
`;

const ReviewCnt = styled.span`
  font-size: 0.8rem;
  @media ${devices.lg} {
    font-size: 1rem;
  }
`;

const Score = styled.span`
  margin-left: 0.5rem;
  font-size: 0.8rem;
  @media ${devices.lg} {
    font-size: 1rem;
  }
`;

const Star = styled.span`
  font-size: 0.8rem;
  color: var(--color-main);
  @media ${devices.lg} {
    font-size: 1rem;
  }
`;

const ReviewHeaderLeftWrapper = styled.div``;

const WriteReviewBtn = styled.button`
  font-size: 0.8rem;
  background-color: white;
  color: black;
  cursor: pointer;
  border: 1px solid var(--color-border);
  height: 1.5rem;
  width: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;
