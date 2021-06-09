import React, { useState } from 'react';
import { AiOutlineStar, AiOutlineClockCircle } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdStorage } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Form from './Form/Form';

const Navbar = ({ nav }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => {
    setModalOpen(false);
  };
  return (
    <div className="bg-white fixed left-0 pt-5 w-64 h-full flex flex-col items-left">
      {modalOpen ? <Form modalOpen={modalOpen} close={close} /> : ''}
      <button
        className="justify-center ml-4 px-5 py-2 shadow-md rounded-3xl w-36 flex items-center transform duration-500 hover:shadow-xl border"
        onClick={() => setModalOpen(!false)}
      >
        <img
          className="mr-2"
          src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E"
        />{' '}
        <p className="text-lg">New</p>
      </button>
      <div className="flex flex-col mt-6">
        <Link to="/">
          <p
            className={`text-gray-500 text-sm flex items-center p-3 rounded-tr-2xl rounded-br-2xl  mt-1 cursor-pointer ${
              nav === 'home'
                ? 'text-blue-600 bg-blue-100 font-bold'
                : 'font-bold hover:bg-gray-100'
            }`}
          >
            <MdStorage className="text-xl ml-4 mr-4" /> My Drive
          </p>
        </Link>
        <Link to="/recents">
          <p
            className={`text-gray-500 text-sm flex items-center p-3 rounded-tr-2xl rounded-br-2xl  mt-1 cursor-pointer ${
              nav === 'recents'
                ? 'text-blue-600 bg-blue-100 font-bold'
                : 'font-bold hover:bg-gray-100'
            }`}
          >
            <AiOutlineClockCircle className="text-xl ml-4 mr-4" /> Recents
          </p>
        </Link>
        <Link to="/starred">
          <p
            className={`text-gray-500 text-sm flex items-center p-3 rounded-tr-2xl rounded-br-2xl  mt-1 cursor-pointer ${
              nav === 'starred'
                ? 'text-blue-600 bg-blue-100 font-bold'
                : 'font-bold hover:bg-gray-100'
            }`}
          >
            <AiOutlineStar className="text-xl ml-4 mr-4" /> Starred
          </p>
        </Link>
        <Link to="/trash">
          <p
            className={`text-gray-500 text-sm flex items-center p-3 rounded-tr-2xl rounded-br-2xl  mt-1 cursor-pointer ${
              nav === 'trash'
                ? 'text-blue-600 bg-blue-100 font-bold'
                : 'font-bold hover:bg-gray-100'
            }`}
          >
            <FaRegTrashAlt className="text-lg ml-4 mr-4" /> Trash
          </p>
        </Link>
      </div>
      <p className="mt-3 text-center text-xs text-gray-400">
        Copyright 2021, Varun Singh
      </p>
    </div>
  );
};

export default Navbar;
