export const getAccessToken = () => {
  return sessionStorage.getItem("token");
};

export const setAccessToken = (token) => {
  sessionStorage.setItem("token", token);
};

export const clearAccessToken = () => {
  sessionStorage.removeItem("token");
};
