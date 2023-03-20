import { mock } from "components/view/shared/Table";
import { ACTION_TYPES } from "lib/enum/View";
import { Action, TableRowData } from "lib/type/View";
import { useReducer } from "react";

const reducer = (state: TableRowData, action: Action): TableRowData => {
  switch (action.type) {
    case ACTION_TYPES.ADD_ROW: {
      return state.concat({
        name: "",
        content: "",
      });
    }
    case ACTION_TYPES.EDIT_DATA: {
      if (!action.payload) return state;
      const index = action.payload?.editingIndex!;

      return [
        ...state.slice(0, index),
        {
          ...state[index],
          [action.payload.editingProp!]: action.payload?.value,
        },
        ...state.slice(index + 1),
      ];
    }
    case ACTION_TYPES.DELETE_DATA: {
      if (!action.payload) return state;
      const index = action.payload?.editingIndex;

      return state.splice(index, 1);
    }
    case ACTION_TYPES.EDIT_NAME: {
    }
    default:
      return state;
  }
};

const initialState: TableRowData = mock;

export const useTableData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
