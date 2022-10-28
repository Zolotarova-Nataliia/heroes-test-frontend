import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import {
  getHeroes,
  getHeroesCount,
  getModalIsOpen,
} from "../../redux/heroes/heroesSelectors";
import { getCount, getHeroesList } from "../../redux/heroes/heroesOperations";

import Header from "../Header/Header";
import HeroesList from "../HeroesList/HeroesList";
import { Button, MainContent } from "./Homeview.styled";
import Modal from "../Modal/Modal";
import { openHeroCreate } from "../../redux/heroes/heroesSlice";

export const Homeview = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(getModalIsOpen);
  const heroesList = useSelector(getHeroes);
  const count = useSelector(getHeroesCount);
  const pageCount = Math.ceil(count / 5);

  useEffect(() => {
    dispatch(getHeroesList());
    dispatch(getCount());
  }, []);

  const handlePageClick = (event) => {
    dispatch(getHeroesList(event.selected + 1));
  };

  return (
    <div className="wrapper">
      {isModalOpen && <Modal></Modal>}
      <Header />
      <MainContent>
        <Button onClick={() => dispatch(openHeroCreate())}>
          Add new superhero
        </Button>
        <HeroesList heroesList={heroesList} />
      </MainContent>
      <ReactPaginate
        activeClassName={"item active "}
        breakClassName={"item break-me "}
        breakLabel={"..."}
        containerClassName={"pagination"}
        disabledClassName={"disabled-page"}
        marginPagesDisplayed={2}
        nextLabel={
          <GrFormNext
            style={{
              width: 30,
            }}
          />
        }
        nextClassName={"item next "}
        pageClassName={"item pagination-page "}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousClassName={"item previous"}
        previousLabel={<GrFormPrevious style={{ width: 30 }} />}
      />
    </div>
  );
};
