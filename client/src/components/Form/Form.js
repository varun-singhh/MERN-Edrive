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
        <p className="text-center uppercase font-bold text-blue-500 text-xl m-4">
          Creating Memory
        </p>
        <input
          name="creator"
          defaultValue={data.creator}
          placeholder="Enter Creator Name"
          onChange={(e) => setData({ ...data, creator: e.target.value })}
          type="text"
          className="py-2 focus:border-blue-500 border-2 rounded px-6 m-2 outline-none"
        />
        <input
          name="title"
          defaultValue={data.title}
          placeholder="Enter Title"
          onChange={(e) => setData({ ...data, title: e.target.value })}
          type="text"
          className="py-2 focus:border-blue-500 border-2 rounded px-6 m-2 outline-none"
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
        />
        <span className="m-2">
          <Filebase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setData({ ...data, selectedFile: base64 })}
          />
        </span>
        <button
          className="bg-blue-500 py-2 px-10 rounded text-white mt-5 uppercase"
          onClick={handleSubmit}
        >
          Upload
        </button>
        <button
          className="bg-red-400 py-1 px-10 rounded text-white mt-1 uppercase"
          onClick={clear}
        >
          Clear Form
        </button>
      </div>{' '}
    </Modal>
  );
};

export default Form;
