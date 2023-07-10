import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "api/myAccount";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import MyReviewPageItem from "./MyReviewPageItem";
import nextgray from "../../../../asset/next-gray.png";
import prevgray from "../../../../asset/prev-gray.png";
import nextgreen from "../../../../asset/next-green.png";
import prevgreen from "../../../../asset/prev-green.png";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { devices } from "styles/devices";

export interface ReviewData {
  comment: string;
  companyName: string;
  difficulty: number;
  genre: string;
  hint: number;
  playDate: string;
  reviewCnt: number;
  reviewId: number;
  score: number;
  success: true;
  themeId: number;
  themeImgUrl: string;
  themeName: string;
  themeScore: number;
}

export default function MyReviewPageList() {
  const { page } = useParams();
  const pageNumber = parseInt(page!, 10);

  const navigator = useNavigate();
  const myReviews = useQuery(
    ["myReviewPage", pageNumber],
    () => getMyReviews(pageNumber - 1),
    {
      onSuccess: (res) => {
        if (res.content.length === 0 && pageNumber > 1) {
          navigator("/mypage/reviews/1");
          Swal.fire({
            icon: "error",
            title: "접근 오류",
            text: "해당 페이지가 없습니다. 첫 페이지로 이동됩니다.",
          });
        }
      },
    }
  );

  const onChangePageNum = (page: number) => {
    navigator(`/mypage/reviews/${page}`);
  };

  if (myReviews.isLoading) {
    return null;
  }

  return (
    <Container>
      {myReviews.data.content.map((reviewData: ReviewData, index: number) => {
        return <MyReviewPageItem key={index} reviewData={reviewData} />;
      })}
      {myReviews.data.totalPages > 1 && (
        <Pagination
          activePage={pageNumber}
          itemsCountPerPage={myReviews.data.size}
          totalItemsCount={myReviews.data.totalElements}
          pageRangeDisplayed={5}
          hideFirstLastPages={true}
          prevPageText={
            pageNumber === 1 ? (
              <img src={prevgray} alt="next" />
            ) : (
              <img src={prevgreen} alt="next" />
            )
          }
          nextPageText={
            pageNumber === myReviews.data.totalPages ? (
              <img src={nextgray} alt="next" />
            ) : (
              <img src={nextgreen} alt="next" />
            )
          }
          onChange={onChangePageNum}
        />
      )}
    </Container>
  );
}
const Container = styled.div`
  margin-bottom: 4rem;
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
