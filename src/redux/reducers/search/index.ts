import { GET, RECEIVED, ERROR } from "./actionsType"
import { ActionTypes, searchState } from "./types"

const initialState: searchState = {
  loading: false,
  entities: {
    ids: [],
    data: {},
  },
  currentPage: -50,
  error: "",
}

const reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        loading: true,
        error: "",
      }
    case RECEIVED:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: "",
      }
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default reducer
