import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Post = () => {
  const post = useSelector((state) => state.posts);
  const [read, setRead] = useState(0);
  const [readId, setReadId] = useState(0);
  const slice = (msg) => {
    return msg.slice(0, 120);
  };
  return (
    <div className="flex flex-wrap max-w-3xl ml-20">
      {post?.posts !== null &&
        post?.posts?.map((res) => (
          <div
            className="flex flex-col rounded-xl w-56 shadow-xl border border-gray-300 ml-5 mt-5 h-96 justify-between"
            key={res._id}
          >
            <img src={res.selectedFile} className="h-40 rounded-t-xl" />
            <p className="pl-4 pr-4 text-justify text-sm text-blue-600">
              {res.title}
            </p>
            <p className=" pl-4 font-semibold text-justify text-xs text-gray-500">
              Created: {moment(res.createdAt).fromNow()}
            </p>
            <div className="pl-4 pr-4 text-justify text-xs">
              {read && readId === res._id ? (
                <>
                  <p>
                    {res.message}{' '}
                    <p
                      className="mt-1 text-blue-600 cursor-pointer"
                      onClick={() => setRead(!read)}
                    >
                      {' '}
                      read less
                    </p>
                  </p>
                </>
              ) : (
                <>
                  {res.message.length > 15 ? (
                    <p>
                      {slice(res.message)}{' '}
                      <p
                        className="mt-1 text-blue-600 cursor-pointer"
                        onClick={() => {
                          setRead(!read);
                          setReadId(res._id);
                        }}
                      >
                        {' '}
                        ... read more
                      </p>
                    </p>
                  ) : (
                    res.message
                  )}
                </>
              )}
            </div>
            <p className="flex justify-around mb-3 p-3 text-blue-600 cursor-pointer text-xl">
              <p>
                <AiFillLike />
              </p>
              <p>
                <FaTrash />
              </p>
            </p>
          </div>
        ))}
    </div>
  );
};

export default Post;
