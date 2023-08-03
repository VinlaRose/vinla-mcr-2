
export const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_DATA": 
        return {
          ...state,
          data: [...state.data, action.payload], // Merge new data with existing data
          filteredData: [...state.filteredData, action.payload], // Merge new data with existing filteredData
        };
      case "UPDATE":
        return {
          ...state,
          filteredData: action.payload,
        };
        case "ARCHIVE":
          return {
            ...state,
            filteredData: action.payload,
          };
          case "UNARCHIVE":
          return {
            ...state,
            filteredData: action.payload,
          };
      default:
        return state;
    }
  };
  
  