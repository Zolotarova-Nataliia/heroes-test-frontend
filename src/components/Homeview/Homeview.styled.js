import styled from "styled-components";

export const Button = styled.button`
  width: 200px;
  padding: 20px 0;
  background-color: #007180;
  border-radius: 50px;
  color: #ffffff;
  font-size: 16px;
  transition: all 100ms cubic-bezier(0.17, 0.67, 0.83, 0.67);
  &:hover,
  &:focus {
    background-color: #025d6e;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12), 0px 3px 4px rgba(0, 0, 0, 0.09),
      1px 4px 6px rgba(0, 0, 0, 0.16);
  }
`;

export const MainContent = styled.main`
  display: flex;
  min-height: calc(100vh - 160px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  overflow: hidden;
  flex: 1 1 auto;
  @media screen and (min-width: 768px) {
    min-height: calc(100vh - 210px);
  }
  @media screen and (min-width: 1100px) {
    min-height: calc(100vh - 260px);
  }
`;
