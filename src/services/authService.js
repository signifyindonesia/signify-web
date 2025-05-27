import api from "./api";

// AUTH
export const registerUser = async (payload) => {
  return await api.post("/register", payload);
};

export const loginUser = async (payload) => {
  return await api.post("/login", payload);
};

// PROFILE
export const fetchProfile = async () => {
  return await api.get("/profile");
};

export const updateProfile = async (payload) => {
  return await api.put("/profile", payload);
};

export const updatePassword = async (payload) => {
  return await api.put("/profile/password", payload);
};
