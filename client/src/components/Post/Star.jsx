// Dependencies
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillStar, AiOutlineStar, AiOutlineDownload } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';

// Request Functions
import { LikesIncrease, starred } from '../../actions/post';

const TrashPosts = (props) => {
  const { view } = props;
  const [state, setState] = useState('');
  const post = useSelector((state) => state?.posts);
  const dispatch = useDispatch();

  const updateLike = (e, id) => {
    e.preventDefault();
    dispatch(LikesIncrease(id));
  };

  useEffect(() => {
    dispatch(starred());
  }, [dispatch]);
  return (
    <div className={`flex ml-5 w-full ${view ? 'flex-wrap' : 'flex-col'}`}>
      {post?.starred &&
        post?.starred.map((res) => (
          <>
            {view ? (
              <div
                className="bg-white flex flex-col rounded-xl w-56 shadow-xl border border-gray-300 ml-5 mt-5"
                key={res._id}
              >
                <div className="relative">
                  <img src={res.selectedFile} className="h-40 rounded-t-xl" />
                  {res.likeCount > 0 ? (
                    <AiFillStar className="absolute top-2 left-2 text-yellow-500 text-xl rounded-full bg-white" />
                  ) : (
                    <AiOutlineStar
                      onClick={(e) => updateLike(e, res._id)}
                      className="absolute top-2 left-2 cursor-pointer text-xl rounded-full bg-white"
                    />
                  )}
                  <span className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <div className="relative">
                      <BsThreeDotsVertical
                        className=" text-sm text-black cursor-pointer opacity-100"
                        onClick={() => {
                          state ? setState('') : setState(res._id);
                        }}
                      />
                      {state === res._id ? (
                        <div className="absolute top-3 bg-white rounded z-10 shadow flex flex-col">
                          <a href={res.selectedFile} download>
                            <p className="flex items-center justify-between text-xs p-2 mt-1 hover:bg-gray-100">
                              Download{' '}
                              <AiOutlineDownload className="ml-5 text-lg" />
                            </p>
                          </a>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </span>
                </div>
                <p className="flex items-center text-xs p-2 text-gray-500 font-semibold">
                  {res.title}
                </p>
                <p className="flex items-center  text-xs p-2 pt-0 text-gray-400">
                  Created: {moment(res.createdAt).fromNow()}
                </p>
              </div>
            ) : (
              <div
                className="bg-white flex rounded-xl border-b border-gray-300 ml-5 mt-1 justify-between items-center p-2"
                key={res._id}
              >
                <p className="flex items-center justify-between">
                  <div className="relative">
                    <BsThreeDotsVertical
                      className=" text-sm text-black cursor-pointer opacity-100"
                      onClick={() => {
                        state ? setState('') : setState(res._id);
                      }}
                    />
                    {state === res._id ? (
                      <div className="absolute top-3 bg-white rounded z-10 shadow flex flex-col">
                        <a href={res.selectedFile} download>
                          <p className="flex items-center justify-between text-xs p-2 mt-1 hover:bg-gray-100">
                            Download{' '}
                            <AiOutlineDownload className="ml-5 text-lg" />
                          </p>
                        </a>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <img src={res.selectedFile} className="h-10 w-10 ml-10" />
                </p>
                <p className="flex items-center text-sm p-2 text-gray-500 ">
                  {res.title}
                </p>
                <p className="flex items-center  text-sm p-2 pt-0 text-gray-400">
                  Created: {moment(res.createdAt).fromNow()}
                </p>
              </div>
            )}
          </>
        ))}
    </div>
  );
};

export default TrashPosts;
