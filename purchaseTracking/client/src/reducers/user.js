const user = (state = [], action) => {
  switch (action.type) {
    case "USER_INFO":
      return {
        ...state,
        user: action.payload,
      };
      case "LOGIN":
        return {
          ...state,
          loggedInStatus: action.payload,
        };
        case "USERS_LIST":
          return {
            ...state,
            usersList: action.payload,
          };
    default:
      return { ...state };
  }
};

export default user;
