import React, { useEffect, useState } from "react";

import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import Loader from "../components/Loader";

const categoryOptions = [
  {
    name: "all",
    img: "https://freepngimg.com/save/41619-groceries-free-download-image/800x800",
  },
  {
    name: "dairy",
    img: "https://thumbs.dreamstime.com/b/cheese-milk-dairy-products-eggs-rustic-white-wood-backg-background-119865527.jpg",
  },
  {
    name: "grains",
    img: "https://media.istockphoto.com/id/1309198135/photo/several-full-grain-containers.jpg?s=612x612&w=0&k=20&c=PgYAQcIAyTO-2KrTfGoyvsIAPokjRcwGqGyoSl6rl5A=",
  },
  {
    name: "food",
    img: "https://foodindustryexecutive.com/wp-content/uploads/2023/02/groupPic-1024x556.jpg",
  },
  // {
  //   name: "cereal",
  //   img: "https://thumbs.dreamstime.com/b/breakfast-cereal-products-fresh-fruits-composition-different-sorts-379085781.jpg",
  // },
  {
    name: "candies",
    img: "https://www.shopvgh.ca/cdn/shop/collections/064-square_2840x2840_14f1cf9f-aa06-4fde-ba60-91b189a83f5b.jpg?v=1632339503",
  },
  {
    name: "drinks",
    img: "https://thumbs.dreamstime.com/b/bottles-global-soft-drink-brands-poznan-poland-apr-including-products-coca-cola-company-pepsico-114614624.jpg",
  },
  // {
  //   name: "fruit",
  //   img: "https://t4.ftcdn.net/jpg/00/65/70/65/360_F_65706597_uNm2SwlPIuNUDuMwo6stBd81e25Y8K8s.jpg",
  // },
  // {
  //   name: "vegetables",
  //   img: "https://t3.ftcdn.net/jpg/01/47/51/60/360_F_147516063_hCXI8VUIdBYud0B0hhS3Yo5CFTT1a4g8.jpg",
  // },
  // {
  //   name: "accessories",
  //   img: "https://img.freepik.com/free-photo/top-view-accessoires-travel-with-women-clothing-concept-white-mobilephone-watch-bag-hat-map-camera-necklace-trousers-sunglasses-white-wood-table_1921-106.jpg?semt=ais_items_boosted&w=740",
  // },
  // {
  //   name: "kitchen",
  //   img: "https://img.freepik.com/premium-photo/various-cooking-tools-appliances-arranged_555090-153972.jpg?semt=ais_hybrid&w=740",
  // },
];

const HomePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // activeCategory
  const [activeCategory, setActiveCategory] = useState("all");

  function getAllItems() {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v0/items`)
      .then((res) => {
        setData(res?.data?.message);
        setError("");
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch items"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllItems();
  }, []);

  // Filter data based on active category
  const filteredData =
    activeCategory === "all"
      ? data
      : data.filter(
          (item) =>
            item?.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  if (isLoading) return <Loader />;

  return (
    <div className="">
      {/* categories based foods */}
      <div className="flex space-x-4 mb-6 overflow-x-scroll no-scrollbar">
        {categoryOptions.map((item, index) => (
          <div
            onClick={() => setActiveCategory(item.name)}
            key={index}
            className={`${
              activeCategory === item.name && "border border-[#2e2e2e]"
            } flex flex-col w-32 h-40 items-center capitalize rounded-lg overflow-hidden shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow flex-shrink-0`}
          >
            <div className="flex-1 w-full overflow-hidden">
              <img
                src={item.img}
                alt={item.name + "img"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="p-2 text-center w-full text-sm font-medium">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <Row className="flex flex-wrap gap-y-[40px]" gutter={20}>
        {error ? (
          <p className="text-center w-full text-2xl font-medium">{error}</p>
        ) : data?.length > 0 ? (
          filteredData?.map((item) => (
            <Col key={item?.["_id"]} span={6} xs={24} md={12} lg={8} xl={6}>
              <Item key={item?.["_id"]} item={item} />
            </Col>
          ))
        ) : (
          <p className="text-center w-full text-2xl font-medium">
            Sorry, No Records Found 😥
          </p>
        )}
      </Row>
    </div>
  );
};

export default HomePage;

// import React, { useEffect, useState } from "react";
// import { LoadingOutlined } from "@ant-design/icons";

// // axios import
// import axios from "axios";
// import { Col, Row } from "antd";
// import Item from "../components/Item";
// import Loader from "../components/Loader";

// const HomePage = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   function getAllItems() {
//     axios
//       .get(`${import.meta.env.VITE_API_URL}/api/v0/items`)
//       .then((res) => {
//         setData(res?.data?.message);
//         console.log(res?.data?.message);
//       })
//       .catch((err) => {
//         setError(err);
//       });
//   }

//   useEffect(() => {
//     getAllItems();
//     setIsLoading(false);
//   }, []);

//   if (isLoading) return <Loader />;

//   return (
//     <div>
//       <Row className="flex gap-2 md:gap-4 flex-wrap">
//         {data?.length > 0 && error === "" ? (
//           data?.map((item) => (
//             <Col key={item?.["_id"]} span={6}>
//               <Item key={item?.["_id"]} item={item} />
//             </Col>
//           ))
//         ) : (
//           <>
//             {error !== "" ? (
//               <p className="text-center w-full text-2xl font-medium">
//                 {error || "Sorry, No Records Found 😥"}
//               </p>
//             ) : (
//               <Loader />
//             )}
//           </>
//         )}
//       </Row>
//     </div>
//   );
// };

// export default HomePage;
