import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import NewEventPage from './components/events/NewEventPage';
import Profile from './components/profile/ProfilePage';
import GoBidPage from './components/bid/GoBidPage';
import ChatPage from './components/chat/ChatPage';

import requireAuth from './utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Greetings} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="new-event" component={requireAuth(NewEventPage)} />
    <Route path="profile" component={requireAuth(Profile)} />
    <Route path="bid" component={requireAuth(GoBidPage)} />
    <Route path="chat" component={requireAuth(ChatPage)} />

  </Route>
)
