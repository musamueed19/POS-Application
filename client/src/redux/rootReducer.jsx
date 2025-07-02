const initialState = {
  loading: false,
  cartItems: [],
  user: null,
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
    case "deleteFromCart":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item["_id"] !== action.payload
        ),
      };
    case "login":
      {
        console.log(state.user, action.payload)
        return {
          ...state,
          user: action.payload,
        };
     }
    case "logout":
      {
        console.log(state.user, action.payload);
        return {
          ...state,
          user: action.payload,
        };
      }
    default:
      return state;
  }
};
