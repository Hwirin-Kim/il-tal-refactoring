import React from "react";
import styled from "styled-components";
import { CompanyDataType } from "./MyCompanyList";
import { BsSuitHeartFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { companyWish } from "api";
import { useLoginCheck } from "components/context/LoginCheckContext";
import Swal from "sweetalert2";
import { devices } from "styles/devices";
import { useNavigate } from "react-router-dom";

interface MyCompanyItemProps {
  data: CompanyDataType;
}

export default function MyCompanyItem({ data }: MyCompanyItemProps) {
  const { isLogin } = useLoginCheck();
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const companyLike = useMutation(
    (companyId: number) => companyWish(companyId),
    {
      onMutate: async (companyId) => {
        await queryClient.cancelQueries(["myCompanies"]);
        const previousData = queryClient.getQueryData(["myCompanies"]);

        queryClient.setQueryData(["myCompanies"], (oldData: any) => {
          return {
            ...oldData,
            pages: oldData.pages.map((pageData: any) => {
              return {
                ...pageData,
                content: pageData.content.filter(
                  (company: CompanyDataType) => company.id !== companyId
                ),
              };
            }),
          };
        });
        return { previousData };
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["myCompanies"]);
      },
    }
  );

  const companyLikeOnlyMember = () => {
    if (isLogin) {
      companyLike.mutate(data.id);
    } else {
      Swal.fire({
        title: "로그인 후 이용하세요!",
        text: "비회원은 좋아요를 보낼수 없어요 😢",
        icon: "warning",
      });
    }
  };

  const onClickToPage = () => {
    navigator(`/company/${data.id}`);
  };

  return (
    <Container>
      <Poster src={data.companyImgUrl} onClick={onClickToPage} />
      <CompanyInfoTextWrapper>
        <CompanyLikeWrapper>
          <CompanyName onClick={onClickToPage}>{data.companyName}</CompanyName>
          <Like onClick={companyLikeOnlyMember}>
            <BsSuitHeartFill />
          </Like>
        </CompanyLikeWrapper>
        <Address>{data.address}</Address>
        <InfoWrapper>
          {data.themeNames.map((name, index) => {
            return (
              <ThemeName key={name}>
                {index > 0 && " | "}
                {name}
              </ThemeName>
            );
          })}
        </InfoWrapper>

        <Score>
          <Star>★</Star>
          {data.companyScore} ({data.totalReviewCnt})
        </Score>
      </CompanyInfoTextWrapper>
    </Container>
  );
}

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
  width: 4.5rem;
  height: 6.3rem;
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

const CompanyName = styled.span`
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
  font-size: 1.2rem;

  margin-right: 0.5rem;
`;

const Address = styled.p`
  font-size: 0.7rem;
  font-weight: 300;
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
