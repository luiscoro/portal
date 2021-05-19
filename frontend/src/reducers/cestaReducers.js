import {
  ADD_TO_CESTA,
  REMOVE_ITEM_CESTA,
  SAVE_INFO_ENVIO,
} from "../constants/cestaConstants";

export const cestaReducer = (
  state = { itemsCesta: [], infoEnvio: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CESTA:
      const item = action.payload;

      const itemExiste = state.itemsCesta.find(
        (i) => i.producto === item.producto
      );

      if (itemExiste) {
        return {
          ...state,
          itemsCesta: state.itemsCesta.map((i) =>
            i.producto === itemExiste.producto ? item : i
          ),
        };
      } else {
        return {
          ...state,
          itemsCesta: [...state.itemsCesta, item],
        };
      }

    case REMOVE_ITEM_CESTA:
      return {
        ...state,
        itemsCesta: state.itemsCesta.filter(
          (i) => i.producto !== action.payload
        ),
      };

    case SAVE_INFO_ENVIO:
      return {
        ...state,
        infoEnvio: action.payload,
      };

    default:
      return state;
  }
};
