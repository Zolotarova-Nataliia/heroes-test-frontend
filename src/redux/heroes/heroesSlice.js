import { createSlice } from "@reduxjs/toolkit";
import {
  addHero,
  updateHero,
  deleteHero,
  getHeroesList,
  getCount,
  openHeroEdit,
} from "./heroesOperations";

const initialState = {
  heroesList: [],
  modalIsOpen: false,
  currentHero: null,
  count: 0,
};

export const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    openHeroCreate(state) {
      state.modalIsOpen = true;
      state.currentHero = null;
    },
    closeModal(state) {
      state.modalIsOpen = false;
    },
  },

  extraReducers: {
    [addHero.fulfilled](state, action) {
      state.hero = action.payload;
      state.modalIsOpen = false;
    },
    [updateHero.fulfilled](state, action) {
      const idx = state.heroesList.findIndex(
        (hero) => hero._id === action.payload._id
      );
      state.heroesList[idx] = {
        nickname: action.payload.nickname,
        image: action.payload.images[0],
        _id: action.payload._id,
      };
    },
    [openHeroEdit.fulfilled](state, action) {
      state.currentHero = action.payload;
      state.modalIsOpen = true;
    },
    [getHeroesList.fulfilled](state, action) {
      state.heroesList = action.payload;
    },
    [getCount.fulfilled](state, action) {
      state.count = action.payload;
    },
    [deleteHero.fulfilled](state, action) {
      state.heroesList = state.heroesList.filter(
        (hero) => hero._id !== action.payload._id
      );
      state.modalIsOpen = false;
    },
  },
});

export const { openHeroCreate, closeModal } = heroesSlice.actions;
