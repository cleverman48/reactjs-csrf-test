import './App.css';
import React, { useState, useEffect } from 'react';
import NoteTop from './note/NoteTop.js';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <div className='App-header'>
          <p>Vulnerable Web Application - CSRF(Insecure Version)</p>
        </div>
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/notes" className="nav-link">Notes</Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">About</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/notes" component={NoteTop} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
const Home = () => <h1 style={{textAlign:'center',}}>Welcome to the Home Page!</h1>;

const About = () => <h1 style={{textAlign:'center',}}>About Page</h1>;

const NotFound = () => <h1 style={{textAlign:'center',}}>404 - Page Not Found</h1>;

export default App;
