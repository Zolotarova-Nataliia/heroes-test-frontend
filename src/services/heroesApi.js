import axios from "axios";
import { API_HOST } from "../constants";

axios.defaults.baseURL = API_HOST;

export const addHero = async (hero) => {
  const { data } = await axios.post("/heroes", hero);
  return data;
};

export const updateHero = async (heroId, hero) => {
  const { data } = await axios.put(`/heroes/${heroId}`, hero);
  return data;
};

export const getHero = async (heroId) => {
  const { data } = await axios.get(`/heroes/${heroId}`);
  return data;
};

export const deleteHero = async (heroId) => {
  const { data } = await axios.delete(`/heroes/${heroId}`);
  return data;
};

export const getHeroesList = async (page) => {
  const { data } = await axios.get(`/heroes?page=${page}`);
  return data;
};

export const getCount = async () => {
  const { data } = await axios.get(`/heroes/count`);
  return data;
};
