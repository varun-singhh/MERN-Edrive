import React, { useState } from 'react';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import { FaSearch, FaThList } from 'react-icons/fa';

const Navbar = (props) => {
  const { state } = props;
  const [view, setView] = useState(1);
  return (
    <div className="flex items-center p-4 w-full border-b-2 justify-between sticky top-0 bg-white z-5">
      <div className="flex items-center">
        <img
          src="https://1000logos.net/wp-content/uploads/2020/05/Google-Photos-logo.png"
          alt="meomories"
          className="h-12 ml-3"
        />
        <p className="text-xl ml-2 text-gray-400 font-semibold"> Memories</p>
      </div>
      <div className="flex items-center w-4/6">
        <input
          type="text"
          placeholder="Search in Memory"
          className="placeholder-gray-500 p-3 px-5 w-full rounded bg-gray-100 focus:bg-white focus:shadow rounded-tl-xl rounded-bl-xl"
        />
        <p className="bg-gray-200 p-3 rounded-tr-xl rounded-br-xl hover:bg-white hover:shadow cursor-pointer transform duration-700">
          <FaSearch className="text-xl text-gray-400" />
        </p>
      </div>
      <div className="flex items-center">
        {view ? (
          <BsFillGrid1X2Fill
            className="mr-2 ml-2 text-4xl text-gray-400 p-2 hover:text-gray-500 hover:bg-gray-300 rounded cursor-pointer"
            onClick={() => {
              setView(!view);
              state(0);
            }}
          />
        ) : (
          <FaThList
            className="mr-2 ml-2 text-4xl text-gray-400 p-2 hover:text-gray-500 hover:bg-gray-300 rounded cursor-pointer"
            onClick={() => {
              setView(!view);
              state(1);
            }}
          />
        )}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1200px-The_Earth_seen_from_Apollo_17.jpg"
          className="rounded-full h-10 w-10 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
