// Dependencies
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaTrash } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineReload } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';

// Request Functions
import { remove, restore, Trash } from '../../actions/post';
import bin from '../../static/images/bin.jpg';

const TrashPosts = (props) => {
  const { view } = props;
  const [loading, setLoading] = useState('');
  const [state, setState] = useState('');
  const post = useSelector((state) => state?.posts);
  const dispatch = useDispatch();

  const FinalDelete = (e, id) => {
    setLoading('Del');
    e.preventDefault();
    dispatch(remove(id));
  };
  const Restore = (e, id) => {
    setLoading('res');
    e.preventDefault();
    dispatch(restore(id));
  };
  useEffect(() => {
    dispatch(Trash());
  }, [dispatch]);
  console.log(post?.trash?.length);
  return (
    <>
      {! post?.trash?.length ? (
        <div className="flex justify-center items-center flex-col mt-10">
          <img className=" h-56" src={bin} />
        </div>
      ) : (
        ''
      )}
      <div className={`flex ml-5 w-full ${view ? 'flex-wrap' : 'flex-col'}`}>
        {post?.trash &&
          post?.trash.map((res) => (
            <>
              {view ? (
                <div
                  className="bg-white flex flex-col rounded-xl w-56 shadow-xl border border-gray-300 ml-5 mt-5"
                  key={res._id}
                >
                  <div className="relative">
                    <img src={res.selectedFile} className="h-40 rounded-t-xl" />
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
                            <p
                              className="cursor-pointer flex items-center justify-between text-xs p-2 cursor-pointer mt-1 hover:bg-gray-100"
                              onClick={(e) => Restore(e, res._id)}
                            >
                              Restore{' '}
                              {loading !== 'res' ? (
                                <AiOutlineReload className="ml-5 text-xs " />
                              ) : (
                                <BiLoaderAlt className="ml-5 text-xs animate-spin" />
                              )}
                            </p>
                            <p
                              className="cursor-pointer flex items-center justify-between text-xs p-2 mt-1 hover:bg-gray-100"
                              onClick={(e) => FinalDelete(e, res._id)}
                            >
                              Remove <FaTrash className="ml-5 text-xs" />
                            </p>
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
                    Deleted: {moment(res.DeletedOn).fromNow()}
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
                          <p
                            className="cursor-pointer flex items-center justify-between text-xs p-2 cursor-pointer mt-1 hover:bg-gray-100"
                            onClick={(e) => Restore(e, res._id)}
                          >
                            Restore <AiOutlineReload className="ml-5 text-xs" />
                          </p>
                          <p
                            className="cursor-pointer flex items-center justify-between text-xs p-2 mt-1 hover:bg-gray-100"
                            onClick={(e) => remove(e, res._id)}
                          >
                            Remove <FaTrash className="ml-5 text-xs" />
                          </p>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    <img src={res.selectedFile} className="h-10 w-10 ml-10" />
                  </p>
                  <p className="flex items-center text-md p-2 text-gray-500 font-semibold">
                    {res.title}
                  </p>
                  <p className="flex items-center  text-md p-2 pt-0 text-gray-400">
                    Deleted: {moment(res.DeletedOn).fromNow()}
                  </p>
                </div>
              )}
            </>
          ))}
      </div>
    </>
  );
};

export default TrashPosts;
