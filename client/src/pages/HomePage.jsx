import React, { useEffect, useState } from "react";

import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import Loader from "../components/Loader";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) return <Loader />;

  return (
    <div>
      <Row className="flex flex-wrap gap-y-[40px]" gutter={20}>
        {error ? (
          <p className="text-center w-full text-2xl font-medium">{error}</p>
        ) : data?.length > 0 ? (
          data?.map((item) => (
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
