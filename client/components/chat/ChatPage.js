import React from 'react';
import ChatContainer from './Chat';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions/authActions';

class ChatPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <ChatContainer />
        </div>
      </div>
    );
  }
}

export default ChatPage;