import { INSERT_CONTENT, UPDATE_CONTENT, DELETE_CONTENT } from "../actionTypes";
import { LOCK_TEMPLATE, UNLOCK_TEMPLATE } from '../actionTypes';

const initialState = {
    locked: false,
    allIds: [],
    byIds: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INSERT_CONTENT: {
      const { id, type, value } = action.payload;
      console.log(`Inserting content id: ${id}`);
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            type: type,
            value: value
          }
        }
      };
    }
    case UPDATE_CONTENT: {
      const { id, value } = action.payload;
      console.log(`Updating content id: ${id}`);
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            value: value
          }
        }
      };
    }
    case DELETE_CONTENT: {
        const { id } = action.payload;
        console.log(`Removing content id: ${id}`);
        return {
            ...state,
            byIds: {
                ...state.byIds,
                [id]: {}
            }
        }
    }
    case LOCK_TEMPLATE: {
        return {
            ...state,
            locked: true
        }
    }
    case UNLOCK_TEMPLATE: {
        return {
            ...state,
            locked: false
        }
    }
    default:
      return state;
  }
}
