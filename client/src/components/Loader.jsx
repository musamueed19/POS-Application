import React from 'react'


// loader
import LoaderIcon from '../assets/loader.svg'

const Loader = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <img src={LoaderIcon} className="w-full h-[20vh]" />
    </div>
  );
}

export default Loader