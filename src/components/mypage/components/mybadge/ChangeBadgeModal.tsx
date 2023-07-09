import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putMainBadge } from "api/myAccount";
import Modal from "components/modal/Modal";
import { HiOutlineX } from "react-icons/hi";
import styled from "styled-components";
import Swal from "sweetalert2";

interface ChangeBadgeModalProps {
  setOpenModal: (open: boolean) => void;
  openModal: boolean;
  badgeImgUrl: string;
  id: number;
  badgeName: string;
  badgeExplain: string;
}

export default function ChangeBadgeModal({
  setOpenModal,
  openModal,
  badgeImgUrl,
  badgeName,
  badgeExplain,
  id,
}: ChangeBadgeModalProps) {
  const queryClient = useQueryClient();

  const changeBadgeMutation = useMutation(
    (id: number) => putMainBadge({ badgeId: id }),
    {
      onSuccess: () => {
        setOpenModal(false);
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
    changeBadgeMutation.mutate(id);
  };

  return (
    <Modal closeModal={() => setOpenModal(false)}>
      <Container>
        <Cancel onClick={() => setOpenModal(false)}>
          <HiOutlineX />
        </Cancel>
        <Icon mainBadgeImg={badgeImgUrl} />
        <BadgeName>{badgeName}</BadgeName>
        <BadgeGoal>달성조건 : 성공3회</BadgeGoal>
        <BadgeExplain>"{badgeExplain}"</BadgeExplain>
        <ChangeBtn onClick={onClickBadge}>대표 뱃지로 설정</ChangeBtn>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  width: 340px;
  height: 400px;
  border-radius: 0.5rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  box-sizing: border-box;
`;
const Icon = styled.div<{ mainBadgeImg?: string }>`
  position: relative;
  background-image: url(${(props) => props.mainBadgeImg});
  background-size: cover;
  background-position: center;
  overflow: hidden;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  &::before {
    content: "";
    position: absolute;

    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    border-radius: 50%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: translateX(-100%);
    // shine은 BadgeIcon에 정의됨
    animation: shine 3s infinite;
    overflow: hidden;
  }
`;
const Cancel = styled.div`
  margin-left: auto;
  font-size: 1.3rem;
  color: grey;
  cursor: pointer;
  &:hover {
    color: var(--color-main);
    font-weight: bold;
  }
`;

const BadgeName = styled.p`
  margin-top: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;
const BadgeGoal = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  color: grey;
`;

const BadgeExplain = styled.p`
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 1.3rem;
  line-height: 1.5rem;
  color: #656464;
`;

const ChangeBtn = styled.div`
  width: 10rem;
  height: 3rem;
  background-color: var(--color-main);
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`;
