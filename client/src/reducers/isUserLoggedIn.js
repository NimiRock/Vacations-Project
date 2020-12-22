let initialUser = {
  login: false,
  userid: null,
  userFName: null,
  userRole: null,
};

const loggedInReducer = (state = initialUser, action) => {
  switch (action.type) {
    case "LOGIN":
      let newState = {
        login: true,
        userid: action.payload.user.user_id,
        userFName: action.payload.user.user_fname,
        userRole: action.payload.user.user_role,
      };
      return newState;

    case "LOGOUT":
      return initialUser;

    default:
      return state;
  }
};

export default loggedInReducer;
