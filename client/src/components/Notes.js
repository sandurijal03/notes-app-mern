import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Create from './notes/Create';
import EditNote from './notes/EditNote';
import Home from './notes/Home';
import Nav from './notes/Nav';

const Notes = ({ setIsLogin }) => {
  return (
    <Router>
      <div className='notes-page'>
        <Nav setIsLogin={setIsLogin} />
        <section>
          <Route exact path='/' component={Home} />
          <Route exact path='/create' component={Create} />
          <Route exact path='/edit' component={EditNote} />
        </section>
      </div>
    </Router>
  );
};

export default Notes;
