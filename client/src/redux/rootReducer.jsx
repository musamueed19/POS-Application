const initialState = {
  loading: false,
  cartItems: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addToCart":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "updateQuantity":
      return {
        ...state,
          cartItems: state.cartItems.map((item) => {
          return item["_id"] === action.payload["_id"]
            ? { ...item, quantity: action.payload.quantity }
            : item;
        }),
      };
    case "deleteFromCart": return {
      ...state,
      cartItems: state.cartItems.filter(item => item['_id'] !== action.payload)
    }
    default:
      return state;
  }
};
