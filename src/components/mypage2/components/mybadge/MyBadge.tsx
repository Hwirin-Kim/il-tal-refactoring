import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMemberBadges, putMainBadge, receiveBadges } from "api/myAccount";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { IBadgeData } from "./MyBadgeList";

interface IMyBadgeProps {
  data: IBadgeData;
  isActive?: boolean;
}

interface IErrorData {
  data?: string;
  error: IError;
  success: boolean;
}
interface IError {
  detail: string;
  httpStatus: number;
  message: string;
}

export default function MyBadge({ data }: IMyBadgeProps) {
  const [isActive, setIsActive] = useState(false);
  const queryClient = useQueryClient();
  const myBadges = useQuery(["myBadges"], getMemberBadges);

  const achieveBadgeMutation = useMutation(
    (id: number) => receiveBadges({ badgeId: id }),
    {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "칭호가 획득되었습니다.",
          text: "칭호를 확인해보세요.",
          showConfirmButton: false,
          timer: 1000,
        });
        queryClient.invalidateQueries(["myBadges"]);
      },

      onError: (err: AxiosError<IErrorData>) => {
        if (err.isAxiosError) {
          Swal.fire({
            icon: "error",
            title: err.response?.data.error.detail,
            showConfirmButton: false,
            timer: 1000,
          });
        }
      },
    }
  );
  const changeBadgeMutation = useMutation(
    (id: number) => putMainBadge({ badgeId: id }),
    {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "칭호가 변경되었습니다.",
          showConfirmButton: true,
          timer: 800,
        });
        queryClient.invalidateQueries(["getMyPage"]);
      },
    }
  );

  const onClickBadge = () => {
    isActive
      ? changeBadgeMutation.mutate(data.id)
      : achieveBadgeMutation.mutate(data.id);
  };

  const activeBadges = (
    myBadgeArr: IBadgeData[],
    currentId: number
  ): boolean => {
    return myBadgeArr.some((badge) => badge.id === currentId) ? true : false;
  };

  useEffect(() => {
    if (myBadges.isLoading === false) {
      setIsActive(activeBadges(myBadges.data, data.id));
    }
  }, [isActive, myBadges, data]);
  if (myBadges.isLoading) {
    return null;
  }
  return (
    <BadgeImg
      src={data.badgeImgUrl}
      isActive={isActive}
      onClick={onClickBadge}
    />
  );
}

const BadgeImg = styled.img<{ isActive: boolean }>`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  margin: 0.5rem;
  box-shadow: 5px 5px 5px 1px rgb(0, 0, 0, 0.5);

  filter: grayscale(${(props) => (props.isActive ? 0 : 1)});
`;
