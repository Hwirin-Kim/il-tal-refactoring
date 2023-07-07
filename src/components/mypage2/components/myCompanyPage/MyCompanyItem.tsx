import React from "react";
import styled from "styled-components";
import { CompanyDataType } from "./MyCompanyList";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { companyWish } from "api";
import { useLoginCheck } from "components/context/LoginCheckContext";
import Swal from "sweetalert2";

interface MyCompanyItemProps {
  data: CompanyDataType;
}

export default function MyCompanyItem({ data }: MyCompanyItemProps) {
  const { isLogin } = useLoginCheck();
  const queryClient = useQueryClient();
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

  return (
    <Container>
      <Poster src={data.companyImgUrl} />
      <CompanyInfoTextWrapper>
        <CompanyLikeWrapper>
          <CompanyName>{data.companyName}</CompanyName>
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
          ★{data.companyScore} ({data.totalReviewCnt})
        </Score>
      </CompanyInfoTextWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2rem;
`;

const Poster = styled.img`
  width: 4.5rem;
  height: 6.3rem;
  background-color: grey;
  border-radius: 0.5rem;
  flex-shrink: 0;
`;

const CompanyInfoTextWrapper = styled.div`
  flex-grow: 1;
  padding: 0.2rem 0;
  margin-left: 0.5rem;
`;

const CompanyLikeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CompanyName = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
`;

const Like = styled.span`
  color: var(--color-main);
  cursor: pointer;
`;

const Address = styled.p`
  font-size: 0.7rem;
  font-weight: 300;
`;

const InfoWrapper = styled.div`
  width: 100%;
`;

const ThemeName = styled.span`
  font-size: 0.8rem;
`;

const ThemeSeparator = styled.span`
  ::before {
    content: " | ";
  }
`;

const Score = styled.span`
  font-size: 0.62rem;
  font-weight: 300;
`;
