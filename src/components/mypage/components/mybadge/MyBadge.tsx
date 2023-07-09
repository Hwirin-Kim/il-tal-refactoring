import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putMainBadge } from "api/myAccount";

import styled from "styled-components";
import { devices } from "styles/devices";
import Swal from "sweetalert2";
import { IBadgeData } from "./MyBadgeList";

interface IMyBadgeProps {
  data: IBadgeData;
  isActive?: boolean;
}

export default function MyBadge({ data }: IMyBadgeProps) {
  const queryClient = useQueryClient();

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
    changeBadgeMutation.mutate(data.id);
  };

  return <BadgeImg src={data.badgeImgUrl} onClick={onClickBadge} />;
}

const BadgeImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0.3rem;
  box-shadow: 5px 5px 5px 1px rgb(0, 0, 0, 0.5);
  @media ${devices.md} {
    width: 100px;
    height: 100px;
  }
`;
