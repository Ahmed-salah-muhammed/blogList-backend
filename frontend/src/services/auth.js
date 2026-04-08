import api from "./api";

export const login = async (credentials) => {
  const { data } = await api.post("/login", credentials);
  return data;
};
