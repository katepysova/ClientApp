import dateTypes from "@store/date/dateTypes";

const initialState = {
  minDate: null,
  maxDate: new Date(),
  exactDate: null
};

export default function dateReducer(state = initialState, action) {
  switch (action.type) {
    case dateTypes.setMinDate: {
      return {
        ...state,
        minDate: action.payload
      };
    }
    case dateTypes.setMaxDate: {
      return {
        ...state,
        maxDate: action.payload
      };
    }
    case dateTypes.setExactDate: {
      return {
        ...state,
        exactDate: action.payload
      };
    }
    default:
      return state;
  }
}
