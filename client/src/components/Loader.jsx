import React from "react";

// loader
import LoaderIcon from "../assets/loader.svg";
import PendingIcon from "../assets/pending.svg";

const Loader = ({ isPending = false }) => {
  return (
    <>
      {!isPending ? (
        <div className="w-full flex justify-center items-center">
          <img src={LoaderIcon} className="w-full h-[20vh]" />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <img src={PendingIcon} className="object-contain w-[40px]" />
        </div>
      )}
    </>
  );
};

export default Loader;
