import React, { useState } from 'react';
import Filebase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { create } from '../../actions/post';

const Form = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(create(data));
  };
  const clear = (e) => {
    e.preventDefault();
    setData({
      creator: '',
      title: '',
      message: '',
      tages: '',
      file: '',
      createdAt: '',
    });
  };
  return (
    <div className="p-5 shadow-xl rounded flex flex-col border border-gray-300 mr-24">
      <p className="text-center uppercase font-bold text-blue-500 text-xl m-4">
        Creating Memory
      </p>
      <input
        name="creator"
        placeholder="Enter Creator Name"
        onChange={(e) => setData({ ...data, creator: e.target.value })}
        type="text"
        className="py-2 focus:border-blue-500 border-2 rounded px-6 m-2 outline-none"
      />
      <input
        name="title"
        placeholder="Enter Title"
        onChange={(e) => setData({ ...data, title: e.target.value })}
        type="text"
        className="py-2 focus:border-blue-500 border-2 rounded px-6 m-2 outline-none"
      />
      <input
        name="message"
        placeholder="Enter Message"
        onChange={(e) => setData({ ...data, message: e.target.value })}
        type="text"
        className="py-2 focus:border-blue-500 border-2 rounded px-6 m-2 outline-none"
      />
      <input
        name="tags"
        placeholder="Enter Tags"
        onChange={(e) => setData({ ...data, tags: e.target.value })}
        type="text"
        className="py-2 focus:border-blue-500 border-2 rounded px-6 m-2 outline-none"
      />
      <span className="m-2">
        <Filebase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setData({ ...data, selectedFile: base64 })}
        />
      </span>
      <button
        className="bg-blue-500 py-2 px-10 rounded text-white mt-5"
        onClick={handleSubmit}
      >
        Upload
      </button>
      <button
        className="bg-red-400 py-1 px-10 rounded text-white mt-1"
        onClick={clear}
      >
        Clear Form
      </button>
    </div>
  );
};

export default Form;
