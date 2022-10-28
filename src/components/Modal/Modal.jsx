import { useDispatch, useSelector } from "react-redux";
import {
  Backdrop,
  ModalButton,
  ModalWrap,
  ContentWrap,
  ModalHeader,
} from "./Modal.styled";
import { SlClose } from "react-icons/sl";
import HeroIntake from "../HeroIntake/HeroIntake";
import { closeModal } from "../../redux/heroes/heroesSlice";
import { getCurrentHero } from "../../redux/heroes/heroesSelectors";
export default function Modal() {
  const existingHero = useSelector(getCurrentHero);
  const dispatch = useDispatch();
  return (
    <Backdrop>
      <ModalWrap>
        <ModalHeader>
          <ModalButton onClick={() => dispatch(closeModal())}>
            <SlClose />
          </ModalButton>
        </ModalHeader>
        <ContentWrap>
          <HeroIntake existingHero={existingHero} />
        </ContentWrap>
      </ModalWrap>
    </Backdrop>
  );
}
