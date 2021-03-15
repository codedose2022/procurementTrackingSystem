const serviceRequests = (state = [], action) => {
  switch (action.type) {
    case "ALL_REQUESTS":
      return {
        ...state,
        serviceRequests: action.payload,
      };
    
    default:
      return { ...state };
  }
};

export default serviceRequests;
