const user = (state = [], action) => {
  switch (action.type) {
    case "USER_INFO":
      return {
        ...state,
        loggedInStatus: action.payload,
      };
    default:
      return { ...state };
  }
};

export default user;
