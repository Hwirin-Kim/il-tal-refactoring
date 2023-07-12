import styled from "styled-components";
import { companyWish } from "../../api";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { useRecoilValue } from "recoil";
// import { loginCheck } from "../../api/store";
import Swal from "sweetalert2";
import { CompanyType } from "components/types";
import { useLoginCheck } from "components/context/LoginCheckContext";
import { devices } from "styles/devices";
//ThemeWrap에서 ThemePoster는 페이징처리하여 3개씩 보여주기

const CompanyCard = ({ company }: CompanyType) => {
  const { isLogin } = useLoginCheck();
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  const companyLike = useMutation(
    (companyId: number) => companyWish(companyId),
    {
      onSuccess: (res) => {
        // queryClient.invalidateQueries(["getCompanyList"]);
        // setWish(res.data.companyLikeCheck);
      },
    }
  );

  //좋아요 회원만 가능하도록 알람띄우기
  const likeOnlyMember = () => {
    if (isLogin) {
      companyLike.mutate(company.id);
    } else {
      Swal.fire({
        title: "로그인 후 이용하세요!",
        text: "비회원은 좋아요를 보낼수 없어요 😢",
        icon: "warning",
      });
    }
  };

  // const [wish, setWish] = useState(company.companyLikeCheck);
  // useEffect(() => {
  //   if (wish) {
  //     return setWish(company.companyLikeCheck);
  //   } else {
  //     return setWish(company.companyLikeCheck);
  //   }
  // }, [company]);

  return (
    <Container>
      <Poster src={company.companyImgUrl} />
      <CompanyInfoTextWrapper>
        <CompanyLikeWrapper>
          <Location>{company.location}</Location>
          <Like onClick={likeOnlyMember}>
            <BsSuitHeartFill />
          </Like>
        </CompanyLikeWrapper>

        <CompanyName>{company.companyName}</CompanyName>

        <Address>{company.address}</Address>
        <InfoWrapper>
          {company.themeList.map((theme, index) => {
            return (
              <ThemeName key={theme.id}>
                {index > 0 && " | "}
                {theme.themeName}
              </ThemeName>
            );
          })}
        </InfoWrapper>

        <Score>
          <Star>★</Star>
          {company.companyScore} ({company.totalReviewCnt})
        </Score>
      </CompanyInfoTextWrapper>
    </Container>
  );
};

export default CompanyCard;

// const CompanyWrap = styled.div`
//   width: 100%;
//   background-color: grey;

//   @media ${devices.md} {
//     margin: 0 auto;
//     height: 563px;
//     width: 464px;
//     position: relative;
//     transition: all 0.1s linear;
//     border: 1px solid #8a8a8a;
//     object-fit: cover;
//     border-radius: 10px;
//     overflow: hidden;
//     &:hover {
//       box-shadow: 0 4px 15px 1px rgba(6, 195, 135, 0.25);
//       border: 1px solid #06c387;
//     }
//   }
// `;

// const CompanyPic = styled.div`
//   height: 300px;
//   width: 464px;
//   position: relative;
//   cursor: pointer;
//   img {
//     height: 100%;
//     width: 100%;
//     object-fit: cover;
//   }
// `;

// const CompanyInfo = styled.div`
//   height: 263px;
//   width: 464px;
//   padding: 20px;
//   position: relative;
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const CompanyName = styled.div`
//   font-weight: bold;
//   font-size: 25px;
//   cursor: pointer;
// `;

// const CompanyScore = styled.div`
//   font-weight: bold;
//   font-size: 20px;
//   span {
//     font-size: 23px;
//     color: var(--color-main);
//   }
// `;

// const CompanyThemeNameGenre = styled.div`
//   word-break: keep-all;
//   word-wrap: break-word;
//   height: 90px;
//   width: 400px;
//   font-size: 20px;
//   color: #ababab;
//   display: -webkit-box;
//   -webkit-line-clamp: 3;
//   -webkit-box-orient: vertical;
//   white-space: normal;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   line-height: 30px;
// `;

// const HomepageUrl = styled.button`
//   background-color: white;
//   font-size: 19px;
//   color: #8a8a8a;
//   height: 41px;
//   width: 220px;
//   border: 1px solid #cccccc;
//   border-radius: 8px;
//   cursor: pointer;
// `;

// const CompanyLike = styled.button`
//   position: absolute;
//   font-size: 33px;
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
//   right: 15px;
//   top: 200px;
// `;

// const ThemeWrap = styled.div`
//   position: absolute;
//   margin-top: 27px;
//   margin-left: 225px;
//   height: 297px;
//   width: 100%;
//   display: flex;
// `;

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  @media ${devices.md} {
    border: 1px solid rgb(224, 224, 224);
    font-size: 1.3rem;
    box-sizing: border-box;
    padding-right: 0.5rem;
    &:hover {
      border: 1px solid var(--color-main);
    }
  }
`;

const Poster = styled.img`
  width: 5rem;
  height: 7rem;
  background-color: grey;
  border-radius: 0.5rem;
  flex-shrink: 0;
  cursor: pointer;
  @media ${devices.md} {
    width: 10rem;
    height: 13rem;
  }
`;

const CompanyInfoTextWrapper = styled.div`
  flex-grow: 1;
  padding: 0.2rem 0;
  margin-left: 1rem;
`;

const CompanyLikeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media ${devices.md} {
    margin-top: 0.5rem;
  }
`;

const CompanyName = styled.p`
  font-size: 0.8rem;
  font-weight: bold;

  cursor: pointer;
  @media ${devices.md} {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
`;

const Like = styled.span`
  color: var(--color-main);
  cursor: pointer;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  @media ${devices.md} {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
`;

const Location = styled.p`
  margin-top: 0.5rem;
  font-size: 0.7rem;
  font-weight: 300;
  margin-bottom: 0.3rem;
  @media ${devices.md} {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

const Address = styled.p`
  font-size: 0.7rem;
  font-weight: 300;
  margin: 0.3rem 0;
  @media ${devices.md} {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  @media ${devices.md} {
    margin-bottom: 0.5rem;
  }
`;

const ThemeName = styled.span`
  font-size: 0.8rem;
  @media ${devices.md} {
    font-size: 0.9rem;
  }
`;

const Score = styled.span`
  font-size: 0.62rem;
  font-weight: 300;
  @media ${devices.md} {
    font-size: 1rem;
  }
`;

const Star = styled.span`
  font-size: 0.62rem;
  color: var(--color-main);
  @media ${devices.md} {
    font-size: 1rem;
  }
`;
