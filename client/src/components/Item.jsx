import React from "react";

const Item = ({ item }) => {
  const { name, price, category, image } = item;
  return (
    <div className="h-full flex flex-col justify-between border-2 p-2 md:px-3 border-gray-400 rounded-md">
      {/* name, category */}
      <div className="flex justify-between items-center">
        <h1 className="text-base md:text-xl font-bold text-[#222] capitalize">{name}</h1>
        <span className="capitalize font-medium text-white bg-red-600 px-2 py-0.5 rounded-xl">
          {category}
        </span>
      </div>
      <div className="h-[150px] item-img my-2 w-[90%] flex items-center justify-center mx-auto">
        <img src={image} alt={`${category} item image`} />
      </div>
      <h4 className="text-xl md:text-2xl font-medium text-gray-500"> Rs. {price}</h4>
    </div>
  );
};

export default Item;
