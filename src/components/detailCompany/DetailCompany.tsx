import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { companyWish, getDetailCompany } from "../../api";
import CompanyTheme from "./CompanyTheme";
import KakaoMap from "../map/KakaoMap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useRecoilValue } from "recoil";
// import { loginCheck } from "../../api/store";
import Swal from "sweetalert2";
import Modal from "../modal/Modal";
import ThemePicComponent from "../detailTheme/ThemePicComponent";
import { ThemeListType } from "components/types";
import { useLoginCheck } from "components/context/LoginCheckContext";
import { devices } from "styles/devices";
import useFirstScrollTop from "hooks/useFirstScrollTop";
const DetailCompany = () => {
  useFirstScrollTop();

  //업체 아이디 받기
  const { id } = useParams();
  let companyId: number;
  if (id) {
    companyId = parseInt(id, 10);
  }

  //포스터 사진 모달창
  const [isPic, setIsPic] = useState(true);

  //업체 상세페이지 GET요청
  const { data, isLoading } = useQuery(["getDetailCompany"], () =>
    getDetailCompany(id)
  );

  //로그인 유무 판별
  const { isLogin } = useLoginCheck();

  //좋아요 회원만 가능하도록 알람띄우기
  const likeOnlyMemeber = () => {
    if (isLogin) {
      companyLike.mutate(companyId);
    } else {
      Swal.fire({
        title: "로그인 후 이용하세요!",
        text: "비회원은 좋아요를 보낼수 없어요 😢",
        icon: "warning",
      });
    }
  };

  //주소이동
  const loadKakaoMap = () => {
    window.open(`https://map.kakao.com/link/search/${data.data.address}`);
  };

  const phoneNumberParsing = (number: string): string => {
    const parsedNumber = number.replace(/-/g, " ");
    return parsedNumber;
  };

  const phoneCall = (): void => {
    // eslint-disable-next-line no-restricted-globals
    location.href = "tel:" + phoneNumberParsing(data.data.phoneNumber);
  };

  //데이터 refetch 클라이언트
  const queryClient = useQueryClient();

  const companyLike = useMutation(
    (companyId: number) => companyWish(companyId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getDetailCompany"]);
      },
    }
  );

  //로딩처리
  if (isLoading) return <div>loading...</div>;
  return (
    <Container>
      <CompanyInfoSection>
        <CompanyPic
          src={data.data.companyImgUrl}
          alt="postpic"
          onClick={() => setIsPic(false)}
        />
        <PosterTitleWrapper>
          <Title>{data.data.companyName}</Title>

          <CompanyInfo>
            <CompanyInfoTextWrapper>
              <FiMapPin />
              <CompanyInfoText onClick={loadKakaoMap}>
                {data.data.address}
              </CompanyInfoText>
            </CompanyInfoTextWrapper>
            <CompanyInfoTextWrapper>
              <FiPhone />
              <CompanyInfoText onClick={phoneCall}>
                {data.data.phoneNumber}
              </CompanyInfoText>
            </CompanyInfoTextWrapper>
            <CompanyInfoTextWrapper>
              <AiOutlineClockCircle />
              {data.data.workHour
                .split("\\n")
                .map((data: string, index: number) => {
                  return <CompanyInfoText key={data}>{data}</CompanyInfoText>;
                })}
            </CompanyInfoTextWrapper>
            <Wrapper>
              <SpanTag mgRight={0.5} colorIsMain={true}>
                ★
              </SpanTag>{" "}
              {data.data.companyScore} ({data.data.totalReviewCnt})
            </Wrapper>
          </CompanyInfo>

          <BtnWrapper>
            <Btn
              bgColor={true}
              mgRight={0.8}
              onClick={() => window.open(data.data.companyUrl)}
            >
              홈페이지
            </Btn>

            {data.data.companyLikeCheck ? (
              <Btn onClick={() => likeOnlyMemeber()}>
                <BsSuitHeartFill
                  color={"#06c387"}
                  style={{ marginRight: "0.5rem" }}
                />{" "}
                찜하기
              </Btn>
            ) : (
              <Btn onClick={() => likeOnlyMemeber()}>
                <BsSuitHeart style={{ marginRight: "0.5rem" }} /> 찜하기
              </Btn>
            )}
          </BtnWrapper>
        </PosterTitleWrapper>
      </CompanyInfoSection>
      <DividerLine />

      <Title>테마</Title>

      <ThemeWrap>
        {data.data.themeList.map((theme: ThemeListType, index: number) => {
          return <CompanyTheme theme={theme} key={theme.id} />;
        })}
      </ThemeWrap>
      <DividerLine />

      <MapBox>
        <KakaoMap address={data.data.address} company={data.data.companyName} />
      </MapBox>

      {isPic ? null : (
        <Modal closeModal={() => setIsPic(true)}>
          <ThemePicComponent
            onClick={() => setIsPic(true)}
            pic={data.data.companyImgUrl}
          />
        </Modal>
      )}
    </Container>
  );
};
export default DetailCompany;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;

  margin-bottom: 8rem;
`;

const PosterTitleWrapper = styled.div`
  @media ${devices.md} {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const CompanyInfoSection = styled.section`
  margin-top: 1rem;
  @media ${devices.md} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    width: 100%;
    margin-bottom: 2rem;
  }
  @media ${devices.md} {
    grid-template-columns: 1fr 2fr;
  }
  @media ${devices.xlg} {
    grid-column-gap: 2rem;
  }
`;

const CompanyPic = styled.img`
  height: 23rem;
  object-fit: cover;
  width: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
`;

const DividerLine = styled.div`
  width: 100%;
  border-top: 1px solid var(--color-divider);
  margin: 1rem 0;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const SpanTag = styled.span<{ colorIsMain?: boolean; mgRight?: number }>`
  ${(props) => props.colorIsMain && `color: var(--color-main)`};
  margin-right: ${(props) => (props.mgRight ? `${props.mgRight}rem` : 0)};
`;

const Wrapper = styled.div`
  display: flex;
  font-size: 1rem;
  @media ${devices.md} {
    font-size: 1.2rem;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
`;

const Btn = styled.button<{ bgColor?: boolean; mgRight?: number }>`
  width: 10rem;
  height: 2.4rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: white;
  border: 1px solid grey;
  border-radius: 0.5rem;
  ${(props) => props.bgColor && `background-color:var(--color-main)`};
  ${(props) => props.bgColor && `color:white`};
  ${(props) => props.mgRight && `margin-right:${props.mgRight}rem`};
  ${(props) => props.mgRight && `border:none`};
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  @media ${devices.md} {
  }
`;

const CompanyInfoTextWrapper = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
  display: flex;
`;
const CompanyInfoText = styled.div`
  margin-left: 0.5rem;
  cursor: pointer;
  @media ${devices.md} {
    margin-bottom: 1.5rem;

    font-size: 1.2rem;
  }
`;

const MapBox = styled.div`
  height: 23rem;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1rem;
  @media ${devices.md} {
    margin: 2rem auto 0 auto;
    width: 40rem;
    height: 25rem;
  }
`;

const ThemeWrap = styled.div`
  width: 100%;
  @media ${devices.md} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 0.5rem;
    grid-row-gap: 1rem;
  }
  @media ${devices.lg} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
