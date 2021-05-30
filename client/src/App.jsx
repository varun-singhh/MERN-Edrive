import React, { useEffect } from 'react';
import Form from './components/Form/Form';
import Post from './components/Post/Post';
import { useDispatch } from 'react-redux';
import { getposts } from './actions/post';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getposts());
  }, [dispatch]);

  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-center shadow-xl p-4 w-full">
        <p className="text-xl font-bold text-blue-500 uppercase">Memories</p>
        <img
          src="https://raw.githubusercontent.com/adrianhajdin/project_mern_memories/master/client/src/images/memories.png?token=AF56X74XONEUGZ4FD2FUIA27UURPI"
          alt="meomories"
          className="h-10 ml-10"
        />
      </div>
      <div className="flex justify-between mt-10">
        <Post />
        <Form />
      </div>
    </div>
  );
};

export default App;
