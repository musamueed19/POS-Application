import React, { useState } from "react";

// antd icons, plus
import { PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
// import { Button } from "antd";



const Item = ({ item }) => {
  // dispatch, redux function
  const dispatch = useDispatch();

  //// getting, cartItems, from the rootReducer, and localStorage
  const { cartItems } = useSelector((state) => state.rootReducer);

  const { name, price, category, image } = item;

  // isInCart State
  const [isInCart, setIsInCart] = useState(false);

  // addToCartHandler function
  function addToCartHandler() {
    const isFound = cartItems.some((element) => element._id === item._id);

    if (!isFound) {
      dispatch({ type: "addToCart", payload: {...item, quantity:1} });
    }
    setIsInCart(true);
  }

  return (
    <div className="h-full flex flex-col justify-between border p-2 md:px-3 border-gray-300 rounded-md shadow-[#b7b4b4] shadow-md">
      {/* name, category */}
      <div className="flex justify-between items-center">
        <h1 className="text-base md:text-xl font-bold text-[#222] capitalize">
          {name}
        </h1>
        <span className="capitalize font-medium text-white bg-red-600 px-2 py-0.5 rounded-xl">
          {category}
        </span>
      </div>
      <div className="h-[150px] item-img my-2 w-[90%] flex items-center justify-center mx-auto">
        <img src={image} alt={`${category} item image`} />
      </div>

      {/* price, add to cart */}
      <div className="flex w-full justify-between items-center">
        <h4 className="text-xl md:text-2xl font-medium text-gray-500">
          {" "}
          Rs. {price}
        </h4>
        <button
          className="text-xl font-normal cursor-pointer flex items-center gap-x-1 bg-[#2da6ec] hover:bg-[#0b86cd] text-white px-2 py-0.5 rounded-md active:ring-4 active:ring-green-200"
          onClick={() => addToCartHandler()}
        >
          {!isInCart ? (
            <>
              <PlusOutlined /> <span className="text-xl">Cart</span>
            </>
          ) : (
            <span className="text-xl">Already in Cart</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Item;
