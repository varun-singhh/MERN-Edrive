import React, { useState } from 'react';
import Filebase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { create } from '../../actions/post';
import Modal from 'react-modal';
import { FaTimesCircle } from 'react-icons/fa';

const customStyles = {
  overlay: {
    backgroundColor: '#000000ad',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    position: 'absolute',
    zIndex: '200',
  },
};

Modal.setAppElement('#root');
const Form = ({ modalOpen, close }) => {
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
    close();
  };
  const clear = (e) => {
    e.preventDefault();
    setData({
      creator: '',
      title: '',
      message: '',
      tages: '',
      file: '',
      createdAt: new Date(),
    });
  };
  const edit = (val) => {
    setData(val);
  };
  return (
    <Modal
      isOpen={modalOpen}
      style={customStyles}
      shouldCloseOnOverlayClick={
        true
        /* Boolean indicating if the overlay should close the modal */
      }
    >
      <div className="flex justify-end">
        <FaTimesCircle onClick={() => close()} className="cursor-pointer" />
      </div>
      <div className="rounded flex flex-col bg-white p-3">
        <p className="text-center uppercase font-bold text-gray-500 text-xl m-4">
          Add Memory
        </p>
        <div className="">
          {data.selectedFile ? (
            <div className="p-6 flex items-cent justify-center border-2 border-blue-400 border-dashed text-xl font-bold text-gray-300">
              <img src={data.selectedFile} className="h-44" />
            </div>
          ) : (
            <div className="p-16 flex items-cent justify-center border-2 border-gray-300 border-dashed text-xl font-bold text-gray-300">
              PREVIEW HERE
            </div>
          )}
        </div>

        <input
          name="title"
          defaultValue={data.title}
          placeholder="Enter Title"
          onChange={(e) => setData({ ...data, title: e.target.value })}
          type="text"
          className="py-2 focus:border-blue-500 border-b-2 rounded px-6 mt-2 mb-2 outline-none transform duration-500"
        />
        {/* <input
          name="creator"
          defaultValue={data.creator}
          placeholder="Enter Image Name"
          onChange={(e) => setData({ ...data, creator: e.target.value })}
          type="text"
          className="py-2 focus:border-blue-500 border-b-2 rounded px-6 mt-2 mb-2 outline-none transform duration-500"
        />
        <input
          name="message"
          defaultValue={data.message}
          placeholder="Enter Message"
          onChange={(e) => setData({ ...data, message: e.target.value })}
          type="text"
          className="py-2 focus:border-blue-500 border-2 rounded px-6 m-2 outline-none"
        />
        <input
          name="tags"
          defaultValue={data.tags}
          placeholder="Enter Tags"
          onChange={(e) => setData({ ...data, tags: e.target.value })}
          type="text"
          className="py-2 focus:border-blue-500 border-2 rounded px-6 m-2 outline-none"
        /> */}
        <span className="mt-5">
          <Filebase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setData({ ...data, selectedFile: base64 })}
          />
        </span>
        {data.selectedFile ? (
          <button
            className="hover:bg-blue-600 bg-blue-500 py-2 px-10 rounded text-white mt-5 uppercase hover:shadow-xl transform duration-500"
            onClick={handleSubmit}
          >
            ADD
          </button>
        ) : (
          <button className="bg-blue-500 py-2 px-10 rounded text-white mt-5 uppercase opacity-50 cursor-not-allowed">
            Select Image
          </button>
        )}
        {/* <button
          className="bg-red-400 py-1 px-10 rounded text-white mt-1 uppercase"
          onClick={clear}
        >
          Clear Form
        </button> */}
      </div>{' '}
    </Modal>
  );
};

export default Form;
