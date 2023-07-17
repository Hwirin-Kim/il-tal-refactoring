import styled from "styled-components";
import { companyWish } from "../../api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import Swal from "sweetalert2";
import { CompanyType } from "components/types";
import { useLoginCheck } from "components/context/LoginCheckContext";
import { devices } from "styles/devices";
import { Company } from "components/types";
import { useNavigate } from "react-router-dom";
import Score from "components/common/Score";
import { themePages } from "api/store";

const CompanyCard = ({ company, location, pageNumber }: CompanyType) => {
  const { isLogin } = useLoginCheck();
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  const companyLike = useMutation(
    (companyId: number) => companyWish(companyId),
    {
      onMutate: async (companyId) => {
        await queryClient.cancelQueries([
          "getCompanyList",
          location,
          pageNumber,
        ]);
        const previousData = queryClient.getQueryData([
          "getCompanyList",
          location,
          pageNumber,
        ]);

        queryClient.setQueryData(
          ["getCompanyList", location, pageNumber],
          (oldData: any) => {
            return {
              ...oldData,
              data: {
                ...oldData.data,
                content: oldData.data.content.map((company: Company) => {
                  if (company.id === companyId) {
                    return {
                      ...company,
                      companyLikeCheck: !company.companyLikeCheck,
                    };
                  }
                  return company;
                }),
              },
            };
          }
        );

        return previousData;
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries(["getCompanyList", location, pageNumber]);
      },
      onError: () => {
        Swal.fire({
          title: "좋아요 전송실패",
          text: "서버에 문제가 있나봐요! 😢",
          icon: "warning",
        });
      },
    }
  );

  //좋아요 회원만 가능하도록 알람띄우기
  const likeOnlyMember = (id: number) => {
    if (isLogin) {
      companyLike.mutate(id);
    } else {
      Swal.fire({
        title: "로그인 후 이용하세요!",
        text: "비회원은 좋아요를 보낼수 없어요 😢",
        icon: "warning",
      });
    }
  };

  return (
    <Container>
      <Poster
        src={company.companyImgUrl}
        onClick={() => navigator(`/company/${company.id}`)}
      />
      <CompanyInfoTextWrapper>
        <CompanyLikeWrapper>
          <Location>{company.location}</Location>
          <Like onClick={() => likeOnlyMember(company.id)}>
            {company.companyLikeCheck ? <BsSuitHeartFill /> : <BsSuitHeart />}
          </Like>
        </CompanyLikeWrapper>

        <CompanyName onClick={() => navigator(`/company/${company.id}`)}>
          {company.companyName}
        </CompanyName>

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

        <Score
          score={company.companyScore}
          reviewCnt={company.totalReviewCnt}
        />
      </CompanyInfoTextWrapper>
    </Container>
  );
};

export default CompanyCard;

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  flex-direction: column;
  border: 1px solid rgb(224, 224, 224);
  @media ${devices.md} {
    border: 1px solid rgb(224, 224, 224);
    font-size: 1.3rem;

    box-sizing: border-box;

    &:hover {
      border: 1px solid var(--color-main);
    }
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 12rem;
  background-color: grey;
  border-radius: 0.5rem;
  flex-shrink: 0;
  object-fit: cover;
  cursor: pointer;
  @media ${devices.md} {
    width: 100%;
    height: 15rem;
  }
`;

const CompanyInfoTextWrapper = styled.div`
  flex-grow: 1;
  padding: 0.2rem 0.5rem;
`;

const CompanyLikeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    display: none;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

// const Score = styled.span`
//   font-size: 0.62rem;
//   font-weight: 300;
//   margin: 0.5rem 0;

//   @media ${devices.md} {
//     font-size: 1rem;
//   }
// `;

// const Star = styled.span`
//   font-size: 0.62rem;
//   color: var(--color-main);
//   @media ${devices.md} {
//     font-size: 1rem;
//   }
// `;
