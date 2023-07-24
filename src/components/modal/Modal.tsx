import styled from "styled-components";
import ReactDOM from "react-dom";
interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  function closeModal() {
    props.closeModal();
  }

  const modalroot = document.getElementById("modal-root");
  return ReactDOM.createPortal(
    <StModal onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </StModal>,
    modalroot as HTMLElement
  );
};

export default Modal;

const StModal = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .modalBody {
    box-shadow: 0 10px 3px 0 rgba(34, 36, 38, 0.15);
  }
`;
