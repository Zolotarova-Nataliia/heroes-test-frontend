import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: rgba(33, 33, 33, 0.9);
`;

export const ContentWrap = styled.div`
  display: flex;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
`;
export const ModalHeader = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  justify-content: flex-end;
`;

export const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 70vh;
  background: white;
  z-index: -1;
  border-radius: 16px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  @media screen and (min-width: 768px) {
    width: 60vw;
    height: 90vh;
  }
`;

export const ModalButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  transition: all 275ms cubic-bezier(0.17, 0.67, 0.83, 0.67);
  > svg {
    fill: #007180;
    width: 100%;
    height: 100%;
  }
  &:hover,
  &:focus {
    > svg {
      fill: #025d6e;
      transform: scale(1.05);
    }
  }
  @media screen and (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;
