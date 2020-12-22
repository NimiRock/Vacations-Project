export const inputChange = (target = "", name) => {
  if (name === "vacation-destination") {
    return {
      type: "VACATION_DESTINATION",
      payload: target,
    };
  } else if (name === "vacation-description") {
    return {
      type: "VACATION_DESCRIPTION",
      payload: target,
    };
  } else if (name === "vacation-arrival-date") {
    return {
      type: "VACATION_ARRIVAL_DATE",
      payload: target,
    };
  } else if (name === "vacation-leave-date") {
    return {
      type: "VACATION_LEAVE_DATE",
      payload: target,
    };
  } else if (name === "vacation-price") {
    return {
      type: "VACATION_PRICE",
      payload: target,
    };
  } else if (name === "vacation-img-url") {
    return {
      type: "VACATION_IMG_URL",
      payload: target,
    };
  }
};

export const allVacations = (vacations = []) => {
  return {
    type: "GET_VACATIONS",
    payload: vacations,
  };
};

export const isUserLoggedIn = (userInfo) => {
  console.log(userInfo);
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
