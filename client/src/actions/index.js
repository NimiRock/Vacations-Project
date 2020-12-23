export const allVacations = (vacations = []) => {
  return {
    type: "GET_VACATIONS",
    payload: vacations,
  };
};

export const isUserLoggedIn = (userInfo) => {
  if (userInfo) {
    return {
      type: "LOGIN",
      payload: userInfo,
    };
  } else if (!userInfo) {
    return {
      type: "LOGOUT",
      payload: userInfo,
    };
  }
};
