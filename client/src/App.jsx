import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Form from './components/Form/Form';
import Post from './components/Post/Post';
import Trash from './components/Post/Trash';
import Star from './components/Post/Star';
import Recent from './components/Post/Recent';

const App = () => {
  const [view, setView] = useState(1);
  const state = (val) => {
    setView(val);
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="flex flex-col h-screen">
            <Header state={state} />
            <div className="flex mt-10">
              <Navbar nav="home" />
              <div className="flex justify-between absolute left-56  w-4/5 ">
                <Post view={view} />
              </div>
            </div>
          </div>
        </Route>
        <Route exact path="/recents">
          <div className="flex flex-col h-screen">
            <Header state={state} />
            <div className="flex mt-10">
              <Navbar nav="recents" />
              <div className="flex justify-between absolute left-56 w-4/5">
                <Recent view={view} />
              </div>
            </div>
          </div>
        </Route>
        <Route exact path="/starred">
          <div className="flex flex-col h-screen">
            <Header state={state} />
            <div className="flex mt-10">
              <Navbar nav="starred" />
              <div className="flex justify-between absolute left-56 w-4/5">
                <Star view={view} />
              </div>
            </div>
          </div>
        </Route>
        <Route exact path="/trash">
          <div className="flex flex-col h-screen">
            <Header state={state} />
            <div className="flex mt-10">
              <Navbar nav="trash" />
              <div className="absolute left-56 w-4/5">
                <Trash view={view} />
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
