import styled from "styled-components";

export const Card = styled.li`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
  transition: all 275ms cubic-bezier(0.17, 0.67, 0.83, 0.67);
  &:hover,
  &:focus {
    border-radius: 5px;
    cursor: pointer;
    transform: scale(1.05);
    background-color: #007180;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12), 0px 3px 4px rgba(0, 0, 0, 0.09),
      1px 4px 6px rgba(0, 0, 0, 0.16);
  }
  > img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    margin-bottom: 10px;
  }
  > p {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
    font-weight: bold;
    text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.1);
  }
  @media screen and (min-width: 768px) {
    width: 200px;
    margin-right: 15px;
    > img {
      height: 250px;
      margin-bottom: 10px;
    }
  }
  @media screen and (min-width: 1280px) {
    width: 300px;
    > img {
      height: 350px;
    }
  }
`;
