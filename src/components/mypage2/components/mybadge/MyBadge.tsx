import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putMainBadge, receiveBadges } from "api/myAccount";
import { AxiosError } from "axios";
import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { IBadgeData } from "./MyBadgeList";

interface IMyBadgeProps {
  data: IBadgeData;
  isActive: boolean;
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

export default function MyBadge({ data, isActive }: IMyBadgeProps) {
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries(["totalBadges"]);
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
  const changeBadgeMutation = useMutation((id: number) =>
    putMainBadge({ badgeId: id })
  );

  const onClickBadge = () => {
    isActive
      ? changeBadgeMutation.mutate(data.id)
      : achieveBadgeMutation.mutate(data.id);
  };

  return (
    <BadgeImg
      src={data.badgeImgUrl}
      isActive={isActive}
      onClick={onClickBadge}
    />
  );
}

const BadgeImg = styled.img<{ isActive: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 5px 5px 5px 1px rgb(0, 0, 0, 0.5);

  filter: grayscale(${(props) => (props.isActive ? 0 : 1)});
`;
