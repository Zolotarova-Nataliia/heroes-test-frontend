import { createAsyncThunk } from "@reduxjs/toolkit";
import * as heroesApi from "../../services/heroesApi";

export const addHero = createAsyncThunk(
  "hero/addHero",
  async (hero, { rejectWithValue }) => {
    try {
      const addedHero = await heroesApi.addHero(hero);
      return addedHero;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateHero = createAsyncThunk(
  "hero/updateHero",
  async ({ heroId, hero }, { rejectWithValue }) => {
    try {
      const updatedHero = heroesApi.updateHero(heroId, hero);
      return updatedHero;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const openHeroEdit = createAsyncThunk(
  "hero/openHeroEdit",
  async ({ heroId }, { rejectWithValue }) => {
    try {
      const hero = await heroesApi.getHero(heroId);
      return hero;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteHero = createAsyncThunk(
  "hero/deleteHero",
  async ({ heroId }, { rejectWithValue }) => {
    try {
      const deletedHero = await heroesApi.deleteHero(heroId);
      return deletedHero;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getHeroesList = createAsyncThunk(
  "hero/getHeroesList",
  async (page, { rejectWithValue }) => {
    try {
      const heroesList = await heroesApi.getHeroesList(page);
      return heroesList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCount = createAsyncThunk(
  "hero/getCount",
  async (_, { rejectWithValue }) => {
    try {
      const count = await heroesApi.getCount();
      return count;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
