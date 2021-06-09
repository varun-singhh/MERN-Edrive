import React, { useEffect, useState } from 'react';
import { FaDownload, FaTrash } from 'react-icons/fa';
import {
  AiFillLike,
  AiFillStar,
  AiOutlineStar,
  AiOutlineDownload,
} from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { Delete, LikesIncrease, Trash } from '../../actions/post';
import moment from 'moment';

const TrashPosts = (props) => {
  const post = useSelector((state) => state?.posts);
  const [read, setRead] = useState(0);
  const [readId, setReadId] = useState(0);
  const slice = (msg) => {
    return msg.slice(0, 55);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Trash());
  }, [dispatch]);
  const remove = (e, id) => {
    e.preventDefault();
    dispatch(Delete(id));
  };
  const updateLike = (e, id) => {
    e.preventDefault();
    dispatch(LikesIncrease(id));
  };

  const { view } = props;
  return (
    <div
      className={`flex ml-5 w-full ${
        view ? 'flex-wrap' : 'flex-col'
      } overflow-y-scroll overflow-x-hidden`}
      style={{ maxHeight: '35rem' }}
    >
      {post?.trash &&
        post?.trash.map((res) => (
          <>
            {view ? (
              <div
                className="bg-white flex flex-col rounded-xl w-56 shadow-xl border border-gray-300 ml-5 mt-5"
                key={res._id}
              >
                <img src={res.selectedFile} className="h-40 rounded-t-xl" />
                <p className="pl-4 pr-4 text-justify text-sm text-blue-600 mt-2 mb-2">
                  {res.title}
                </p>
                <p className=" pl-4 font-semibold text-justify text-xs text-green-500 mb-1">
                  Deleted: {moment(res.DeletedOn).fromNow()}
                </p>
                <div className="pl-4 pr-4 text-justify text-xs">
                  {read && readId === res._id ? (
                    <>
                      <div>
                        {res.message}{' '}
                        <p
                          className="mt-1 text-blue-600 cursor-pointer"
                          onClick={() => setRead(!read)}
                        >
                          {' '}
                          read less
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {res.message?.length > 15 ? (
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
                <p className="flex items-center justify-around mb-2 mt-4">
                  {res.likeCount > 0 ? (
                    <AiFillStar className="text-yellow-500 text-xl" />
                  ) : (
                    <AiOutlineStar
                      onClick={(e) => updateLike(e, res._id)}
                      className="cursor-pointer text-xl"
                    />
                  )}
                  <a href={res.selectedFile} download>
                    <AiOutlineDownload className="text-xl" />
                  </a>
                  <FaTrash
                    onClick={(e) => remove(e, res._id)}
                    className="cursor-pointer"
                  />
                </p>
              </div>
            ) : (
              <div
                className="bg-white flex rounded-xl border-b border-gray-300 ml-5 mt-1 justify-between items-center p-2"
                key={res._id}
              >
                <img src={res.selectedFile} className="h-10 w-10" />
                <p className="pl-4 pr-4 text-justify text-sm text-blue-600">
                  {res.title}
                </p>
                <p className=" pl-4 font-semibold text-justify text-xs text-gray-500">
                  Created: {moment(res.createdAt).fromNow()}
                </p>
                <p className="flex items-center w-32 justify-between">
                  {res.likeCount > 0 ? (
                    <AiFillStar className="text-yellow-500 text-xl" />
                  ) : (
                    <AiOutlineStar
                      onClick={(e) => updateLike(e, res._id)}
                      className="cursor-pointer text-xl"
                    />
                  )}
                  <a href={res.selectedFile} download>
                    <AiOutlineDownload className="text-xl" />
                  </a>
                  <FaTrash
                    onClick={(e) => remove(e, res._id)}
                    className="cursor-pointer"
                  />
                </p>
              </div>
            )}
          </>
        ))}
    </div>
  );
};

export default TrashPosts;
