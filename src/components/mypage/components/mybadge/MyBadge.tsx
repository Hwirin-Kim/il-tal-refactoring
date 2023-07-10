import { useState } from "react";
import styled from "styled-components";
import { devices } from "styles/devices";
import ChangeBadgeModal from "./ChangeBadgeModal";
import { IBadgeData } from "./MyBadgeList";

interface IMyBadgeProps {
  data: IBadgeData;
  isActive?: boolean;
}

export default function MyBadge({ data }: IMyBadgeProps) {
  const [openModal, setOpenModal] = useState(false);

  const onClickBadge = () => {
    setOpenModal(true);
  };

  return (
    <>
      <BadgeImg src={data.badgeImgUrl} onClick={onClickBadge} />
      {openModal && (
        <ChangeBadgeModal
          id={data.id}
          openModal={openModal}
          setOpenModal={setOpenModal}
          badgeExplain={data.badgeExplain}
          badgeName={data.badgeName}
          badgeImgUrl={data.badgeImgUrl}
          badgeSuccessCnt={data.badgeSuccessCnt}
          badgeFailCnt={data.badgeFailCnt}
        />
      )}
    </>
  );
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
