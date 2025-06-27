import React, { useEffect, useState } from "react";
import {
  LoadingOutlined
} from "@ant-design/icons";

// axios import
import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import Loader from "../components/Loader";


const HomePage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getAllItems() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v0/items`)
      .then((res) => {
        setData(res?.data?.message);
        console.log(res?.data?.message)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllItems();
    setIsLoading(false);
  }, []);

 if(isLoading) return <Loader />; 
 
  return (
    <div>
      <Row className="flex gap-2 md:gap-4 flex-wrap">
        {(data?.length > 0) ?
          data?.map((item) => (
            <Col key={item?.["_id"]} span={6}>
              <Item key={item?.["_id"]} item={item} />
            </Col>
          ))
          :
          (
            // <p className="text-center w-full text-2xl font-medium">Sorry, No Records Found 😥</p>
            <Loader />
        )}
      </Row>
    </div>
  );
};

export default HomePage;
