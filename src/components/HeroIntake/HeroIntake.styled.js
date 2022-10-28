import styled from "styled-components";
import { Button } from "../Homeview/Homeview.styled";
import { Field } from "formik";

export const HeroForm = styled.form`
  width: 100%;
  height: 100%;
  padding: 10px;
  > label:not(:last-child) {
    > input {
      border-bottom: 2px solid #007180;
      text-overflow: ellipsis;
    }
  }
`;

export const SvgBtn = styled.button`
  padding: 3px;
  background: transparent;
  width: 30px;
  height: 30px;
  svg {
    width: 100%;
    height: 100%;
    fill: #025d6e;
  }
`;
export const BtnsWrap = styled.div`
  margin: 20px 0;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

export const ErrorMessage = styled.span`
  display: flex;
  align-items: center;
  color: red;
  font-size: 12px;
  margin-bottom: 4px;
`;

export const Label = styled.label`
  width: 100%;
  display: block;
  margin-bottom: 10px;
`;

export const SuperpowerWrapper = styled.div`
  margin-bottom: 10px;
  label {
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 2px solid #007180;
  }
`;
export const SuperpowerBtn = styled(Button)`
  font-size: 13px;
  margin-top: 10px;
  padding: 10px 0;
  width: 150px;
  margin-bottom: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormField = styled(Field)`
  width: 100%;
  height: 30px;
`;

export const FormBtn = styled(Button)`
  display: block;
  padding: 15px 0;
  margin: 10px auto;
  font-size: 13px;
  @media screen and (min-width: 768px) {
    margin: 20px auto;
  }
`;

export const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  margin-right: -10px;
  > div {
    height: 100px;
    width: 60px;
    margin-right: 10px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (min-width: 768px) {
    margin-right: -20px;
    > div {
      height: 150px;
      width: 100px;
      margin-right: 20px;
    }
  }
`;

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
  > button {
    background-color: transparent;
  }
`;
export const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  &:hover {
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.16), 0px 4px 4px rgba(0, 0, 0, 0.16),
      1px 4px 6px rgba(0, 0, 0, 0.16);
  }
  &:hover ${Overlay} {
    top: 0;
    left: 0;
  }
`;
