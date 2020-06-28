import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

import Navbar from './components/layouts/Navbar'
import TopCard from './components/layouts/TopCard'
import ChatArea from './components/layouts/ChatArea'

// Modals
import LoginModal from './components/modals/Login'
import RegModal from './components/modals/Register'
import EditModal from './components/modals/EditStreamModal'

// Pages
import Lander from './components/pages/Lander'
import Chatbox from './components/pages/Chatbox'

import StreamState from './context/streams/StreamState'
import AuthState from './context/auth/AuthState'

import Container from './components/Container'

const App = () => {
  useEffect(() => {
    M.AutoInit()
  }, [])
  return (
    <div className="App">
      <AuthState>
        <StreamState>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Container} />
              <Route exact path='/chat' component={Chatbox} />
            </Switch>
          </Router>
        </StreamState>
      </AuthState>
    </div>
  );
}

export default App;
